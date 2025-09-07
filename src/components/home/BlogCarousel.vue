<template>
  <section class="py-20 bg-gradient-to-br from-background via-surface to-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl sm:text-4xl font-bold text-primary">Ratgeber &amp; Blog</h2>
        <NuxtLink to="/blog" class="text-primary hover:text-accent font-medium">Alle Artikel</NuxtLink>
      </div>
      <Carousel
        v-if="posts && posts.length"
        :value="posts"
        :num-visible="3"
        :num-scroll="1"
        :responsive-options="responsiveOptions"
        circular
        class="blog-carousel"
      >
        <template #item="{ data }">
          <article
            class="group mx-2 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >
            <NuxtLink :to="data.path" class="block h-full">
              <!-- Image Section -->
              <div class="relative h-48 bg-gradient-to-br from-primary to-secondary overflow-hidden">
                <img
                  v-if="data.image"
                  :src="data.image"
                  :alt="data.title"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-16 h-16 text-white/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 0 02-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <!-- Date Badge -->
                <div
                  class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800"
                >
                  {{ formatDate(data.date) }}
                </div>
              </div>

              <!-- Content Section -->
              <div class="p-6 h-full flex flex-col">
                <div class="flex-1">
                  <h3
                    class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors"
                  >
                    {{ data.title }}
                  </h3>

                  <p class="text-gray-600 text-sm line-clamp-3 mb-4">
                    {{ data.description }}
                  </p>
                </div>

                <!-- Tags and Author -->
                <div class="space-y-3">
                  <div v-if="data.tags && data.tags.length" class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in data.tags"
                      :key="tag"
                      class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
                    >
                      {{ tag }}
                    </span>
                  </div>

                  <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div class="flex items-center gap-2">
                      <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span class="text-white text-xs font-bold">
                          {{ data.author?.charAt(0) || 'E' }}
                        </span>
                      </div>
                      <span class="text-xs text-gray-500">{{ data.author }}</span>
                    </div>

                    <div class="flex items-center text-primary group-hover:text-accent transition-colors">
                      <span class="text-sm font-medium mr-2">Lesen</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </article>
        </template>
      </Carousel>
    </div>
  </section>
</template>

<script setup>
import Carousel from 'primevue/carousel';

const { data: posts } = await useAsyncData('home-blog', async () => {
  try {
    const posts = await queryCollection('blog')
      .select('path', 'title', 'description', 'date', 'author', 'tags', 'image')
      .all();
    return posts || [];
  } catch (err) {
    console.error('Fehler beim Laden der Blog-Posts:', err);
    return [];
  }
});

const responsiveOptions = ref([
  { breakpoint: '1024px', numVisible: 2, numScroll: 1 },
  { breakpoint: '768px', numVisible: 1, numScroll: 1 },
]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

