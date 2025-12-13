<script setup>
import { RouterView, useRoute } from 'vue-router'

import HeaderLayout from './components/layouts/HeaderLayout.vue'
import FooterLayout from './components/layouts/FooterLayout.vue'
import { computed } from 'vue';

const route = useRoute();
const isLandingPage = computed(() => route.path === '/');

const shouldBeRouterLink = computed(() => !isLandingPage.value);
console.log(route.path)
</script>
<template>
  <HeaderLayout :isRouterLink="shouldBeRouterLink"/>
  <main>
    <RouterView />
  </main>
  <FooterLayout />
</template>
