<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PostsTaxonomyGroup } from '../composables/usePosts'
import NSLink from './NSLink.vue'
import { useLayout } from '../composables/layout'
import { useData } from 'vitepress'
import { usePosts } from '../composables/usePosts'
import NSOutlineItem from './NSOutlineItem.vue'
import { resolveTitle, useActiveAnchor } from '../composables/outline'

const props = defineProps<{
  tagGroups: PostsTaxonomyGroup[]
  categoryGroups: PostsTaxonomyGroup[]
}>()

const { isHome, isPage, headers } = useLayout()
const { theme, localeIndex } = useData()

const { posts } = usePosts()

// 最近更新：最新 5 篇
const recentPosts = computed(() => posts.value.slice(0, 5))

// 热门标签：只展示前 10 个分组（由父组件传入的 tagGroups）
const hotTags = computed(() => (props.tagGroups ?? []).slice(0, 10))

const container = ref()

const getTagUrl = (tagName: string) => {
  const localePrefix = localeIndex.value === 'root' ? '' : `/${localeIndex.value}`
  const basePath = theme?.value?.tagPath ?? '/tags'
  return `${localePrefix}${basePath}/${encodeURIComponent(tagName)}`
}

useActiveAnchor(container)
</script>

<template>
  <aside class="NSAside" role="complementary" aria-label="Page aside">
    <section v-if="recentPosts.length" class="recent-updates" aria-labelledby="aside-recent-updates">
      <slot name="doc-recent-updates-top" />
      <h2 class="panel-heading">{{ theme?.recentlyUpdated ?? 'Recently Updated' }}</h2>
      <ul class="recent-list" role="list" aria-label="Recently updated posts">
        <li v-for="post in recentPosts" :key="post.url" role="listitem">
          <NSLink class="recent-link" :href="post.url">
            {{ post.title }}
          </NSLink>
        </li>
      </ul>
      <slot name="doc-recent-updates-bottom" />
    </section>
    <section v-if="hotTags.length" class="hot-tags" aria-labelledby="aside-trending-tags">
      <slot name="doc-hot-tags-top" />
      <h2 class="panel-heading">{{ theme?.trendingTags ?? 'Trending Tags' }}</h2>
      <div class="panel-mian" role="navigation" aria-label="Trending tags">
        <template v-for="tag in hotTags" :key="JSON.stringify(tag)">
          <NSLink class="tag" :href="getTagUrl(tag.name)" :aria-label="`Tag: ${tag.name}`">
            {{ tag.name }}
          </NSLink>
        </template>
      </div>
      <slot name="doc-hot-tags-bottom" />
    </section>

    <section v-if="!isHome && !isPage" class="outline" ref="container" aria-labelledby="aside-outline-title">
      <slot name="doc-outline-top" />
      <h2 class="panel-heading">{{ resolveTitle(theme) }}</h2>
      <nav class="outline-list" role="navigation" aria-label="On-page table of contents">
        <NSOutlineItem :headers :root="true" />
      </nav>
      <slot name="doc-outline-bottom" />
    </section>
  </aside>
</template>

<style scoped>
.NSAside {
  width: 100%;
  max-width: 100%;
  color: var(--ns-text-muted-color);
  padding: 0 calc(1.5rem * 0.5) 0 0.5rem;
  margin-top: 3rem;
  margin-bottom: 2rem;
}

section {
  padding-left: 1rem;
  margin-bottom: 2rem;
  border-left: 1px solid var(--ns-main-border-color);
}

.panel-heading {
  color: var(--ns-label-color);
  font-weight: 600;
}

.recent-list {
  font-size: 0.9rem;
  padding-left: 0;
  padding-bottom: 0.25rem;
  margin-top: 0.5rem;
  overflow-wrap: break-word;
}

.recent-list li {
  line-height: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recent-link:hover {
  color: var(--ns-link-hover-color);
  border-bottom: 1px solid var(--ns-link-hover-color);
  text-decoration: none;
  margin-bottom: -1px;
}

.panel-mian {
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 1rem 0.25rem 0;
}

.tag {
  display: inline-block;
  font-size: 0.85rem;
  min-width: 2rem;
  text-align: center;
  border-radius: 0.8rem;
  border: 1px solid var(--ns-btn-border-color);
  padding: 0.3rem 0.5rem;
  margin: 0 0.35rem 0.5rem 0;
  color: var(--ns-text-muted-color);
  line-height: 1.05rem;
}

.tag:not(:last-child) {
  margin-right: 0.2rem;
}

.tag:hover {
  color: var(--ns-btn-hover-color);
  background-color: var(--ns-btn-hover-bg);
  transition: all 0.3s ease-in;
  border-color: var(--ns-btn-hover-border-color);
}

.outline {
  position: sticky;
  top: 5rem;
  z-index: 1;
}

.outline.has-active::before {
  content: '';
  position: absolute;
  left: -1px;
  width: 1px;
  height: 1.25rem;
  background-color: var(--ns-outline-highlight-color);
  border-radius: 2px;
  top: var(--ns-outline-active-top);
  transform: translateY(-50%);
  z-index: 3;
}

.outline-list {
  font-size: 0.85rem;
  padding-left: 0;
  padding-bottom: 0.25rem;
  margin-top: 1rem;
  overflow-wrap: break-word;
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 0.5rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.outline-list::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}

@media (min-width: 1200px) {
  .NSAside {
    flex: 0 0 auto;
    width: 25%;
  }

  .panel-heading {
    scroll-margin-top: 2rem;
  }
}

@media (max-width: 1199px) {
  .NSAside {
    display: none;
  }
}
</style>
