import type { MarkdownItAsync } from 'markdown-it-async'
import { inlineRule } from './inlinerule'

export interface MarkdownItSpoilerOptions {
  /**
   * @default "span"
   */
  tag?: string

  /**
   * @default [["class", "spoiler"], ["tabindex","-1"]]
   */
  attrs?: [string, string][]
}

const DEFAULT_TAG = 'span'
const DEFAULT_ATTRS: [string, string][] = [
  ['class', 'spoiler'],
  ['tabindex', '-1']
]

export const spoiler = (md: MarkdownItAsync, options?: MarkdownItSpoilerOptions): void => {
  const { tag = DEFAULT_TAG, attrs = DEFAULT_ATTRS } = options ?? {}

  inlineRule(md, {
    marker: '!',
    tag,
    token: 'spoiler',
    nested: true,
    placement: 'before-emphasis',
    attrs
  })
}
