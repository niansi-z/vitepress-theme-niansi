import { inBrowser, useData, withBase } from 'vitepress'
import { isExternal, sanitizeFileName, treatAsHtml } from '../../shared'

export function ensureStartingSlash(path: string): string {
  return path.startsWith('/') ? path : `/${path}`
}

export function normalizeLink(url: string): string {
  const { pathname, search, hash, protocol } = new URL(url, 'http://a.com')

  if (isExternal(url) || url.startsWith('#') || !protocol.startsWith('http') || !treatAsHtml(pathname)) return url

  const { site } = useData()

  const normalizedPath =
    pathname.endsWith('/') || pathname.endsWith('.html')
      ? url
      : url.replace(
          /(?:(^\.+)\/)?.*$/,
          `$1${pathname.replace(/(\.md)?$/, site.value.cleanUrls ? '' : '.html')}${search}${hash}`
        )

  return withBase(normalizedPath)
}

export function getDate(date: number | Date | undefined) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date)
}

export function throttleAndDebounce(fn: () => void, delay: number): () => void {
  let timeoutId: NodeJS.Timeout
  let called = false

  return () => {
    if (timeoutId) clearTimeout(timeoutId)

    if (!called) {
      fn()
      ;(called = true) && setTimeout(() => (called = false), delay)
    } else timeoutId = setTimeout(fn, delay)
  }
}

/**
 * Converts a url path to the corresponding js chunk filename.
 */
export function pathToFile(path: string) {
  let pagePath = path.replace(/\.html$/, '')
  pagePath = decodeURIComponent(pagePath)
  pagePath = pagePath.replace(/\/$/, '/index') // /foo/ -> /foo/index
  if (import.meta.env.DEV) {
    // always force re-fetch content in dev
    pagePath += `.md?t=${Date.now()}`
  } else {
    // in production, each .md file is built into a .md.js file following
    // the path conversion scheme.
    // /foo/bar.html -> ./foo_bar.md
    if (inBrowser) {
      const base = import.meta.env.BASE_URL
      pagePath = sanitizeFileName(pagePath.slice(base.length).replace(/\//g, '_') || 'index') + '.md'
      // client production build needs to account for page hash, which is
      // injected directly in the page's html
      let pageHash = __VP_HASH_MAP__[pagePath.toLowerCase()]
      if (!pageHash) {
        pagePath = pagePath.endsWith('_index.md') ? pagePath.slice(0, -9) + '.md' : pagePath.slice(0, -3) + '_index.md'
        pageHash = __VP_HASH_MAP__[pagePath.toLowerCase()]
      }
      if (!pageHash) return null
      pagePath = `${base}${__ASSETS_DIR__}/${pagePath}.${pageHash}.js`
    } else {
      // ssr build uses much simpler name mapping
      pagePath = `./${sanitizeFileName(pagePath.slice(1).replace(/\//g, '_'))}.md.js`
    }
  }

  return pagePath
}
