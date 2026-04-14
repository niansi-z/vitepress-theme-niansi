import type { MarkdownOptions } from 'vitepress'

export interface MarkdownPluginOptions {
  footnote?: boolean
  image?: boolean
  tasklist?: boolean
}

declare module 'vitepress' {
  interface MarkdownOptions {
    plugins?: MarkdownPluginOptions
  }
}

export type { MarkdownOptions }
