import { h } from 'vue'
import { defineTheme } from 'vitepress-theme-niansi/theme'
import DefaultTheme from 'vitepress-theme-niansi/theme'
import './style.css'

export default defineTheme({
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://theme.niansi.com.cn/guide/layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
})
