<script setup>
import { ref } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue' // Pastikan path ini benar
import BaseButton from '@/components/base/BaseButton.vue' // Pastikan path ini benar

// State untuk menyimpan data formulir
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)

// Fungsi untuk menangani proses pendaftaran
const handleRegister = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      // Kita akan mengganti alert() dengan menampilkan pesan error di UI
      throw new Error('Kata sandi dan konfirmasi kata sandi tidak cocok!')
    }

    isLoading.value = true

    // Data yang akan dikirim
    const registrationData = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    const response = await fetch('http://localhost:8000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Jika backend membutuhkan CORS, pastikan ia diaktifkan di sisi server
      },
      body: JSON.stringify(registrationData),
    });

    if (!response.ok) {
      // Jika respons HTTP bukan 2xx (misalnya 400, 500)
      const data = await response.json();
      throw new Error(data.message || `Gagal mendaftar. Status: ${response.status}`)
    }

    // Pendaftaran Berhasil
    alert('Pendaftaran Berhasil! Silakan masuk.');
    // Di sini Anda akan menambahkan logika redirect (misalnya menggunakan router.push('/login'))

    // Opsional: Reset formulir
    name.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';

  } catch (err) {
    // Menangani error jaringan (misalnya server mati atau masalah CORS)
    // throw new Error('Gagal menghubungi server. Pastikan server berjalan di localhost:800.')
    alert('failed to register :', err);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50 p-4">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl space-y-6">
      <h2 class="text-3xl font-extrabold text-gray-900 text-center">
        Buat Akun Baru
      </h2>
      <p class="text-center text-sm text-gray-600">
        Sudah punya akun?
        <!-- Gunakan RouterLink jika Anda sudah mengaturnya di router/index.js -->
        <a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
          Masuk di sini
        </a>
      </p>

      <form @submit.prevent="handleRegister" class="space-y-4">

        <!-- Input Nama Lengkap -->
        <BaseInput v-model="name" label="Nama Lengkap" type="text" id="full-name" required />

        <!-- Input Email -->
        <BaseInput v-model="email" label="Alamat Email" type="email" id="email-register" required />

        <!-- Input Password -->
        <BaseInput v-model="password" label="Kata Sandi" type="password" id="password-register" required />

        <!-- Input Konfirmasi Password -->
        <BaseInput v-model="confirmPassword" label="Konfirmasi Kata Sandi" type="password" id="confirm-password"
          required />

        <!-- Tombol Register -->
        <div class="pt-2">
          <BaseButton type="submit" :disabled="isLoading" class="w-full justify-center">
            <!-- Menggunakan slot BaseButton -->
            <span v-if="isLoading" class="flex items-center space-x-2">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              Memproses...
            </span>
            <span v-else>
              Daftar Sekarang
            </span>
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>
