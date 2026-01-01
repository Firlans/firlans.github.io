<script setup>
import { ref } from 'vue'
import BaseButton from '../base/BaseButton.vue'

const navLinks = [
  { href: '#home', icon: 'fa-solid fa-house', text: 'Home' },
  { href: '#experiences', icon: 'fa-solid fa-address-card', text: 'Experiences' },
  { href: '#projects', icon: 'fa-solid fa-list-check', text: 'Projects' },
  { href: '#about', icon: 'fa-solid fa-address-card', text: 'About' },
]

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

</script>

<template>
  <header class="sticky top-0 z-50 shadow-md bg-white/95 backdrop-blur-sm">
    <nav class="border-b border-gray-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <a href="#home" class="logo text-2xl font-extrabold text-indigo-600 hover:text-indigo-800 transition">
          FS
        </a>

        <button @click="toggleMenu"
          class="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Toggle menu">
          <i v-if="!isMenuOpen" class="fas fa-bars text-xl"></i>
          <i v-else class="fas fa-times text-xl"></i>
        </button>

        <ul class="hidden lg:flex space-x-6">
          <a v-for="link in navLinks" :key="link.href" :href="link.href"
            class="nav-link text-gray-700 hover:text-indigo-600 font-medium transition duration-150">
            <li class="nav-item flex items-center space-x-1">
              <i :class="link.icon"></i>
              <span>{{ link.text }}</span>
            </li>
          </a>
        </ul>
        <a href="https://projects.firlans.site" class="hidden lg:block">
          <BaseButton icon="fa-solid fa-caret-right"> Explore
          </BaseButton>
        </a>
      </div>
    </nav>

    <div v-if="isMenuOpen" class="lg:hidden border-t border-gray-200 bg-white/95">
      <ul class="py-2 px-4 space-y-1">
        <a v-for="link in navLinks" :key="link.href" :href="link.href" @click="toggleMenu"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition">
          <li class="nav-item flex items-center space-x-2">
            <i :class="link.icon" class="w-4"></i>
            <span>{{ link.text }}</span>
          </li>
        </a>

      </ul>
      <a href="https://projects.firlans.site">
        <BaseButton icon="fa-solid fa-caret-right" class="block m-auto">Explore
        </BaseButton>
      </a>
    </div>
  </header>
</template>
