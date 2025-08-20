<template>
  <div class="relative group inline-block">
    <!-- Gradient-Rahmen-Ebene -->
    <div
      class="absolute inset-0 rounded-full
             opacity-0 group-hover:opacity-100 
             transition-opacity duration-300
             pointer-events-none"
      :style="{
        background: gradient,
        padding: `${borderWidth}px`, // Dicke des Rahmens
      }"
    >
      <!-- Schwarzer Kreis dahinter (selbe Größe wie Button), 
           damit der Button optisch weiterhin schwarz bleibt -->
      <div class="w-full h-full bg-primary rounded-full"></div>
    </div>

    <!-- Eigentlicher Button -->
    <a
      :href="href"
      class="
        relative z-10
        inline-block 
        px-4 py-2
        text-sm font-medium
        text-background
        bg-primary
        rounded-full
        transition-colors duration-300

        /* Text bekommt beim Hover den gleichen Gradient wie der Rahmen */
        group-hover:text-transparent
        group-hover:bg-clip-text
        group-hover:[-webkit-background-clip:text]
        group-hover:[-webkit-text-fill-color:transparent]
        group-hover:bg-gradient-to-r 
      "
    >
      <!-- Default-Slot für Button-Text -->
      <slot>Zur Webseite</slot>
    </a>
  </div>
</template>

<script setup>
const props = defineProps({
  /**
   * Ziel-URL des Links
   */
  href: {
    type: String,
    default: "#",
  },
  /**
   * Der Farbverlauf, der als Rahmen und Text-Gradient verwendet wird.
   * Du kannst hier z. B. 'linear-gradient(to right, #EF4444, #F59E0B)' angeben.
   */
  gradient: {
    type: String,
    default: "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
  },
  /**
   * Die Dicke des Rahmens in px
   */
  borderWidth: {
    type: Number,
    default: 2,
  },
});
</script>

<style scoped>
/* Du kannst zusätzliche Stile hier unterbringen */
</style>
