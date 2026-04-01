<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
import NSTags from '../icons/NSTags.vue'
import { usePosts } from '../../composables/usePosts'
import NSPostList from './NSPostList.vue'

const { params } = useData()
const { tagGroups } = usePosts()

const currentTagGroup = computed(() => {
  return tagGroups.value.find((group) => group.name === params.value?.tags)
})
</script>

<template>
  <div class="NSTagPosts">
    <h1 class="title">
      <NSTags class="icon" />
      {{ params?.tags }}
      <span class="text-muted">{{ currentTagGroup?.count }}</span>
    </h1>
    <NSPostList :currentGroup="currentTagGroup" />
  </div>
</template>

<style scoped>
.title {
  font-size: 2rem;
  padding-left: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--ns-heading-color);
  font-weight: 600;
  scroll-margin-top: 3.5rem;
}

.icon {
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  color: var(--ns-text-muted-color);
}

.text-muted {
  font-size: 1.25rem;
  font-weight: 400;
  padding-left: 0.5rem;
  color: var(--ns-text-muted-color);
}

@media (min-width: 768px) {
  .post {
    padding-right: 1rem;
    padding-left: 1rem;
  }
}
</style>
