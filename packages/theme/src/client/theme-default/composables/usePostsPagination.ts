import { computed, watch } from 'vue'
import { inBrowser, useRoute, useRouter } from 'vitepress'
import type { BlogPostData } from './posts.data'

type PostsSource = readonly BlogPostData[] | (() => readonly BlogPostData[])

export interface UsePostsPaginationOptions {
  pageSize?: number
  pageQueryKey?: string
}

/**
 * 博客文章分页 composable。
 *
 * - 独立管理分页计算
 * - 将页码同步到 URL query（默认键名 `page`）
 */
export function usePostsPagination(sourcePosts: PostsSource, options: UsePostsPaginationOptions = {}) {
  const route = useRoute()
  const router = useRouter()

  const pageSize = Math.max(1, options.pageSize ?? 10)
  const pageQueryKey = options.pageQueryKey ?? 'page'

  const posts = computed<BlogPostData[]>(() => [...resolvePostsSource(sourcePosts)])
  const totalPosts = computed(() => posts.value.length)
  const totalPages = computed(() => Math.max(1, Math.ceil(totalPosts.value / pageSize)))

  const currentPage = computed(() => {
    const routePage = parseRoutePage(route.query, pageQueryKey)
    return clampPage(routePage, totalPages.value)
  })

  const pagedPosts = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize
    const endIndex = startIndex + pageSize
    return posts.value.slice(startIndex, endIndex)
  })

  const hasPrevPage = computed(() => currentPage.value > 1)
  const hasNextPage = computed(() => currentPage.value < totalPages.value)

  const goToPage = async (targetPage: number) => {
    if (!inBrowser) {
      return
    }

    const resolvedTarget = clampPage(targetPage, totalPages.value)
    const currentPath = buildRoutePath(route.path, route.query, route.hash)
    const targetPath = buildTargetPath(route.path, route.query, route.hash, pageQueryKey, resolvedTarget)

    if (targetPath === currentPath) {
      return
    }

    await router.go(targetPath)
  }

  const goToPrevPage = async () => {
    await goToPage(currentPage.value - 1)
  }

  const goToNextPage = async () => {
    await goToPage(currentPage.value + 1)
  }

  watch(
    totalPages,
    (pages) => {
      if (!inBrowser) {
        return
      }

      const routePage = parseRoutePage(route.query, pageQueryKey)
      const clampedPage = clampPage(routePage, pages)

      if (routePage !== clampedPage) {
        void goToPage(clampedPage)
      }
    },
    { immediate: true }
  )

  return {
    pageSize,
    totalPosts,
    totalPages,
    currentPage,
    hasPrevPage,
    hasNextPage,
    pagedPosts,
    goToPage,
    goToPrevPage,
    goToNextPage
  }
}

function resolvePostsSource(source: PostsSource): readonly BlogPostData[] {
  return typeof source === 'function' ? source() : source
}

function parseRoutePage(query: string, pageQueryKey: string): number {
  const queryString = query.startsWith('?') ? query.slice(1) : query
  const searchParams = new URLSearchParams(queryString)
  const routePage = Number(searchParams.get(pageQueryKey) || 1)

  if (!Number.isFinite(routePage)) {
    return 1
  }

  return Math.floor(routePage)
}

function clampPage(page: number, totalPages: number): number {
  if (!Number.isFinite(page) || page < 1) {
    return 1
  }

  if (page > totalPages) {
    return totalPages
  }

  return page
}

function buildTargetPath(path: string, query: string, hash: string, pageQueryKey: string, targetPage: number): string {
  const queryString = query.startsWith('?') ? query.slice(1) : query
  const searchParams = new URLSearchParams(queryString)

  if (targetPage <= 1) {
    searchParams.delete(pageQueryKey)
  } else {
    searchParams.set(pageQueryKey, String(targetPage))
  }

  const nextQuery = searchParams.toString()

  return `${path}${nextQuery ? `?${nextQuery}` : ''}${hash || ''}`
}

function buildRoutePath(path: string, query: string, hash: string): string {
  const normalizedQuery = query ? (query.startsWith('?') ? query : `?${query}`) : ''
  return `${path}${normalizedQuery}${hash || ''}`
}
