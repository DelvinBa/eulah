<template>
  <header class="flex items-center justify-between px-6 py-4 bg-primary sticky top-0 z-50 shadow-lg">
    <!-- Logo -->
    <div class="text-3xl font-bold z-10">
      <a href="/" class="text-background hover:text-accent transition text-4xl font-extrabold">
        Eulah
      </a>
    </div>

    <!-- Desktop Navigation -->
    <nav class="hidden md:flex absolute inset-x-0 justify-center">
      <div class="flex space-x-6">
        <a href="/"
          class="relative px-6 py-3 text-lg font-medium text-background bg-secondary/20 rounded-full border-2 border-secondary/50 transition-all duration-300 ease-in-out hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] transform hover:scale-95">
          Home
        </a>
        <a href="/projekte"
          class="relative px-6 py-3 text-lg font-medium text-background bg-secondary/20 rounded-full border-2 border-secondary/50 transition-all duration-300 ease-in-out hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] transform hover:scale-95">
          Projekte
        </a>
        <a href="/blog"
          class="relative px-6 py-3 text-lg font-medium text-background bg-secondary/20 rounded-full border-2 border-secondary/50 transition-all duration-300 ease-in-out hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] transform hover:scale-95">
          Blog
        </a>
        <a href="/kontakt"
          class="relative px-6 py-3 text-lg font-medium text-background bg-secondary/20 rounded-full border-2 border-secondary/50 transition-all duration-300 ease-in-out hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] transform hover:scale-95">
          Kontakt
        </a>
      </div>
    </nav>

    <!-- Call-to-Action Button -->
    <div class="hidden md:flex">
      <button @click="scrollToFunnel"
        class="relative px-6 py-3 text-lg font-medium text-background bg-secondary/20 rounded-full border-2 border-secondary/50 transition-all duration-300 ease-in-out hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] transform"
        :class="{ 'animate-pulse-scale': !isClicked }">
        <span class="relative flex items-center gap-2">
          Jetzt Zusammenarbeit anfragen
          <span class="text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path
                d="M8.707 3.293a1 1 0 0 1 1.414 1.414L5.414 9H11a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1V4a1 1 0 1 1 2 0v5.586l4.293-4.293z" />
            </svg>
          </span>
        </span>
      </button>
    </div>

    <!-- Mobile Menu Button -->
    <button @click="toggleMenu" ref="menuButton" aria-label="Menu Button"
      class="md:hidden text-background focus:outline-none">
      <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Mobile Menu (Slide-in Effect) -->
    <transition name="slide">
      <div v-if="isMenuOpen"
        class="fixed inset-0 bg-dark/90 flex flex-col items-center justify-center space-y-6 text-background text-lg z-50"
        role="dialog" aria-modal="true">
        <a href="/" @click="toggleMenu" class="hover:text-accent transition">Home</a>
        <a href="/projekte" @click="toggleMenu" class="hover:text-accent transition">Projekte</a>
        <a href="/blog" @click="toggleMenu" class="hover:text-accent transition">Blog</a>
        <a href="/kontakt" @click="toggleMenu" class="hover:text-accent transition">Kontakt</a>
        <button @click="scrollToFunnel"
          class="px-6 py-3 text-lg font-medium text-background bg-secondary/20 rounded-full border-2 border-secondary/50 transition-all duration-300 ease-in-out hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] transform">
          Jetzt Zusammenarbeit anfragen
        </button>
      </div>
    </transition>
  </header>
</template>

<script setup>

// Props
const props = defineProps({
  logo: {
    type: String,
    default: null,
  },
});

// States
const isMenuOpen = ref(false);
const isClicked = ref(false);
const menuButton = ref(null);

// Scroll to Leadfunnel
function scrollToFunnel() {
  isClicked.value = true;
  const funnelSection = document.getElementById('lead-funnel');
  if (funnelSection) {
    funnelSection.scrollIntoView({ behavior: 'smooth' });
  }
  if (isMenuOpen.value) {
    toggleMenu();
  }
}

// Toggle mobile menu
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;

  if (!isMenuOpen.value) {
    menuButton.value?.focus(); // Restore focus when closing
  }
}

// Close menu on ESC key
function handleKeydown(event) {
  if (event.key === 'Escape' && isMenuOpen.value) {
    toggleMenu();
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style>
/* Smooth Pulsing Animation */
@keyframes pulse-scale {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

.animate-pulse-scale {
  animation: pulse-scale 1.5s ease-in-out infinite;
}

/* Slide-in animation for menu */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter {
  transform: translateY(-100%);
}

.slide-leave-to {
  transform: translateY(-100%);
}
</style>
