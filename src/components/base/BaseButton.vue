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

<template lang="">
  <button
    @click="props.onClick"
    :disabled="disabled"
    class="/* Ukuran & Font */ px-6 py-3 text-lg font-medium text-white /* Bentuk & Bayangan */ rounded-xl shadow-md /* Warna (Biru Gelap) */ bg-blue-600 /* Efek Hover & Transisi */ hover:bg-blue-700 transition duration-150 ease-in-out /* Styling Disabled */ disabled:bg-blue-400 disabled:cursor-not-allowed /* Pastikan Teks Terpusat (jika kontennya lebih kompleks) */ flex items-center justify-center space-x-2"
  >
    <i v-if="icon && !iconRight" :class="icon"></i>
    <p>{{ props.text }}</p>
  </button>
</template>
