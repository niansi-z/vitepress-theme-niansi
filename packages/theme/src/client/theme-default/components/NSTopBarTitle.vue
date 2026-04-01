<script setup lang="ts">
import { useTopBarTitle } from '../composables/useTopBarTitle'

const { crumbTitle } = useTopBarTitle()
</script>

<template>
  <div class="NSTopBarTitle" role="heading" aria-level="2" :aria-label="crumbTitle" :title="crumbTitle">
    {{ crumbTitle }}
  </div>
</template>

<style scoped>
.NSTopBarTitle {
  display: none;
  font-size: 1.1rem;
  font-weight: 600;
  width: 70%;
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 849px) {
  .NSTopBarTitle {
    display: block;
  }
}
</style>
