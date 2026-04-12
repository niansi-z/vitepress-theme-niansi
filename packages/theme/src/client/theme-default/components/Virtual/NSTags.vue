<script setup lang="ts">
import { useData } from 'vitepress'
import NSLink from '../NSLink.vue'
import { usePosts } from '../../composables/usePosts'

const { theme, localeIndex } = useData()
const { tagGroups } = usePosts()

const getTagUrl = (tagName: string) => {
  const localePrefix = localeIndex.value === 'root' ? '' : `/${localeIndex.value}`
  const basePath = theme?.value?.tagPath ?? '/tags'
  return `${localePrefix}${basePath}/${encodeURIComponent(tagName)}`
}
</script>

<template>
  <div class="NSTags">
    <template v-for="tag in tagGroups" :key="JSON.stringify(tag)">
      <div>
        <NSLink class="tag" :href="getTagUrl(tag.name)">
          {{ tag.name }}
          <span class="text-muted">{{ tag.count }}</span>
        </NSLink>
      </div>
    </template>
  </div>
</template>

<style scoped>
.NSTags {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  border-radius: 0.7em;
  padding: 6px 8px 7px;
  margin-right: 0.8rem;
  line-height: 3rem;
  letter-spacing: 0;
  color: var(--ns-link-color);
  font-size: 1.08rem;
  border: 1px solid var(--ns-border-color);
  box-shadow: 0 0 3px 0 var(--ns-tag-shadow);
}

.tag:hover {
  color: var(--ns-link-hover-color);
  background-color: var(--ns-tag-hover);
  transition: background 0.35s ease-in-out;
}

.text-muted {
  margin-left: 0.6em;
  font-size: 0.7em;
  color: var(--ns-text-muted-color);
}

@media (min-width: 1200px) {
  .NSTags {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }

  .tag {
    font-size: 1rem;
  }
}
</style>
