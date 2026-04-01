import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({<% if (srcDir) { %>
  srcDir: <%= srcDir %>,
  <% } %>
  title: <%= title %>,
  description: <%= description %><% if (defaultTheme) { %>,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'Tags', link: '/tags/', activeMatch: '/tags/' },
      { text: 'Categories', link: '/categories/', activeMatch: '/categories/' },
      { text: 'Archives', link: '/archives/', activeMatch: '/archives/' },
      { text: 'About', link: '/about' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/niansi-z/vitepress-theme-niansi' },
      { icon: 'vitepress', link: 'https://vitepress.dev' }
    ]
  }<% } %>
})
