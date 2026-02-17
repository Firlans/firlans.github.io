<script setup>
import { onMounted } from 'vue'
import HeaderLayout from './components/layouts/HeaderLayout.vue'
import FooterLayout from './components/layouts/FooterLayout.vue'
import LandingPage from './views/LandingPage.vue'
import { useUserStore } from './stores/user'

const userStore = useUserStore()

// Initialize userId when app mounts
onMounted(() => {
  userStore.initUserId()
})
</script>
<template>
  <HeaderLayout />
  <LandingPage />
  <FooterLayout />
</template>
