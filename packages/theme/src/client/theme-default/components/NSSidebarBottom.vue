<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, inject, nextTick, onMounted, ref, watchPostEffect } from 'vue'
import type { NiansiTheme } from 'vitepress-theme-niansi/theme'
import NSDarkIcon from './icons/NSDarkIcon.vue'
import NSLightIcon from './icons/NSLightIcon.vue'
import NSTranslations from './NSTranslations.vue'

const { theme, isDark, site } = useData()
const root = ref<HTMLElement>()
const switchTitle = ref('')

const showAppearanceSwitch = computed(() => {
  const appearance = site.value.appearance
  return !!appearance && appearance !== 'force-dark' && appearance !== 'force-auto'
})

const toggleAppearance = inject<() => void>('toggle-appearance', () => {
  isDark.value = !isDark.value
})

const socialLinks = computed<NiansiTheme.SocialLink[]>(() => {
  if (Array.isArray(theme.value.socialLinks) && theme.value.socialLinks.length) {
    return theme.value.socialLinks as NiansiTheme.SocialLink[]
  }

  return []
})

function iconHtml(icon: NiansiTheme.SocialLink['icon']) {
  if (typeof icon === 'object') {
    return icon.svg
  }
  return `<span class="nsi-social-${icon}"></span>`
}

watchPostEffect(() => {
  switchTitle.value = isDark.value
    ? theme.value.lightModeSwitchTitle || 'Switch to light theme'
    : theme.value.darkModeSwitchTitle || 'Switch to dark theme'
})

onMounted(async () => {
  await nextTick()

  const links = root.value?.querySelectorAll<HTMLAnchorElement>('.NSSidebarSocialLink')
  if (!links) {
    return
  }

  for (const item of links) {
    const icon = item.dataset.icon
    const span = item.children[0]

    if (!icon || !(span instanceof HTMLElement)) {
      continue
    }

    if (!span.className.startsWith('nsi-social-')) {
      continue
    }

    if ((getComputedStyle(span).maskImage || getComputedStyle(span).webkitMaskImage) === 'none') {
      span.style.setProperty('--icon', `url('https://api.iconify.design/simple-icons/${icon}.svg')`)
    }
  }
})
</script>

<template>
  <div ref="root" class="NSSidebarBottom">
    <div v-if="showAppearanceSwitch || socialLinks.length" class="NSSidebarSocialLinks">
      <button
        v-if="showAppearanceSwitch"
        type="button"
        class="NSSidebarAction"
        :class="{ 'is-with-divider': socialLinks.length > 0 }"
        role="switch"
        :title="switchTitle"
        :aria-label="switchTitle"
        :aria-checked="isDark"
        @click="toggleAppearance"
      >
        <NSDarkIcon v-if="isDark" />
        <NSLightIcon v-else />
      </button>

      <NSTranslations />

      <a
        v-for="item in socialLinks"
        :key="item.link"
        class="NSSidebarSocialLink"
        :href="item.link"
        :aria-label="item.ariaLabel ?? (typeof item.icon === 'string' ? item.icon : '')"
        :data-icon="typeof item.icon === 'string' ? item.icon : undefined"
        target="_blank"
        rel="noopener"
        v-html="iconHtml(item.icon)"
      ></a>
    </div>
  </div>
</template>

<style scoped>
.NSSidebarBottom {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
  border-top: 1px solid var(--ns-sidebar-border-color);
}

.NSSidebarAction {
  all: unset;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  color: var(--ns-sidebar-muted-color);
}

.NSSidebarAction.is-with-divider::after {
  content: '';
  position: absolute;
  right: -7px;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--ns-sidebar-muted-color);
}

.NSSidebarAction > svg {
  width: 20px;
  height: 20px;
}

.NSSidebarSocialLinks {
  width: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  justify-items: center;
  gap: 0.5rem;
}

.NSSidebarSocialLink {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  color: var(--ns-sidebar-muted-color);
  text-decoration: none;
  transition: color 0.25s;
}

.NSSidebarSocialLink:hover {
  color: var(--ns-sidebar-active-color);
}

.NSSidebarSocialLink > :deep(svg),
.NSSidebarSocialLink > :deep([class^='nsi-social-']) {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.NSSidebarSocialLink > :deep([class^='nsi-social-']) {
  -webkit-mask: var(--icon) no-repeat;
  mask: var(--icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
}
</style>
