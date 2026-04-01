import { useMediaQuery } from '@vueuse/core'
import { computed } from 'vue'

export function useAside() {
  const is850 = useMediaQuery('(min-width: 850px)')
  const is1200 = useMediaQuery('(min-width: 1200px)')

  const isAsideEnabled = computed(() => {
    if (!is1200.value && !is850.value) {
      return false
    }

    return is1200.value
  })

  return {
    isAsideEnabled
  }
}
