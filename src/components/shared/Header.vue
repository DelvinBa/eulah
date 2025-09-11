<template>
  <header class="flex items-center justify-between px-6 py-4 bg-primary sticky top-0 z-50 shadow-lg">
    <!-- Logo -->
    <div class="text-3xl font-bold z-10">
      <a href="/" class="text-background hover:text-accent transition text-4xl font-extrabold">
        Eulah IT
      </a>
    </div>

    <!-- Desktop Navigation -->
    <nav class="hidden md:flex absolute inset-x-0 justify-center">
      <div class="flex items-center space-x-6">

        <div class="relative group">
          <a href="#"
            class="relative px-6 py-3 text-base font-medium text-background bg-secondary/20 rounded-full border-2 border-secondary/50 transition-all duration-300 ease-in-out hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] transform hover:scale-95 flex items-center gap-2">
            Unternehmen
            <!-- Dropdown indicator -->
            <svg xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <div
            class="absolute left-1/2 -translate-x-1/2 mt-4 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
            <div class="bg-background border border-gray-200 rounded-xl shadow-2xl p-4 space-y-2">
              <a href="/ueber-uns" class="block text-sm text-dark hover:text-primary transition-colors cursor-pointer">
                Über Uns
              </a>
              <a href="/projekte" class="block text-sm text-dark hover:text-primary transition-colors cursor-pointer">
                Referenzen
              </a>
              <a href="/standorte" class="block text-sm text-dark hover:text-primary transition-colors cursor-pointer">
                Standorte
              </a>
            </div>
          </div>
        </div>
        <div class="relative group">
          <a href="#"
            class="relative px-6 py-3 text-base font-medium text-background bg-secondary/20 rounded-full border-2 border-secondary/50 transition-all duration-300 ease-in-out hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] transform hover:scale-95 flex items-center gap-2">
            Leistungen
            <!-- Dropdown indicator -->
            <svg xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <div
            class="absolute left-1/2 -translate-x-1/2 mt-4 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
            <div
              class="bg-background border border-gray-200 rounded-xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-primary border-b border-secondary/30 pb-2">
                  Software & App-Entwicklung
                </h3>
                <ul class="space-y-2 text-sm text-dark">
                  <li class="hover:text-primary transition-colors cursor-pointer">
                    Individuelle Softwarelösungen (Desktop, Web & App)
                  </li>
                  <li class="hover:text-primary transition-colors cursor-pointer">
                    ERP- & CRM-Systeme, Warenwirtschaft & Prozessoptimierung (BPM, RPA)
                  </li>
                </ul>
              </div>
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-primary border-b border-secondary/30 pb-2">
                  Web & Online-Präsenz
                </h3>
                <ul class="space-y-2 text-sm text-dark">
                  <li class="hover:text-primary transition-colors cursor-pointer">
                    Websites, Landingpages & Webshops
                  </li>
                  <li class="hover:text-primary transition-colors cursor-pointer">
                    SEO & Online-Marketing (Social Media, Kampagnen, Ads)
                  </li>
                </ul>
              </div>
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-primary border-b border-secondary/30 pb-2">
                  Daten & Künstliche Intelligenz
                </h3>
                <ul class="space-y-2 text-sm text-dark">
                  <li class="hover:text-primary transition-colors cursor-pointer">
                    KI-Modelle, Machine Learning & Big Data
                  </li>
                  <li class="hover:text-primary transition-colors cursor-pointer">
                    Chatbots, Sprachassistenten & Web Scraping
                  </li>
                </ul>
              </div>
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-primary border-b border-secondary/30 pb-2">
                  IT-Services & Digital Workplace
                </h3>
                <ul class="space-y-2 text-sm text-dark">
                  <li class="hover:text-primary transition-colors cursor-pointer">
                    IT-Installation, Wartung & Support
                  </li>
                  <li class="hover:text-primary transition-colors cursor-pointer">
                    Microsoft 365 & Collaboration Tools
                  </li>
                  <li class="hover:text-primary transition-colors cursor-pointer">
                    VoIP & Cloud-Telefonie
                  </li>
                  <li class="hover:text-primary transition-colors cursor-pointer">
                    Dokumentenmanagement & Cloud-Lösungen
                  </li>
                </ul>
              </div>
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-primary border-b border-secondary/30 pb-2">
                  Beratung & Förderung
                </h3>
                <ul class="space-y-2 text-sm text-dark">
                  <li class="hover:text-primary transition-colors cursor-pointer">
                    Digitalisierungs Beratung
                  </li>
                  <li class="hover:text-primary transition-colors cursor-pointer">
                    Zuschuss- & Fördermittelberatung
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <a href="/blog"
          class="relative px-6 py-3 text-base font-medium text-background bg-secondary/20 rounded-full border-2 border-secondary/50 transition-all duration-300 ease-in-out hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] transform hover:scale-95">
          Ratgeber
        </a>
      </div>
    </nav>

    <!-- Call-to-Action Button -->
    <div class="hidden md:flex">
      <a href="/kontakt"
        class="relative px-6 py-3 text-base font-medium text-background bg-gradient-to-r from-accent to-orange-600 rounded-full transition-all duration-300 ease-in-out hover:shadow-[0_0_25px_rgba(255,153,0,0.6)] transform hover:scale-105">
        <span class="relative flex items-center gap-2">
          Jetzt Kontaktieren
          <svg xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </a>
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
        class="fixed inset-0 bg-dark/95 backdrop-blur-sm flex flex-col items-center justify-center space-y-8 text-background text-lg z-50"
        role="dialog" aria-modal="true">
        <a href="/" @click="toggleMenu" class="text-xl hover:text-accent transition duration-200">Home</a>
        <a href="/projekte" @click="toggleMenu" class="text-xl hover:text-accent transition duration-200">Projekte</a>
        <div class="text-center">
          <span class="text-xl text-accent">Leistungen</span>
          <div class="mt-4 space-y-2 text-base text-gray-300">
            <div>Software & App-Entwicklung</div>
            <div>Web & Online-Präsenz</div>
            <div>Daten & KI</div>
            <div>IT-Services</div>
            <div>Beratung & Förderung</div>
          </div>
        </div>
        <a href="/blog" @click="toggleMenu" class="text-xl hover:text-accent transition duration-200">Ratgeber</a>
        <a href="/kontakt" @click="toggleMenu" class="text-xl hover:text-accent transition duration-200">Kontakt</a>
        <button @click="scrollToFunnel"
          class="px-8 py-4 text-lg font-medium text-background bg-gradient-to-r from-accent to-orange-600 rounded-full transition-all duration-300 ease-in-out hover:shadow-[0_0_25px_rgba(255,153,0,0.6)] transform hover:scale-105">
          Jetzt Kontaktieren
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

<style scoped>
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
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.slide-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* Custom dropdown animation */
.group:hover .group-hover\:opacity-100 {
  animation: fadeInUp 0.3s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px) translateX(-50%);
  }

  to {
    opacity: 1;
    transform: translateY(0) translateX(-50%);
  }
}
</style>