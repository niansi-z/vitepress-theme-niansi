import fs from 'node:fs'
import path from 'node:path'
import type { MarkdownItAsync } from 'markdown-it-async'
import type { HeadConfig, UserConfig } from 'vitepress'
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'
import type { MarkdownPluginOptions } from '../../types'
import { applyMarkdownPlugins } from './markdown/markdown'
import { virtualTagPagesPlugin } from './plugins/virtualTagPlugin'
import { virtualCategoriesPlugin } from './plugins/virtualCategoriesPlugin'
import { virtualArchivesPlugin } from './plugins/virtualArchivesPlugin'
import { sitemapXsl } from './sitemap.xsl'

export type AdditionalConfig<ThemeConfig = any> = LocaleSpecificConfig<ThemeConfig>

type DeepPartial<T> =
  T extends Record<string, any>
    ? T extends Date | RegExp | Function | ReadonlyMap<any, any> | ReadonlySet<any> | ReadonlyArray<any>
      ? T
      : { [P in keyof T]?: DeepPartial<T[P]> }
    : T

export interface LocaleSpecificConfig<ThemeConfig = any> {
  lang?: string
  dir?: string
  title?: string
  titleTemplate?: string | boolean
  description?: string
  head?: HeadConfig[]
  themeConfig?: DeepPartial<ThemeConfig>
}

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
  const userMdConfig = (config as Record<string, any>).markdown?.config as ((md: MarkdownItAsync) => void) | undefined
  const userMdPlugins = (config as Record<string, any>).markdown?.plugins as MarkdownPluginOptions | undefined
  const userMdImage = (config as Record<string, any>).markdown?.image as { lazyLoading?: boolean } | undefined

  const themeMarkdown = {
    markdown: {
      config: async (md: MarkdownItAsync) => {
        await applyMarkdownPlugins(md, userMdPlugins || {}, userMdImage)

        // run user's markdown config
        userMdConfig?.(md)
      }
    }
  }

  // remove user's markdown.config to avoid duplicate invocation after merge
  if ((config as Record<string, any>).markdown?.config) {
    delete (config as Record<string, any>).markdown.config
  }
  if ((config as Record<string, any>).markdown?.plugins) {
    delete (config as Record<string, any>).markdown.plugins
  }

  // strip vp-icons.css injected by VitePress core
  const themeHooks = {
    transformHtml(html: string) {
      return html.replace(/\s*<link[^>]*href="[^"]*vp-icons\.css"[^>]*>\s*/, '')
    },
    async buildEnd(siteConfig: { outDir: string; userConfig: { sitemap?: { hostname?: string } } }) {
      const iconsFile = path.join(siteConfig.outDir, 'vp-icons.css')
      if (fs.existsSync(iconsFile)) {
        fs.unlinkSync(iconsFile)
      }

      // generate sitemap.xsl if sitemap is configured
      if (siteConfig.userConfig?.sitemap?.hostname) {
        const xslFile = path.join(siteConfig.outDir, 'sitemap.xsl')
        fs.writeFileSync(xslFile, sitemapXsl)

        // wait for sitemap.xml to be fully written (stream may not be flushed yet)
        const sitemapFile = path.join(siteConfig.outDir, 'sitemap.xml')
        await new Promise<void>((resolve) => {
          const check = () => {
            if (fs.existsSync(sitemapFile)) {
              // give extra time for stream to flush
              setTimeout(resolve, 100)
            } else {
              setTimeout(check, 50)
            }
          }
          check()
        })

        if (fs.existsSync(sitemapFile)) {
          let content = fs.readFileSync(sitemapFile, 'utf-8')
          content = content.replace(
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>'
          )
          fs.writeFileSync(sitemapFile, content)
        }
      }
    }
  }

  // theme's sitemap config: provide virtual page base paths for exclusion
  // user's transformItems will be called after theme's base filtering
  const themeSitemap = {
    sitemap: {
      transformItems: (items: { url: string }[]) => {
        const themeConfig = (config as Record<string, any>)?.themeConfig as NiansiTheme.Config | undefined
        const tagPath = themeConfig?.tagPath ?? '/tags'
        const categoryPath = themeConfig?.categoryPath ?? '/categories'
        const archivesPath = themeConfig?.archivesPath ?? '/archives'

        // normalize paths (remove leading/ending slashes)
        const normalizePath = (p: string) => p.replace(/^\/|\/$/g, '')

        const tag = normalizePath(tagPath)
        const category = normalizePath(categoryPath)
        const archives = normalizePath(archivesPath)

        const isLocale = (s: string) => /^[a-z]{2}(-[A-Z]{2})?$/.test(s)

        return items.filter((item) => {
          const segments = item.url.split('/').filter(Boolean)

          const hit = [tag, category, archives].some((base) => {
            // tags/xxx
            if (segments[0] === base) return true

            // en/tags/xxx
            return segments.length >= 2 && isLocale(segments[0]) && segments[1] === base
          })

          return !hit
        })
      }
    }
  }

  // merge both vite and markdown additions into the user config
  const merged = mergeConfig(
    config as Record<string, any>,
    mergeConfig(themeVite, mergeConfig(themeMarkdown, mergeConfig(themeHooks, themeSitemap, true), true), true),
    true
  )
  return merged as unknown as UserConfig<ThemeConfig>
}

export function defineAdditionalConfig<ThemeConfig = NiansiTheme.Config>(
  config: AdditionalConfig<NoInfer<ThemeConfig>>
) {
  return config
}
