
<template>
  <div class="bg-background text-text">
    <Header />
    <main class="min-h-screen">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/shared/Header.vue';
import Footer from '~/components/shared/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
/* Hier könnten wir globale Styles hinzufügen, falls nötig */
</style>