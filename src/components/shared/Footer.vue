<template>
  <footer class="bg-primary text-background py-8 md:py-12">
    <div class="container mx-auto px-4 md:px-6 text-center space-y-6 md:space-y-8">
      <!-- Lead Funnel -->
      <div id="lead-funnel">
        <LeadFunnel />
      </div>

      <!-- Links -->
      <div class="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6">
        <a href="/impressum" class="text-sm md:text-base text-accent hover:text-accent-dark transition">Impressum</a>
        <a href="/datenschutz" class="text-sm md:text-base text-accent hover:text-accent-dark transition">Datenschutz</a>
      </div>

      <!-- Footer Note -->
      <p class="text-surface text-xs md:text-sm">
        All rights reserved © Eulah {{ currentYear }}
      </p>
    </div>
  </footer>
</template>

<script setup>
import LeadFunnel from './LeadFunnel.vue';
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>
