// so that users can do `import NiansiTheme from 'vitepress-theme-niansi/theme'`

import type { ComputedRef, DefineComponent, ShallowRef } from 'vue'

export type { NiansiTheme } from './types/niansi-theme.js'

declare const theme: {
  Layout: DefineComponent
  NotFound: DefineComponent
  enhanceApp: (ctx: any) => void
}

export default theme

export declare const useLayout: () => {
  isHome: ComputedRef<boolean>
  isPage: ComputedRef<boolean>
  /**
   * The outline headers of the current page.
   */
  headers: Readonly<ShallowRef<NiansiTheme.OutlineItem[]>>
}

export declare const defineTheme: (userTheme: Theme) => Theme

export declare const NSTags: DefineComponent
export declare const NSTagPosts: DefineComponent
export declare const NSCategories: DefineComponent
export declare const NSCategoriesPosts: DefineComponent
export declare const NSArchives: DefineComponent
