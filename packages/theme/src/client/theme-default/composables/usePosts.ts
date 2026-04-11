import { computed } from 'vue'
import { useData } from 'vitepress'
import { data, type BlogPostData } from './posts.data'

/**
 * 分类分组结果。
 */
export interface PostsTaxonomyGroup {
  name: string
  count: number
  posts: BlogPostData[]
}

/**
 * 当前文章的上一篇/下一篇信息。
 */
export interface AdjacentPosts {
  prev: BlogPostData | null
  next: BlogPostData | null
}

type TaxonomyField = 'tags' | 'categories'
type PostsSource = readonly BlogPostData[] | (() => readonly BlogPostData[])

/**
 * 统一处理博客文章集合：
 * - 所有文章
 * - tags 分类聚合
 * - categories 分类聚合
 * - 上一篇/下一篇检索
 */
export function usePosts(sourcePosts: PostsSource = data) {
  const { site, localeIndex } = useData()
  const posts = computed<BlogPostData[]>(() => {
    const all = [...resolvePostsSource(sourcePosts)]
    const locales = site.value.locales
    const currentLocale = localeIndex.value
    if (!locales || !currentLocale) return all
    // 获取所有非 root 的语言前缀
    const localeKeys = Object.keys(locales).filter(k => k !== 'root')
    // 当前语言的 link 前缀
    const currentPrefix = locales[currentLocale]?.link || (currentLocale === 'root' ? '/' : `/${currentLocale}/`)
    // root 语言时，排除所有其他语言前缀的文章
    let filtered: BlogPostData[] = []
    if (currentLocale === 'root') {
      filtered = all.filter(post => {
        return !localeKeys.some(k => {
          const prefix = locales[k]?.link || (k === 'root' ? '/' : `/${k}/`)
          return post.url.startsWith(prefix)
        })
      })
    } else {
      filtered = all.filter(post => post.url.startsWith(currentPrefix))
    }
    // 去重：同名（如 /markdown）只保留当前语言下的那一篇
    const seen = new Map<string, BlogPostData>()
    for (const post of filtered) {
      // 取不带语言前缀的 url 作为 key
      const key = post.url.replace(/^\/[\w-]+\//, '/').replace(/\/$/, '')
      if (!seen.has(key)) {
        seen.set(key, post)
      }
    }
    return Array.from(seen.values())
  })

  const postIndexByUrl = computed(() => {
    const indexMap = new Map<string, number>()

    posts.value.forEach((post, index) => {
      indexMap.set(normalizePostUrl(post.url), index)
    })

    return indexMap
  })

  const tagGroups = computed(() => createTaxonomyGroups(posts.value, 'tags'))
  const categoryGroups = computed(() => createTaxonomyGroups(posts.value, 'categories'))

  const getPostByUrl = (url: string): BlogPostData | undefined => {
    const postIndex = postIndexByUrl.value.get(normalizePostUrl(url))
    if (postIndex === undefined) {
      return undefined
    }

    return posts.value[postIndex]
  }

  const getAdjacentPosts = (postOrUrl: BlogPostData | string): AdjacentPosts => {
    const targetUrl = typeof postOrUrl === 'string' ? postOrUrl : postOrUrl.url
    const currentIndex = postIndexByUrl.value.get(normalizePostUrl(targetUrl))

    if (currentIndex === undefined) {
      return {
        prev: null,
        next: null
      }
    }

    return {
      prev: posts.value[currentIndex - 1] ?? null,
      next: posts.value[currentIndex + 1] ?? null
    }
  }

  return {
    posts,
    tagGroups,
    categoryGroups,
    getPostByUrl,
    getAdjacentPosts
  }
}

function resolvePostsSource(source: PostsSource): readonly BlogPostData[] {
  return typeof source === 'function' ? source() : source
}

function normalizePostUrl(url: string): string {
  const normalized = url.replace(/\/+$/, '')
  return normalized || '/'
}

function createTaxonomyGroups(posts: readonly BlogPostData[], taxonomyField: TaxonomyField): PostsTaxonomyGroup[] {
  const taxonomyMap = new Map<string, BlogPostData[]>()

  for (const post of posts) {
    for (const taxonomyName of post[taxonomyField]) {
      if (!taxonomyMap.has(taxonomyName)) {
        taxonomyMap.set(taxonomyName, [])
      }

      taxonomyMap.get(taxonomyName)?.push(post)
    }
  }

  return [...taxonomyMap.entries()]
    .map(([name, groupedPosts]) => ({
      name,
      count: groupedPosts.length,
      posts: groupedPosts
    }))
    .sort((a, b) => {
      if (a.count !== b.count) {
        return b.count - a.count
      }

      return a.name.localeCompare(b.name)
    })
}
