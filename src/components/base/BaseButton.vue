<script setup>
const props = defineProps({
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

<template lang="">
  <button
    @click="props.onClick"
    :disabled="disabled"
    class="px-8 py-3 text-lg font-bold text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
  >
    <i v-if="icon && !iconRight" :class="icon"></i>
    <slot></slot>
  </button>
</template>
