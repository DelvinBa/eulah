<template>
  <NuxtLink
    :to="link"
    :aria-label="`Mehr über ${title}`"
    class="flex flex-col h-full p-6 bg-gradient-to-br from-background via-surface to-background rounded-2xl shadow-2xl border border-surface hover:border-accent transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
  >
    <div class="flex items-center mb-4">
      <i :class="icon" class="text-accent text-3xl mr-4" aria-hidden="true"></i>
      <h3 class="text-xl font-bold text-primary">{{ title }}</h3>
    </div>
    <p class="text-dark flex-grow">{{ description }}</p>
    <span class="mt-4 text-accent font-semibold inline-flex items-center">
      Mehr erfahren
      <i class="fas fa-arrow-right ml-2" aria-hidden="true"></i>
    </span>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  link: { type: String, required: true }
})
</script>

<style scoped>
</style>
