import { defineTheme } from 'vitepress-theme-niansi/theme'
import DefaultTheme from 'vitepress-theme-niansi/theme'
import './style.css'
import 'virtual:group-icons.css'

export default defineTheme({
  extends: DefaultTheme,
  enhanceApp() {
    // ...
  }
})
