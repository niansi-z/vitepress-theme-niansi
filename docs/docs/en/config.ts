import { defineAdditionalConfig } from 'vitepress-theme-niansi'

export default defineAdditionalConfig({
  description: 'A VitePress theme with tons of features✨',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/en' },
      { text: 'Get Started', link: '/en/get-started/' },
      { text: 'Guide', link: '/en/guide/' },
      { text: 'Config', link: '/en/config/' }
    ],

    sidebar: {
      '/en/get-started/': [
        { text: 'Get Started', link: '/en/get-started/' },
        { text: 'Runtime Setup', link: '/en/get-started/env' },
        { text: 'Create Project', link: '/en/get-started/create' },
        { text: 'Project Command', link: '/en/get-started/command' },
        { text: 'Project Content', link: '/en/get-started/content' },
        { text: 'Project Config', link: '/en/get-started/config' },
        { text: 'Project Structure', link: '/en/get-started/structure' },
        { text: 'Project Deployment', link: '/en/get-started/deploy' }
      ],
      '/en/guide/': [
        {
          text: 'Theme intro',
          items: [
            { text: 'Theme intro', link: '/en/guide/intro/intro' },
            { text: 'Install / Usage', link: '/en/guide/intro/install' },
            { text: 'Markdown', link: '/en/guide/intro/markdown' }
          ]
        },
        {
          text: 'Markdown',
          items: [
            { text: 'Inline Rule', link: '/en/guide/markdown/inline-rule' },
            { text: 'Superscript and Subscript', link: '/en/guide/markdown/sup-sub' },
            { text: 'Mark', link: '/en/guide/markdown/mark' },
            { text: 'Spoiler', link: '/en/guide/markdown/spoiler' },
            { text: 'Math', link: '/en/guide/markdown/math' },
            { text: 'Footnote', link: '/en/guide/markdown/footnote' },
            { text: 'Image', link: '/en/guide/markdown/image' },
            { text: 'Task List', link: '/en/guide/markdown/tasklist' },
            { text: 'Code Block', link: '/en/guide/markdown/code' },
            { text: 'Code Tabs', link: '/en/guide/markdown/tabs' },
            { text: 'Hint container', link: '/en/guide/markdown/containers' },
            { text: 'GFM alert', link: '/en/guide/markdown/alert' },
            { text: 'Include Files', link: '/en/guide/markdown/include' }
          ]
        },
        {
          text: 'Blog',
          items: [
            { text: 'Blog Intro', link: '/guide/blog/intro' },
            { text: 'Category and tags', link: '/guide/blog/category-and-tags' },
            { text: 'Archives', link: '/guide/blog/archives' },
            { text: 'Blog Page Path', link: '/guide/blog/path' }
          ]
        }
      ],
      '/en/config/': [
        { text: 'Config Intro', link: '/en/config/intro' },
        { text: 'I18n', link: '/en/config/i18n' },
        { text: 'Frontmatter', link: '/en/config/frontmatter' },
        { text: 'Theme Config', link: '/en/config/theme-config' },
        { text: 'Comment Plugin Config', link: '/en/config/comment-plugin-config' }
      ]
    },

    footer: {
      message: `Theme by <a href="https://github.com/niansi-z/vitepress-theme-niansi">VitePress Theme Niansi</a>`,
      copyright: 'Copyright © 2024 廿四。'
    },

    recentlyUpdated: 'Recently Updated',
    trendingTags: 'Trending Tags',
    outlineTitle: 'On this page',
    hamburgerHome: 'Home',
    postedMeta: 'Posted',
    lastUpdatedText: 'Updated',
    authorMeta: 'By',
    readMeta: 'Read',
    categoriesMeta: 'post',
    docFooter: {
      next: 'Next page',
      prev: 'Previous page'
    }
  }
})
