import { spawnSync } from 'node:child_process'
import { marked } from 'marked'
import type { MarkdownRenderer } from 'vitepress'
import { type CheerioOptions, load } from 'cheerio'
import type { AnyNode } from 'domhandler'
import { isHTMLTag, isMathMLTag, isSVGTag } from '@vue/shared'
import type { BlogPostFrontmatter } from '../composables/posts.data'

/**
 * 按多字段规则对对象数组排序。
 *
 * @param data 待排序数据（不会修改原数组）
 * @param sortConfig 排序配置，支持字符串或对象写法
 */
export function sortObjectsByFields<T extends Record<string, unknown>>(
  data: readonly T[],
  sortConfig: string | Record<string, 1 | -1>
): T[] {
  const sortRules = parseSortConfig(sortConfig)

  return [...data].sort((a, b) => {
    for (const [field, direction] of sortRules) {
      const valueA = a[field]
      const valueB = b[field]

      if (valueA === valueB) continue

      // 数字类型比较
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return direction === 1 ? valueA - valueB : valueB - valueA
      }

      // 非数字类型比较
      return direction === 1
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA))
    }
    return 0
  })
}

/**
 * 解析排序配置为统一规则列表。
 * 字符串格式示例：`date -title +order`。
 */
function parseSortConfig(config: string | Record<string, 1 | -1>): Array<[string, 1 | -1]> {
  const rules: Array<[string, 1 | -1]> = []

  if (typeof config === 'string') {
    // 支持 "field1 -field2 +field3" 格式
    config.split(/\s+/).forEach((part) => {
      if (!part) return

      const field = part.replace(/^[+-]/, '')
      const order = part.startsWith('-') ? -1 : 1
      rules.push([field, order])
    })
  } else {
    // 处理对象格式 { field1: 1, field2: -1 }
    Object.entries(config).forEach(([field, order]) => {
      rules.push([field, order])
    })
  }

  return rules
}

/**
 * 获取文件在 Git 历史中的首次提交时间。
 *
 * @returns 时间戳（毫秒）或 undefined
 */
