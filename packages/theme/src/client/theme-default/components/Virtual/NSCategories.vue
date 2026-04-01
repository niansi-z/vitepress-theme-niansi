<script setup lang="ts">
import { useData } from 'vitepress'
import { usePosts } from '../../composables/usePosts'
import NSFolderClose from '../icons/NSFolderClose.vue'
import NSLink from '../NSLink.vue'

const { categoryGroups } = usePosts()
const { theme } = useData()
</script>

<template>
  <div class="NSCategories">
    <template v-for="category in categoryGroups" :key="JSON.stringify(category)">
      <div class="card">
        <NSFolderClose class="icon" />
        <NSLink class="category" :href="`${theme.categoryPath ?? '/categories/'}/${encodeURIComponent(category.name)}`">
          {{ category.name }}
        </NSLink>
        <span class="text-muted">{{ category.count }} {{ theme?.categoriesMeta ?? 'post' }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
  color: var(--ns-card-bg);
  word-wrap: break-word;
  background-color: var(--ns-card-cap-bg);
  background-clip: border-box;
  border: 1px solid var(--ns-categories-border);
  border-radius: 10px;
  margin-bottom: 2rem;
  padding: 0.75rem;
}

.icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  color: gray;
}

.category {
  margin: 0 0.5rem;
  color: var(--ns-link-color);
}

.category:hover {
  color: var(--ns-hover-color);
  border-bottom: 1px solid var(--ns-hover-color);
  text-decoration: none;
  margin-bottom: -1px;
}

.text-muted {
  font-size: 0.875rem;
  color: var(--ns-text-muted-color);
}
</style>
