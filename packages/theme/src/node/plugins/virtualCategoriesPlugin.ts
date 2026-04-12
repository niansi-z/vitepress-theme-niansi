/// <reference lib="esnext" />

import type { Plugin } from 'vite'
import type { SiteConfig } from 'vitepress'
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'

import * as path from 'node:path'
import * as fs from 'node:fs'

export function virtualCategoriesPlugin(): Plugin {
  // 存储所有语言的虚拟页面路径
  let categoriesIndexes: string[] = []
  // list of concrete category slugs we generated
  let generatedCategoriesSlugs: string[] = []
  // map slug -> original category value
  const slugToCategory = new Map<string, string>()
  // 基础分类目录（不带语言前缀）
  let baseCategoriesDir = 'categories'

  return {
    name: 'vitepress:virtual-categories-pages',

    config(config) {
      const siteConfig = (config as any).vitepress as SiteConfig | undefined

      // if no site config (we are building the theme package itself), skip
      if (!siteConfig || !siteConfig.srcDir || !siteConfig.site) return

      const themeConfig = siteConfig.site.themeConfig as NiansiTheme.Config
      const categoryPath = themeConfig?.categoryPath ?? '/categories'

      // 清洗基础分类目录
      baseCategoriesDir = categoryPath.replace(/^\//, '').replace(/\/$/, '')

      const srcDir = siteConfig.srcDir || process.cwd()
      siteConfig.pages = siteConfig.pages || []

      // 重置所有存储变量
      categoriesIndexes = []
      generatedCategoriesSlugs = []
      slugToCategory.clear()

      // scan site's srcDir for markdown and collect categories
      const categoriesSet = new Set<string>()

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
                  // parse simple frontmatter categories formats
                  const inlineArr = fm.match(/^\s*categories\s*:\s*\[([^\]]+)\]/m)
                  if (inlineArr) {
                    inlineArr[1].split(',').forEach((s) => {
                      const v = s.trim().replace(/^['\"]|['\"]$/g, '')
                      if (v) categoriesSet.add(v)
                    })
                    continue
                  }
                  const inlineScalar = fm.match(/^\s*categories\s*:\s*(.+)$/m)
                  if (inlineScalar && !inlineScalar[1].trim().startsWith('-')) {
                    inlineScalar[1].split(',').forEach((s) => {
                      const v = s.trim().replace(/^['\"]|['\"]$/g, '')
                      if (v) categoriesSet.add(v)
                    })
                    continue
                  }
                  const lines = fm.split(/\r?\n/)
                  for (let i = 0; i < lines.length; i++) {
                    if (/^\s*categories\s*:\s*$/.test(lines[i])) {
                      for (let j = i + 1; j < lines.length; j++) {
                        const mm = lines[j].match(/^\s*-\s*(.+)$/)
                        if (mm) {
                          const v = mm[1].trim().replace(/^['\"]|['\"]$/g, '')
                          if (v) categoriesSet.add(v)
                        } else break
                      }
                    }
                  }
                }
              } catch (e) {
                // ignore read errors
              }
            }
          }
        } catch (e) {
          // ignore
        }
      }

      walk(srcDir)

      // 1. 处理【默认根语言】分类页面
      const rootCategoriesIndex = `${baseCategoriesDir}/index.md`
      categoriesIndexes.push(rootCategoriesIndex)
      if (!siteConfig.pages.includes(rootCategoriesIndex)) {
        siteConfig.pages.push(rootCategoriesIndex)
      }
      // 生成根语言分类详情页
      for (const category of Array.from(categoriesSet)) {
        const slug = String(category).replace(/[\/\\]/g, '-')
        const file = `${baseCategoriesDir}/${slug}.md`
        if (!siteConfig.pages.includes(file)) siteConfig.pages.push(file)
        generatedCategoriesSlugs.push(slug)
        slugToCategory.set(slug, category)
      }

      // 2. 处理【多语言 locales】分类页面
      const locales = siteConfig.site.locales || {}
      for (const key of Object.keys(locales)) {
        if (key === 'root') continue
        // 生成带语言前缀的分类路径：zh/categories/index.md
        const localeCategoriesIndex = `${key}/${baseCategoriesDir}/index.md`
        categoriesIndexes.push(localeCategoriesIndex)
        if (!siteConfig.pages.includes(localeCategoriesIndex)) {
          siteConfig.pages.push(localeCategoriesIndex)
        }
        // 生成当前语言的分类详情页
        for (const category of Array.from(categoriesSet)) {
          const slug = String(category).replace(/[\/\\]/g, '-')
          const file = `${key}/${baseCategoriesDir}/${slug}.md`
          if (!siteConfig.pages.includes(file)) siteConfig.pages.push(file)
        }
      }

      // build input
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
      // 匹配所有语言的分类首页
      if (categoriesIndexes.some((p) => id.endsWith(p))) {
        return id
      }
      // 匹配所有语言的分类详情页
      for (const slug of generatedCategoriesSlugs) {
        if (categoriesIndexes.some((indexPath) => id.endsWith(`${indexPath.replace(/index\.md$/, '')}${slug}.md`))) {
          return id
        }
      }
    },

    // 适配多语言页面加载
    load(id) {
      // 加载分类列表页（支持所有语言）
      const matchedIndex = categoriesIndexes.find((p) => id.endsWith(p))
      if (matchedIndex) {
        return (
          '---\n' +
          'title: 分类\n' +
          'layout: page\n' +
          '---\n' +
          '<script setup>\n' +
          "import { NSCategories } from 'vitepress-theme-niansi/theme'\n" +
          '</script>\n' +
          '\n' +
          '<NSCategories />'
        )
      }

      // 加载分类详情页（支持所有语言）
      for (const slug of generatedCategoriesSlugs) {
        const isMatch = categoriesIndexes.some((indexPath) =>
          id.endsWith(`${indexPath.replace(/index\.md$/, '')}${slug}.md`)
        )
        if (isMatch) {
          const origCategory = slugToCategory.get(slug)
          const params = { categories: origCategory }
          // prefix with VP params so VitePress populates pageData.params
          return (
            '__VP_PARAMS_START' +
            JSON.stringify(params) +
            '__VP_PARAMS_END__---\n' +
            'title: ' +
            JSON.stringify(String(origCategory)) +
            '\n' +
            'layout: page\n' +
            '---\n' +
            '<script setup>\n' +
            "import { NSCategoriesPosts } from 'vitepress-theme-niansi/theme'\n" +
            '</script>\n' +
            '\n' +
            '<NSCategoriesPosts />'
          )
        }
      }
    }
  }
}
