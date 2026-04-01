<script setup lang="ts">
import { computed } from 'vue'
import { EXTERNAL_URL_RE } from '../../shared'
import { normalizeLink } from '../support/utils'

const props = defineProps<{
  tag?: string
  href?: string
  noIcon?: boolean
  target?: string
  rel?: string
}>()

const tag = computed(() => props.tag ?? (props.href ? 'a' : 'span'))
const isExternal = computed(() => (props.href && EXTERNAL_URL_RE.test(props.href)) || props.target === '_blank')
</script>

<template>
  <component
    :is="tag"
    class="NSLink"
    :class="{
      link: href,
      'ns-external-link-icon': isExternal,
      'no-icon': noIcon
    }"
    :href="href ? normalizeLink(href) : undefined"
    :target="target ?? (isExternal ? '_blank' : undefined)"
    :rel="rel ?? (isExternal ? 'noreferrer' : undefined)"
  >
    <slot />
  </component>
</template>
