<script setup lang="ts">
import { computed } from 'vue'
import type { BlogPostData } from '../composables/posts.data'
import NSLink from './NSLink.vue'
import NSCalendar from './icons/NSCalendar.vue'
import NSFolder from './icons/NSFolder.vue'

const props = defineProps<{
  post: BlogPostData
}>()

const createdAt = computed(() => formatDate(props.post.date))

const headingId = computed(() => {
  const url = props.post.url || ''
  return `article-title-${encodeURIComponent(url).replace(/%/g, '-')}`
})

function formatDate(timestamp: number): string {
  if (!Number.isFinite(timestamp)) {
    return ''
  }

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(timestamp))
}
</script>

<template>
  <article class="NSArticle" :aria-labelledby="headingId" role="listitem">
    <NSLink class="content" :href="post.url">
      <div class="main">
        <h2 class="title">
          {{ post.title }}
        </h2>

        <div v-if="post.excerpt" class="excerpt ns-doc" v-html="post.excerpt" />

        <div class="meta">
          <div class="item time">
            <NSCalendar class="icon" aria-hidden="true" />
            <time :datetime="post.date.toString()">{{ createdAt }}</time>
          </div>
          <div v-if="post.categories?.length" class="item categories">
            <NSFolder class="icon" aria-hidden="true" />
            <span>{{ post.categories.join('，') }}</span>
          </div>
        </div>
      </div>
    </NSLink>
  </article>
</template>

<style scoped>
.NSArticle {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  color: var(--ns-card-bg);
  word-wrap: break-word;
  border-radius: 0.375rem;
  background: none;
  margin-bottom: 1.25rem;
}

.content {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0;
  border: 0;
  background-color: var(--ns-card-bg);
  box-shadow: var(--ns-card-shadow);
  border-radius: 10px;
}

.content:hover {
  transition: background-color 0.35s ease-in-out;
}

.content:before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: var(--ns-card-hover-bg);
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.35s ease-in-out;
}

.content:hover:before {
  opacity: 0.3;
}

.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1rem;
}

.title {
  display: flex;
  align-content: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ns-heading-color);
  scroll-margin-top: 3.5rem;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.excerpt {
  font-size: 1.08rem;
  color: var(--ns-text-muted-color);
  margin-top: 0;
  margin-bottom: 1rem;
  overflow-wrap: break-word;
  pointer-events: none;
}

.meta {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: var(--ns-text-muted-color);
}
.meta .item {
  display: flex;
  align-items: center;
}

.meta .item:not(:first-child) {
  margin-left: 1.75rem;
}

.meta .icon {
  width: 16px;
  height: 16px;
  margin-right: 0.25rem;
}

@media (min-width: 768px) {
  .main {
    padding: 1.75rem 1.75rem 1.25rem 1.75rem;
  }

  .excerpt {
    margin-top: 0;
  }
}

@media (min-width: 1200px) {
  .excerpt {
    font-size: 1.03rem;
  }
}
</style>
