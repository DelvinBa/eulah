<template>
  <header class="flex items-center justify-between px-6 py-4 bg-black sticky top-0 z-50 shadow-lg">
    <!-- Logo -->
    <div class="text-3xl font-bold">
      <a href="/">
        <img v-if="logo" :src="logo" alt="Eulah Logo" class="h-10 transition-transform transform hover:scale-105" />
        <span v-else class="text-white hover:text-accent transition text-4xl font-extrabold">
          Eulah
        </span>
      </a>
    </div>

    <!-- Navigation Links -->
    <nav class="hidden md:flex space-x-6">
      <a href="/"
        class="relative px-6 py-3 text-lg font-medium text-white bg-gray-600/30 rounded-full border-2 border-gray-500/50 transition-all duration-300 ease-in-out hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] transform hover:scale-95">
        <span
          class="absolute inset-0 rounded-full bg-gradient-to-r from-gray-400/20 to-gray-300/10 opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-0"></span>
        <span class="relative">Home</span>
      </a>
      <a href="/projects"
        class="relative px-6 py-3 text-lg font-medium text-white bg-gray-600/30 rounded-full border-2 border-gray-500/50 transition-all duration-300 ease-in-out hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] transform hover:scale-95">
        <span
          class="absolute inset-0 rounded-full bg-gradient-to-r from-gray-400/20 to-gray-300/10 opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-0"></span>
        <span class="relative">Projects</span>
      </a>
      <a href="/contact"
        class="relative px-6 py-3 text-lg font-medium text-white bg-gray-600/30 rounded-full border-2 border-gray-500/50 transition-all duration-300 ease-in-out hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] transform hover:scale-95">
        <span
          class="absolute inset-0 rounded-full bg-gradient-to-r from-gray-400/20 to-gray-300/10 opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-0"></span>
        <span class="relative">Contact</span>
      </a>
    </nav>

    <!-- Call-to-Action Button -->
    <div class="hidden md:flex">
      <a href="/cta"
        class="relative px-6 py-3 text-lg font-medium text-white bg-gray-600/30 rounded-full border-2 border-gray-500/50 transition-all duration-300 ease-in-out hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] hover:animate-none transform animate-pulse-scale hover:scale-105">
        <span
          class="absolute inset-0 rounded-full bg-gradient-to-r from-gray-400/20 to-gray-300/10 opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-0"></span>
        <span class="relative flex items-center gap-2">
          CTA
          <span class="text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path
                d="M8.707 3.293a1 1 0 0 1 1.414 1.414L5.414 9H11a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1V4a1 1 0 1 1 2 0v5.586l4.293-4.293z" />
            </svg>
          </span>
        </span>
      </a>
    </div>


    <!-- Burger Menu for Mobile -->
    <button class="md:hidden text-accent hover:text-opacity-80" @click="toggleMenu">
      <i class="pi pi-bars text-3xl"></i>
    </button>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen"
      class="absolute top-16 right-6 bg-black text-white rounded-lg shadow-lg p-6 flex flex-col space-y-4 md:hidden">
      <a href="/"
        class="relative px-6 py-3 text-lg font-medium text-white bg-gray-600/30 rounded-full border-2 border-gray-500/50 transition-all duration-300 ease-in-out hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] transform hover:scale-95"
        @click="toggleMenu">
        <span
          class="absolute inset-0 rounded-full bg-gradient-to-r from-gray-400/20 to-gray-300/10 opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-0"></span>
        <span class="relative">Home</span>
      </a>
      <a href="/projects"
        class="relative px-6 py-3 text-lg font-medium text-white bg-gray-600/30 rounded-full border-2 border-gray-500/50 transition-all duration-300 ease-in-out hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] transform hover:scale-95"
        @click="toggleMenu">
        <span
          class="absolute inset-0 rounded-full bg-gradient-to-r from-gray-400/20 to-gray-300/10 opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-0"></span>
        <span class="relative">Projects</span>
      </a>
      <a href="/contact"
        class="relative px-6 py-3 text-lg font-medium text-white bg-gray-600/30 rounded-full border-2 border-gray-500/50 transition-all duration-300 ease-in-out hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] transform hover:scale-95"
        @click="toggleMenu">
        <span
          class="absolute inset-0 rounded-full bg-gradient-to-r from-gray-400/20 to-gray-300/10 opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-0"></span>
        <span class="relative">Contact</span>
      </a>
    </div>
  </header>
</template>

<script setup>

const props = defineProps({
  logo: {
    type: String,
    default: null,
  },
});

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

</script>


<style>
/* Keyframes für die Pulsanimation */
@keyframes pulse-scale {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

/* Animation für die Pulsbewegung */
.animate-pulse-scale {
  animation: pulse-scale 2s ease-in-out infinite;
}
</style>
