import type { MarkdownItAsync } from 'markdown-it-async'
import type { RuleCore } from 'markdown-it/lib/parser_core.mjs'
import type { RuleInline } from 'markdown-it/lib/parser_inline.mjs'
import type Token from 'markdown-it/lib/token.mjs'
import { EXTERNAL_URL_RE } from '../../shared'

export interface ImageOptions {
  /**
   * Support native lazy loading for the `<img>` tag.
   * @default false
   */
  lazyLoading?: boolean
}

export interface FigureOptions {
  /**
   * Whether the figure is focusable.
   * @default true
   */
  focusable?: boolean

  /**
   * Whether to convert linked images (`[![image](url)](link)`) to figures.
   * @default true
   */
  linkImage?: boolean
}

export interface Options extends ImageOptions, FigureOptions {}

// --- img-size ---

/**
 * Parse image size information from label text
 * Format: `alt =width x height`
 */
const parseImageSize = (label: string): { label: string; width: string | null; height: string | null } | null => {
  const max = label.length
  let pos = label.lastIndexOf('=')

  if (pos === -1 || pos + 3 > max) return null

  if (pos !== 0 && label.charCodeAt(pos - 1) !== 32 /* space */) return null

  const origLabel = label.slice(0, pos++).trimEnd()

  let width: string | null = null
  let height: string | null = null

  const isNumber = (charCode: number): boolean => charCode >= 48 /* 0 */ && charCode <= 57 /* 9 */

  // Skip spaces after '=' before parsing dimensions
  while (pos < max && label.charCodeAt(pos) === 32 /* space */) pos++

  if (isNumber(label.charCodeAt(pos))) {
    const startPos = pos

    while (pos < max && isNumber(label.charCodeAt(pos))) pos++

    width = label.slice(startPos, pos)

    if (label.charCodeAt(pos++) !== 120 /* x */) return null
  } else if (label.charCodeAt(pos++) === 120 /* x */) {
    // no width info
  } else {
    return null
  }

  if (pos < max) {
    const startPos = pos

    while (pos < max && isNumber(label.charCodeAt(pos))) pos++

    if (pos > startPos) height = label.slice(startPos, pos)
  }

  while (pos < max) {
    if (label.charCodeAt(pos) !== 32 /* space */) return null

    pos++
  }

  return {
    label: origLabel,
    width,
    height
  }
}

const isSpace = (charCode: number): boolean => charCode === 32 /* space */ || charCode === 10 /* newline */

const imgSizeRule: RuleInline = (state, silent): boolean => {
  const oldPos = state.pos
  const max = state.posMax

  if (state.src.charCodeAt(state.pos) !== 33 /* ! */ || state.src.charCodeAt(state.pos + 1) !== 91 /* [ */) return false

  const labelStart = state.pos + 2
  const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false)

  if (labelEnd < 0) return false

  const rawLabel = state.src.slice(labelStart, labelEnd)

  const sizeInfo = parseImageSize(rawLabel)

  if (!sizeInfo) return false

  const { label, width, height } = sizeInfo

  let pos = labelEnd + 1
  let href = ''
  let title = ''

  if (pos < max && state.src.charCodeAt(pos) === 40 /* ( */) {
    pos++

    while (pos < max) {
      if (!isSpace(state.src.charCodeAt(pos))) break
      pos++
    }

    if (pos >= max) return false

    const res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax)

    if (res.ok) {
      href = state.md.normalizeLink(res.str)

      if (state.md.validateLink(href)) pos = res.pos
      else href = ''
    }

    const start = pos

    for (; pos < max; pos++) if (!isSpace(state.src.charCodeAt(pos))) break

    const titleRes = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax)

    if (pos < max && start !== pos && titleRes.ok) {
      title = titleRes.str
      pos = titleRes.pos

      for (; pos < max; pos++) if (!isSpace(state.src.charCodeAt(pos))) break
    } else {
      title = ''
    }

    if (pos >= max || state.src.charCodeAt(pos) !== 41 /* ) */) {
      state.pos = oldPos
      return false
    }
    pos++
  } else {
    state.pos = oldPos
    return false
  }

  if (!silent) {
    const token = state.push('image', 'img', 0)
    const attrs: [string, string][] = [
      ['src', href],
      ['alt', label]
    ]

    if (title) attrs.push(['title', title])
    if (width) attrs.push(['width', width])
    if (height) attrs.push(['height', height])

    const tokens: Token[] = []

    state.md.inline.parse(label, state.md, state.env, tokens)

    token.attrs = attrs
    token.children = tokens
    token.content = label
  }

  state.pos = pos
  state.posMax = max

  return true
}

// --- figure ---

const removeAttribute = (token: Token, attribute: string): void => {
  token.attrs = token.attrs!.filter(([key]) => key !== attribute)
}

const getCaption = (image: Token): string => {
  const title = image.attrs?.find(([attr]) => attr === 'title')?.[1]

  if (title) {
    removeAttribute(image, 'title')

    return title
  }

  return image.content
}

const figureRule =
  (md: MarkdownItAsync, options: FigureOptions): RuleCore =>
  (state) => {
    for (let index = 1, { length } = state.tokens; index < length - 1; index++) {
      const token = state.tokens[index]

      if (token.type !== 'inline') continue

      if (!token.children || (token.children.length !== 1 && token.children.length !== 3)) continue

      if (token.children.length === 1 && token.children[0].type !== 'image') continue

      if (token.children.length === 3) {
        if (options.linkImage === false) continue

        const [childrenA, childrenB, childrenC] = token.children
        const isEnclosed =
          childrenA.type !== 'link_open' || childrenB.type !== 'image' || childrenC.type !== 'link_close'

        if (isEnclosed) continue
      }

      if (state.tokens[index - 1].type !== 'paragraph_open' || state.tokens[index + 1].type !== 'paragraph_close')
        continue

      const figureToken = state.tokens[index - 1]

      figureToken.type = 'figure_open'
      figureToken.tag = 'figure'
      state.tokens[index + 1].type = 'figure_close'
      state.tokens[index + 1].tag = 'figure'

      const image = token.children.length === 1 ? token.children[0] : token.children[1]

      const figCaption = getCaption(image)

      token.children.push(new state.Token('figcaption_open', 'figcaption', 1))

      const [captionContent] = md.parseInline(figCaption, state.env)
      const children = captionContent.children

      if (children?.length) token.children.push(...children)

      token.children.push(new state.Token('figcaption_close', 'figcaption', -1))

      if (options.focusable !== false) image.attrPush(['tabindex', '0'])
    }
  }

// --- main ---
export function image(
  md: MarkdownItAsync,
  opts: Options | boolean = {},
  markdownImage?: { lazyLoading?: boolean }
): void {
  const { focusable = true, linkImage = true } = typeof opts === 'boolean' ? {} : opts

  // lazyLoading: markdown.image.lazyLoading > plugins.image.lazyLoading > false
  const pluginLazyLoading = typeof opts === 'boolean' ? false : ((opts as Options).lazyLoading ?? false)
  const lazyLoading = markdownImage?.lazyLoading ?? pluginLazyLoading

  // img-size: intercept ![alt=WxH](src) at inline ruler before standard image rule
  md.inline.ruler.before('image', 'img-size', imgSizeRule)

  // figure: convert <p><img></p> to <figure><img><figcaption></figcaption></figure>
  md.core.ruler.before('linkify', 'figure', figureRule(md, { focusable, linkImage }))

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

    if (lazyLoading) {
      token.attrSet('loading', 'lazy')
    }

    token.attrSet('data-fancybox', 'gallery')

    return defaultImageRule(tokens, idx, options, env, self)
  }
}
