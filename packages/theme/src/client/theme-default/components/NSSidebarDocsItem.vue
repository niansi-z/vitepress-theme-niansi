<script setup lang="ts">
import { useData } from 'vitepress'
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'
import { inject, ref } from 'vue'
import { isActive } from '../../shared'
import NSLink from './NSLink.vue'

const props = defineProps<{
  item: NiansiTheme.SidebarItem
  depth?: number
}>()

const { page } = useData()
const hasActiveLink = inject<(item: NiansiTheme.SidebarItem) => boolean>('hasActiveLink')!

const manualExpanded = ref<boolean | null>(null)

function isExpanded(item: NiansiTheme.SidebarItem): boolean {
  if (manualExpanded.value !== null) return manualExpanded.value
  if (item.collapsed === false) return true
  return hasActiveLink(item)
}

function toggle() {
  manualExpanded.value = !isExpanded(props.item)
}
</script>

<template>
  <div v-if="item.items?.length" class="doc-group" :class="[`depth-${depth ?? 0}`]">
    <button type="button" class="group-title" :class="{ expanded: isExpanded(item) }" @click="toggle">
      <span class="group-text">{{ item.text }}</span>
      <span :class="['nsi-chevron-down', 'text-icon', { rotated: isExpanded(item) }]"></span>
    </button>

    <div class="group-items" :class="{ expanded: isExpanded(item) }">
      <div class="group-items-inner">
        <template v-for="child in item.items" :key="child.text || child.link">
          <NSSidebarDocsItem v-if="child.items?.length" :item="child" :depth="(depth ?? 0) + 1" />
          <NSLink
            v-else-if="child.link"
            :href="child.link"
            class="doc-link"
            :class="{ active: isActive(page.relativePath, child.link) }"
          >
            <span class="doc-link-text">{{ child.text }}</span>
          </NSLink>
        </template>
      </div>
    </div>
  </div>

  <NSLink
    v-else-if="item.link"
    :href="item.link"
    class="doc-link"
    :class="[`depth-${depth ?? 0}`, { active: isActive(page.relativePath, item.link) }]"
  >
    <span class="doc-link-text">{{ item.text }}</span>
  </NSLink>
</template>

<style scoped>
.doc-group {
  margin-top: 0.25rem;
}

.group-title {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0.6rem;
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

.group-title:hover {
  background-color: var(--ns-sidebar-hover-bg);
}

.group-title.expanded {
  opacity: 1;
}

.group-text {
  flex: 1;
  text-align: left;
}

.text-icon {
  font-size: 0.75em;
  opacity: 0.6;
  transition: transform 0.25s ease;
}

.text-icon.rotated {
  transform: rotate(-90deg);
}

.group-items {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}

.group-items.expanded {
  grid-template-rows: 1fr;
}

.group-items-inner {
  overflow: hidden;
  min-height: 0;
  padding-left: 0.75rem;
}

.doc-link {
  display: flex;
  align-items: center;
  padding: 0.6rem;
  margin-top: 0.25rem;
  color: var(--ns-sidebar-muted-color);
  font-size: 0.875rem;
  opacity: 0.85;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  user-select: none;
  text-decoration: none;
}

.doc-link:hover {
  background-color: var(--ns-sidebar-hover-bg);
  opacity: 1;
}

.doc-link.active {
  color: var(--ns-sidebar-active-color);
  background-color: var(--ns-sidebar-hover-bg);
  opacity: 1;
  font-weight: 600;
}

.doc-link-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
