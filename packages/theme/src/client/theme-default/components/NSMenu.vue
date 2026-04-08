<script setup lang="ts" generic="T extends NiansiTheme.NavItem">
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'
import NSMenuLink from './NSMenuLink.vue'
import NSFlyout from './NSFlyout.vue'

defineProps<{
  items?: T[]
}>()
</script>

<template>
  <div class="NSMenu">
    <div v-if="items" class="items">
      <template v-for="item in items" :key="JSON.stringify(item)">
        <NSMenuLink v-if="'link' in item" :item />
        <component v-else-if="'component' in item" :is="item.component" v-bind="item.props" />
        <NSFlyout v-else :button="item.text" :items="item.items" />
      </template>
    </div>

    <slot />
  </div>
</template>

<style scoped>
.NSMenu {
  background: var(--ns-sidebar-bg);
  border: 1px solid var(--ns-sidebar-border-color);
  border-radius: 0.75rem;
  padding: 0.5rem;
  min-width: 9rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.items {
  display: flex;
  flex-direction: column;
}

.items :deep(> .NSFlyout),
.items :deep(.link) {
  margin-top: 0.25rem;
}
</style>
