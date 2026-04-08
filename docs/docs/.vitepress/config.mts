import { defineConfig } from 'vitepress-theme-niansi'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import {type HeadConfig, resolveSiteDataByRoute} from "vitepress";


const siteUrl = 'https://theme.niansi.com.cn'
const ogImage = new URL('/niansi-logo.jpg', siteUrl).href

export default defineConfig({
  title: 'Niansi',
  description: 'Docs powered by vitepress-theme-niansi',
  lang: 'zh_CN',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/niansi-logo-mini.svg' }]
  ],
  vite: {
    server: {
      port: 5179
    },
    plugins: [groupIconVitePlugin()]
  },
  markdown: {
    math: true,
    config(md: any) {
      md.use(groupIconMdPlugin)
    }
  },
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  sitemap: {
    hostname: siteUrl
  },
  themeConfig: {
    author: '廿四',
    logo: '/niansi-logo.svg',
    sidebarBgImage: '/bg.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
      { text: 'Tags', link: '/tags/', activeMatch: '/tags/' },
      { text: 'Categories', link: '/categories/', activeMatch: '/categories/' },
      { text: 'Archives', link: '/archives/', activeMatch: '/archives/' },
      { text: 'About', link: '/about' }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/niansi-z/vitepress-theme-niansi'
      },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path stroke-linejoin="round" d="M1 8h22v7H11v2H7.5v-2H1zm6.5 0v7m6-7v7" /><path d="M18 11v4M5 11v4m6-4v1m9.5-1v4" /></g></svg>'
        },
        link: 'https://www.npmjs.com/package/vitepress-theme-niansi'
      },
      { icon: 'vitepress', link: 'https://vitepress.dev' }
    ],
    outline: {
      level: [2, 4]
    },
    footer: {
      message: `本站采用 <a href="https://vitepress.dev">VitePress</a> 主题 <a href="https://github.com/niansi-z/vitepress-theme-niansi">niansi</a>`,
      copyright: '© 2024 廿四 保留部分权利。'
    },
    search: {
      provider: 'local'
    }
  },

  transformPageData: (pageData, ctx) => {
    const url = new URL(pageData.relativePath.replace(/(?:(^|\/)index)?\.md$/, '$1'), siteUrl).href
    const site = resolveSiteDataByRoute(ctx.siteConfig.site, pageData.relativePath)
    const title = pageData.title ? `${pageData.title} | Niansi` : site.title
    const description = pageData.description || site.description

    ;((pageData.frontmatter.head ??= []) as HeadConfig[]).push(
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:locale', content: 'zh_CN' }],
      ['meta', { property: 'og:site_name', content: 'VitePress-Theme-Niansi' }],
      ['meta', { property: 'og:image', content: ogImage }],
      ['meta', { property: 'og:image:secure_url', content: ogImage }],
      ['meta', { property: 'og:image:type', content: 'image/jpeg' }],
      ['meta', { property: 'og:image:width', content: '1280' }],
      ['meta', { property: 'og:image:height', content: '640' }],
      ['meta', { property: 'og:image:alt', content: 'VitePress-Theme-Niansi' }],
      ['link', { rel: 'canonical', href: url }]
    )
  }
})
