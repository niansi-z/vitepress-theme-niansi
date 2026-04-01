<script setup lang="ts">
import { useData } from 'vitepress'
import NsTopBar from './NSTopBar.vue'
import NotFound from '../NotFound.vue'
import NSPage from './NSPage.vue'
import NSHome from './NSHome.vue'
import NSDoc from './NSDoc.vue'
import NSFooter from './NSFooter.vue'
import NSAside from './NSAside.vue'
import { usePosts } from '../composables/usePosts'
import NSSkipLink from './NSSkipLink.vue'

const { page, frontmatter } = useData()
const { tagGroups, categoryGroups } = usePosts()
</script>

<template>
  <div id="NSContent" class="NSContent">
    <NSSkipLink />
    <div class="container">
      <NsTopBar />
      <div class="main">
        <slot name="not-found" v-if="page.isNotFound"><NotFound class="NSMain" /></slot>
        <NSPage v-else-if="frontmatter.layout === 'page'" class="NSMain">
          <template #page-top><slot name="page-top" /></template>
          <template #page-bottom><slot name="page-bottom" /></template>
        </NSPage>

        <NSHome v-else-if="frontmatter.layout === 'home'" class="NSMain">
          <template #home-top><slot name="home-top" /></template>
          <template #articleList-top><slot name="articleList-top" /></template>
          <template #articleList-bottom><slot name="articleList-bottom" /></template>
          <template #home-bottom><slot name="home-bottom" /></template>
        </NSHome>

        <component
          v-else-if="frontmatter.layout && frontmatter.layout !== 'doc'"
          :is="frontmatter.layout"
          class="NSMain"
        />

        <NSDoc v-else class="NSMain">
          <template #doc-top><slot name="doc-top" /></template>

          <template #doc-header-top><slot name="doc-header-top" /></template>
          <template #doc-header-bottom><slot name="doc-header-bottom" /></template>

          <template #doc-content-top><slot name="doc-content-top" /></template>
          <template #doc-content-bottom><slot name="doc-content-bottom" /></template>

          <template #doc-tail-top><slot name="doc-tail-top" /></template>
          <template #doc-tail-bottom><slot name="doc-tail-bottom" /></template>

          <template #doc-bottom><slot name="doc-bottom" /></template>
        </NSDoc>

        <NSAside :tag-groups="tagGroups" :category-groups="categoryGroups">
          <template #doc-recent-updates-top><slot name="doc-recent-updates-top" /></template>
          <template #doc-recent-updates-bottom><slot name="doc-recent-updates-bottom" /></template>

          <template #doc-hot-tags-top><slot name="doc-hot-tags-top" /></template>
          <template #doc-hot-tags-bottom><slot name="doc-hot-tags-bottom" /></template>

          <template #doc-outline-top><slot name="doc-outline-top" /></template>
          <template #doc-outline-bottom><slot name="doc-outline-bottom" /></template>
        </NSAside>
      </div>

      <NSFooter />
    </div>
  </div>
</template>

<style scoped>
.NSContent {
  position: relative;
  padding-left: 0;
  padding-right: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 calc(1.5rem * 0.5);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.main {
  display: flex;
  flex-grow: 1;
}

.NSMain {
  width: 100%;
  max-width: 100%;
  padding: 0 calc(1.5rem * 0.5);
  line-height: 1.75;
  flex: 0 0 auto;
  margin-top: 2rem;
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 850px) {
  .NSContent {
    margin-left: 260px;
  }

  .NSMain {
    margin-top: 2.5rem;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }

  .NSMain {
    width: 91.66666667%;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }

  .NSMain {
    width: 75%;
    padding: 0 0.25rem;
  }
}

@media (min-width: 1400px) {
  .container {
    max-width: 1320px;
  }
}

@media (min-width: 768px) {
  .NSMain {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1650px) {
  .NSContent {
    margin-left: 300px;
  }

  .container {
    max-width: 1250px;
    padding: 0 1.75rem;
  }

  .NSMain {
    padding-right: 4.5rem;
  }
}

@media (max-width: 1199px) {
  .main {
    justify-content: center;
  }
}

@media (max-width: 849px) {
  .container {
    max-width: 100%;
  }
}
</style>
