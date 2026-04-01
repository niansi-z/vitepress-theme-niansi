import { onContentUpdated, useData, useRoute } from 'vitepress'
import { computed, shallowReadonly, shallowRef, watch } from 'vue'
import { useSidebar } from './useSidebar'
import type { NiansiTheme, useLayout as expected } from 'vitepress-theme-niansi/theme'
import { getHeaders } from './outline'

const headers = shallowRef<NiansiTheme.OutlineItem[]>([])

export function useLayout(): ReturnType<typeof expected> {
  const { frontmatter } = useData()

  const isHome = computed(() => {
    return !!(frontmatter.value.isHome ?? frontmatter.value.layout === 'home')
  })

  const isPage = computed(() => {
    return !!(frontmatter.value.isPage ?? frontmatter.value.layout === 'page')
  })

  return {
    isHome,
    isPage,
    headers: shallowReadonly(headers)
  }
}

export function registerWatchers() {
  const { frontmatter, theme } = useData()

  // close sidebar on route change
  try {
    const route = useRoute()
    const { closeSidebar } = useSidebar()
    watch(
      () => route.path,
      () => {
        try {
          closeSidebar()
        } catch (e) {
          // noop
        }
      }
    )
  } catch (e) {
    // ignore if useRoute or useSidebar not available in some contexts
  }

  onContentUpdated(() => {
    headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline)
  })
}
