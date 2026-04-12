<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
import NSImage from './NSImage.vue'
import { useLangs } from '../composables/langs'
import { normalizeLink } from '../support/utils'

const { site, theme } = useData()
const { currentLang } = useLangs()

const link = computed(() =>
  typeof theme.value.logoLink === 'string' ? theme.value.logoLink : theme.value.logoLink?.link
)

const rel = computed(() => (typeof theme.value.logoLink === 'string' ? undefined : theme.value.logoLink?.rel))

const target = computed(() => (typeof theme.value.logoLink === 'string' ? undefined : theme.value.logoLink?.target))
</script>

<template>
  <header class="profile-wrapper" role="banner">
    <a
      class="avatar"
      :href="link ?? normalizeLink(currentLang.link)"
      :rel
      :target
      :aria-label="theme.siteTitle ?? site.title"
    >
      <NSImage v-if="theme.logo" class="logo" :image="theme.logo" />
    </a>
    <span class="site-title" v-if="theme.siteTitle" v-html="theme.siteTitle"></span>
    <span class="site-title" v-else-if="theme.siteTitle === undefined">{{ site.title }}</span>
    <span class="site-desc">{{ site.description }}</span>
  </header>
</template>

<style scoped>
.profile-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 2.5rem 0;
  transition: all 0.3s ease-in-out;
}

.site-title {
  font-family: inherit;
  font-weight: 900;
  width: fit-content;
  color: var(--ns-site-title-color);
  text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  font-size: 1.75rem;
  line-height: 1.2;
  letter-spacing: 0.035rem;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.site-desc {
  padding: 0 0.75rem;
  text-align: center;
  font-style: italic;
  color: var(--ns-site-subtitle-color);
}

@media (min-width: 850px) {
  .profile-wrapper {
    margin: 3rem 0;
  }

  .avatar {
    width: 7rem;
    height: 7rem;
    transition: transform 0.5s;
  }
}

@media (min-width: 1650px) {
  .profile-wrapper {
    margin: 3.5rem 0;
  }
}

.avatar {
  display: block;
  width: 6.5rem;
  height: 6.5rem;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: var(--ns-avatar-border-color) 0 0 0 2px;
  transform: translateZ(0);
}

:deep(.logo) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.avatar:hover :deep(.logo) {
  transform: scale(1.2);
}
</style>
