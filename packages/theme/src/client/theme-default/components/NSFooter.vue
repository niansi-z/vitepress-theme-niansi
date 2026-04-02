<script setup lang="ts">
import { useData } from 'vitepress'

const { theme, frontmatter } = useData()
</script>

<template>
  <div v-if="theme.footer && frontmatter.footer !== false" class="NSFooter">
    <div class="container">
      <footer class="site-footer" role="contentinfo" aria-label="Site footer">
        <p v-if="theme.footer.copyright" v-html="theme.footer.copyright" />
        <p v-if="theme.footer.message" v-html="theme.footer.message" />
      </footer>
    </div>
  </div>
</template>

<style scoped>
.NSFooter {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
}

.container {
  width: 100%;
  max-width: 100%;
  flex: 0 0 auto;
}

.site-footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--ns-c-bg);
  height: 5rem;
  border-top: 1px solid var(--ns-main-border-color);
  font-size: 0.8rem;
  color: var(--ns-text-muted-color);
  margin-top: 3rem;
}

.site-footer p {
  margin: 0;
}

.site-footer :deep(a) {
  color: var(--ns-footer-link-color);
  border-bottom: 1px solid var(--ns-footer-link-color);
  text-decoration: none;
  font-weight: 600;
}

@media (min-width: 768px) {
  .container {
    padding: 0 1.5rem;
  }
}

@media (min-width: 992px) {
  .container {
    flex: 0 0 auto;
    width: 91.66666667%;
  }

  .site-footer {
    padding-bottom: 1rem;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  }
}

@media (min-width: 1200px) {
  .container {
    flex: 0 0 auto;
    width: 75%;
  }
}

@media (min-width: 1650px) {
  .container {
    padding-right: 4.5rem;
  }
}
</style>
