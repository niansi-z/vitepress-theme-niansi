import type { DefaultTheme } from 'vitepress/theme'

type RemovedConfigKeys =
  | 'sidebar'
  | 'aside'
  | 'darkModeSwitchLabel'
  | 'carbonAds'
  | 'editLink'
  | 'lastUpdated'
  | 'sidebarMenuLabel'
  | 'langMenuLabel'

export namespace NiansiTheme {
  export interface Config extends Omit<DefaultTheme.Config, RemovedConfigKeys> {
    sidebarBgImage?: string
    tagPath?: string
    categoryPath?: string
    archivesPath?: string

    recentlyUpdated?: string
    trendingTags?: string

    hamburgerHome?: string

    postedMeta?: string
    authorMeta?: string
    readMeta?: string
    categoriesMeta?: string

    excerptLength?: number

    commentPlugin?: CommentPlugin
  }

  export type ThemeableImage = DefaultTheme.ThemeableImage

  export type NavItem = DefaultTheme.NavItem

  export type NavItemComponent = DefaultTheme.NavItemComponent

  export type NavItemChildren = DefaultTheme.NavItemChildren

  export type NavItemWithLink = DefaultTheme.NavItemWithLink

  export type NavItemWithChildren = DefaultTheme.NavItemWithChildren

  export type SocialLink = DefaultTheme.SocialLink

  export type OutlineItem = DefaultTheme.OutlineItem

  export type AlgoliaSearchOptions = DefaultTheme.AlgoliaSearchOption
  
  export interface WalineCommentOptions {
    serverURL: string
    [key: string]: any
  }

  export interface GiscusCommentOptions {
    repo: string
    repoId: string
    category: string
    categoryId: string
    [key: string]: any
  }

  export type CommentPlugin =
    | { provider: 'Waline'; options: WalineCommentOptions }
    | { provider: 'Giscus'; options: GiscusCommentOptions }
}
