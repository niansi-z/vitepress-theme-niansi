<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'

const props = defineProps<{
  options: NiansiTheme.WalineCommentOptions
}>()

const commentRef = ref<HTMLElement>()
let walineInstance: { destroy: () => void } | null = null

const route = useRoute()

async function initWaline() {
  if (!commentRef.value) return
  const { init } = await import('@waline/client')
  await import('@waline/client/style')

  walineInstance?.destroy()
  walineInstance = init({
    el: commentRef.value,
    dark: '.dark',
    ...props.options
  }) as { destroy: () => void } | null
}

onMounted(() => {
  initWaline()
})

watch(() => route.path, () => {
  initWaline()
})

onUnmounted(() => {
  walineInstance?.destroy()
  walineInstance = null
})
</script>

<template>
  <div ref="commentRef" class="waline-comment" />
</template>

<style>
.waline-comment{
  --waline-theme-color: var(--ns-link-color);
  --waline-active-color: var(--ns-link-hover-color);
  --waline-white: var(--ns-color-white);
}
</style>