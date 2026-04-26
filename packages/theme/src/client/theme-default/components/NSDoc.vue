<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useData, useRoute } from 'vitepress'
import { Fancybox } from '@fancyapps/ui/dist/fancybox/'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import { usePosts } from '../composables/usePosts'
import { getDate } from '../support/utils'
import NSTocBar from './NSTocBar.vue'
import { useLayout } from '../composables/layout'
import NSTail from './NSTail.vue'
import NSPostNavigation from './NSPostNavigation.vue'
import NSComment from './NSComment.vue'
import NSChangelog from './NSChangelog.vue'

const { getPostByUrl } = usePosts()
const route = useRoute()
const { theme, page } = useData()
const { headers } = useLayout()

const post = computed(() => getPostByUrl(route.path))

const pageName = computed(() => route.path.replace(/[./]+/g, '_').replace(/_html$/, ''))

const hasLastUpdated = computed(() => page.value.lastUpdated)

onMounted(() => {
  Fancybox.bind('[data-fancybox]', {
    Carousel: {
      transition: 'slide',
      Toolbar: {
        display: {
          left: ['counter'],
          middle: ['zoomIn', 'zoomOut', 'toggle1to1', 'rotateCW', 'rotateCCW', 'flipX', 'flipY'],
          right: ['autoplay', 'thumbs', 'close']
        }
      }
    },
    Hash: false,
    hideScrollbar: true
  })
})

onUnmounted(() => {
  Fancybox.unbind('[data-fancybox]')
  Fancybox.close()
})
</script>

<template>
  <div class="NSDoc ns-doc" role="article" :aria-labelledby="'doc-title'">
    <slot name="doc-top" />
    <header class="doc-header">
      <slot name="doc-header-top" />
      <h1 id="doc-title" class="title">{{ post?.title ?? '' }}</h1>
      <div class="meta" role="note">
        <span v-if="post?.date">
          {{ theme?.postedMeta ?? 'Posted' }} <time :datetime="post?.date?.toString()">{{ getDate(post?.date) }}</time>
        </span>
        <span v-if="hasLastUpdated">
          {{ theme?.lastUpdatedText ?? 'Updated' }}
          <time :datetime="post?.lastUpdated?.toString()">{{ getDate(post?.lastUpdated) }}</time>
        </span>
        <div class="info">
          <span v-if="post?.author">
            {{ theme?.authorMeta ?? 'By' }} <em>{{ post?.author }}</em>
          </span>
          <span>
            <em>{{ post?.readTime }}</em> {{ theme?.readMeta ?? 'Read' }}
          </span>
        </div>
      </div>
      <slot name="doc-header-bottom" />
    </header>
    <NSTocBar v-if="headers.length" />
    <slot name="doc-content-top" />
    <Content :class="[pageName, theme.externalLinkIcon && 'external-link-icon-enabled']" />
    <slot name="doc-content-bottom" />

    <template v-if="(post as any).commit?.length">
      <h2 class="ns-doc-changelog" tabindex="-1">{{theme.changelog?.title ?? 'Changelog'}}</h2>
      <NSChangelog :commits="(post as any).commit ?? []" />
    </template>

    <NSTail :post>
      <template #doc-tail-top><slot name="doc-tail-top" /></template>
      <template #doc-tail-bottom><slot name="doc-tail-bottom" /></template>
    </NSTail>

    <NSPostNavigation :post />
    <slot name="doc-bottom" />

    <NSComment />
  </div>
</template>

<style scoped>
.doc-header {
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--ns-border-color);
}

.title {
  font-size: 2rem;
  color: var(--ns-heading-color);
  font-weight: 600;
  scroll-margin-top: 3.5rem;
}

.meta {
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: var(--ns-text-muted-color);
}

.meta time,
.info em {
  color: var(--ns-text-muted-highlight-color);
  font-weight: 600;
}

.meta > span + span:before {
  content: '•';
  padding: 0 0.25rem;
}

em {
  font-style: normal;
}

.info {
  display: flex;
  justify-content: space-between;
}

.ns-doc {
  margin-top: 2rem;
}
</style>
