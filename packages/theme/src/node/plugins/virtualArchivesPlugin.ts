/// <reference lib="esnext" />

import type { Plugin } from 'vite'
import type { SiteConfig } from 'vitepress'
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'

import * as path from 'node:path'

export function virtualArchivesPlugin(): Plugin {
  let archivesIndex = 'archives/index.md'

  return {
    name: 'vitepress:virtual-archives-page',

    config(config) {
      const siteConfig = (config as any).vitepress as SiteConfig | undefined

      // if no site config (we are building the theme package itself), skip
      if (!siteConfig || !siteConfig.srcDir || !siteConfig.site.themeConfig) return

      const themeConfig = siteConfig.site.themeConfig as NiansiTheme.Config

      const archivesPath = themeConfig?.archivesPath ?? '/archives'

      const archivesDir = archivesPath.replace(/^\//, '').replace(/\/$/, '')
      archivesIndex = archivesDir + '/index.md'

      // ensure pages array exists
      siteConfig.pages = siteConfig.pages || []

      const srcDir = siteConfig.srcDir

      // register archives index
      if (!siteConfig.pages.includes(archivesIndex)) siteConfig.pages.push(archivesIndex)

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
      if (id.endsWith(archivesIndex)) return id
    },

    load(id) {
      if (id.endsWith(archivesIndex)) {
        return (
          '---\n' +
          'title: 归档\n' +
          'layout: page\n' +
          '---\n' +
          '<script setup>\n' +
          "import { NSArchives } from 'vitepress-theme-niansi/theme'\n" +
          '</script>\n' +
          '\n' +
          '<NSArchives />'
        )
      }
    }
  }
}
