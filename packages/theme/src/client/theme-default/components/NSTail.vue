<script setup lang="ts">
import { useData } from 'vitepress'
import NSTags from './icons/NSTags.vue'
import NSFolder from './icons/NSFolder.vue'
import type { BlogPostData } from '../composables/posts.data'
import NSLink from './NSLink.vue'

defineProps<{
  post: BlogPostData | undefined
}>()

const { theme, localeIndex } = useData()

const getTagUrl = (tagName: string) => {
  const localePrefix = localeIndex.value === 'root' ? '' : `/${localeIndex.value}`
  const basePath = theme?.value?.tagPath ?? '/tags'
  return `${localePrefix}${basePath}/${encodeURIComponent(tagName)}`
}

const getCategoryUrl = (categoriesName: string) => {
  const localePrefix = localeIndex.value === 'root' ? '' : `/${localeIndex.value}`
  const basePath = theme?.value?.tagPath ?? '/categories'
  return `${localePrefix}${basePath}/${encodeURIComponent(categoriesName)}`
}
</script>

<template>
  <div class="NSTail">
    <slot name="doc-tail-top" />
    <div class="meta" v-if="post?.tags?.length" role="list" aria-label="Tags">
      <NSFolder class="icon" aria-hidden="true" />
      <template v-for="tag in post?.tags">
        <NSLink class="tail-link" :href="getTagUrl(tag)" :aria-label="`Tag: ${tag}`">
          {{ tag }}
        </NSLink>
      </template>
    </div>
    <div class="tag" v-if="post?.categories?.length" role="list" aria-label="Categories">
      <NSTags class="icon" aria-hidden="true" />
      <template v-for="category in post?.categories">
        <NSLink class="tail-link" :href="getCategoryUrl(category)" :aria-label="`Category: ${category}`">
          {{ category }}
        </NSLink>
      </template>
    </div>
    <slot name="doc-tail-bottom" />
  </div>
</template>

<style scoped>
.NSTail {
  margin-top: 6rem;
  border-bottom: 1px solid var(--ns-border-color);
  color: var(--ns-text-muted-color);
  font-size: 0.85rem;
}

.meta,
.tag {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
}

.icon {
  width: 1rem;
  height: 1rem;
}

.tail-link {
  color: var(--ns-link-color);
  border-bottom: 1px solid var(--ns-border-color);
}

.tail-link:hover {
  color: var(--ns-link-hover-color);
  border-bottom-color: var(--ns-link-hover-color);
}
</style>
