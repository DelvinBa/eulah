<template>
  <section class="bg-black text-white min-h-screen py-12">
    <div class="container mx-auto px-6">
      <!-- Titel -->
      <header class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">Unsere Projekte</h1>
        <p class="text-gray-400 text-lg">
          Ein Blick auf unsere innovativen und erfolgreichen Umsetzungen.
        </p>
      </header>

      <!-- Projekt-Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(project, index) in projects" :key="project.id" :ref="el => projectElements[index] = el" :class="[
          'relative bg-black-glossy rounded-lg overflow-hidden shadow-lg group transition-all duration-500 transform hover:scale-110 hover:shadow-glow',
          { 'is-active-mobile': isMobile && activeProjectId === project.id }
        ]">
          <!-- Hintergrund-Leuchteffekt -->
          <div class="absolute inset-0 bg-accent opacity-0 group-hover:opacity-20 transition-opacity duration-500">
          </div>

          <!-- Bild -->
          <div class="overflow-hidden relative z-10">
            <img :src="project.image" :alt="project.title"
              class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out" />
          </div>

          <!-- Inhalt -->
          <div class="p-6 relative z-20">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-xl font-semibold text-white">{{ project.title }}</h3>
              <span class="text-accent text-2xl">{{ project.icon }}</span>
            </div>
            <p class="text-gray-400 text-sm mb-4">{{ project.description }}</p>
            <!-- Link zur Detailseite -->
            <NuxtLink :to="`/projekte/${project.slug}`" class="gradient-border-button">
              Mehr erfahren
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

useSeoMeta({
  title: 'Unsere Projekte – Eulah',
  description: 'Entdecke unsere erfolgreich umgesetzten digitalen Projekte in Softwareentwicklung, Marketing & Automatisierung.',
  ogTitle: 'Unsere Projekte – Eulah',
  ogDescription: 'Von innovativen Web-Plattformen bis zu automatisierten Marketingstrategien – ein Überblick über unsere digitalen Erfolge.',
  ogImage: 'https://eulah.de/images/projects-og.jpg', // Replace with a real image
  twitterCard: 'summary_large_image',
  canonical: 'https://eulah.de/projekte'
})


const solarrexImg = "/images/solarrex2.jpg";
const solardetectionImg = "/images/solarpanel.jpg";
const shortifyImg = "/images/shortify.png";
const projects = ref([
  {
    slug: "solarrex",
    title: "Solarrex GmbH",
    description: "PV-Installation - Leads-Generierung",
    image: solarrexImg,
    icon: "☀️",
  },
  {
    slug: "solardetection",
    title: "Solarpanel Detection System",
    description: "KI-gestützte Solaranlagen-Erkennung & Energie-Effizienz-Klassen",
    image: solardetectionImg,   // <- dein Bildimport
    icon: "🛰️",
  },
  {
    slug: "shortify",
    title: "Shortify",
    description: "Automatisierte Short-Videos aus Finanznews & FinaFinanznzdaten",
    image: shortifyImg,  //  <-– dein Bildimport
    icon: "🎬",
  },
]);

const projectElements = ref([]);
const intersectionRatios = ref([]);
const activeProjectId = ref(null);
const isMobile = ref(false);
const route = useRoute()
let observer = null;


function handleResize() {
  isMobile.value = window.innerWidth < 640;
}

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);

  observer = new IntersectionObserver(observerCallback, { rootMargin: "0px", threshold: Array.from({ length: 11 }, (_, i) => i / 10) });
  intersectionRatios.value = projects.value.map(() => 0);
  projectElements.value.forEach((el) => observer.observe(el));

  const hasReloaded = sessionStorage.getItem(`reloaded-${route.path}`)

  if (!hasReloaded && import.meta.client) {
    // Mark this page as reloaded
    sessionStorage.setItem(`reloaded-${route.path}`, 'true')
    // Reload the page
    window.location.reload()
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  if (observer) observer.disconnect();

  if (import.meta.client) {
    // Remove the reload status for this page
    sessionStorage.removeItem(`reloaded-${route.path}`)
  }
});

function observerCallback(entries) {
  if (!isMobile.value) return;

  entries.forEach((entry) => {
    const index = projectElements.value.findIndex((el) => el === entry.target);
    if (index !== -1) {
      intersectionRatios.value[index] = entry.intersectionRatio;
    }
  });

  const oldActiveId = activeProjectId.value;
  let maxRatio = 0, maxIndex = -1;

  intersectionRatios.value.forEach((ratio, i) => {
    if (ratio > maxRatio) {
      maxRatio = ratio;
      maxIndex = i;
    }
  });

  if (maxRatio < 0.1 || maxIndex === -1) {
    activeProjectId.value = null;
    return;
  }
  activeProjectId.value = projects.value[maxIndex].id;
}
</script>

<style scoped>
/* Glänzender schwarzer Hintergrund */
.bg-black-glossy {
  background: linear-gradient(145deg, #0a0a0a, #1a1a1a);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.05);
}

/* Hover-Shadows (Desktop und Tablets) */
.hover\:shadow-glow:hover {
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.5);
}

/* Button mit Gradient-Umrandung */
.gradient-border-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background: black;
  border: 2px solid transparent;
  border-radius: 30px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.gradient-border-button::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 30px;
  background: linear-gradient(to right, #38bdf8, #8b5cf6);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gradient-border-button:hover::before {
  opacity: 1;
}

/* "aktive" Karte auf Mobil (ohne Hover) */
.is-active-mobile {
  transform: scale(1.1);
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.5);
  /* Glow wie bei Hover */
}

/* Hintergrund-Leuchteffekt bei aktiver Karte erzwingen */
.is-active-mobile .bg-accent {
  opacity: 0.2 !important;
}

/* Bild skalieren wie beim Hover */
.is-active-mobile img {
  transform: scale(1.1);
}
</style>
