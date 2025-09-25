<template>
  <div class="bg-background text-text">
    <SharedHeader />
    <SharedSiteBreadCrumbs />
    <main class="min-h-screen">
      <slot />
    </main>
    <SharedFooter />
  </div>
</template>

<script setup>

</script>

<style>
/* Hier könnten wir globale Styles hinzufügen, falls nötig */
</style>