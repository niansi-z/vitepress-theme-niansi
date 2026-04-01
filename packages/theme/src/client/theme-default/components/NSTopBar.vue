<script setup lang="ts">
import NSTopBarHamburger from './NSTopBarHamburger.vue'
import NSTopBarSearch from './NSTopBarSearch.vue'
import NsTopMenu from './NSTopMenu.vue'
import NSTopBarTitle from './NSTopBarTitle.vue'
</script>

<template>
  <div class="NSTopBar">
    <div class="container">
      <NSTopBarHamburger />
      <NsTopMenu />
      <NSTopBarTitle />
      <NSTopBarSearch />
    </div>
  </div>
</template>

<style scoped>
.NSTopBar {
  position: sticky;
  background: var(--ns-main-bg);
  z-index: 10;
  top: 0;
  height: 3.5rem;
}

.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--ns-main-border-color);
}

@media (min-width: 992px) {
  .container {
    padding: 0 1rem;
  }
}
</style>
