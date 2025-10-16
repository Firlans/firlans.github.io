<script setup>
// Menggunakan CardFeature untuk item Pendidikan
import CardFeature from '@/components/features/CardFeature.vue'
// Menggunakan BaseTag (asumsi ini adalah BaseLabel yang diubah namanya/di-aliaskan) untuk skill
import BaseTag from '@/components/base/BaseTag.vue'

// --- Data Pendidikan ---
const educationList = [
  {
    id: 1,
    imgSrc: '/public/universitas-pamulang-logo.jpeg',
    title: 'Pamulang University',
    program: 'Informatics Engineering',
    period: '2022 - 2025',
    focus:
      'Focusing on back-end development and exploring cutting-edge technologies in the field of computer science.',
  },
  {
    id: 2,
    imgSrc: '/public/bangkit-academy-logo.jpeg',
    title: 'Bangkit Academy',
    program: 'Cloud Computing Learning Path',
    period: '2024',
    focus:
      'Intensive training in cloud computing with Google Cloud Platform and advanced back-end development techniques.',
  },
]

// --- Data Keahlian (Skills) ---
const skillsList = [
  { icon: 'fa-solid fa-server', name: 'Back-end Development' },
  { icon: 'fa-solid fa-cloud', name: 'Cloud Computing' },
  { icon: 'fa-brands fa-node-js', name: 'Javascript' },
  { icon: 'fa-brands fa-html5', name: 'HTML' },
  { icon: 'fa-brands fa-css3-alt', name: 'CSS' },
  { icon: 'fa-brands fa-php', name: 'PHP' },
  { icon: 'fa-solid fa-database', name: 'SQL' },
  { icon: 'fa-brands fa-git-alt', name: 'Git' },
  { icon: 'fa-brands fa-github', name: 'Github' },
  { icon: 'fa-solid fa-puzzle-piece', name: 'Problem Solving' },
  { icon: 'fa-solid fa-people-group', name: 'Team Collaboration' },
  { icon: 'fa-brands fa-linux', name: 'linux ubuntu' },
]

// Fungsi helper untuk menggabungkan ikon dan nama menjadi string HTML untuk slot
function formatSkillTag(skill) {
  return `<i class="${skill.icon} mr-1 text-sm text-indigo-600"></i> ${skill.name}`
}
</script>

<template>
  <section id="about" class="py-16 bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-extrabold text-gray-900 text-center mb-12 slide-in">About Me</h2>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div class="education lg:col-span-3">
          <h3 class="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Education</h3>
          <div class="space-y-6">
            <CardFeature
              v-for="item in educationList"
              :key="item.id"
              :imgSrc="item.imgSrc"
              :title="item.title"
              :shortDescription="item.program"
              :description="item.focus"
              :duration="item.period"
              :details="[]"
              :labels="[]"
              class="slide-in"
            />
          </div>
        </div>

        <div class="skills lg:col-span-2 slide-in">
          <h3 class="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Skills</h3>
          <ul class="flex flex-wrap gap-2 skills-list">
            <BaseTag v-for="(skill, index) in skillsList" :key="index" class="slide-in">
              <span v-html="formatSkillTag(skill)"></span>
            </BaseTag>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Tempatkan styling 'slide-in' dan custom lainnya di sini jika dibutuhkan */
</style>
