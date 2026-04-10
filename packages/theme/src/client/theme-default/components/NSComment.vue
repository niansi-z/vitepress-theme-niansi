<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useData } from 'vitepress'

const { theme } = useData()

const commentComponents: Record<string, ReturnType<typeof defineAsyncComponent>> = {
  Waline: defineAsyncComponent(() => import('./comment/WalineComment.vue')),
  Giscus: defineAsyncComponent(() => import('./comment/GiscusComment.vue'))
}
</script>

<template>
  <div v-if="theme.commentPlugin?.provider" class="NSComment">
    <component
      :is="commentComponents[theme.commentPlugin.provider]"
      :options="theme.commentPlugin.options"
    />
  </div>
</template>

<style scoped>
.NSComment {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--ns-divider-color);
}
</style>
