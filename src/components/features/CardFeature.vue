<script setup>
import BaseTag from '../base/BaseTag.vue'
// Anda harus menambahkan BaseTag.vue di folder base/

const props = defineProps({
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

function renderTagContent(tag) {
  return tag.includes('<i') ? tag : tag
}
</script>

<template>
  <div
    class="flex flex-col md:flex-row p-6 bg-white shadow-lg rounded-xl transition duration-300 hover:shadow-xl"
  >
    <div class="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
      <img
        :src="props.imgSrc"
        :alt="props.title + ' logo'"
        class="w-16 h-16 object-cover rounded-full border-2 border-gray-100"
      />
    </div>

    <div class="flex-grow">
      <h3 class="text-xl font-bold text-gray-900 mb-1">{{ props.title }}</h3>
      <h4 class="text-lg font-semibold text-indigo-600 mb-2">{{ props.shortDescription }}</h4>

      <p class="text-gray-700 mb-4">{{ props.description }}</p>

      <p class="text-sm font-medium text-gray-500 mb-4">{{ props.duration }}</p>

      <ul
        v-if="props.details.length"
        class="list-disc list-inside text-gray-700 space-y-1 mb-4 pl-4"
      >
        <li v-for="(detail, index) in props.details" :key="index">
          {{ detail }}
        </li>
      </ul>

      <template v-if="props.tags.length">
        <BaseTag v-for="(tag, index) in props.tags" :key="'tag-' + index" class="m-1">
          <span v-html="renderTagContent(tag)"></span>
        </BaseTag>
      </template>
      <div v-if="props.links.length" class="flex gap-4 mt-4">
        <a
          v-for="(link, index) in props.links"
          :key="'link-' + index"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="project-link text-indigo-600 hover:text-indigo-800 font-medium border-b border-indigo-600 hover:border-indigo-800 transition duration-150"
        >
          {{ link.text }}
        </a>
      </div>
    </div>
  </div>
</template>

<style></style>
