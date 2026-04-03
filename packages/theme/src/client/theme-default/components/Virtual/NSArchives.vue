<script setup lang="ts">
import { computed } from 'vue'
import { usePosts } from '../../composables/usePosts'
import type { BlogPostData } from '../../composables/posts.data'
import NSLink from '../NSLink.vue'

const { posts } = usePosts()

function groupByYear(items: BlogPostData[]) {
  const map = new Map<number, BlogPostData[]>()
  for (const p of items) {
    const year = new Date(p.date).getFullYear()
    if (!map.has(year)) map.set(year, [])
    map.get(year)!.push(p)
  }

  const groups = Array.from(map.entries()).map(([year, list]) => ({
    year,
    posts: list.sort((a, b) => b.date - a.date)
  }))

  // sort years desc
  groups.sort((a, b) => b.year - a.year)

  return groups
}

const groups = computed(() => groupByYear(posts.value))

const formatDayMonth = (ts: number) => {
  const d = new Date(ts)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  return `${day} / ${month}`
}
</script>

<template>
  <div class="NSArchives">
    <template v-for="group in groups" :key="JSON.stringify(group)">
      <time class="year">{{ group.year }}</time>
      <ul class="list">
        <li v-for="post in group.posts" :key="JSON.stringify(post)">
          <span class="date">{{ formatDayMonth(post.date) }}</span>
          <NSLink class="post" :href="post.url">{{ post.title }}</NSLink>
        </li>
      </ul>
    </template>
  </div>
</template>

<style scoped>
.year {
  position: relative;
  left: 2px;
  display: block;
  height: 3.5rem;
  font-size: 1.5rem;
  margin-left: -4px;
}

.year:before {
  content: '';
  position: relative;
  top: 24px;
  left: 79px;
  bottom: 16px;
  width: 4px;
  height: 32px;
  float: left;
  background-color: var(--ns-archives-line-color);
}

.year:after {
  content: '';
  display: inline-block;
  position: relative;
  left: 13.5px;
  width: 12px;
  height: 12px;
  background-color: #fff;
  border: 3px solid #c2c6cc;
  border-image: initial;
  border-radius: 50%;
  box-shadow: rgb(194, 198, 204) 0 0 2px 0;
  z-index: 1;
}

.list {
  margin-bottom: 1rem;
}

.list li {
  font-size: 1.1rem;
  line-height: 3rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.list li:nth-child(2n + 1) {
  background-color: var(--ns-bg);
  background-image: var(--ns-archives-odd-bg);
}

.list li:before {
  content: '';
  position: relative;
  top: 0;
  left: 77px;
  width: 4px;
  height: 3.1rem;
  float: left;
  background-color: var(--ns-archives-line-color);
}

.date {
  font-size: 85%;
}

.post {
  position: relative;
  top: 0.1rem;
  margin-left: 2.5rem;
  color: var(--ns-link-color);
}

.post:before {
  content: '';
  display: inline-block;
  position: relative;
  top: 1.35rem;
  left: 71px;
  width: 8px;
  height: 8px;
  float: left;
  background-color: #c2c6cc;
  box-shadow: rgb(194, 198, 204) 0 0 3px 0;
  z-index: 1;
  border-radius: 50%;
}

.post:hover {
  color: var(--ns-link-hover-color);
}

.year:nth-of-type(n + 2):before {
  top: unset;
  height: 72px;
}
</style>
