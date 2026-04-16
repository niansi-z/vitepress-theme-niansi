import type { MarkdownItAsync } from 'markdown-it-async'
import { inlineRule } from './inlinerule'

export const mark = (md: MarkdownItAsync): void => {
  inlineRule(md, {
    marker: '=',
    tag: 'mark',
    token: 'mark',
    nested: true,
    placement: 'before-emphasis'
  })
}
