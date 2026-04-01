<script setup lang="ts">
import { computed } from 'vue'

type PaginationItem = number | 'ellipsis-left' | 'ellipsis-right'

const props = defineProps<{
  currentPage: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
}>()

const emit = defineEmits<{
  (event: 'change-page', page: number): void
}>()

const paginationItems = computed<PaginationItem[]>(() => {
  const total = props.totalPages
  const current = props.currentPage

  if (total <= 7) {
    return createRange(1, total)
  }

  if (current <= 4) {
    return [...createRange(1, 5), 'ellipsis-right', total]
  }

  if (current >= total - 3) {
    return [1, 'ellipsis-left', ...createRange(total - 4, total)]
  }

  return [1, 'ellipsis-left', current - 1, current, current + 1, 'ellipsis-right', total]
})

function changePage(targetPage: number) {
  if (targetPage < 1 || targetPage > props.totalPages || targetPage === props.currentPage) {
    return
  }

  emit('change-page', targetPage)
}

function handlePrevPage() {
  if (!props.hasPrevPage) {
    return
  }

  changePage(props.currentPage - 1)
}

function handleNextPage() {
  if (!props.hasNextPage) {
    return
  }

  changePage(props.currentPage + 1)
}

function createRange(start: number, end: number): number[] {
  const safeStart = Math.max(1, start)
  const safeEnd = Math.max(safeStart, end)

  return Array.from({ length: safeEnd - safeStart + 1 }, (_, index) => safeStart + index)
}
</script>

<template>
  <nav class="NSPagination" aria-label="Pagination">
    <button class="NSPagination-nav" :disabled="!hasPrevPage" aria-label="Previous page" @click="handlePrevPage">
      <span aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.59 30.59 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.59 30.59 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0"
          ></path>
        </svg>
      </span>
    </button>

    <ul class="NSPagination-list" role="list">
      <li v-for="item in paginationItems" :key="String(item) + '-' + currentPage">
        <span v-if="typeof item !== 'number'" class="NSPagination-ellipsis" aria-hidden="true">...</span>
        <button
          v-else
          class="NSPagination-page"
          :class="{ 'is-active': item === currentPage }"
          :aria-current="item === currentPage ? 'page' : undefined"
          :aria-label="item === currentPage ? `Page ${item}, current page` : `Go to page ${item}`"
          @click="changePage(item)"
        >
          {{ item }}
        </button>
      </li>
    </ul>

    <button class="NSPagination-nav" :disabled="!hasNextPage" aria-label="Next page" @click="handleNextPage">
      <span aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M340.864 149.312a30.59 30.59 0 0 0 0 42.752L652.736 512 340.864 831.872a30.59 30.59 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
          ></path>
        </svg>
      </span>
    </button>
  </nav>
</template>

<style scoped>
.NSPagination {
  margin-top: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.NSPagination-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}

.NSPagination-nav svg {
  width: 1em;
  height: 1em;
}

.NSPagination-nav,
.NSPagination-page {
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.5rem;
  border: 1px solid var(--ns-btn-border-color);
  background: var(--ns-button-bg);
  color: var(--ns-text-color);
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.NSPagination-page.is-active {
  color: var(--ns-link-color);
  border-color: var(--ns-link-color);
}

.NSPagination-nav:disabled,
.NSPagination-page:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.NSPagination-ellipsis {
  min-width: 2rem;
  height: 2rem;
  color: var(--ns-text-muted-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
