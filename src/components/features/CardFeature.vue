<script setup>
import BaseTag from '../base/BaseTag.vue'
// Anda harus menambahkan BaseTag.vue di folder base/

const props = defineProps({
  layout: {
    type: String,
    default: 'horizontal', // Default untuk Experience/Education
    validator: (value) => ['horizontal', 'vertical'].includes(value),
  },

  // URL gambar (Logo Perusahaan)
  imgSrc: {
    type: String,
    required: true, // Ubah ke true karena ini penting
  },
  // Judul Utama (Nama Perusahaan)
  title: {
    type: String,
    required: true,
  },
  // Judul Sub/Posisi
  shortDescription: {
    type: String,
    required: true,
  },
  // Deskripsi Perusahaan/Proyek
  description: {
    type: String,
    required: true,
  },
  // Detail Pekerjaan (Array of Strings)
  details: {
    type: Array,
    default: () => [],
  },
  // Tanggal/Durasi Kerja
  duration: {
    type: String,
    required: true,
  },
  // Tag/Labels (Array of Strings)
  labels: {
    type: Array,
    default: () => [],
  },
  tags: { type: Array, default: () => [] },
  // Links Demo/GitHub (untuk Project)
  links: { type: Array, default: () => [] },
})

const isVertical = props.layout === 'vertical'

function renderTagContent(tag) {
  return tag.includes('<i') ? tag : tag
}
</script>

<template>
  <div
    class="relative p-6 lg:p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl transition-all duration-300 hover:bg-white dark:hover:bg-slate-800 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 group"
    :class="{
      'flex flex-col': isVertical,
      'flex flex-col md:flex-row gap-6 md:gap-8': !isVertical,
    }"
  >
    <div class="flex-shrink-0">
      <div class="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-white dark:bg-slate-700/50 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700 group-hover:shadow-md transition-all duration-300">
        <img
          :src="props.imgSrc"
          :alt="props.title + ' logo'"
          class="w-full h-full object-contain p-2"
        />
      </div>
    </div>

    <div class="flex-grow">
      <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
        <div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">{{ props.title }}</h3>
          <h4 class="text-base font-medium text-slate-600 dark:text-slate-300 mt-1">{{ props.shortDescription }}</h4>
        </div>
        <div class="mt-2 md:mt-0 font-mono text-sm text-slate-400 dark:text-slate-400 bg-slate-100/50 dark:bg-slate-700/50 px-3 py-1 rounded-full w-fit">
          {{ props.duration }}
        </div>
      </div>

      <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-5 mt-4">{{ props.description }}</p>

      <ul
        v-if="props.details.length"
        class="space-y-2 mb-6"
      >
        <li v-for="(detail, index) in props.details" :key="index" class="flex text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          <span class="text-indigo-400 dark:text-indigo-500 mr-2 mt-0.5">▹</span>
          {{ detail }}
        </li>
      </ul>

      <div class="flex flex-wrap gap-2 mt-auto">
        <template v-if="props.tags.length">
          <BaseTag v-for="(tag, index) in props.tags" :key="'tag-' + index">
            <span v-html="renderTagContent(tag)"></span>
          </BaseTag>
        </template>
      </div>
      
      <div v-if="props.links.length" class="flex gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-700/50">
        <a
          v-for="(link, index) in props.links"
          :key="'link-' + index"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="project-link inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition duration-150 group/link"
        >
          {{ link.text }}
          <svg class="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
      </div>
    </div>
  </div>
</template>

<style></style>
