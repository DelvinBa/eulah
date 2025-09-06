<template>
  <section class="py-24">
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-12">Warum wir?</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="usp in usps" :key="usp.title" class="p-6 bg-surface rounded-2xl shadow-2xl border border-surface hover:border-accent transition-transform hover:scale-105">
          <i :class="usp.icon" class="text-accent text-4xl mb-4" aria-hidden="true"></i>
          <h3 class="text-xl font-semibold text-primary mb-2">{{ usp.title }}</h3>
          <p class="text-dark">{{ usp.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const usps = [
  { icon: 'fas fa-clock', title: '24/7 Support', text: 'Rund um die Uhr für Sie erreichbar.' },
  { icon: 'fas fa-user-check', title: 'Individuelle Beratung', text: 'Maßgeschneiderte Lösungen statt Standards.' },
  { icon: 'fas fa-map-marker-alt', title: 'Lokaler Partner', text: 'Wir kennen die Anforderungen Ihrer Region.' },
  { icon: 'fas fa-expand-arrows-alt', title: 'Skalierbare Lösungen', text: 'Für KMU bis Konzerne geeignet.' },
  { icon: 'fas fa-certificate', title: 'Zertifiziertes Team', text: 'Experten mit anerkannten Zertifizierungen.' }
]
</script>

<style scoped>
</style>
