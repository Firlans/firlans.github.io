<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: 'This section is temporarily unavailable.'
  },
  description: {
    type: String,
    default: 'Please try again later or refresh the page.'
  }
})
</script>

<template>
  <div class="maintenance-layer absolute inset-0 z-20 flex items-center justify-center bg-white/75 backdrop-blur-sm p-6">
    <div class="w-full max-w-xl rounded-3xl border border-gray-200 bg-white/95 p-8 text-center shadow-2xl">
      <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8">
          <path fill-rule="evenodd" d="M12 2.25a6 6 0 00-6 6v3.75H5.25A2.25 2.25 0 003 14.25v6A2.25 2.25 0 005.25 22.5h13.5A2.25 2.25 0 0021 20.25v-6a2.25 2.25 0 00-2.25-2.25H18V8.25a6 6 0 00-6-6zm-2.25 9V8.25a2.25 2.25 0 114.5 0V11.25h-4.5z" clip-rule="evenodd" />
        </svg>
      </div>
      <h3 class="text-2xl font-semibold text-gray-900">{{ label }}</h3>
      <p class="mt-3 text-gray-600">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.maintenance-layer {
  min-height: 260px;
}
</style>
