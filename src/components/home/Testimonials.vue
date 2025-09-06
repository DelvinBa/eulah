<template>
  <section class="py-24 bg-surface">
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-12">Stimmen unserer Kunden</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <blockquote v-for="t in testimonials" :key="t.name" class="p-6 bg-background rounded-2xl shadow-2xl border border-surface">
          <p class="text-dark mb-4">"{{ t.quote }}"</p>
          <footer class="text-primary font-semibold">{{ t.name }}</footer>
        </blockquote>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  { quote: 'Dank der schnellen Unterstützung läuft unsere IT endlich stabil.', name: 'Max M., Geschäftsführer' },
  { quote: 'Die Umstellung auf Microsoft 365 war in wenigen Tagen erledigt.', name: 'Sabine K., HR-Leiterin' }
]
</script>

<style scoped>
</style>
