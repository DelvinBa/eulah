<template>
  <div class="ti-widget" id="ti-google-reviews"></div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://cdn.trustindex.io/loader.js?xxxxxxxxxxxx' // TODO: Replace with real widget ID
  script.defer = true
  document.body.appendChild(script)
})
</script>

<style scoped>
/* Trustindex widget placeholder */
</style>
