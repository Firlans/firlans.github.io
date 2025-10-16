<script setup>
// Prop untuk membuat komponen ini sedikit lebih dinamis
const props = defineProps({
  name: {
    type: String,
    default: 'Firlan Syah',
  },
  tagline: {
    type: String,
    default: 'Back-end Developer | Computer Science',
  },
  description: {
    type: String,
    default:
      "I'm passionate about creating innovative solutions and exploring cutting-edge technologies.",
  },
  profilePictureSrc: {
    type: String,
    default: './profile-picture.png',
  },
  ctaLink: {
    type: String,
    default: '#contact',
  },
  ctaText: {
    type: String,
    default: 'Get in touch',
  },
})
</script>

<template>
  <main id="home" class="py-16 md:py-24 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12"
      >
        <div class="flex-shrink-0 w-48 h-48 md:w-64 md:h-64">
          <img
            :src="props.profilePictureSrc"
            :alt="props.name"
            class="profile-picture w-full h-full object-cover rounded-full shadow-xl ring-4 ring-indigo-500/50"
          />
        </div>

        <div class="hero-content text-center md:text-left md:flex-grow">
          <h1 class="text-4xl md:text-6xl font-extrabold text-gray-900 mb-2">
            {{ props.name }}
          </h1>
          <p class="tagline text-xl md:text-2xl font-semibold text-indigo-600 mb-4">
            {{ props.tagline }}
          </p>
          <p class="description text-lg text-gray-700 mb-8 max-w-lg md:max-w-none">
            {{ props.description }}
          </p>

          <a
            :href="props.ctaLink"
            class="cta-button inline-block px-8 py-3 text-lg font-bold text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
          >
            {{ props.ctaText }}
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Anda bisa menempatkan animasi kustom di sini jika Anda ingin menerapkan animasi "slide-in" */
</style>
