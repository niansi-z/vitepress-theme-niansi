<script setup lang="ts">
import { useResizeObserver, useToggle } from '@vueuse/core'
import { ref, shallowRef, useId } from 'vue'

defineProps<{
  // Markdown preview 标题
  title: string
}>()

const [isExpanded, toggleExpanded] = useToggle(false)

const codeID = `ns-preview-${useId()}`

const codeContainer = shallowRef<HTMLDivElement>()
const height = ref('0')

function toggleCode() {
  toggleExpanded()
  height.value = isExpanded.value ? `${codeContainer.value!.clientHeight}px` : '0'
}

useResizeObserver(codeContainer, () => {
  if (isExpanded.value) {
    height.value = `${codeContainer.value!.clientHeight}px`
  }
})
</script>

<template>
  <div :class="['NSPreview', { 'is-expanded': isExpanded }]">
    <div class="ns-preview-showcase">
      <slot name="content" />
    </div>

    <div class="ns-preview-control">
      <div v-if="title" class="ns-preview-title">
        {{ decodeURIComponent(title) }}
      </div>

      <button
        type="button"
        class="ns-preview-toggle-button"
        title="Toggle code"
        aria-label="Toggle code"
        :aria-controls="codeID"
        :aria-expanded="isExpanded"
        @click="toggleCode"
      >
        <span class="nsi-preview-toggle-button ns-preview-toggle-icon"></span>
      </button>
    </div>

    <div :id="codeID" class="ns-preview-code-wrapper" :style="{ height }" data-allow-mismatch="attribute">
      <div class="ns-preview-code" ref="codeContainer">
        <slot name="code" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.NSPreview {
  margin: 0.75rem 0.5rem;
  border: 1px solid var(--ns-border-color);
  border-radius: 0.5rem;
}

.ns-preview-showcase {
  overflow: auto;
  padding: 8px 20px;
}

.ns-preview-control {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  border-top: 1px solid var(--ns-border-color);
  font-weight: 500;
  font-size: 0.75rem;
  white-space: nowrap;
  transition:
    background 0.3s ease,
    color 0.3s ease;
}

.ns-preview-title {
  flex: 1;
  padding-right: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ns-preview-toggle-button {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  padding: 0.4rem;
  border: none;
  background-color: transparent;
  color: var(--ns-text-muted-color);
  transition: color 0.3s ease;
  cursor: pointer;
}

.ns-preview-toggle-button:hover {
  color: var(--ns-text-color);
}

.ns-preview-toggle-icon {
  display: block;
  font-size: 1.125rem;
}

.ns-preview-code-wrapper {
  overflow: hidden;
  transition: height 0.3s ease;
}

.ns-preview-code :deep(div[class*='language-']) {
  margin: 0;
  border-top: 1px solid var(--ns-border-color);
  border-radius: 0 0 0.5rem 0.5rem;
}

@media (max-width: 1199px) {
  .ns-preview-code :deep(div[class*='language-']) {
    padding-left: 0;
  }

  .ns-preview-code :deep(div[class*='language-'] .line-numbers-wrapper) {
    display: none;
  }
}
</style>
