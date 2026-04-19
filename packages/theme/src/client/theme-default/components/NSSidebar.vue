<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, watch } from 'vue'
import { useScrollLock } from '@vueuse/core'
import NSSidebarTitle from './NSSidebarTitle.vue'
import NSSidebarMenu from './NSSidebarMenu.vue'
import NSSidebarDocs from './NSSidebarDocs.vue'
import NSSidebarBottom from './NSSidebarBottom.vue'
import { useSidebar } from '../composables/useSidebar'
import { useLayout } from '../composables/layout'

const { theme } = useData()
const { isSidebarOpen, closeSidebar } = useSidebar()
const { isHome } = useLayout()
const isLocked = useScrollLock(document.body)

watch(isSidebarOpen, (open) => {
  isLocked.value = open
})

const sidebarStyle = computed(() => {
  const image = theme.value.sidebarBgImage
  if (typeof image !== 'string' || !image.trim()) {
    return undefined
  }

  return {
    backgroundImage: `url("${image}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top'
  }
})
</script>

<template>
  <aside
    id="NSSidebar"
    class="NSSidebar"
    :class="{ 'is-open': isSidebarOpen }"
    aria-label="Sidebar"
    :style="sidebarStyle"
  >
    <NSSidebarTitle />
    <slot name="sidebar-menu-before" />
    <NSSidebarMenu v-if="isHome" />
    <NSSidebarDocs v-else />
    <slot name="sidebar-menu-after" />
    <NSSidebarBottom />
  </aside>

  <Teleport to="body">
    <div class="NSBackdrop" v-show="isSidebarOpen" @click="closeSidebar" aria-hidden="true" />
  </Teleport>
</template>

<style scoped>
.NSSidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-left: 0;
  padding-right: 0;
  overflow: hidden;
  width: 260px;
  background: var(--ns-sidebar-bg);
  border-right: 1px solid var(--ns-sidebar-border-color);
  scrollbar-width: none;
}

@media (min-width: 1650px) {
  .NSSidebar {
    width: 300px;
  }
}

@media (max-width: 849px) {
  .NSSidebar {
    transition: transform 0.4s ease;
    transform: translateX(-260px);
    -webkit-transform: translateX(-260px);
  }
  .NSSidebar.is-open {
    transform: translateX(0);
    -webkit-transform: translateX(0);
  }
}

.NSBackdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 29;
}

@media (min-width: 850px) {
  .NSBackdrop {
    display: none;
  }
}
</style>
