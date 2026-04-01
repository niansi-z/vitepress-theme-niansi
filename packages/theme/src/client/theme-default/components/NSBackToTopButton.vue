<script setup lang="ts">
import { useData } from 'vitepress'
import { onMounted, ref } from 'vue'
import NSBackToTop from './icons/NSBackToTop.vue'

const { theme } = useData()
const scrollProgress = ref(0)
const isVisible = ref(false)

const radius = 24
const circumference = 2 * Math.PI * radius
const VISIBLE_THRESHOLD = 50

function updateScrollProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight

  const percent = docHeight === 0 ? 0 : scrollTop / docHeight
  scrollProgress.value = percent * circumference

  isVisible.value = scrollTop > VISIBLE_THRESHOLD
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress)
})
</script>

<template>
  <button
    v-show="isVisible"
    type="button"
    class="NSBackToTopButton"
    :aria-label="theme.returnToTopLabel || 'Return to top'"
    @click="scrollToTop"
  >
    <span class="scroll-progress">
      <svg>
        <circle
          cx="26"
          cy="26"
          r="24"
          fill="none"
          stroke="currentColor"
          stroke-width="4"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="circumference - scrollProgress"
        ></circle>
      </svg>
    </span>
    <NSBackToTop class="icon" />
  </button>
</template>

<style scoped>
.NSBackToTopButton {
  position: fixed;
  padding: 12px;
  bottom: 4rem;
  width: 48px;
  height: 48px;
  inset-inline-end: 1rem;
  z-index: 29;
  background: var(--ns-main-bg);
  color: var(--ns-link-color);
  box-shadow: 2px 2px 10px 4px var(--ns-back-to-top-shadow);
  cursor: pointer;
  border-width: 0;
  border-radius: 50%;
}

.scroll-progress {
  position: absolute;
  bottom: -2px;
  inset-inline-end: -2px;
  width: 52px;
  height: 52px;
}

.scroll-progress svg {
  width: 100%;
  height: 100%;
}

.scroll-progress circle {
  opacity: 0.9;
  transform-origin: 50%;
  transform: rotate(-90deg);
}

.icon {
  width: 100%;
  height: 100%;
}
</style>
