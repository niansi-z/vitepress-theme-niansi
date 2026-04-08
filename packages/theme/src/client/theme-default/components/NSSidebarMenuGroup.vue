<script setup lang="ts">
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'
import NSFlyout from './NSFlyout.vue'

defineProps<{
  item: NiansiTheme.NavItemWithChildren
}>()
</script>

<template>
  <NSFlyout class="NSSidebarMenuGroup" :button="item.text" :items="item.items" />
</template>

<style scoped>
.NSSidebarMenuGroup {
  margin: 0;
}

.NSSidebarMenuGroup:not(:first-child) {
  margin-top: 0.25rem;
}

.NSSidebarMenuGroup :deep(.menu .NSMenu) {
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0 0 0 0.75rem;
  min-width: auto;
  border-radius: 0;
}

.NSSidebarMenuGroup :deep(.menu .NSFlyout .button) {
  padding: 0.6rem;
  font-weight: 600;
  color: var(--ns-sidebar-muted-color);
  border-radius: 0.75rem;
}

.NSSidebarMenuGroup :deep(.menu .NSFlyout .button:hover) {
  background-color: var(--ns-sidebar-hover-bg);
}
</style>
