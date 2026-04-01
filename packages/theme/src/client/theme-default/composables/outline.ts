import { onMounted, onUnmounted, type Ref } from 'vue'
import { getScrollOffset } from 'vitepress'
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'
import { throttleAndDebounce } from '../support/utils'
import { useAside } from './aside'

const ignoreRE = /\b(?:VPBadge|header-anchor|footnote-ref|ignore-header)\b/

// cached list of anchor elements from resolveHeaders
const resolvedHeaders: { element: HTMLHeadElement; link: string }[] = []

export function resolveTitle(theme: NiansiTheme.Config): string {
  return (
    (typeof theme.outline === 'object' && !Array.isArray(theme.outline) && theme.outline.label) ||
    theme.outlineTitle ||
    'On this page'
  )
}

export function getHeaders(range: NiansiTheme.Config['outline']): NiansiTheme.OutlineItem[] {
  const headers = [...document.querySelectorAll('.NSDoc h1, .NSDoc h2, .NSDoc h3, .NSDoc h4, .NSDoc h5, .NSDoc h6')]
    .filter((el) => el.id && el.hasChildNodes())
    .map((el) => {
      const level = Number(el.tagName[1])
      return {
        element: el as HTMLHeadElement,
        title: serializeHeader(el),
        link: '#' + el.id,
        level
      }
    })

  return resolveHeaders(headers, range)
}

function serializeHeader(h: Element): string {
  let ret = ''
  for (const node of h.childNodes) {
    if (node.nodeType === 1) {
      if (ignoreRE.test((node as Element).className)) continue
      ret += node.textContent
    } else if (node.nodeType === 3) {
      ret += node.textContent
    }
  }
  return ret.trim()
}

export function resolveHeaders(
  headers: NiansiTheme.OutlineItem[],
  range?: NiansiTheme.Config['outline']
): NiansiTheme.OutlineItem[] {
  if (range === false) {
    return []
  }

  const levelsRange = (typeof range === 'object' && !Array.isArray(range) ? range.level : range) || 2

  const [high, low]: [number, number] =
    typeof levelsRange === 'number' ? [levelsRange, levelsRange] : levelsRange === 'deep' ? [2, 6] : levelsRange

  return buildTree(headers, high, low)
}

function buildTree(data: NiansiTheme.OutlineItem[], min: number, max: number): NiansiTheme.OutlineItem[] {
  resolvedHeaders.length = 0

  const result: NiansiTheme.OutlineItem[] = []
  const stack: (NiansiTheme.OutlineItem | { level: number; shouldIgnore: true })[] = []

  data.forEach((item) => {
    const node = { ...item, children: [] }
    let parent = stack[stack.length - 1]

    while (parent && parent.level >= node.level) {
      stack.pop()
      parent = stack[stack.length - 1]
    }

    if (node.element.classList.contains('ignore-header') || (parent && 'shouldIgnore' in parent)) {
      stack.push({ level: node.level, shouldIgnore: true })
      return
    }

    if (node.level > max || node.level < min) return
    resolvedHeaders.push({ element: node.element, link: node.link })

    if (parent) parent.children!.push(node)
    else result.push(node)

    stack.push(node)
  })

  return result
}

export function useActiveAnchor(container: Ref<HTMLElement>): void {
  const { isAsideEnabled } = useAside()

  const onScroll = throttleAndDebounce(setActiveLink, 100)

  let prevActiveLink: HTMLAnchorElement | null = null

  onMounted(() => {
    requestAnimationFrame(setActiveLink)
    window.addEventListener('scroll', onScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  function setActiveLink() {
    if (!isAsideEnabled.value) {
      return
    }

    const scrollY = window.scrollY
    const innerHeight = window.innerHeight
    const offsetHeight = document.body.offsetHeight
    const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1

    const headers = resolvedHeaders
      .map(({ element, link }) => ({
        link,
        top: getAbsoluteTop(element)
      }))
      .filter(({ top }) => !Number.isNaN(top))
      .sort((a, b) => a.top - b.top)

    // no headers available for active link
    if (!headers.length) {
      activateLink(null)
      return
    }

    // page top
    if (scrollY < 1) {
      activateLink(null)
      return
    }

    // page bottom - highlight last link
    if (isBottom) {
      activateLink(headers[headers.length - 1].link)
      return
    }

    // find the last header above the top of viewport
    let activeLink: string | null = null
    for (const { link, top } of headers) {
      if (top > scrollY + getScrollOffset() + 4) {
        break
      }
      activeLink = link
    }
    activateLink(activeLink)
  }

  function activateLink(hash: string | null) {
    if (prevActiveLink) {
      prevActiveLink.classList.remove('active')
    }

    if (!container.value) return

    if (hash == null) {
      prevActiveLink = null
      container.value.classList.remove('has-active')
      container.value.style.removeProperty('--ns-outline-active-top')
      return
    }

    prevActiveLink = container.value.querySelector(`a[href="${decodeURIComponent(hash)}"]`)

    const activeLink = prevActiveLink

    if (activeLink) {
      activeLink.classList.add('active')

      // 如果 outline-list 可滚动，则把激活项滚动到可见（不显示滚动条）
      try {
        const scrollEl = container.value.querySelector('.outline-list') as HTMLElement | null
        if (scrollEl) {
          ;(activeLink as HTMLElement).scrollIntoView({
            behavior: 'auto',
            block: 'nearest'
          })
        }
      } catch (e) {
        // ignore
      }

      const anchorRect = activeLink.getBoundingClientRect()
      const containerRect = container.value.getBoundingClientRect()
      const top = anchorRect.top - containerRect.top + anchorRect.height / 2
      container.value.classList.add('has-active')
      container.value.style.setProperty('--ns-outline-active-top', `${top}px`)
    } else {
      container.value.classList.remove('has-active')
      container.value.style.removeProperty('--ns-outline-active-top')
    }
  }
}

function getAbsoluteTop(element: HTMLElement): number {
  let offsetTop = 0
  while (element !== document.body) {
    if (element === null) {
      // child element is:
      // - not attached to the DOM (display: none)
      // - set to fixed position (not scrollable)
      // - body or html element (null offsetParent)
      return NaN
    }
    offsetTop += element.offsetTop
    element = element.offsetParent as HTMLElement
  }
  return offsetTop
}
