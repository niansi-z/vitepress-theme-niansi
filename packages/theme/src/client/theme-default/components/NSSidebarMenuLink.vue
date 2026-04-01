<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'
import NSLink from './NSLink.vue'
import { isActive } from '../../shared'

const props = defineProps<{
  item: NiansiTheme.NavItemWithLink
}>()

const { page } = useData()

const href = computed(() => (typeof props.item.link === 'function' ? props.item.link(page.value) : props.item.link))
</script>

<template>
  <NSLink
    :class="{
      NSNavBarMenuLink: true,
      active: isActive(page.relativePath, item.activeMatch || href, !!item.activeMatch)
    }"
    :href
    :target="item.target"
    :rel="item.rel"
    :no-icon="item.noIcon"
    tabindex="0"
  >
    <span v-html="item.text"></span>
  </NSLink>
</template>

<style scoped>
.NSNavBarMenuLink {
  padding: 0.6rem 0;
  margin: 0 1.5rem;
  display: flex;
  align-content: center;
  justify-content: center;
  border-radius: 0.75rem;
  font-weight: 600;
  color: var(--ns-sidebar-muted-color);
  opacity: 0.9;
  transition: background-color 0.3s ease-in-out;
  user-select: none;
}

.NSNavBarMenuLink:not(:first-child) {
  margin-top: 0.25rem;
}

.NSNavBarMenuLink:hover {
  background-color: var(--ns-sidebar-hover-bg);
}

.NSNavBarMenuLink.active {
  color: var(--ns-sidebar-active-color);
  background-color: var(--ns-sidebar-hover-bg);
  opacity: 1;
}

@media (min-width: 1650px) {
  .NSNavBarMenuLink {
    margin: 0 2.75rem;
  }
}
</style>
