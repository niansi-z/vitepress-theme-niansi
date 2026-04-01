<script setup lang="ts">
import type { BlogPostData } from '../composables/posts.data'
import NSArticle from './NSArticle.vue'

defineProps<{
  posts: BlogPostData[]
}>()
</script>

<template>
  <div class="NSArticleList">
    <slot name="articleList-top" />
    <TransitionGroup
      v-if="posts.length"
      name="NSArticleList"
      tag="div"
      class="NSArticleList-group"
      appear
      role="list"
      aria-label="Article list"
    >
      <NSArticle
        v-for="(post, index) in posts"
        :key="post.url"
        :post="post"
        :style="{ '--ns-article-index': String(index) }"
      />
    </TransitionGroup>
    <slot name="articleList-bottom" />
  </div>
</template>

<style scoped>
.NSArticleList-enter-active {
  transition:
    opacity 0.38s ease,
    transform 0.38s ease;
  transition-delay: calc(var(--ns-article-index, 0) * 60ms);
}

.NSArticleList-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.NSArticleList-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
