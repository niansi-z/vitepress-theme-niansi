<script setup lang="ts">
import NSLink from '../NSLink.vue'
import type { PostsTaxonomyGroup } from '../../composables/usePosts'
import { getDate } from '../../support/utils'

defineProps<{
  currentGroup: PostsTaxonomyGroup | undefined
}>()
</script>

<template>
  <ul class="NSPostList">
    <li class="post" v-for="item in currentGroup?.posts" :key="JSON.stringify(item)">
      <NSLink class="post-link" :href="item.url">{{ item.title }}</NSLink>
      <span class="dash"></span>
      <time class="date">{{ getDate(item.date) }}</time>
    </li>
  </ul>
</template>

<style scoped>
.NSPostList {
  font-size: 1.08rem;
  margin-top: 2rem;
}

.post {
  display: flex;
  justify-content: space-between;
  line-height: 1.5rem;
  padding: 0.6rem 0;
}

.post:before {
  content: '';
  position: relative;
  top: 0.6rem;
  display: block;
  width: 5px;
  height: 5px;
  background-color: #999;
  margin-right: 0.5rem;
  border-radius: 50%;
}

.post-link {
  font-size: 1.1rem;
  color: var(--ns-link-color);
}

.post-link:hover {
  margin-bottom: -1px;
  color: var(--ns-hover-color);
  border-bottom: 1px solid var(--ns-hover-color);
  text-decoration: none;
}

.dash {
  margin: 0 0.5rem 0.6rem 0.5rem;
  flex-grow: 1;
  border-bottom: 2px dotted silver;
}

.date {
  color: var(--ns-text-muted-color);
  font-size: 0.875rem;
}

@media (min-width: 1200px) {
  .NSPostList {
    font-size: 1.03rem;
  }
}
</style>
