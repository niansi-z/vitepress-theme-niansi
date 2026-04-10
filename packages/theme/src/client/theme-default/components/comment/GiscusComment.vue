<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import { useData, useRoute } from 'vitepress'
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'

const props = defineProps<{
  options: NiansiTheme.GiscusCommentOptions
}>()

const { isDark } = useData()
const route = useRoute()
const containerRef = ref<HTMLElement>()

function getTheme() {
  return isDark.value ? 'dark' : 'light'
}

function loadGiscus() {
  if (!containerRef.value) return
  containerRef.value.innerHTML = ''

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', props.options.repo)
  script.setAttribute('data-repo-id', props.options.repoId)
  script.setAttribute('data-category', props.options.category)
  script.setAttribute('data-category-id', props.options.categoryId)
  script.setAttribute('data-mapping', props.options.mapping ?? 'pathname')
  script.setAttribute('data-strict', props.options.strict ?? '0')
  script.setAttribute('data-reactions-enabled', props.options.reactionsEnabled ?? '1')
  script.setAttribute('data-emit-metadata', props.options.emitMetadata ?? '0')
  script.setAttribute('data-input-position', props.options.inputPosition ?? 'top')
  script.setAttribute('data-theme', getTheme())
  script.setAttribute('data-lang', props.options.lang ?? 'zh-CN')
  script.setAttribute('data-loading', props.options.loading ?? 'lazy')
  script.crossOrigin = 'anonymous'
  script.async = true

  containerRef.value.appendChild(script)
}

function updateTheme() {
  const iframe = containerRef.value?.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
  iframe?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: getTheme() } } },
    'https://giscus.app'
  )
}

onMounted(() => {
  loadGiscus()
})

watch(() => route.path, () => {
  nextTick(() => loadGiscus())
})

watch(isDark, () => {
  updateTheme()
})
</script>

<template>
  <div ref="containerRef" class="giscus-comment" />
</template>
