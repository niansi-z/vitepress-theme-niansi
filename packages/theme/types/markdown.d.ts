import type { MarkdownOptions } from 'vitepress'

export interface ImagePluginOptions {
  lazyLoading?: boolean
  focusable?: boolean
  linkImage?: boolean
}

export interface MarkdownPluginOptions {
  footnote?: boolean
  image?: boolean | ImagePluginOptions
  tasklist?: boolean
  sub?: boolean
  sup?: boolean
  mark?: boolean
  spoiler?: boolean
}

declare module 'vitepress' {
  interface MarkdownOptions {
    plugins?: MarkdownPluginOptions
  }
}

export type { MarkdownOptions }
