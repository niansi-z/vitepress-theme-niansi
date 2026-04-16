import type { MarkdownItAsync } from 'markdown-it-async'
import { inlineRule } from './inlinerule'

export const sub = (md: MarkdownItAsync): void => {
  inlineRule(md, {
    marker: '~',
    tag: 'sub',
    token: 'sub'
  })
}
