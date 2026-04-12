<script setup lang="ts">
import { useData } from 'vitepress'
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'
import { computed, provide } from 'vue'
import { isActive } from '../../shared'
import NSLink from './NSLink.vue'
import NSSidebarDocsItem from './NSSidebarDocsItem.vue'
import { useLangs } from '../composables/langs'
import { normalizeLink } from '../support/utils'

const { page, theme } = useData()
const { currentLang } = useLangs()

const link = computed(() =>
  typeof theme.value.logoLink === 'string' ? theme.value.logoLink : theme.value.logoLink?.link
)

const sidebarItems = computed<NiansiTheme.SidebarItem[]>(() => {
  const sidebar = theme.value.sidebar
  if (!sidebar) return []

  // SidebarItem[] 直接返回
  if (Array.isArray(sidebar)) return sidebar

  // SidebarMulti: 按当前路径匹配最长前缀
  const relativePath = `/${page.value.relativePath}`
  let matchedKey = ''
  for (const key of Object.keys(sidebar)) {
    if (relativePath.startsWith(key) && key.length > matchedKey.length) {
      matchedKey = key
    }
  }

  if (!matchedKey) return []

  const matched = sidebar[matchedKey]
  if (Array.isArray(matched)) return matched
  return matched?.items ?? []
})

function hasActiveLink(item: NiansiTheme.SidebarItem): boolean {
  const relativePath = page.value.relativePath
  if (item.link && isActive(relativePath, item.link)) return true
  return item.items?.some((child) => hasActiveLink(child)) ?? false
}

provide('hasActiveLink', hasActiveLink)
</script>

<template>
  <nav class="NSSidebarDocs" role="navigation" aria-label="Document navigation">
    <NSLink :href="link ?? normalizeLink(currentLang.link)" class="back-home">
      <span class="nsi-arrow-left back-home-icon"></span>
      <span>{{ theme.hamburgerHome || 'Home' }}</span>
    </NSLink>

    <div class="sidebar-items">
      <NSSidebarDocsItem v-for="item in sidebarItems" :key="item.text || item.link" :item="item" />
    </div>
  </nav>
</template>

<style scoped>
.NSSidebarDocs {
  flex-grow: 1;
  padding: 0;
  overflow-y: auto;
}

.NSSidebarDocs::-webkit-scrollbar {
  width: 0;
}

.back-home {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 1.5rem 0.25rem;
  padding: 0.6rem;
  font-weight: 600;
  color: var(--ns-sidebar-muted-color);
  opacity: 0.8;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  user-select: none;
  text-decoration: none;
}

.back-home:hover {
  background-color: var(--ns-sidebar-hover-bg);
  opacity: 1;
}

.back-home-icon {
  font-size: 0.85em;
}

.sidebar-items {
  padding: 0 1.5rem;
}

@media (min-width: 1650px) {
  .back-home {
    margin: 0 2.75rem 0.5rem;
  }

  .sidebar-items {
    padding: 0 2.75rem;
  }
}
</style>
