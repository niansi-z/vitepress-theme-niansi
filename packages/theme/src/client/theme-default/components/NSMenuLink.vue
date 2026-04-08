<script setup lang="ts" generic="T extends NiansiTheme.NavItemWithLink">
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { isActive } from '../../shared'
import NSLink from './NSLink.vue'

const props = defineProps<{
  item: T
  rel?: string
}>()

const { page } = useData()

const href = computed(() => (typeof props.item.link === 'function' ? props.item.link(page.value) : props.item.link))

const isActiveLink = computed(() =>
  isActive(page.value.relativePath, props.item.activeMatch || href.value, !!props.item.activeMatch)
)

defineOptions({ inheritAttrs: false })
</script>

<template>
  <div class="NSMenuLink">
    <NSLink
      v-bind="$attrs"
      :class="{ active: isActiveLink }"
      :href
      :target="item.target"
      :rel="props.rel ?? item.rel"
      :no-icon="item.noIcon"
    >
      <span v-html="item.text" />
    </NSLink>
  </div>
</template>

<style scoped>
.NSMenuLink :deep(a) {
  display: block;
  padding: 0.6rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ns-sidebar-muted-color);
  white-space: nowrap;
  transition:
    background-color 0.25s ease-in-out,
    color 0.25s ease-in-out;
}

.NSMenuLink :deep(a:hover) {
  color: var(--ns-sidebar-active-color);
  background-color: var(--ns-sidebar-hover-bg);
}

.NSMenuLink :deep(a.active) {
  color: var(--ns-sidebar-active-color);
  background-color: var(--ns-sidebar-hover-bg);
}
</style>
