<script setup>
import CardFeature from '@/components/features/CardFeature.vue'

// 1. Definisikan data Proyek
const projects = [
  {
    id: 1,
    imgSrc: '/public/simpul8.png',
    title:
      'Sistem Informasi Manajemen Pemantauan untuk Lingkungan SMK Negeri 8 Kota Tangerang Selatan | SIMPUL 8',
    description:
      'A unified system that brings together students, educators, counselors, administrators, and parents, enabling real‑time access to schedules, behavior records, achievements, and counseling communications.',
    tags: ['<i class="fa-brands fa-laravel"></i> Laravel', 'reverb'],
    links: [],
  },
  {
    id: 2,
    imgSrc: '/public/bangkit capstone project.png',
    title: 'Capstone Project Bangkit Academy | Spiceify',
    description:
      'A mobile-based application that allows users to identify different types of spices. Equipped with recipe features, this app helps users incorporate spices into their daily cooking. Perfect for homemakers. (90%)',
    tags: [
      'nodejs',
      'Express js',
      'Cloud Computing with Google Cloud Platform',
      'Load Balancing',
      'Virtual Machine',
    ],
    links: [
      { url: 'https://youtu.be/h8C_QnkkXVY?feature=shared', text: 'Demo' },
      { url: 'https://github.com/Firlans/C241-PS204_spices_detection', text: 'GitHub' },
    ],
  },
  {
    id: 3,
    imgSrc: '/public/perpustakaan digital.png',
    title: 'Perpustakaan Digital',
    description:
      'A web-based digital library application featuring an admin panel that allows for efficient management of books, categories, and users. Users can easily borrow books available within the application. This platform is designed to streamline library operations and enhance the user experience, making it an ideal solution for educational institutions and avid readers alike. (70%)',
    tags: ['PHP Native', 'MySQL'],
    links: [
      {
        url: 'https://www.instagram.com/reel/C_cm1UUtwgN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        text: 'Demo',
      },
      { url: 'https://github.com/Firlans/website-perpustakaan-digital', text: 'GitHub' },
    ],
  },
]
</script>

<template>
  <section id="projects" class="py-16 bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-extrabold text-gray-900 text-center mb-10">My Projects</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CardFeature
          v-for="project in projects"
          :key="project.id"
          :imgSrc="project.imgSrc"
          :title="project.title"
          :description="project.description"
          :tags="project.tags"
          :links="project.links"
          :layout="'horizontal'"
          class="slide-in"
        />
      </div>
    </div>
  </section>
</template>
