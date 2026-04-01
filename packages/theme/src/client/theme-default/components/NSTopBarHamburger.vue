<script setup lang="ts">
import { useData } from 'vitepress'
import { useTopBarTitle } from '../composables/useTopBarTitle'
import { useLayout } from '../composables/layout'
import NSLink from './NSLink.vue'

const { crumbTitle } = useTopBarTitle()
const { isHome } = useLayout()
const { theme } = useData()
</script>

<template>
  <nav class="NSTopBarHamburger" role="navigation" aria-label="Breadcrumb">
    <template v-if="isHome">
      <span class="home" aria-current="page">{{ theme?.hamburgerHome ?? 'Home' }}</span>
    </template>
    <template v-else>
      <NSLink class="router-link" href="/" :aria-label="theme?.hamburgerHome ?? 'Home'">{{
        theme?.hamburgerHome ?? 'Home'
      }}</NSLink>
      <span class="sep" aria-hidden="true">/</span>
      <span class="crumb" aria-current="page">{{ crumbTitle }}</span>
    </template>
  </nav>
</template>

<style scoped>
.NSTopBarHamburger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: var(--ns-text-muted-color);
}

.router-link {
  color: var(--ns-link-color);
}

.router-link:hover {
  color: var(--ns-hover-color);
  border-bottom: 1px solid var(--ns-hover-color);
  text-decoration: none;
  margin-bottom: -1px;
}

.sep {
  color: var(--ns-text-muted-color);
}

.crumb {
  width: 300px;
  font-weight: 600;
  color: var(--ns-heading-color, #222);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 849px) {
  .NSTopBarHamburger {
    display: none;
  }
}
</style>
