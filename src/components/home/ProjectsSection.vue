<template>
  <section class="py-20 bg-gradient-to-br from-background via-surface to-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl sm:text-4xl font-bold text-primary">Unsere Projekte & Referenzen</h2>
        <NuxtLink to="/projekte" class="text-primary hover:text-accent font-medium">Alle Projekte</NuxtLink>
      </div>
      <Carousel
        v-if="projects && projects.length"
        :value="projects"
        :num-visible="1"
        :num-scroll="1"
        circular
        class="projects-carousel"
      >
        <template #item="{ data }">
          <div class="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
            <!-- Image -->
            <div class="md:w-1/2 h-64 md:h-auto">
              <img
                v-if="data.image"
                :src="data.image"
                :alt="data.title"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <!-- Content -->
            <div class="p-6 flex flex-col justify-between md:w-1/2">
              <div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ data.title }}</h3>
                <p class="text-gray-600 mb-4">{{ data.subtitle }}</p>
                <ul class="space-y-2 mb-6">
                  <li
                    v-for="(fact, i) in getFacts(data.numbers)"
                    :key="i"
                    class="flex items-start"
                  >
                    <span class="text-primary mr-2">•</span>
                    <span class="text-gray-700 text-sm">{{ fact }}</span>
                  </li>
                </ul>
              </div>
              <NuxtLink
                :to="data.path"
                class="self-start px-4 py-2 bg-primary text-white rounded-md hover:bg-accent transition-colors"
              >
                Zum Projekt
              </NuxtLink>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </section>
</template>

<script setup>
import Carousel from 'primevue/carousel';

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
    .split('\n')
    .map((line) => line.replace(/^\s*•\s*/, '').trim())
    .filter(Boolean)
    .slice(0, 3);
};
</script>

<style scoped>
</style>
