import { ref } from 'vue'

const isSidebarOpen = ref(false)

export function useSidebar() {
  function openSidebar() {
    isSidebarOpen.value = true
  }

  function closeSidebar() {
    isSidebarOpen.value = false
  }

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  return {
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar
  }
}
