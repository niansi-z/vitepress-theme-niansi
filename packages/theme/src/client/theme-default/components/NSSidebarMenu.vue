<script setup lang="ts">
import { useData } from 'vitepress'
import NSSidebarMenuLink from './NSSidebarMenuLink.vue'
import NSSidebarMenuGroup from './NSSidebarMenuGroup.vue'

const { theme } = useData()
</script>

<template>
  <nav class="NSSidebarMenu" role="navigation" aria-label="Main navigation">
    <template v-for="item in theme.nav" :key="JSON.stringify(item)">
      <NSSidebarMenuLink v-if="'link' in item" :item />
      <component v-else-if="'component' in item" :is="item.component" v-bind="item.props" />
      <NSSidebarMenuGroup v-else :item />
    </template>
  </nav>
</template>

<style scoped>
.NSSidebarMenu {
  flex-grow: 1;
  padding-left: 0;
  overflow-y: auto;
}

.NSSidebarMenu :deep(> .NSSidebarMenuGroup) {
  margin: 0.25rem 1.5rem 0;
}

.NSSidebarMenu::-webkit-scrollbar {
  width: 0;
}

@media (min-width: 1650px) {
  .NSSidebarMenu :deep(> .NSSidebarMenuGroup) {
    margin: 0.25rem 2.75rem 0;
  }
}
</style>
