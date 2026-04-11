<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useData } from 'vitepress'
import { useLangs } from '../composables/langs'
import NSMenuLink from './NSMenuLink.vue'

const { theme } = useData()
const { localeLinks, currentLang } = useLangs({ correspondingLink: true })

const showMenu = ref(false)
const btnRef = ref()
const menuRef = ref()

function onClickOutside(e: MouseEvent) {
  if (!btnRef.value?.contains(e.target) && !menuRef.value?.contains(e.target)) {
    showMenu.value = false
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('click', onClickOutside)
}

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('click', onClickOutside)
  }
})
</script>

<template>
  <div v-if="localeLinks.length && currentLang.label" class="NSTranslations" style="position: relative">
    <button
      ref="btnRef"
      class="nsi-languages NSTranslationsBtn"
      @click.stop="showMenu = !showMenu"
      :aria-label="theme.langMenuLabel || 'Change language'"
    />
    <div v-if="showMenu" ref="menuRef" class="NSTranslationsMenu">
      <div class="NSTranslationsMenuInner">
        <div class="NSTranslationsMenuTitle">{{ currentLang.label }}</div>
        <template v-for="locale in localeLinks" :key="locale.link">
          <NSMenuLink :item="locale" @click="showMenu = false" />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.NSTranslations {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  color: var(--ns-sidebar-muted-color);
  text-decoration: none;
  transition: color 0.25s;
}

.NSTranslationsBtn {
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.NSTranslationsMenu {
  position: absolute;
  bottom: 100%;
  left: 0;
  z-index: 1000;
  background: var(--ns-sidebar-bg);
  border: 1px solid var(--ns-sidebar-border-color);
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 0.5rem;
  min-width: 140px;
}
.NSTranslationsMenuInner {
  padding: 0.5rem 0;
}
.NSTranslationsMenuTitle {
  padding: 0.6rem;
  font-weight: 600;
  color: var(--ns-sidebar-muted-color);
}

.icon {
  display: block;
  width: 1rem;
  height: 1rem;
}
</style>
