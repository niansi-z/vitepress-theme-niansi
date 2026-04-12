/// <reference lib="esnext" />

import type { Plugin } from 'vite'
import type { SiteConfig } from 'vitepress'
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'

import * as path from 'node:path'
import * as fs from 'node:fs'

export function virtualTagPagesPlugin(): Plugin {
  // 存储所有语言的虚拟页面路径
  let tagIndexes: string[] = []
  let generatedTagSlugs: string[] = []
  const slugToTag = new Map<string, string>()
  // 存储标签基础目录（不带语言前缀）
  let baseTagDir = 'tags'

  return {
    name: 'vitepress:virtual-tag-pages',

    config(config) {
      const siteConfig = (config as any).vitepress as SiteConfig | undefined

      if (!siteConfig || !siteConfig.srcDir || !siteConfig.site) return

      const themeConfig = siteConfig.site.themeConfig as NiansiTheme.Config
      const tagPath = themeConfig?.tagPath ?? '/tags'
      // 清洗基础标签目录
      baseTagDir = tagPath.replace(/^\//, '').replace(/\/$/, '')

      const srcDir = siteConfig.srcDir || process.cwd()
      siteConfig.pages = siteConfig.pages || []

      // 重置所有存储变量
      tagIndexes = []
      generatedTagSlugs = []
      slugToTag.clear()

      // 1. 扫描所有文档，提取全局标签（全语言共用标签集合）
      const tagsSet = new Set<string>()
      function walk(dir: string) {
        try {
          for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const full = path.join(dir, entry.name)
            if (entry.isDirectory()) {
              walk(full)
            } else if (entry.isFile() && full.endsWith('.md')) {
              try {
                const content = fs.readFileSync(full, 'utf8')
                const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
                if (m) {
                  const fm = m[1]
                  const inlineArr = fm.match(/^\s*tags\s*:\s*\[([^\]]+)\]/m)
                  if (inlineArr) {
                    inlineArr[1].split(',').forEach((s) => {
                      const v = s.trim().replace(/^['\"]|['\"]$/g, '')
                      if (v) tagsSet.add(v)
                    })
                    continue
                  }
                  const inlineScalar = fm.match(/^\s*tags\s*:\s*(.+)$/m)
                  if (inlineScalar && !inlineScalar[1].trim().startsWith('-')) {
                    inlineScalar[1].split(',').forEach((s) => {
                      const v = s.trim().replace(/^['\"]|['\"]$/g, '')
                      if (v) tagsSet.add(v)
                    })
                    continue
                  }
                  const lines = fm.split(/\r?\n/)
                  for (let i = 0; i < lines.length; i++) {
                    if (/^\s*tags\s*:\s*$/.test(lines[i])) {
                      for (let j = i + 1; j < lines.length; j++) {
                        const mm = lines[j].match(/^\s*-\s*(.+)$/)
                        if (mm) {
                          const v = mm[1].trim().replace(/^['\"]|['\"]$/g, '')
                          if (v) tagsSet.add(v)
                        } else break
                      }
                      break
                    }
                  }
                }
              } catch (e) {}
            }
          }
        } catch (e) {}
      }
      walk(srcDir)

      // 2. 处理【默认根语言】标签页面
      const rootTagIndex = `${baseTagDir}/index.md`
      tagIndexes.push(rootTagIndex)
      if (!siteConfig.pages.includes(rootTagIndex)) {
        siteConfig.pages.push(rootTagIndex)
      }
      // 生成根语言标签详情页
      for (const tag of Array.from(tagsSet)) {
        const slug = String(tag).replace(/[\/\\]/g, '-')
        const file = `${baseTagDir}/${slug}.md`
        if (!siteConfig.pages.includes(file)) siteConfig.pages.push(file)
        generatedTagSlugs.push(slug)
        slugToTag.set(slug, tag)
      }

      // 3. 处理【多语言 locales】标签页面（核心改造点）
      const locales = siteConfig.site.locales || {}
      for (const key of Object.keys(locales)) {
        if (key === 'root') continue
        // 生成语言前缀的标签路径：zh/tags/index.md
        const localeTagIndex = `${key}/${baseTagDir}/index.md`
        tagIndexes.push(localeTagIndex)
        if (!siteConfig.pages.includes(localeTagIndex)) {
          siteConfig.pages.push(localeTagIndex)
        }
        // 生成当前语言的标签详情页
        for (const tag of Array.from(tagsSet)) {
          const slug = String(tag).replace(/[\/\\]/g, '-')
          const file = `${key}/${baseTagDir}/${slug}.md`
          if (!siteConfig.pages.includes(file)) siteConfig.pages.push(file)
        }
      }

      // 4. 构建 rollup input 入口
      const input: Record<string, string> = Object.fromEntries(
        (siteConfig.pages || []).map((file) => [
          (siteConfig.rewrites?.map?.[file] ?? file).replace(/[\/\\]/g, '_'),
          path.resolve(srcDir, file)
        ])
      )

      return {
        build: { rollupOptions: { input } }
      }
    },

    // 适配多语言路径解析
    resolveId(id) {
      // 匹配所有语言的标签首页
      if (tagIndexes.some((p) => id.endsWith(p))) {
        return id
      }
      // 匹配所有语言的标签详情页
      for (const slug of generatedTagSlugs) {
        if (tagIndexes.some((indexPath) => id.endsWith(`${indexPath.replace(/index\.md$/, '')}${slug}.md`))) {
          return id
        }
      }
    },

    // 适配多语言页面加载
    load(id) {
      // 加载标签列表页（支持所有语言）
      const matchedIndex = tagIndexes.find((p) => id.endsWith(p))
      if (matchedIndex) {
        return (
          '---\n' +
          'title: 标签\n' +
          'layout: page\n' +
          '---\n' +
          '<script setup>\n' +
          "import { NSTags } from 'vitepress-theme-niansi/theme'\n" +
          '</script>\n' +
          '\n' +
          '<NSTags />'
        )
      }

      // 加载标签详情页（支持所有语言）
      for (const slug of generatedTagSlugs) {
        const isMatch = tagIndexes.some((indexPath) => id.endsWith(`${indexPath.replace(/index\.md$/, '')}${slug}.md`))
        if (isMatch) {
          const origTag = slugToTag.get(slug) ?? slug
          const params = { tags: origTag }
          return (
            '__VP_PARAMS_START' +
            JSON.stringify(params) +
            '__VP_PARAMS_END__---\n' +
            'title: ' +
            JSON.stringify(String(origTag)) +
            '\n' +
            'layout: page\n' +
            '---\n' +
            '<script setup>\n' +
            "import { NSTagPosts } from 'vitepress-theme-niansi/theme'\n" +
            '</script>\n' +
            '<NSTagPosts />'
          )
        }
      }
    }
  }
}
