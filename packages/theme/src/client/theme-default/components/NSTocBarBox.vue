<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useScrollLock } from '@vueuse/core'
import { inBrowser } from 'vitepress'
import NSClose from './icons/NSClose.vue'
import { useLayout } from '../composables/layout'
import NSOutlineItem from './NSOutlineItem.vue'

const { headers } = useLayout()

defineProps<{
  title: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function onOutlineClick(e: Event) {
  const target = e.target as HTMLElement | null
  if (!target) return
  const link = target.closest('.outline-link') as HTMLElement | null
  if (link) emit('close')
}

const isLocked = useScrollLock(inBrowser ? document.body : null)

function checkWidth() {
  if (typeof window !== 'undefined' && window.innerWidth > 1199) {
    emit('close')
  }
}

onMounted(() => {
  isLocked.value = true
  checkWidth()
  window.addEventListener('resize', checkWidth)
})

onBeforeUnmount(() => {
  isLocked.value = false
  window.removeEventListener('resize', checkWidth)
})
</script>

<template>
  <Teleport to="body">
    <div ref="el" role="dialog" aria-modal="true" aria-label="Table of Contents" class="NSTocBarBox">
      <div class="backdrop" @click="$emit('close')" aria-hidden="true" />

      <div class="container">
        <div class="header">
          <div class="title">{{ title }}</div>
          <button class="close" @click="$emit('close')" aria-label="Close table of contents">
            <NSClose />
          </button>
        </div>
        <div class="content" @click="onOutlineClick">
          <NSOutlineItem class="NSTocBarBoxOutline" :headers :root="true" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.NSTocBarBox {
  position: fixed;
  z-index: 100;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.backdrop {
  position: absolute;
  inset: 0;
  background: var(--ns-backdrop-bg-color);
  transition: opacity 0.2s ease;
}

.container {
  color: var(--ns-text-color);
  background-color: var(--ns-card-bg);
  min-width: 20rem;
  max-width: 32rem;
  width: min(90vw, 32rem);
  font-size: 1.05rem;
  border: 1px solid var(--ns-toc-popup-border-color);
  border-radius: 10px;
  padding: 0;
  margin-top: 3rem;
  z-index: 1;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  will-change: transform, opacity;
  animation: slide-in 200ms ease both;
  overflow: hidden;
}

.container:after {
  content: '';
  display: flex;
  position: relative;
  height: 2rem;
  background: linear-gradient(transparent, var(--ns-card-bg) 70%);
  z-index: 99;
}

.header {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-bottom: 1px solid var(--ns-main-border-color);
}

.title {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-left: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.close {
  margin: 0.25rem;
  opacity: 0.75;
}

.content {
  overflow: auto;
  max-height: calc(100vh - 12rem);
  margin-bottom: -2rem;
  padding: 1rem 1.5rem 1.5rem;
}

.NSTocBarBoxOutline {
  margin-left: 1.5rem;
}

@media (min-width: 850px) {
  .container {
    margin-left: 260px;
  }
}

@keyframes slide-in {
  0% {
    opacity: 0.7;
    transform: translateY(-3rem);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
