<template>
  <section class="relative h-screen flex items-center overflow-hidden">
    <video
      autoplay
      muted
      loop
      playsinline
      class="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/videos/shortify.mp4" type="video/mp4" />
    </video>
    <div class="absolute inset-0 bg-black/60" />

    <div class="relative z-10 container mx-auto px-6 md:px-12">
      <h1 class="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
        Ihr Partner für ganzheitliche IT-Lösungen
      </h1>
      <p class="text-lg md:text-2xl text-white/90 max-w-2xl mb-8">
        Von IT-Support bis Cloud-Infrastruktur – alles aus einer Hand.
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <NuxtLink
          to="/kontakt"
          class="bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-md text-center"
        >
          Jetzt Kontakt aufnehmen
        </NuxtLink>
        <NuxtLink
          to="/kontakt"
          class="bg-transparent border border-white hover:bg-white hover:text-dark px-6 py-3 rounded-md text-center"
        >
          Kostenlos beraten lassen
        </NuxtLink>
      </div>

      <!-- Trustindex component for Google-Bewertungen -->
      <!-- <HomeTrustIndex class="mt-12" /> -->
    </div>
  </section>
</template>

<script setup>
// no logic needed
</script>

<style scoped>
/* Additional styling can be added here if needed */
</style>
