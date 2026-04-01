/// <reference lib="esnext" />

import type { Plugin } from 'vite'
import type { SiteConfig } from 'vitepress'
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'

import * as path from 'node:path'
import * as fs from 'node:fs'

export function virtualCategoriesPlugin(): Plugin {
  let categoriesIndex = 'categories/index.md'
  let categoriesPage = 'categories/[categories].md'
  // list of concrete category slugs we generated
  let generatedCategoriesSlugs: string[] = []
  // map slug -> original category value
  const slugToCategory = new Map<string, string>()

  return {
    name: 'vitepress:virtual-categories-pages',

    config(config) {
      const siteConfig = (config as any).vitepress as SiteConfig | undefined

      // if no site config (we are building the theme package itself), skip
      if (!siteConfig || !siteConfig.srcDir || !siteConfig.site) return

      const themeConfig = siteConfig.site.themeConfig as NiansiTheme.Config

      const categoryPath = themeConfig?.categoryPath ?? '/categories'

      const categoriesDir = categoryPath.replace(/^\//, '').replace(/\/$/, '')
      categoriesIndex = categoriesDir + '/index.md'
      categoriesPage = categoriesDir + '/[categories].md'
      void categoriesPage

      // ensure pages array exists
      siteConfig.pages = siteConfig.pages || []

      // scan site's srcDir for markdown and collect categories
      const srcDir = siteConfig.srcDir || process.cwd()
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

      // register categories index
      if (!siteConfig.pages.includes(categoriesIndex)) siteConfig.pages.push(categoriesIndex)

      // register a concrete page for each category
      generatedCategoriesSlugs = []
      slugToCategory.clear()
      for (const categories of Array.from(categoriesSet)) {
        const slug = String(categories).replace(/[\/\\]/g, '-')
        const file = `${categoriesDir}/${slug}.md`
        if (!siteConfig.pages.includes(file)) siteConfig.pages.push(file)
        generatedCategoriesSlugs.push(slug)
        slugToCategory.set(slug, categories)
      }

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

    resolveId(id) {
      if (id.endsWith(categoriesIndex)) return id
      for (const slug of generatedCategoriesSlugs) {
        if (id.endsWith(`${categoriesIndex.replace(/index\.md$/, '')}${slug}.md`)) return id
      }
    },

    load(id) {
      if (id.endsWith(categoriesIndex)) {
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

      for (const slug of generatedCategoriesSlugs) {
        const expectedSuffix = `${categoriesIndex.replace(/index\.md$/, '')}${slug}.md`
        if (id.endsWith(expectedSuffix)) {
          const origCategories = slugToCategory.get(slug)
          const params = { categories: origCategories }
          // prefix with VP params so VitePress populates pageData.params
          return (
            '__VP_PARAMS_START' +
            JSON.stringify(params) +
            '__VP_PARAMS_END__---\n' +
            'title: ' +
            JSON.stringify(String(origCategories)) +
            '\n' +
            'layout: page\n' +
            '---\n' +
            '\n' +
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
