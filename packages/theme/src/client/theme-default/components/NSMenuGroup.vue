<script
  lang="ts"
  setup
  generic="T extends NiansiTheme.NavItemComponent | NiansiTheme.NavItemChildren | NiansiTheme.NavItemWithLink"
>
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'
import NSMenuLink from './NSMenuLink.vue'

defineProps<{
  text?: string
  items: T[]
}>()
</script>

<template>
  <div class="NSMenuGroup">
    <p v-if="text" class="title">{{ text }}</p>

    <template v-for="item in items" :key="JSON.stringify(item)">
      <NSMenuLink v-if="'link' in item" :item />
    </template>
  </div>
</template>

<style scoped>
.NSMenuGroup {
  padding: 0.25rem 0;
}

.NSMenuGroup + .NSMenuGroup {
  border-top: 1px solid var(--ns-sidebar-border-color);
}

.title {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--ns-sidebar-muted-color);
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
</style>
