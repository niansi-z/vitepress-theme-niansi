import { defineConfig } from 'vitepress-theme-niansi'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Niansi',
  description: 'Docs powered by vitepress-theme-niansi',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/niansi-logo-mini.svg' }]],
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
  themeConfig: {
    author: '廿四',
    logo: '/niansi-logo.svg',
    sidebarBgImage: '/bg.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tags', link: '/tags/', activeMatch: '/tags/' },
      { text: 'Categories', link: '/categories/', activeMatch: '/categories/' },
      { text: 'Archives', link: '/archives/', activeMatch: '/archives/' },
      { text: '欠薪？', link: '/case-salary-delay' },
      { text: 'About', link: '/about' }
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/niansi-z/vitepress-theme-niansi'
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
  }
})
