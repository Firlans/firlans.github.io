<script setup>
import { ref } from 'vue'
import BaseButton from '../base/BaseButton.vue'
import BaseInput from '../base/BaseInput.vue'
import router from '@/router'

const emit = defineEmits(['success'])

const email = ref('')
const password = ref('')
const isLoading = ref(false)



const handleSubmit = async () => {
  try {
    isLoading.value = true
    if (!email.value || !password.value) {
      throw new Error('harap isi dan password')
    }
    const loginData = {
      email: email.value,
      password: password.value,
    };

    const response = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Jika backend membutuhkan CORS, pastikan ia diaktifkan di sisi server
      },
      body: JSON.stringify(loginData),
    });
    if (!response.ok) {
      // Jika respons HTTP bukan 2xx (misalnya 400, 500)
      const data = await response.json();
      throw new Error(data.message || `Gagal mendaftar. Status: ${response.status}`)
    }

    // Pendaftaran Berhasil
    alert('Pendaftaran Berhasil! Silakan masuk.');
    const token = response.json().data;

    localStorage.setItem('token', token)
    router.push('/home')

    emit('success')
  } catch (err) {
    alert('Terjadi kesalahan : ' + err.message)
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="p-4 sm:p-6">
    <form @submit.prevent="handleSubmit" class="space-y-4">

      <BaseInput v-model="email" label="Email" type="email" id="email-field" required />

      <!-- Field Password menggunakan BaseInput -->
      <BaseInput v-model="password" label="Password" type="password" id="password-field" required />

      <div>
        <BaseButton type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-indigo-600 hover:bg-indigo-700 transition">
          Login
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
        </BaseButton>
      </div>

    </form>

    <div class="mt-6 text-center">
      <p class="text-sm text-gray-600">
        Belum punya akun?
        <a href="/register"
          class="font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition duration-150">
          Daftar Sekarang
        </a>
      </p>
    </div>

  </div>
</template>
