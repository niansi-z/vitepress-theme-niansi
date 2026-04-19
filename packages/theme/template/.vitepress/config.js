import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({<% if (srcDir) { %>
  srcDir: <%= srcDir %>,
  <% } %>
  title: <%= title %>,
  description: <%= description %><% if (defaultTheme) { %>,
  markdown: {
    plugins: {
      image: true,
        footnote: true,
        tasklist: true,
        sub: true,
        sup: true,
        mark: true,
        spoiler: true,
        preview: true,
        align: true
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'Tags', link: '/tags/', activeMatch: '/tags/' },
      { text: 'Categories', link: '/categories/', activeMatch: '/categories/' },
      { text: 'Archives', link: '/archives/', activeMatch: '/archives/' },
      { text: 'About', link: '/about' },
    ],

    sidebar: {
      '/examples/': [
        { text: 'Code Blocks', link: '/examples/code-blocks' },
        { text: 'Custom Containers', link: '/examples/custom-containers' },
        { text: 'Getting Started', link: '/examples/getting-started' },
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/niansi-z/vitepress-theme-niansi' },
      { icon: 'vitepress', link: 'https://vitepress.dev' }
    ]
  }<% } %>
})
