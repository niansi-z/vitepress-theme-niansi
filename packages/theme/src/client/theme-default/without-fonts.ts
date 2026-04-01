import './styles/vars.css'
import './styles/base.css'
import './styles/icons.css'
import './styles/utils.css'
import './styles/components/custom-block.css'
import './styles/components/ns-code.css'
import './styles/components/ns-code-group.css'
import './styles/components/ns-doc.css'
import './styles/components/ns-article.css'

import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import NotFound from './NotFound.vue'
import NSBadge from './components/NSBadge.vue'

export { default as NSTags } from './components/Virtual/NSTags.vue'
export { default as NSTagPosts } from './components/Virtual/NSTagPosts.vue'
export { default as NSCategories } from './components/Virtual/NSCategories.vue'
export { default as NSCategoriesPosts } from './components/Virtual/NSCategoriesPosts.vue'
export { default as NSArchives } from './components/Virtual/NSArchives.vue'
export { default as NSBadge } from './components/NSBadge.vue'

const theme: Theme = {
  Layout,
  NotFound,
  enhanceApp: ({ app }: any) => {
    app.component('Badge', NSBadge)
  }
}

export function defineTheme(userTheme: Theme): Theme {
  return userTheme
}

export default theme
