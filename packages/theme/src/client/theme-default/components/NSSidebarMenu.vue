<script setup lang="ts">
import { useData } from 'vitepress'
import NSSidebarMenuLink from './NSSidebarMenuLink.vue'

const { theme } = useData()
</script>

<template>
  <nav class="NSSidebarMenu" role="navigation" aria-label="Main navigation">
    <template v-for="item in theme.nav" :key="JSON.stringify(item)">
      <NSSidebarMenuLink :item="item" />
    </template>
  </nav>
</template>

<style scoped>
.NSSidebarMenu {
  flex-grow: 1;
  padding-left: 0;
  overflow-y: auto;
}

.NSSidebarMenu::-webkit-scrollbar {
  width: 0;
}
</style>
