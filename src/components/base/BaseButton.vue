<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
  onClick: {
    type: Function,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    @click="props.onClick"
    :disabled="disabled"
    class="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white dark:text-slate-900 bg-slate-900 dark:bg-slate-100 rounded-xl shadow-sm hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed space-x-2"
  >
    <i v-if="icon && !iconRight" :class="icon"></i>
    <span>{{ props.text }}</span>
  </button>
</template>
