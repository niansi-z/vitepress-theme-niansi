import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { usePosts } from './usePosts'

export function useTopBarTitle() {
  const { page } = useData()
  const route = useRoute()

  const { posts, getPostByUrl } = usePosts()

  const latestPostTitle = computed(() => posts.value?.[0]?.title ?? '')

  function readPageTitle() {
    const fmAny: any = page as any
    if (!fmAny) return ''
    if (typeof fmAny === 'object' && 'title' in fmAny && fmAny.title) return fmAny.title
    if (fmAny.value && typeof fmAny.value === 'object' && 'title' in fmAny.value) return fmAny.value.title
    return ''
  }

  const crumbTitle = computed(() => {
    const fmTitle = readPageTitle()
    if (fmTitle) return fmTitle

    const p = route.path || ''
    const candidates = [p, p + '.html', p.replace(/\/$/, ''), p.replace(/\.html$/, '')]
    let matched: any = null
    for (const c of candidates) {
      try {
        matched = getPostByUrl(c)
      } catch (e) {
        matched = undefined
      }
      if (matched) break
    }

    return matched?.title || latestPostTitle.value || ''
  })

  return {
    crumbTitle,
    latestPostTitle
  }
}