export function getGitFileCreationTime(filePath: string): number | undefined {
  try {
    const infoStr = spawnSync('git', ['log', '--pretty="%ci"', '--diff-filter=A', '--', filePath])
      .stdout?.toString()
      .replace(/["']/g, '')
      .trim()

    const dates = infoStr.split('\n').filter(Boolean)
    if (dates.length > 0) {
      return new Date(dates[dates.length - 1]).getTime()
    }
  } catch {
    return undefined
  }
}

/**
 * 获取文件在 Git 历史中的最近一次提交时间。
 *
 * @returns 时间戳（毫秒）或 undefined
 */
export function getGitFileLastModifiedTime(filePath: string): number | undefined {
  try {
    const infoStr = spawnSync('git', ['log', '-1', '--pretty="%ci"', filePath])
      .stdout?.toString()
      .replace(/["']/g, '')
      .trim()
    if (infoStr) {
      return new Date(infoStr).getTime()
    }
  } catch {
    return undefined
  }
}

/**
 * 统计 Markdown 内容字数（字符数）。
 *
 * @param markdownText Markdown 原文
 * @param useAbbreviation 是否对大数字使用缩写（如 1.2K）
 */
export function countMarkdownWords(markdownText: string, useAbbreviation = true): number | string {
  const htmlContent = marked.parse(markdownText)

  if (typeof htmlContent !== 'string') {
    return 0
  }

  const textContent = htmlContent
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  const charCount = textContent.length

  if (charCount > 1000 && useAbbreviation) {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(charCount)
  }

  return charCount
}

/**
 * 估算阅读时长。
 */
export function estimateReadingTime(content: string, wordsPerMinute = 500): string {
  const wordCount = countMarkdownWords(content || '', false)
  const minutes = Math.max(1, Math.ceil(Number(wordCount) / wordsPerMinute))
  return `${minutes} min`
}

export const parseOptions: CheerioOptions = {
  xml: {
    xmlMode: false,
    recognizeSelfClosing: true,
    decodeEntities: false
  }
}

const HEADING_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

function handleNode(node: AnyNode, base: string): AnyNode | null {
  if (node.type === 'tag') {
    // image using relative urls shall be dropped
    if (node.tagName === 'img') {
      const { src } = node.attribs

      // this is not a resolvable image link
      if (!isLinkHttp(src) && !isLinkAbsolute(src)) return null
    }

    // toc should be dropped
    if ([node.attribs.class, node.attribs.id].some((item) => ['table-of-contents', 'toc'].includes(item))) return null

    // standard tags can be returned
    if (isHTMLTag(node.tagName) || isSVGTag(node.tagName) || isMathMLTag(node.tagName)) {
      // handing heading tags
      if (HEADING_TAGS.has(node.tagName)) {
        // remove heading id tabindex
        delete node.attribs.id
        delete node.attribs.tabindex

        // extract heading tags and remove anchor
        if (
          node.children.length === 1 &&
          node.children[0].type === 'tag' &&
          node.children[0].tagName === 'a' &&
          node.children[0].attribs.class === 'header-anchor'
        ) {
          // @ts-ignore
          node.children = (node.children[0].children[0] as unknown as Element).children
        }
      }

      if (node.tagName === 'div' && startsWith(node.attribs.class, 'language-')) {
        const pre = node.children.find(
          (childNode) =>
            childNode.type === 'tag' && childNode.tagName === 'pre' && startsWith(childNode.attribs.class, 'language-')
        )

        // we are sure this is a code fence
        if (pre) {
          node.attribs.class = node.attribs.class.replace(' line-numbers-mode', '')
          node.children = [pre]
        }
      }

      // remove `v-pre` attribute on code
      if (node.tagName === 'code' || node.tagName === 'pre') delete node.attribs['v-pre']

      node.children = handleNodes(node.children, base)

      return node
    }

    if (node.tagName === 'a') {
      node.attribs.href = `${removeEndingSlash(base)}${node.attribs.to}`
      node.attribs.target = '_blank'
      delete node.attribs.to

      node.children = handleNodes(node.children, base)

      return node
    }

    // other tags are considered as vue components and dropped
    return null
  }

  return node
}

function handleNodes(nodes: AnyNode[], base: string): AnyNode[] {
  return Array.isArray(nodes)
    ? nodes.map((node) => handleNode(node, base)).filter((node): node is AnyNode => node != null)
    : []
}

/**
 * 提取 Markdown 摘要。
 * 优先使用  frontmatter.excerpt，其次使用 `<!-- more -->`，否则自动截断正文纯文本。
 */
export async function extractMarkdownExcerpt(
  content: string,
  md: MarkdownRenderer,
  frontmatter: BlogPostFrontmatter,
  excerptLength = 300,
  base: string
): Promise<string> {
  if (frontmatter.excerpt) {
    return await md.renderAsync(frontmatter.excerpt)
  }

  const moreTagMatch = /<!--\s*more\s*-->/i.exec(content)
  if (moreTagMatch) {
    const excerptMarkdown = content.substring(0, moreTagMatch.index).trim()
    return await md.renderAsync(excerptMarkdown)
  }

  if (excerptLength > 0) {
    let autoExcerpt = ''
    const html = await md.renderAsync(content)
    const cheerio = load('', parseOptions)

    const rootNode = html ? cheerio.parseHTML(html) : []

    if (rootNode[0] && isH1Tag(rootNode[0])) {
      rootNode.shift()
    }

    for (const node of rootNode) {
      const resolvedNode = handleNode(node, base)

      if (resolvedNode) {
        autoExcerpt += cheerio.html(resolvedNode)
        if (autoExcerpt.length >= excerptLength) break
      }
    }

    return autoExcerpt
  }

  return ''
}

/**
 * 将路径分隔符统一为 Unix 风格。
 */
export function normalizeToUnixPath(path: string): string {
  return path.replace(/\\/g, '/')
}

export function isH1Tag(node: AnyNode): boolean {
  return node.type === 'tag' && node.tagName === 'h1'
}

/**
 * Determine a link is http link or not
 *
 * - http://github.com
 * - https://github.com
 * - //github.com
 */
export function isLinkHttp(link: string): boolean {
  return /^(https?:)?\/\//.test(link)
}

/**
 * Check if a value is a valid absolute url
 *
 * 检查值是否为有效的绝对 URL
 *
 * @param test - The value to test / 要测试的值
 *
 * @returns Whether the value is a valid absolute url / 值是否为有效的绝对 URL
 *
 * @example
 * ```ts
 * isLinkAbsolute('/path/to/page') // true
 * isLinkAbsolute('//example.com') // false
 * isLinkAbsolute('relative/path') // false
 * ```
 */
export function isLinkAbsolute(test: unknown): boolean {
  return startsWith(test, '/') && (test as string)[1] !== '/'
}

/**
 * Check if a value is starting with the given prefix
 *
 * 检查值是否以给定前缀开头
 *
 * @param str - The string to check / 要检查的字符串
 * @param prefix - The prefix to match / 要匹配的前缀
 *
 * @returns Whether the string starts with the prefix / 字符串是否以前缀开头
 *
 * @example
 * ```ts
 * startsWith('hello world', 'hello') // true
 * startsWith('hello world', 'world') // false
 * startsWith(123, 'hello') // false
 * ```
 */
export function startsWith(str: unknown, prefix: string): boolean {
  return isString(str) && str.startsWith(prefix)
}

/**
 * Check if a value is a string
 */
export function isString(val: unknown): val is string {
  return typeof val === 'string'
}

/**
 * Remove ending slash / from a string
 */
export function removeEndingSlash(str: string): string {
  return str.endsWith('/') ? str.slice(0, -1) : str
}
