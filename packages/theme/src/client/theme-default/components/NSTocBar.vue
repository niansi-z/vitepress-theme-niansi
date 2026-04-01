<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vitepress'
import { usePosts } from '../composables/usePosts'
import NSTopBarMenu from './icons/NSTopBarMenu.vue'

const NSTocBarBox = defineAsyncComponent(() => import('./NSTocBarBox.vue'))

const isVisible = ref(false)
const showBox = ref(false)
const { getPostByUrl } = usePosts()
const route = useRoute()
const post = computed(() => getPostByUrl(route.path))

let observer: IntersectionObserver | null = null

onMounted(() => {
  const headerEl = document.querySelector('.NSDoc > header') as Element | null
  if (headerEl) {
    observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0]
        isVisible.value = !e.isIntersecting
      },
      { root: null, threshold: 0 }
    )
    observer.observe(headerEl)
  } else {
    isVisible.value = false
  }
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <div :class="['NSTocBar', { visible: isVisible }]">
    <div class="title" aria-hidden="true">{{ post?.title ?? '' }}</div>
    <button
      aria-label="Open table of contents"
      :aria-expanded="showBox"
      aria-controls="toc-list"
      @click="showBox = true"
    >
      <NSTopBarMenu class="icon" />
    </button>
    <NSTocBarBox v-if="showBox" @close="showBox = false" :title="post?.title ?? ''" />
  </div>
</template>

<style scoped>
.NSTocBar {
  position: sticky;
  top: 4rem;
  justify-content: space-between;
  align-items: center;
  margin: 0 -1rem;
  height: 3rem;
  padding: 0 1rem;
  background: var(--ns-main-bg);
  border: 1px solid var(--ns-border-color);
  border-radius: 10px;
  z-index: 10;
  display: none;
}

.NSTocBar.visible {
  display: flex;
}

.NSTocBar .title {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
}

.icon {
  width: 1rem;
  height: 1rem;
}

@media (min-width: 1200px) {
  .NSTocBar,
  .NSTocBar.visible {
    display: none !important;
  }
}
</style>
