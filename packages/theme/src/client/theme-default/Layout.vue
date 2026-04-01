<script setup lang="ts">
import NSSidebar from './components/NSSidebar.vue'
import NSContent from './components/NSContent.vue'
import { registerWatchers } from './composables/layout'
import NSBackToTopButton from './components/NSBackToTopButton.vue'

registerWatchers()
</script>

<template>
  <NSSidebar>
    <template #sidebar-menu-before><slot name="sidebar-menu-before" /></template>
    <template #sidebar-menu-after><slot name="sidebar-menu-after" /></template>
  </NSSidebar>
  <NSContent>
    <template #not-found><slot name="not-found" /></template>

    <template #page-top><slot name="page-top" /></template>
    <template #page-bottom><slot name="page-bottom" /></template>

    <template #home-top><slot name="home-top" /></template>
    <template #articleList-top><slot name="articleList-top" /></template>
    <template #articleList-bottom><slot name="articleList-bottom" /></template>
    <template #home-bottom><slot name="home-bottom" /></template>

    <template #doc-top><slot name="doc-top" /></template>
    <template #doc-header-top><slot name="doc-header-top" /></template>
    <template #doc-header-bottom><slot name="doc-header-bottom" /></template>
    <template #doc-content-top><slot name="doc-content-top" /></template>
    <template #doc-content-bottom><slot name="doc-content-bottom" /></template>
    <template #doc-tail-top><slot name="doc-tail-top" /></template>
    <template #doc-tail-bottom><slot name="doc-tail-bottom" /></template>
    <template #doc-bottom><slot name="doc-bottom" /></template>

    <template #doc-recent-updates-top><slot name="doc-recent-updates-top" /></template>
    <template #doc-recent-updates-bottom><slot name="doc-recent-updates-bottom" /></template>
    <template #doc-hot-tags-top><slot name="doc-hot-tags-top" /></template>
    <template #doc-hot-tags-bottom><slot name="doc-hot-tags-bottom" /></template>
    <template #doc-outline-top><slot name="doc-outline-top" /></template>
    <template #doc-outline-bottom><slot name="doc-outline-bottom" /></template>
  </NSContent>

  <NSBackToTopButton />
</template>

<style scoped></style>
