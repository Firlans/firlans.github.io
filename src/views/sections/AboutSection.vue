<script setup>
// Menggunakan CardFeature untuk item Pendidikan
import CardFeature from '@/components/features/CardFeature.vue'
// Menggunakan BaseTag (asumsi ini adalah BaseLabel yang diubah namanya/di-aliaskan) untuk skill
import BaseTag from '@/components/base/BaseTag.vue'

// --- Data Pendidikan ---
const educationList = [
  {
    id: 1,
    imgSrc: './universitas-pamulang-logo.jpeg',
    title: 'Pamulang University',
    program: 'Informatics Engineering',
    period: '2022 - 2025',
    focus:
      'Focusing on back-end development and exploring cutting-edge technologies in the field of computer science.',
  },
  {
    id: 2,
    imgSrc: './bangkit-academy-logo.jpeg',
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
  <section id="about" class="py-24 bg-white dark:bg-slate-900 transition-colors duration-500">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-16 flex flex-col items-center justify-center text-center">
        <h2 class="text-sm font-mono text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-2">Discover</h2>
        <h3 class="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">About Me</h3>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        <div class="education lg:col-span-3">
          <div class="flex items-center gap-3 mb-8 border-b border-slate-100 dark:border-slate-700/50 pb-4">
            <svg class="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
            <h3 class="text-2xl font-bold text-slate-800 dark:text-slate-100">Education</h3>
          </div>
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
              class="relative"
            />
          </div>
        </div>

        <div class="skills lg:col-span-2">
          <div class="flex items-center gap-3 mb-8 border-b border-slate-100 dark:border-slate-700/50 pb-4">
            <svg class="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            <h3 class="text-2xl font-bold text-slate-800 dark:text-slate-100">Skills</h3>
          </div>
          
          <div class="bg-slate-50/80 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-100 dark:border-slate-700/50 transition-colors">
            <ul class="flex flex-wrap gap-2.5 skills-list">
              <BaseTag v-for="(skill, index) in skillsList" :key="index">
                <span v-html="formatSkillTag(skill)"></span>
              </BaseTag>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Tempatkan styling 'slide-in' dan custom lainnya di sini jika dibutuhkan */
</style>
