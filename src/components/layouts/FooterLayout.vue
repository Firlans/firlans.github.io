<script setup>
const quickLinks = [
  { href: '#home', text: 'Home' },
  { href: '#experiences', text: 'Experiences' },
  { href: '#projects', text: 'Projects' },
  { href: '#about', text: 'About' },
  { href: '#contact', text: 'Contact' },
]

const socialLinks = [
  { href: 'https://wa.me/6289673945784', icon: 'fab fa-whatsapp', label: 'WhatsApp' },
  { href: 'https://instagram.com/firlan_sy', icon: 'fab fa-instagram', label: 'Instagram' },
  { href: 'https://github.com/firlans', icon: 'fab fa-github', label: 'GitHub' },
  { href: 'https://linkedin.com/in/firlan-syah', icon: 'fab fa-linkedin', label: 'LinkedIn' },
]
</script>

<template>
  <footer id="footer" class="bg-gray-800 text-white py-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-gray-700 pb-8">
        <div class="footer-left md:col-span-1">
          <h3 class="footer-title text-3xl font-bold mb-2 text-indigo-400">Firlan Syah</h3>
          <p class="footer-tagline text-gray-400">
            Crafting innovative solutions, one line of code at a time.
          </p>
        </div>

        <div class="footer-right md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div class="footer-links">
            <h4 class="text-lg font-semibold mb-3">Quick Links</h4>
            <ul>
              <li v-for="link in quickLinks" :key="link.href" class="mb-1">
                <a :href="link.href" class="text-gray-400 hover:text-indigo-400 transition">{{
                  link.text
                }}</a>
              </li>
            </ul>
          </div>

          <div id="contact" class="footer-social col-span-2 sm:col-span-1">
            <h4 class="text-lg font-semibold mb-3">Connect with Me</h4>
            <ul class="social-icons flex space-x-4">
              <li v-for="social in socialLinks" :key="social.label">
                <a
                  :href="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="'Connect via ' + social.label"
                  class="text-gray-400 hover:text-indigo-400 transition text-2xl"
                >
                  <i :class="social.icon"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom flex justify-between items-center text-sm text-gray-500">
        <p>&copy; 2025 Firlan Syah. All rights reserved.</p>
        <a
          href="#home"
          class="scroll-to-top flex items-center space-x-2 hover:text-indigo-400 transition"
        >
          <i class="fas fa-chevron-up"></i>
          <span>Back to Top</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
