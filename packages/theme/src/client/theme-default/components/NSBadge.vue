<script setup lang="ts">
interface Props {
  text?: string
  type?: 'info' | 'tip' | 'warning' | 'danger' | 'important' | 'note'
}
withDefaults(defineProps<Props>(), {
  type: 'tip'
})
</script>

<template>
  <span class="NSBadge" :class="type">
    <slot>{{ text }}</slot>
  </span>
</template>

<style scoped>
.NSBadge {
  display: inline-block;
  height: 18px;
  font-size: 14px;
  line-height: 18px;
  transition:
    background 0.3s ease,
    color 0.3s ease;
  border-radius: 3px;
  padding: 0 6px;
}

h1 .NSBadge,
h2 .NSBadge,
h3 .NSBadge,
h4 .NSBadge,
h5 .NSBadge,
h6 .NSBadge {
  vertical-align: top;
}

.NSBadge + .NSBadge {
  margin-inline-start: 5px;
}

.NSBadge.info {
  color: var(--ns-badge-info-text);
  background: var(--ns-badge-info-bg);
}

.NSBadge.tip {
  color: var(--ns-badge-tip-text);
  background: var(--ns-badge-tip-bg);
}

.NSBadge.warning {
  color: var(--ns-badge-warning-text);
  background: var(--ns-badge-warning-bg);
}

.NSBadge.danger {
  color: var(--ns-badge-danger-text);
  background: var(--ns-badge-danger-bg);
}

.NSBadge.important {
  color: var(--ns-badge-important-text);
  background: var(--ns-badge-important-bg);
}

.NSBadge.note {
  color: var(--ns-badge-note-text);
  background: var(--ns-badge-note-bg);
}
</style>
