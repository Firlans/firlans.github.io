<script setup>
import { ref } from 'vue';
// Pastikan path impor sudah benar
import BaseModal from '@/components/base/BaseModal.vue';

// Status visibilitas modal
const isLoginModalVisible = ref(false);

// Data untuk form login
const loginData = ref({
  email: '',
  password: ''
});

// Fungsi untuk membuka modal
const openLoginModal = () => {
  isLoginModalVisible.value = true;
};

// Fungsi untuk menutup modal
const closeLoginModal = () => {
  isLoginModalVisible.value = false;
};

// Fungsi untuk menangani submit form
const handleLogin = () => {
  console.log('Data Login:', loginData.value);

  // Lakukan validasi atau panggil API login di sini
  alert(`Mencoba login dengan Email: ${loginData.value.email}`);

  // Tutup modal setelah submit (opsional)
  closeLoginModal();

  // Reset form
  loginData.value.email = '';
  loginData.value.password = '';
};
</script>

<template>
  <div class="p-8">

    <h1 class="text-2xl font-bold mb-6">Halaman Utama</h1>

    <button
      @click="openLoginModal"
      class="px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-150"
    >
      Buka Form Login
    </button>

    <BaseModal
      :isVisible="isLoginModalVisible"
      @close="closeLoginModal"
      caption="Formulir Masuk Pengguna"
      maxWidth="max-w-md"  >
      <form @submit.prevent="handleLogin" class="space-y-6">

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
          <input
            id="email"
            type="email"
            v-model="loginData.email"
            required
            placeholder="nama@contoh.com"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Kata Sandi</label>
          <input
            id="password"
            type="password"
            v-model="loginData.password"
            required
            placeholder="Minimal 8 karakter"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          class="w-full px-4 py-2 text-base font-bold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition duration-150 transform hover:scale-[1.01]"
        >
          Masuk
        </button>
      </form>

      </BaseModal>
  </div>
</template>
