import { defineAdditionalConfig } from 'vitepress-theme-niansi'

export default defineAdditionalConfig({
  description: '一个具有强大功能的 VitePress 主题✨',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '快速上手', link: '/get-started/' },
      { text: '指南', link: '/guide/' },
      { text: '配置', link: '/config/' },
      { text: '常见问题', link: '/faq' }
    ],

    sidebar: {
      '/get-started/': [
        { text: '快速上手', link: '/get-started/' },
        { text: '准备运行环境', link: '/get-started/env' },
        { text: '创建项目', link: '/get-started/create' },
        { text: '项目命令', link: '/get-started/command' },
        { text: '项目内容', link: '/get-started/content' },
        { text: '配置项目', link: '/get-started/config' },
        { text: '项目结构', link: '/get-started/structure' },
        { text: '部署项目', link: '/get-started/deploy' }
      ],
      '/guide/': [
        {
          text: '主题介绍',
          items: [
            { text: '主题介绍', link: '/guide/intro/intro' },
            { text: '安装/使用', link: '/guide/intro/install' },
            { text: 'Markdown', link: '/guide/intro/markdown' }
          ]
        },
        {
          text: 'Markdown',
          items: [
            { text: 'Inline Rule', link: '/guide/markdown/inline-rule' },
            { text: '上下角标', link: '/guide/markdown/sup-sub' },
            { text: '标记', link: '/guide/markdown/mark' },
            { text: '剧透', link: '/guide/markdown/spoiler' },
            { text: '数学公式', link: '/guide/markdown/math' },
            { text: '脚注', link: '/guide/markdown/footnote' },
            { text: '图片', link: '/guide/markdown/image' },
            { text: '任务列表', link: '/guide/markdown/tasklist' },
            { text: '代码块', link: '/guide/markdown/code' },
            { text: '代码块分组', link: '/guide/markdown/tabs' },
            { text: '提示容器', link: '/guide/markdown/containers' },
            { text: 'GFM 警告', link: '/guide/markdown/alert' },
            { text: '导入文件', link: '/guide/markdown/include' },
            { text: '预览', link: '/guide/markdown/preview' }
          ]
        },
        {
          text: '博客',
          items: [
            { text: '博客功能介绍', link: '/guide/blog/intro' },
            { text: '分类与标签', link: '/guide/blog/category-and-tags' },
            { text: '归档', link: '/guide/blog/archives' },
            { text: '博客页面路径', link: '/guide/blog/path' }
          ]
        }
      ],
      '/config/': [
        { text: '配置介绍', link: '/config/intro' },
        { text: '多语言', link: '/config/i18n' },
        { text: 'Frontmatter', link: '/config/frontmatter' },
        { text: '主题配置', link: '/config/theme-config' },
        { text: '评论插件配置', link: '/config/comment-plugin-config' }
      ]
    },

    footer: {
      message: `使用 <a href="https://github.com/niansi-z/vitepress-theme-niansi">VitePress Theme Niansi</a> 主题`,
      copyright: '版权所有 © 2024 廿四。'
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
  }
})
