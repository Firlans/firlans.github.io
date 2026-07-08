<script setup>
import ExperienceSection from '@/views/sections/ExperienceSection.vue'
import ProjectSection from '@/views/sections/ProjectSection.vue'
import AboutSection from './sections/AboutSection.vue'
import ProfileSection from './sections/ProfileSection.vue'
import RateSection from './sections/RateSection.vue';
import DarkModeToggle from '@/components/base/DarkModeToggle.vue';
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
    <DarkModeToggle />
    <ProfileSection />
    <ExperienceSection />
    <ProjectSection />
    <AboutSection />
    <RateSection/>
  </div>
</template>
