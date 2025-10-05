<script setup>
import BaseButton from '@/components/base/BaseButton.vue'
function clicked() {
  console.log('clicked')
}
</script>
<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <BaseButton text="  clicked" icon="fa-solid fa-download" :onClick="clicked"></BaseButton>
</template>

<style scoped></style>
