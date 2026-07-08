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
  <main id="home" class="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100/80 dark:from-slate-900 dark:to-slate-800/80 transition-colors duration-500">
    <!-- Subtle Background Elements -->
    <div class="absolute inset-0 z-0 opacity-30 dark:opacity-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
    
    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
        
        <!-- Text Content -->
        <div class="hero-content text-center md:text-left flex-1 max-w-2xl mt-4 md:mt-8">
          <div class="inline-block px-3 py-1 mb-6 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20">
            <p class="font-mono text-sm font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Available for work
            </p>
          </div>
          
          <h1 class="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
            {{ props.name }}
          </h1>
          
          <p class="tagline font-mono text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-6 transition-colors">
            > {{ props.tagline }}
          </p>
          
          <p class="description text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10 transition-colors">
            {{ props.description }}
          </p>
          
          <div class="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <a
              :href="props.ctaLink"
              class="cta-button group inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-slate-900 dark:bg-indigo-600 rounded-xl shadow-sm hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {{ props.ctaText }}
              <svg class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
            
            <a href="#projects" class="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300">
              View Projects
            </a>
          </div>
        </div>

        <!-- Profile Picture -->
        <div class="flex-shrink-0 relative group perspective">
          <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-teal-400 rounded-2xl blur opacity-25 dark:opacity-40 group-hover:opacity-40 dark:group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
          <div class="relative w-56 h-56 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10 transform transition-transform duration-500 group-hover:scale-[1.02]">
            <img
              :src="props.profilePictureSrc"
              :alt="props.name"
              class="profile-picture w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <!-- Decorative tech element -->
          <div class="absolute -bottom-6 -left-6 glass px-4 py-2 rounded-lg font-mono text-xs text-slate-600 dark:text-slate-300 hidden md:block animate-bounce" style="animation-duration: 3s;">
            <span class="text-indigo-500 dark:text-indigo-400">const</span> status = 'coding';
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<style scoped>
.perspective {
  perspective: 1000px;
}
</style>
