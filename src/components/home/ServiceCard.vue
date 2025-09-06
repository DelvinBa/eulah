<template>
  <NuxtLink :to="link" class="block p-6 bg-gradient-to-br from-background via-surface to-background rounded-2xl shadow-2xl border border-surface hover:border-accent transition-transform duration-300 hover:scale-105">
    <div class="flex items-center mb-4">
      <i :class="icon" class="text-accent text-3xl mr-4" aria-hidden="true"></i>
      <h3 class="text-xl font-bold text-primary">{{ title }}</h3>
    </div>
    <p class="text-dark">{{ description }}</p>
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
