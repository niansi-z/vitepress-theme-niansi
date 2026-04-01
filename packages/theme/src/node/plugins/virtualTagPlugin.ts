/// <reference lib="esnext" />

import type { Plugin } from 'vite'
import type { SiteConfig } from 'vitepress'
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'

import * as path from 'node:path'
import * as fs from 'node:fs'

export function virtualTagPagesPlugin(): Plugin {
  let tagIndex = 'tags/index.md'
  let tagPage = 'tags/[tags].md'
  // list of concrete tag slugs we generated
  let generatedTagSlugs: string[] = []
  // map slug -> original tag value
  const slugToTag = new Map<string, string>()

  return {
    name: 'vitepress:virtual-tag-pages',

    config(config) {
      const siteConfig = (config as any).vitepress as SiteConfig | undefined

      // if no site config (we are building the theme package itself), skip
      if (!siteConfig || !siteConfig.srcDir || !siteConfig.site) return

      const themeConfig = siteConfig.site.themeConfig as NiansiTheme.Config

      const tagPath = themeConfig?.tagPath ?? '/tags'

      const tagDir = tagPath.replace(/^\//, '').replace(/\/$/, '')
      tagIndex = tagDir + '/index.md'
      tagPage = tagDir + '/[tags].md'
      void tagPage

      // ensure pages array exists
      siteConfig.pages = siteConfig.pages || []

      // scan site's srcDir for markdown and collect tags
      const srcDir = siteConfig.srcDir || process.cwd()
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
                  // parse simple frontmatter tags formats
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

      // register tag index
      if (!siteConfig.pages.includes(tagIndex)) siteConfig.pages.push(tagIndex)

      // register a concrete page for each tag
      generatedTagSlugs = []
      slugToTag.clear()
      for (const tag of Array.from(tagsSet)) {
        const slug = String(tag).replace(/[\/\\]/g, '-')
        const file = `${tagDir}/${slug}.md`
        if (!siteConfig.pages.includes(file)) siteConfig.pages.push(file)
        generatedTagSlugs.push(slug)
        slugToTag.set(slug, tag)
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
      if (id.endsWith(tagIndex)) return id
      for (const slug of generatedTagSlugs) {
        if (id.endsWith(`${tagIndex.replace(/index\.md$/, '')}${slug}.md`)) return id
      }
    },

    load(id) {
      if (id.endsWith(tagIndex)) {
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

      for (const slug of generatedTagSlugs) {
        const expectedSuffix = `${tagIndex.replace(/index\.md$/, '')}${slug}.md`
        if (id.endsWith(expectedSuffix)) {
          const origTag = slugToTag.get(slug) ?? slug
          const params = { tags: origTag }
          // prefix with VP params so VitePress populates pageData.params
          return (
            '__VP_PARAMS_START' +
            JSON.stringify(params) +
            '__VP_PARAMS_END__---\n' +
            'title: ' +
            JSON.stringify(String(origTag)) +
            '\n' +
            'layout: page\n' +
            '---\n' +
            '\n' +
            '<script setup>\n' +
            "import { NSTagPosts } from 'vitepress-theme-niansi/theme'\n" +
            '</script>\n' +
            '\n' +
            '<NSTagPosts />'
          )
        }
      }
    }
  }
}
