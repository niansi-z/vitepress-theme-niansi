<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <button type="button" class="NSTopBarSearchButton">
    <span class="nsi-search" aria-hidden="true"></span>
    <span class="text">{{ text }}</span>
    <span class="keys" aria-hidden="true">
      <kbd class="key-cmd">&#x2318;</kbd>
      <kbd class="key-ctrl">Ctrl</kbd>
      <kbd>K</kbd>
    </span>
  </button>
</template>

<style scoped>
.NSTopBarSearchButton {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 200px;
  height: 2rem;
  padding: 8px 14px;
  font-size: 20px;
}

.text,
.keys,
:root.mac .key-ctrl,
:root:not(.mac) .key-cmd {
  display: none;
}

kbd {
  font-family: inherit;
  font-weight: 500;
}

@media (min-width: 850px) {
  .NSTopBarSearchButton {
    padding: 4px 8px;
    border-radius: 2rem;
    font-size: 14px;
    line-height: 1;
    color: var(--ns-text-muted-color);
    border: 1px solid var(--ns-divider-color);
  }

  .text {
    display: inline;
    font-size: 13px;
  }

  .keys {
    display: flex;
    align-items: center;
    margin-left: auto;
    gap: 4px;
    padding: 4px 6px;
    border-radius: 4px;
    font-size: 12px;
    background-color: var(--ns-search-button-color);
  }
}

@media (max-width: 849px) {
  .NSTopBarSearchButton {
    width: auto;
  }
}
</style>
