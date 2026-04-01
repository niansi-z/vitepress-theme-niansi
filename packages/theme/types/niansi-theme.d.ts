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
  }

  export type ThemeableImage = DefaultTheme.ThemeableImage

  export type NavItemWithLink = DefaultTheme.NavItemWithLink

  export type SocialLink = DefaultTheme.SocialLink

  export type OutlineItem = DefaultTheme.OutlineItem

  export type AlgoliaSearchOptions = DefaultTheme.AlgoliaSearchOptions
}
