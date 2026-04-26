import { createMarkdownRenderer, defineLoader, type MarkdownRenderer } from 'vitepress'
import type { SiteConfig } from 'vitepress'
import { normalizePath } from 'vite'
import path from 'node:path'
import fs from 'node:fs'
import matter from 'gray-matter'
import {
  countMarkdownWords,
  estimateReadingTime,
  extractMarkdownExcerpt, getGitFileCommitHistory,
  getGitFileCreationTime,
  getGitFileLastModifiedTime,
  normalizeToUnixPath,
  sortObjectsByFields
} from '../support/posts'

/**
 * 博客文章 Front Matter 原始结构。
 */
export interface BlogPostFrontmatter extends Record<string, unknown> {
  layout?: string
  title?: string
  author?: string
  date?: string | number | Date
  lastUpdated?: string | number | Date
  tags?: string | string[]
  categories?: string | string[]
  excerpt?: string
}

/**
 * 文章字数统计信息。
 */
interface BlogPostWordCount {
  exact: number
  approximate: number | string
}

/**
 * 主题内统一使用的博客文章数据结构。
 */
export interface BlogPostData extends Omit<
  BlogPostFrontmatter,
  'title' | 'date' | 'lastUpdated' | 'tags' | 'categories'
> {
  title: string
  author: string
  date: number
  lastUpdated: number
  tags: string[]
  categories: string[]
  wordCount: BlogPostWordCount
  readTime: string
  excerpt: string
  url: string
  filePath: string
}

/**
 * 文章数据列表。
 */
export type Data = BlogPostData[]

const config: SiteConfig = (globalThis as any).VITEPRESS_CONFIG

const { themeConfig } = config.userConfig

const enableLastUpdated = config.userConfig.lastUpdated !== false

// declare const data: Data
// export { data }
export const data: Data = []

let md: MarkdownRenderer
/**
 * 按文件路径缓存解析后的文章数据，避免重复计算。
 */
const postCache = /* @__PURE__ */ new Map<string, { data: BlogPostData; timestamp: number }>()
/**
 * 需要在文章索引中忽略的页面布局。
 */
const SKIPPED_LAYOUTS = new Set(['home'])
/**
 * Markdown 代码块围栏标记（支持 ``` 与 ~~~）。
 */
