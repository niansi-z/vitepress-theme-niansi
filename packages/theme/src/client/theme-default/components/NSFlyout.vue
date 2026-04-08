<script setup lang="ts" generic="T extends NiansiTheme.NavItem">
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'
import { ref } from 'vue'
import NSMenu from './NSMenu.vue'

defineProps<{
  icon?: string
  button?: string
  items?: T[]
}>()

const open = ref(false)
</script>

<template>
  <div class="NSFlyout">
    <button type="button" class="button" aria-haspopup="true" :aria-expanded="open" aria-label="" @click="open = !open">
      <span v-if="button || icon" class="text">
        <span v-if="icon" :class="[icon, 'option-icon']" />
        <span v-if="button" v-html="button" />
        <span :class="['nsi-chevron-down', 'text-icon', { rotated: open }]"></span>
      </span>

      <span v-else class="nsi-more-horizontal icon" />
    </button>

    <div :class="['menu', { open }]">
      <NSMenu :items>
        <slot />
      </NSMenu>
    </div>
  </div>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.6rem;
  border: none;
  background: transparent;
  font-size: inherit;
  font-weight: 600;
  color: var(--ns-sidebar-muted-color);
  opacity: 0.9;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  user-select: none;
}

.button:hover {
  background-color: var(--ns-sidebar-hover-bg);
}

.text {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text-icon {
  font-size: 0.75em;
  opacity: 0.6;
  transition: transform 0.25s ease;
}

.text-icon.rotated {
  transform: rotate(-90deg);
}

.option-icon {
  font-size: 1em;
  margin-right: 0.25rem;
}

.icon {
  font-size: 1.25em;
}

.menu {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}

.menu.open {
  grid-template-rows: 1fr;
}

.menu > * {
  overflow: hidden;
  min-height: 0;
}
</style>
