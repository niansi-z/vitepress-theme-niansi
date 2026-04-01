import { defineConfig } from 'vitepress-theme-niansi'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

export default defineConfig({
  title: 'Niansi Docs',
  description: 'Docs powered by vitepress-theme-niansi',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/niansi-logo-mini.svg' }]],
  markdown: {
    math: true,
    lineNumbers: true,
    config(md: any) {
      md.use(groupIconMdPlugin)
    }
  },
  vite: {
    server: {
      port: 9957
    },
    plugins: [groupIconVitePlugin()]
  },
  // ignoreDeadLinks: true,
  themeConfig: {
    logo: '/niansi-logo.svg',

    sidebarBgImage: '/bg.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'Api', link: '/api-examples' },
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
      { icon: 'gitee', link: 'https://gitee.com/nian_si' },
      { icon: 'vitepress', link: 'https://vitepress.dev' }
    ],

    footer: {
      message: `本站采用 <a href="https://vitepress.dev">VitePress</a> 主题 <a href="https://github.com/niansi-z/vitepress-theme-niansi">niansi</a>`,
      copyright: '© 2024 廿四 保留部分权利。'
    },
    outline: {
      level: [2, 3]
    },
    search: {
      provider: 'local'
    },

    recentlyUpdated: '最近更新',
    trendingTags: '热门标签',
    outlineTitle: '页面导航',
    hamburgerHome: '首页',
    postedMeta: '发表于',
    lastUpdatedText: '更新于',
    authorMeta: '作者',
    readMeta: '阅读',
    categoriesMeta: '篇文章',
    docFooter: {
      next: '下一篇',
      prev: '上一篇'
    }

    // excerptLength: 0
  }
})
