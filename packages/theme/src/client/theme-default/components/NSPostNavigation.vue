<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
import type { BlogPostData } from '../composables/posts.data'
import { usePosts } from '../composables/usePosts'
import NSLink from './NSLink.vue'

const props = defineProps<{
  post: BlogPostData | undefined
}>()

const { getAdjacentPosts } = usePosts()
const { theme } = useData()

const adjacentPosts = computed(() => {
  if (!props.post) {
    return {
      prev: null,
      next: null
    }
  }

  return getAdjacentPosts(props.post)
})
</script>

<template>
  <nav v-if="adjacentPosts.prev || adjacentPosts.next" class="NSPostNavigation" aria-label="Article navigation">
    <NSLink v-if="adjacentPosts.prev" class="item prev" :href="adjacentPosts.prev.url">
      <span class="label">{{ theme.docFooter?.prev || 'Previous page' }}</span>
      <span class="title">{{ adjacentPosts.prev.title }}</span>
    </NSLink>
    <div v-else class="item placeholder" aria-hidden="true"></div>

    <NSLink v-if="adjacentPosts.next" class="item next" :href="adjacentPosts.next.url">
      <span class="label">{{ theme.docFooter?.next || 'Next page' }}</span>
      <span class="title">{{ adjacentPosts.next.title }}</span>
    </NSLink>
  </nav>
</template>

<style scoped>
.NSPostNavigation {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  animation: fade-slide-in 0.4s ease-out;
}

.item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: center;
  padding: 0.875rem 1rem;
  border: 1px solid var(--ns-btn-border-color);
  border-radius: 8px;
  background: var(--ns-card-bg);
  color: var(--ns-link-color);
  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.item:hover {
  background: var(--ns-btn-hover-bg);
  color: var(--ns-btn-hover-color);
  border-color: var(--ns-btn-hover-bg);
  box-shadow: 0 8px 20px rgb(15 23 42 / 12%);
  transform: translateY(-2px);
}

.label {
  font-size: 0.65rem;
  color: var(--ns-text-muted-color);
}

.item:hover .label {
  color: #f5f5f5;
}

.title {
  font-size: 1.1rem;
  line-height: 1.5rem;
  margin-top: 0.3rem;
  white-space: normal;
  font-weight: 600;
}

.placeholder {
  display: none;
  animation: none;
}

@keyframes fade-slide-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (min-width: 768px) {
  .NSPostNavigation {
    grid-template-columns: 1fr 1fr;
  }

  .placeholder {
    display: block;
    visibility: hidden;
    pointer-events: none;
  }
}
</style>
