<script setup>
import CardFeature from '@/components/features/CardFeature.vue'

// 1. Definisikan data pengalaman kerja dalam array
// Note: Perhatikan path gambar Anda (misal: '/images/imamatek-logo.jpeg' jika di public/)
const experiences = [
  {
    id: 1,
    imgSrc: './imamatek-logo.jpeg',
    title: 'Integritas Makmur Mandiri',
    shortDescription: 'Programmer Biz-A',
    description:
      'I am part of PT Integritas Makmur Mandiri (Imamatek Corp), a Jakarta-founded software company since 2006 focused on building robust business software solutions for finance and manufacturing. Guided by core values—Discover, Think, Act, Solve, and Lead—and committed to serving customers with wholehearted dedication under the motto ‘Give your heart for world‑class service’...',
    duration: 'Jan 2025 - present',
    details: [
      'Developed web applications using the Biz-A framework, tailored to client requirements, including manufacturing and finance features.',
      'Conducted comprehensive unit testing with Jest js to ensure robust and reliable code.',
      'Implemented efficient data requests using Observables for enhanced asynchronous operations.',
    ],
    tags: ['Biz-a framework', 'Observables', 'jest js'],
  },
  {
    id: 2,
    imgSrc: './lokpromedia-logo.png',
    title: 'Lokpro Media',
    shortDescription: 'Content Researcher',
    description:
      'Lokpro Media is a dynamic media company focused on creating engaging digital content across various platforms.',
    duration: 'Dec 2022 - Jun 2023',
    details: [
      'Researched material for engaging content creation',
      'Initiated content development process',
      'Served as vice-leader',
      'Trained new members in technical aspects',
      'Reported team progress to leadership',
    ],
    tags: ['Research', 'Content Creation'],
  },
  {
    id: 3,
    imgSrc: './develophilia-logo.jpeg',
    title: 'Develophilia',
    shortDescription: 'Research & Development',
    description:
      'Develophilia is an innovative organization dedicated to research and development in social development, aiming to provide insightful and impactful content.',
    duration: 'Dec 2022 - Mar 2023',
    details: [
      'Conducted research on Social Development for viewers',
      'Provided engaging content',
      'Responsible for project management',
      'Actively participated in weekly meetings',
      'Collaborated to produce interconnected content',
    ],
    tags: ['Social Research', 'Project Management'],
  },
]
</script>

<template>
  <section id="experiences" class="py-16 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-extrabold text-gray-900 text-center mb-10">Experiences</h2>

      <div class="space-y-8">
        <CardFeature
          v-for="exp in experiences"
          :key="exp.id"
          :imgSrc="exp.imgSrc"
          :title="exp.title"
          :shortDescription="exp.shortDescription"
          :description="exp.description"
          :duration="exp.duration"
          :details="exp.details"
          :tags="exp.tags"
          class="slide-in"
        />
      </div>
    </div>
  </section>
</template>
