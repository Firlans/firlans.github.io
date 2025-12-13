<script setup>
import { defineProps, defineEmits, computed } from 'vue';

// Definisikan props yang diterima
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
    default: false
  },
  maxWidth: {
    type: String,
    default: 'max-w-xl' // Nilai default: Lebar XL
  },
  caption: {
    type: String,
  }
});

// Definisikan custom event yang akan dipancarkan
const emit = defineEmits(['close']);

// Fungsi untuk memancarkan event 'close'
const closePopup = () => {
  emit('close');
};

// Gabungkan kelas default untuk modal-content dengan prop maxWidth
// Ini memastikan lebar default atau lebar yang disuplai pengguna digunakan.
const modalContentClasses = computed(() => {
  return [
    props.maxWidth,
    'w-full', // Memastikan modal mengambil lebar penuh sesuai maxWidth
    'bg-white',
    'p-8',
    'rounded-xl',
    'shadow-2xl', // Bayangan yang kuat
    'transform',
    'transition-all',
    'duration-300',
    'scale-100', // Efek transisi masuk
  ];
});

</script>

<template>
  <div v-if="isVisible" class="modal-overlay" @click="closePopup">
    <div :class="modalContentClasses" @click.stop>
      <button
        @click="closePopup"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition duration-150 p-2 rounded-full hover:bg-gray-100"
        aria-label="Tutup Modal"
      >
        <i class="fa-solid fa-x text-xl"></i>
      </button>

      <div class="p-8 pt-10"> <h4 class="text-3xl font-extrabold text-gray-900 mb-4">
          {{props.caption}}
        </h4>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styling untuk Overlay */
.modal-overlay {
  /* Posisi tetap (fixed) menutupi seluruh layar */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Background semi-transparan gelap */
  background-color: rgba(0, 0, 0, 0.6);
  /* Memastikan overlay berada di atas semua konten lain */
  z-index: 1000;
  /* Pusatkan modal di tengah layar */
  display: flex;
  justify-content: center;
  align-items: center;
  /* Animasi Fade In/Out */
  transition: opacity 0.3s ease;
}
</style>
