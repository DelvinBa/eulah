<template>
  <div
    class="group relative bg-background rounded-2xl shadow-xl hover:shadow-2xl border border-surface hover:border-accent transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden"
    @click="$emit('click')">
    <!-- Background Gradient -->
    <div
      :class="`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`">
    </div>

    <!-- Content -->
    <div class="relative p-8">
      <!-- Header -->
      <div class="flex items-center mb-6">
        <div
          :class="`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`">
          <i :class="service.icon" class="text-2xl text-white" aria-hidden="true"></i>
        </div>
        <div class="ml-4 flex-1">
          <h3 class="text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-300">
            {{ service.title }}
          </h3>
        </div>
        <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <i
            class="fas fa-arrow-right text-accent text-lg transform group-hover:translate-x-1 transition-transform duration-300"></i>
        </div>
      </div>

      <!-- Description -->
      <p class="text-dark mb-6 leading-relaxed">{{ service.shortDesc }}</p>

      <!-- Preview Features -->
      <div class="space-y-3">
        <div v-for="(feature, index) in service.features.slice(0, 3)" :key="index"
          class="flex items-center text-sm text-dark">
          <div :class="`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-3 flex-shrink-0`"></div>
          <span class="truncate">{{ feature }}</span>
        </div>
        <div v-if="service.features.length > 3" class="flex items-center text-sm text-secondary font-medium">
          <div class="w-2 h-2 rounded-full bg-secondary mr-3 flex-shrink-0"></div>
          <span>+{{ service.features.length - 3 }} weitere Leistungen</span>
        </div>
      </div>

      <!-- Technology Pills -->
      <div class="flex flex-wrap gap-2 mt-6">
        <span v-for="tech in service.technologies.slice(0, 3)" :key="tech"
          class="px-3 py-1 bg-surface text-dark text-xs font-medium rounded-full">
          {{ tech }}
        </span>
        <span v-if="service.technologies.length > 3"
          class="px-3 py-1 bg-accent text-background text-xs font-medium rounded-full">
          +{{ service.technologies.length - 3 }}
        </span>
      </div>

      <!-- Hover Indicator -->
      <div class="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300">
        <span class="text-sm text-secondary font-medium">Mehr erfahren</span>
        <div class="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
          <i class="fas fa-plus text-accent text-sm"></i>
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-surface to-transparent opacity-30">
    </div>
    <div
      class="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-tr from-surface to-transparent opacity-20">
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  service: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>

<style scoped></style>