<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'

const props = defineProps<{
  options: NiansiTheme.TwikooCommentOptions
}>()

const route = useRoute()
const containerRef = ref<HTMLElement>()

async function initTwikoo() {
  if (typeof window === 'undefined' || !containerRef.value) return
  containerRef.value.innerHTML = ''

  const twikoo = await import('twikoo')
  twikoo.init({
    el: containerRef.value,
    ...props.options
  })
}

onMounted(() => {
  initTwikoo()
})

watch(
  () => route.path,
  () => {
    nextTick(() => initTwikoo())
  }
)
</script>

<template>
  <div ref="containerRef" class="twikoo-comment" />
</template>
