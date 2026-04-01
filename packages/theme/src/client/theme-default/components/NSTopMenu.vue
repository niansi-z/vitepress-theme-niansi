<script setup lang="ts">
import NSMenu from './icons/NSMenu.vue'
import { useSidebar } from '../composables/useSidebar'

const { openSidebar, isSidebarOpen } = useSidebar()
</script>

<template>
  <button
    type="button"
    class="NSTopMenu"
    @click="openSidebar"
    aria-controls="NSSidebar"
    :aria-expanded="isSidebarOpen"
    aria-label="Open sidebar"
    title="Open sidebar"
  >
    <NSMenu />
  </button>
</template>

<style scoped>
.NSTopMenu {
  display: none;
}

@media (max-width: 849px) {
  .NSTopMenu {
    display: block;
  }
}
</style>
