import type { MarkdownItAsync } from 'markdown-it-async'
import type Token from 'markdown-it/lib/token.mjs'
import { EXTERNAL_URL_RE } from '../../shared'

export function image(md: MarkdownItAsync): void {
  const defaultImageRule = md.renderer.rules.image!

  md.renderer.rules.image = (tokens: Token[], idx: number, options, env, self) => {
    const token = tokens[idx]
    let url = token.attrGet('src')

    if (url && !EXTERNAL_URL_RE.test(url)) {
      if (!/^\.?\//.test(url)) {
        url = './' + url
      }
      token.attrSet('src', decodeURIComponent(url))
    }

    token.attrSet('loading', 'lazy')
    token.attrSet('data-fancybox', 'gallery')

    return defaultImageRule(tokens, idx, options, env, self)
  }
}
