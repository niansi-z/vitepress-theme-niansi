<script setup lang="ts">
import { computed, ref } from 'vue'
import {useData} from "vitepress";

interface CommitInfo {
  shortHash: string
  subject: string
  dateIso: string
}

const props = defineProps<{
  commits?: CommitInfo[]
}>()

const { theme } = useData()

const commitsList = computed<CommitInfo[]>(() => props.commits ?? [])

const isExpanded = ref(false)

const lastCommit = computed<CommitInfo | undefined>(() => commitsList.value[0])

const toggle = () => {
  isExpanded.value = !isExpanded.value
}

function formatDateTime(dateIso: string): string {
  // 折叠时显示：年月日 时分
  const match = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/.exec(dateIso)
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]} ${match[4]}:${match[5]}`
  }
  return dateIso
}

function formatDate(dateIso: string): string {
  // 展开后显示：年月日
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateIso)
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`
  }
  return dateIso
}
</script>

<template>
  <div class="NSChangelog ns-changelog-wrapper">
    <div class="changelog-header" @click="toggle">
      <div class="changelog-header-left">
        <span class="nsi-changelog" :class="{ expanded: isExpanded }"></span>
        <span class="last-updated">
          {{ formatDateTime(lastCommit?.dateIso ?? '') }}
        </span>
      </div>
      <div class="changelog-header-right" :class="{ expanded: isExpanded }">
        <span class="nsi-changelog-menu"></span>
        <span class="toggle-text">{{theme.changelog?.desc ?? 'View All Changelog'}}</span>
      </div>
    </div>
    <ul v-if="isExpanded" class="changelog-list">
      <li v-for="commit in commitsList" :key="commit.shortHash" class="changelog-item">
        <span class="commit-hash">{{ commit.shortHash }}</span>
        <span class="commit-separator">-</span>
        <span class="commit-subject">{{ commit.subject }}</span>
        <span class="commit-time">{{ formatDate(commit.dateIso) }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.ns-changelog-wrapper {
  border-radius: 0.5rem;
  overflow: hidden;
  background: var(--ns-changelog-bg);
}

.changelog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;
  user-select: none;
}

.changelog-header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.last-updated {
  font-weight: bold;
}

.changelog-header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: bold;
}

.changelog-list {
  padding: 1rem;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.changelog-item {
  position: relative;
  padding-inline-start: 1.25rem;
  font-size: 0.8125rem;
}

.changelog-item::before {
  content: '';
  width: 1em;
  height: 1rem;
  mask-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m3-9v6m0 6v6'/%3E%3C/svg%3E");
  background-color: currentColor;
  position: absolute;
  top: 4px;
  left: 0;
  mask-size: 100% 100%;

}

.commit-hash {
  color: var(--ns-text-muted-color);
  background: var(--ns-changelog-hash-bg);
  padding: 3px 6px;
  border-radius: 4px;
  margin-right: 0.5rem;
}

.commit-separator {
  color: var(--ns-text-muted-color);
  margin-right: 0.5rem;
}

.commit-subject {
  color: var(--ns-text-color);
  margin-right: 0.5rem;
}

.commit-time {
  color: var(--ns-text-muted-color);
  white-space: nowrap;
}
</style>
