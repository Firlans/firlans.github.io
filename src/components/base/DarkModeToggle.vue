<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

function toggleDark() {
  isDark.value = !isDark.value
  updateTheme()
}

function updateTheme() {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
  }
}

onMounted(() => {
  // Check local storage or system preference
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
  } else {
    isDark.value = false
  }
  updateTheme()
})
</script>

<template>
  <button
    @click="toggleDark"
    class="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-xl border border-slate-200 dark:border-slate-700 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center w-14 h-14"
    aria-label="Toggle Dark Mode"
  >
    <i v-if="!isDark" class="fas fa-moon text-xl"></i>
    <i v-else class="fas fa-sun text-xl text-yellow-400"></i>
  </button>
</template>
