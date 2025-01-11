<template>
  <footer class="bg-black text-white py-12">
    <div class="container mx-auto px-6 text-center space-y-8">
      <!-- Lead Funnel -->
      <LeadFunnel />

      <!-- Links -->
      <div class="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
        <a href="/impressum" class="hover:text-accent transition">Impressum</a>
        <a href="/datenschutz" class="hover:text-accent transition">Datenschutz</a>
      </div>

      <!-- Footer Note -->
      <p class="text-gray-400 text-sm">
        All rights reserved © Eulah {{ currentYear }}
      </p>
    </div>
  </footer>
</template>

<script>
import LeadFunnel from '~/components/shared/LeadFunnel.vue';

export default {
  name: 'Footer',
  components: {
    LeadFunnel,
  },
  data() {
    return {
      currentYear: new Date().getFullYear(), // Automatisches aktuelles Jahr
    };
  },
};
</script>
