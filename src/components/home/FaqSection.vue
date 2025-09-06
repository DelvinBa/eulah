<template>
  <section class="py-24">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-center mb-12">FAQ</h2>
      <div class="space-y-6 max-w-3xl mx-auto">
        <div v-for="faq in faqs" :key="faq.q" class="border-b border-surface pb-6">
          <h3 class="text-xl font-semibold text-primary mb-2">{{ faq.q }}</h3>
          <p class="text-dark">{{ faq.a }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const faqs = [
  { q: 'Bietet ihr auch 24/7 Support?', a: 'Ja, unser Team steht Ihnen rund um die Uhr zur Verfügung.' },
  { q: 'Welche Regionen betreut ihr?', a: 'Wir arbeiten deutschlandweit und betreuen Kunden lokal vor Ort.' },
  { q: 'Welche Zertifizierungen besitzt euer Team?', a: 'Unsere Spezialisten sind u.a. Microsoft- und Cisco-zertifiziert.' }
]
</script>

<style scoped>
</style>
