import type { MarkdownItAsync } from 'markdown-it-async'
import { inlineRule } from './inlinerule'

export const sup = (md: MarkdownItAsync): void => {
  inlineRule(md, {
    marker: '^',
    tag: 'sup',
    token: 'sup'
  })
}
