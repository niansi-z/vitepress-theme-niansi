<script setup lang="ts">
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'
import { withBase } from 'vitepress'

defineProps<{
  image: NiansiTheme.ThemeableImage
  alt?: string
}>()

defineOptions({ inheritAttrs: false })
</script>

<template>
  <template v-if="image">
    <img
      v-if="typeof image === 'string' || 'src' in image"
      class="NSImage"
      v-bind="typeof image === 'string' ? $attrs : { ...image, ...$attrs }"
      :src="withBase(typeof image === 'string' ? image : image.src)"
      :alt="alt ?? (typeof image === 'string' ? '' : image.alt || '')"
    />
    <template v-else>
      <NSImage class="dark" :image="image.dark" :alt="image.alt" v-bind="$attrs" />
      <NSImage class="light" :image="image.light" :alt="image.alt" v-bind="$attrs" />
    </template>
  </template>
</template>

<style scoped>
html:not(.dark) .NSImage.dark {
  display: none;
}
.dark .NSImage.light {
  display: none;
}
</style>