const CODE_FENCE_MARKER_RE = /^(```|~~~)/

/**
 * 将 Front Matter 中的标签/分类字段统一归一化为字符串数组。
 */
function normalizeTaxonomy(value: unknown): string[] {
  if (typeof value === 'string') {
    return [value.trim()].filter(Boolean)
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean)
  }

  return []
}

/**
 * 将日期输入安全转换为时间戳，失败时回退到传入默认值。
 */
function toTimestamp(value: unknown, fallback: number): number {
  if (value === undefined || value === null || value === '') {
    return fallback
  }

  const timestamp = new Date(value as string | number | Date).getTime()
  return Number.isNaN(timestamp) ? fallback : timestamp
}

/**
 * 从正文中提取首个 H1 作为候选标题。
 * 会跳过代码块，避免误匹配代码中的 #。
 */
function extractFirstH1Title(markdownBody: string): string | undefined {
  const lines = markdownBody.split(/\r?\n/)
  let inCodeBlock = false

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) {
      continue
    }

    if (CODE_FENCE_MARKER_RE.test(line)) {
      inCodeBlock = !inCodeBlock
      continue
    }

    if (inCodeBlock) {
      continue
    }

    const h1Match = /^#\s+(.+)$/u.exec(line)
    if (h1Match) {
      return h1Match[1].trim()
    }
  }

  return undefined
}

/**
 * 从文件路径推断兜底标题。
 */
function inferTitleFromPath(relativeMarkdownPath: string): string {
  const fileName = path.basename(relativeMarkdownPath, '.md')
  if (fileName !== 'index') {
    return fileName.replace(/[-_]+/g, ' ').trim()
  }

  return path.basename(path.dirname(relativeMarkdownPath)).replace(/[-_]+/g, ' ').trim()
}

/**
 * 基于文档相对路径生成站点内文章 URL。
 * 多语言兼容：root 语言下的内容去除目录前缀，其他语言保留前缀。
 */
function createPostUrl(relativeMarkdownPath: string): string {
  // 获取 VitePress locales 配置
  const locales = (config.userConfig.locales || {}) as Record<string, { label?: string; lang?: string; link?: string }>
  // root 语言目录（如 zh）
  const rootKey = 'root'
  // 非 root 的所有 key
  const nonRootKeys = Object.keys(locales).filter((k) => k !== rootKey)
  let normalizedUrlPath = relativeMarkdownPath
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, config.cleanUrls ? '' : '.html')
  // 如果是非 root 语言目录下的内容，保留前缀，否则去掉
  for (const langKey of nonRootKeys) {
    if (normalizedUrlPath.startsWith(`${langKey}/`)) {
      // 非 root 语言，保留前缀
      return '/' + normalizedUrlPath
    }
  }

  if (nonRootKeys.length === 0) {
    return '/' + normalizedUrlPath
  }

  // root 语言目录下的内容，去掉前缀
  return '/' + normalizedUrlPath.replace(/^([\w-]+)\//, '')
}

export default defineLoader({
  /**
   * 监听所有 Markdown 文件变化。
   */
  watch: ['**/*.md'].map((p) => normalizePath(path.join(config.root, p))),
  /**
   * 加载并构建文章索引数据。
   * 标题优先级：frontmatter.title > 首个 H1 > 文件路径推断。
   */
  async load(filePaths) {
    md = md || (await createMarkdownRenderer(config.srcDir, config.markdown, config.site.base, config.logger))
    const blogPosts: BlogPostData[] = []

    for (const markdownFilePath of filePaths) {
      if (!markdownFilePath.endsWith('.md')) {
        continue
      }

      const fileStats = fs.statSync(markdownFilePath)
      const fileLastModifiedAt = fileStats.mtimeMs
      const fileCreatedAt = fileStats.birthtimeMs

      const cachedPost = postCache.get(markdownFilePath)
      if (cachedPost && fileLastModifiedAt === cachedPost.timestamp) {
        blogPosts.push(cachedPost.data)
        continue
      }

      const rawMarkdown = fs.readFileSync(markdownFilePath, 'utf-8')
      const {
        data: parsedFrontmatter,
        excerpt: excerptFromMoreTag,
        content: markdownBody
      } = matter(rawMarkdown, {
        excerpt: (text: string) => {
          const excerptSeparator = /<!--\s*more\s*-->/gs
          const match = excerptSeparator.exec(text)
          return match ? text.substring(0, match.index) : ''
        }
      })
      const frontmatter = parsedFrontmatter as BlogPostFrontmatter

      if (frontmatter.layout && SKIPPED_LAYOUTS.has(frontmatter.layout)) {
        continue
      }

      // 作者
      const author = frontmatter.author || themeConfig?.author

      const createdAtByGit = getGitFileCreationTime(markdownFilePath)
      const lastUpdatedAtByGit = enableLastUpdated ? getGitFileLastModifiedTime(markdownFilePath) : 0
      const resolvedDate = toTimestamp(frontmatter.date, createdAtByGit || fileCreatedAt)
      const resolvedLastUpdated = enableLastUpdated
        ? toTimestamp(frontmatter.lastUpdated, lastUpdatedAtByGit || fileLastModifiedAt)
        : 0

      const gitChangelog = getGitFileCommitHistory(markdownFilePath)

      const relativeMarkdownPath = normalizePath(path.relative(config.srcDir, markdownFilePath))
      const fallbackTitle = inferTitleFromPath(relativeMarkdownPath)
      const resolvedTitle = String(frontmatter.title || extractFirstH1Title(markdownBody) || fallbackTitle).trim()
      const normalizedTags = normalizeTaxonomy(frontmatter.tags)
      const normalizedCategories = normalizeTaxonomy(frontmatter.categories)

      const wordCount: BlogPostWordCount = {
        exact: Number(countMarkdownWords(markdownBody, false)),
        approximate: countMarkdownWords(markdownBody)
      }
      const readTime = estimateReadingTime(markdownBody)
      const url = createPostUrl(relativeMarkdownPath)

      const resolvedExcerpt = excerptFromMoreTag
        ? md.render(excerptFromMoreTag)
        : await extractMarkdownExcerpt(markdownBody, md, frontmatter, themeConfig?.excerptLength, config.site.base)

      const postData: BlogPostData = {
        ...frontmatter,
        title: resolvedTitle,
        author,
        date: resolvedDate,
        lastUpdated: resolvedLastUpdated,
        tags: normalizedTags,
        categories: normalizedCategories,
        wordCount,
        readTime,
        excerpt: resolvedExcerpt,
        url,
        filePath: normalizeToUnixPath(relativeMarkdownPath),
        commit: gitChangelog
      }

      postCache.set(markdownFilePath, {
        data: postData,
        timestamp: fileLastModifiedAt
      })
      blogPosts.push(postData)
    }

    return sortObjectsByFields(blogPosts, '-date')
  }
})
