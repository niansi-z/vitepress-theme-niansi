<script setup lang="ts">
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'

defineProps<{
  headers: NiansiTheme.OutlineItem[]
  root?: boolean
}>()
</script>

<template>
  <ul class="NSOutlineItem" :class="root ? 'root' : 'nested'" role="list">
    <li v-for="{ children, link, title } in headers" role="listitem">
      <a class="outline-link" :href="link" :title="title">
        <span class="outline-text">{{ title }}</span>
      </a>
      <template v-if="children?.length">
        <NSOutlineItem :headers="children" />
      </template>
    </li>
  </ul>
</template>

<style scoped>
.root {
  position: relative;
  z-index: 1;
}

.nested {
  padding-left: 1rem;
  padding-right: 1rem;
}

.outline-link.active {
  color: var(--ns-outline-highlight-color);
  font-weight: 600;
}

.outline-link:hover {
  color: var(--ns-outline-highlight-color);
}

ul .outline-link {
  display: block;
  position: relative;
  padding: 0.2rem 0 0.2rem 0;
  overflow: visible;
}

.outline-text {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
