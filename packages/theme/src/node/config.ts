import fs from 'node:fs'
import path from 'node:path'
import type Token from 'markdown-it/lib/token.mjs'
import type { MarkdownItAsync } from 'markdown-it-async'
import type { UserConfig } from 'vitepress'
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'
import markdownItFootnote from 'markdown-it-footnote'

import { virtualTagPagesPlugin } from './plugins/virtualTagPlugin'
import { virtualCategoriesPlugin } from './plugins/virtualCategoriesPlugin'
import { virtualArchivesPlugin } from './plugins/virtualArchivesPlugin'
import { EXTERNAL_URL_RE } from './shared'

function isObject(v: unknown): v is Record<string, any> {
  return v !== null && typeof v === 'object' && !Array.isArray(v)
}

function mergeViteConfig(a: Record<string, any>, b: Record<string, any>) {
  const merged: Record<string, any> = { ...a }
  for (const key in b) {
    const val = b[key]
    if (val == null) continue
    const existing = merged[key]

    if (Array.isArray(existing) && Array.isArray(val)) {
      if (key === 'plugins') {
        const mergedPlugins: any[] = [...existing]
        for (const p of val) {
          const name = p && p.name
          if (name == null || !mergedPlugins.some((mp) => mp && mp.name === name)) {
            mergedPlugins.push(p)
          }
        }
        merged[key] = mergedPlugins
      } else {
        merged[key] = [...existing, ...val]
      }
      continue
    }

    if (isObject(existing) && isObject(val)) {
      merged[key] = mergeViteConfig(existing, val)
      continue
    }

    merged[key] = val
  }
  return merged
}

export function mergeConfig(a: Record<string, any>, b: Record<string, any>, isRoot = true): Record<string, any> {
  const merged: Record<string, any> = { ...a }
  for (const key in b) {
    const value = b[key]
    if (value == null) continue
    const existing = merged[key]

    if (Array.isArray(existing) && Array.isArray(value)) {
      merged[key] = [...existing, ...value]
      continue
    }

    if (isObject(existing) && isObject(value)) {
      if (isRoot && key === 'vite') {
        merged[key] = mergeViteConfig(existing, value)
      } else {
        merged[key] = mergeConfig(existing, value, false)
      }
      continue
    }

    merged[key] = value
  }
  return merged
}

export function defineConfig<ThemeConfig = NiansiTheme.Config>(
  config: UserConfig<ThemeConfig>
): UserConfig<ThemeConfig> {
  // merge theme-provided vite additions (virtual tag pages) using the
  // same merging strategy as VitePress so arrays/objects behave predictably
  const themeVite = {
    vite: {
      ssr: {
        noExternal: ['vitepress-theme-niansi', '@docsearch/css']
      },
      plugins: [virtualTagPagesPlugin(), virtualCategoriesPlugin(), virtualArchivesPlugin()]
    }
  }

  // Combine theme's markdown config with the user's so both run.
  // `markdown.config` is a function — mergeConfig would overwrite one with
  // the other, so we compose them manually here.
  const userMdConfig = (config as Record<string, any>).markdown?.config as
    | ((md: MarkdownItAsync) => void)
    | undefined

  const themeMarkdown = {
    markdown: {
      config: (md: MarkdownItAsync) => {
        md.use(markdownItFootnote)

        const imageRule = md.renderer.rules.image!
        md.renderer.rules.image = (tokens: Token[], idx: number, options, env, self) => {
          const token = tokens[idx]
          let url = token.attrGet('src')
          if (url && !EXTERNAL_URL_RE.test(url)) {
            if (!/^\.?\//.test(url)) url = './' + url
            token.attrSet('src', decodeURIComponent(url))
          }
          token.attrSet('loading', 'lazy')
          token.attrSet('data-fancybox', 'gallery')
          return imageRule(tokens, idx, options, env, self)
        }

        // run user's markdown config
        userMdConfig?.(md)
      }
    }
  }

  // remove user's markdown.config to avoid duplicate invocation after merge
  if ((config as Record<string, any>).markdown?.config) {
    delete (config as Record<string, any>).markdown.config
  }

  // strip vp-icons.css injected by VitePress core
  const themeHooks = {
    transformHtml(html: string) {
      return html.replace(
        /\s*<link[^>]*href="[^"]*vp-icons\.css"[^>]*>\s*/,
        ''
      )
    },
    buildEnd(siteConfig: { outDir: string }) {
      const iconsFile = path.join(siteConfig.outDir, 'vp-icons.css')
      if (fs.existsSync(iconsFile)) {
        fs.unlinkSync(iconsFile)
      }
    }
  }

  // merge both vite and markdown additions into the user config
  const merged = mergeConfig(
    config as Record<string, any>,
    mergeConfig(themeVite, mergeConfig(themeMarkdown, themeHooks, true), true),
    true
  )
  return merged as unknown as UserConfig<ThemeConfig>
}
