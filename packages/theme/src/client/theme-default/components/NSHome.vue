<script setup lang="ts">
import { usePosts } from '../composables/usePosts'
import { usePostsPagination } from '../composables/usePostsPagination'
import NSPagination from './NSPagination.vue'
import NSArticleList from './NSArticleList.vue'

const { posts } = usePosts()
const { pagedPosts, currentPage, totalPages, hasPrevPage, hasNextPage, goToPage } = usePostsPagination(
  () => posts.value,
  {
    pageSize: 10,
    pageQueryKey: 'page'
  }
)

async function handleChangePage(page: number) {
  await goToPage(page)

  if (typeof window !== 'undefined') {
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth'
    })
  }
}
</script>

<template>
  <div class="NSHome">
    <slot name="home-top" />
    <NSArticleList :key="currentPage" :posts="pagedPosts">
      <template #articleList-top>
        <slot name="articleList-top" />
      </template>
      <template #articleList-bottom>
        <slot name="articleList-bottom" />
      </template>
    </NSArticleList>

    <NSPagination
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      :has-prev-page="hasPrevPage"
      :has-next-page="hasNextPage"
      @change-page="handleChangePage"
    />
    <slot name="home-bottom" />
  </div>
</template>
