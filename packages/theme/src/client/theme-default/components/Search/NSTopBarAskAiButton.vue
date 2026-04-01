<template>
  <button type="button" class="NSTopBarAskAiButton">
    <span class="nsi-sparkles" aria-hidden="true"></span>
  </button>
</template>

<style scoped>
.NSTopBarAskAiButton {
  display: flex;
  align-items: center;
  height: 2rem;
  padding: 0.5rem 0.875rem;
  font-size: 20px;
}

@media (min-width: 850px) {
  .NSTopBarAskAiButton {
    height: 2rem;
    width: 2rem;
    padding: 8px;
    transition: color 0.3s ease;
    background: var(--ns-search-button-color);
    border-radius: 50%;
    font-size: 1rem;
    color: var(--ns-text-muted-color);
  }
}
</style>
