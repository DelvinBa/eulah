<template>
  <section class="relative py-20 bg-gradient-to-br from-background via-surface to-background overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <!-- Header / Storytelling -->
      <div class="text-center mb-14">
        <div class="inline-flex items-center bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6">
          <span class="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></span>
          <span class="text-gray-700 text-sm font-medium">ERFOLGSGESCHICHTEN UNSERER KUNDEN</span>
        </div>

        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight text-primary">
          Projekte <br />
          <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            die Träume wahr werden lassen
          </span>
        </h2>

        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
          Jedes Projekt erzählt eine einzigartige Geschichte. Entdecken Sie, wie wir die Visionen unserer Kunden
          in außergewöhnliche digitale Realitäten verwandelt haben.
        </p>

        <div class="flex items-center justify-center space-x-6 text-gray-500 text-sm">
          <div class="flex items-center">
            <div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span>100+ Erfolgreiche Projekte</span>
          </div>
          <div class="flex items-center">
            <div class="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
            <span>98% Kundenzufriedenheit</span>
          </div>
        </div>
      </div>

      <!-- Projekte Carousel -->
      <Carousel v-if="projects && projects.length" :value="projects" :num-visible="1" :num-scroll="1" circular
        :auto-play-interval="7000" class="projects-carousel mb-12">
        <template #item="{ data, index }">
          <div class="mx-4">
            <div
              class="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">

              <!-- Bildseite -->
              <div class="md:w-1/2 relative bg-gray-100">
                <img v-if="data.image" :src="data.image" :alt="data.title" class="w-full h-64 md:h-full object-contain"
                  loading="lazy" />
                <div
                  class="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                  ✨ Erfolgreich
                </div>
                <div
                  class="absolute bottom-4 right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-700 font-bold">
                  #{{ String(index + 1).padStart(2, '0') }}
                </div>
              </div>

              <!-- Contentseite -->
              <div class="p-6 md:p-8 flex flex-col justify-between md:w-1/2">
                <div>
                  <div
                    class="inline-flex items-center bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-4">
                    <span class="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    <span class="text-xs font-medium uppercase tracking-wider text-primary">Kundenerfolg</span>
                  </div>

                  <h3 class="text-2xl font-bold text-gray-900 mb-3">{{ data.title }}</h3>
                  <p class="text-gray-600 mb-4">{{ data.subtitle }}</p>

                  <ul class="space-y-2 mb-6">
                    <li v-for="(fact, i) in getFacts(data.numbers)" :key="i" class="flex items-start">
                      <span class="text-primary mr-2">•</span>
                      <span class="text-gray-700 text-sm">{{ fact }}</span>
                    </li>
                  </ul>
                </div>

                <!-- CTA -->
                <div class="flex flex-wrap gap-4">
                  <NuxtLink :to="data.path"
                    class="px-5 py-3 bg-primary text-white rounded-md font-medium hover:bg-accent hover:text-white transition-colors">
                    Erfolgsgeschichte ansehen
                  </NuxtLink>
                  <button @click="scrollToFunnel"
                    class="px-5 py-3 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors">
                    Eigenes Projekt starten
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Carousel>

      <!-- Navigation & CTA unten -->
      <div class="text-center">
        <NuxtLink to="/projekte"
          class="inline-flex items-center text-primary hover:text-accent font-medium group transition-colors duration-300">
          <span class="mr-2">Alle Erfolgsgeschichten ansehen</span>
          <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>

const { data: projects } = await useAsyncData('home-projects', async () => {
  try {
    const items = await queryCollection('projekte')
      .select('path', 'title', 'subtitle', 'numbers', 'images', 'image')
      .all();
    return (
      items?.map((item) => ({ ...item, image: item.image || item.images?.[0] })) || []
    );
  } catch (err) {
    console.error('Fehler beim Laden der Projekte:', err);
    return [];
  }
});

const getFacts = (numbers) => {
  if (!numbers) return [];
  return numbers
    .split(/\\n/)
    .map((line) => line.replace(/^\s*•\s*/, '').trim())
    .filter(Boolean)
    .slice(0, 3);
};

const scrollToFunnel = () => {
  const el = document.getElementById('lead-funnel');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style scoped>
/* Dezente Carousel Buttons */
:deep(.p-carousel-prev),
:deep(.p-carousel-next) {
  @apply bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300;
  border-radius: 50%;
  width: 44px;
  height: 44px;
}

:deep(.p-carousel-indicator button) {
  @apply bg-gray-300 hover:bg-primary transition-colors duration-300;
  border-radius: 6px;
  width: 28px;
  height: 6px;
}

:deep(.p-carousel-indicator.p-highlight button) {
  @apply bg-primary;
}
</style>
