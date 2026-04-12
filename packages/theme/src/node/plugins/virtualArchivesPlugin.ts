/// <reference lib="esnext" />

import type { Plugin } from 'vite'
import type { SiteConfig } from 'vitepress'
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'

import * as path from 'node:path'

export function virtualArchivesPlugin(): Plugin {
  // 支持多个虚拟页面
  let archivesIndexes: string[] = []

  return {
    name: 'vitepress:virtual-archives-page',

    config(config) {
      const siteConfig = (config as any).vitepress as SiteConfig | undefined

      if (!siteConfig || !siteConfig.srcDir || !siteConfig.site.themeConfig) return

      const themeConfig = siteConfig.site.themeConfig as NiansiTheme.Config
      const archivesPath = themeConfig?.archivesPath ?? '/archives'

      const archivesDir = archivesPath.replace(/^\//, '').replace(/\/$/, '')

      const srcDir = siteConfig.srcDir
      siteConfig.pages = siteConfig.pages || []

      archivesIndexes = []

      // root（默认语言）
      const rootIndex = `${archivesDir}/index.md`
      archivesIndexes.push(rootIndex)

      if (!siteConfig.pages.includes(rootIndex)) {
        siteConfig.pages.push(rootIndex)
      }

      // 多语言 locales
      const locales = siteConfig.site.locales || {}

      for (const key of Object.keys(locales)) {
        if (key === 'root') continue

        const localeIndex = `${key}/${archivesDir}/index.md`
        archivesIndexes.push(localeIndex)

        if (!siteConfig.pages.includes(localeIndex)) {
          siteConfig.pages.push(localeIndex)
        }
      }

      // 构建 input（必须包含新增页面）
      const input: Record<string, string> = Object.fromEntries(
        siteConfig.pages.map((file) => [
          (siteConfig.rewrites?.map?.[file] ?? file).replace(/[\/\\]/g, '_'),
          path.resolve(srcDir, file)
        ])
      )

      return {
        build: {
          rollupOptions: { input }
        }
      }
    },

    resolveId(id) {
      // 支持多个虚拟路径
      if (archivesIndexes.some((p) => id.endsWith(p))) {
        return id
      }
    },

    load(id) {
      if (archivesIndexes.some((p) => id.endsWith(p))) {
        return (
          '---\n' +
          `title: 归档\n` +
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
