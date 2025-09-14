<template>
  <section class="bg-background text-dark min-h-screen py-12">
    <div class="container mx-auto px-6">
      <!-- Titel -->
      <header class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">Unsere Projekte</h1>
        <p class="text-dark text-lg">
          Ein Blick auf unsere innovativen und erfolgreichen Umsetzungen.
        </p>
      </header>

      <!-- Filter-Bereich -->
      <div class="max-w-4xl mx-auto mb-12">
        <!-- Filter-Buttons -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- Dienstleistungen -->
          <div>
            <label class="block text-sm font-medium text-primary mb-3">Dienstleistungen</label>
            <div class="flex flex-wrap gap-2">
              <button v-for="service in availableServices" :key="service" @click="toggleFilter('services', service)"
                :class="[
                  'px-3 py-2 text-sm rounded-full border transition-all duration-200',
                  activeFilters.services.includes(service)
                    ? 'bg-accent text-background border-accent'
                    : 'bg-surface text-dark border-gray-300 hover:border-accent hover:text-accent'
                ]">
                {{ service }}
              </button>
            </div>
          </div>

          <!-- Branchen -->
          <div>
            <label class="block text-sm font-medium text-primary mb-3">Branchen</label>
            <div class="flex flex-wrap gap-2">
              <button v-for="industry in availableIndustries" :key="industry"
                @click="toggleFilter('industries', industry)" :class="[
                  'px-3 py-2 text-sm rounded-full border transition-all duration-200',
                  activeFilters.industries.includes(industry)
                    ? 'bg-accent text-background border-accent'
                    : 'bg-surface text-dark border-gray-300 hover:border-accent hover:text-accent'
                ]">
                {{ industry }}
              </button>
            </div>
          </div>
        </div>

        <!-- Aktive Filter Chips -->
        <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mb-4">
          <span class="text-sm text-primary font-medium">Aktive Filter:</span>
          <span v-for="service in activeFilters.services" :key="`service-${service}`"
            class="inline-flex items-center px-3 py-1 text-xs bg-accent text-background rounded-full">
            {{ service }}
            <button @click="removeFilter('services', service)" class="ml-2 hover:text-red-200">
              ×
            </button>
          </span>
          <span v-for="industry in activeFilters.industries" :key="`industry-${industry}`"
            class="inline-flex items-center px-3 py-1 text-xs bg-accent text-background rounded-full">
            {{ industry }}
            <button @click="removeFilter('industries', industry)" class="ml-2 hover:text-red-200">
              ×
            </button>
          </span>
          <button @click="clearAllFilters" class="px-3 py-1 text-xs text-accent hover:text-accent-light underline">
            Alle Filter zurücksetzen
          </button>
        </div>

        <!-- Ergebnis-Info -->
        <div class="text-center text-sm text-dark">
          {{ filteredProjects.length }} von {{ projects.length }} Projekten
        </div>
      </div>

      <!-- Projekt-Cards -->
      <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(project, index) in filteredProjects" :key="project.id" :ref="el => projectElements[index] = el"
          :class="[
            'relative bg-surface-glossy rounded-lg overflow-hidden shadow-lg group transition-all duration-500 transform hover:scale-110 hover:shadow-glow text-dark',
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
              <h3 class="text-xl font-semibold text-primary">{{ project.title }}</h3>
              <span class="text-accent text-2xl">{{ project.icon }}</span>
            </div>
            <p class="text-dark text-sm mb-4">{{ project.description }}</p>

            <!-- Filter-Tags -->
            <div class="flex flex-wrap gap-1 mb-4">
              <span v-for="service in project.services" :key="service"
                class="px-2 py-1 text-xs bg-primary text-background rounded">
                {{ service }}
              </span>
              <span v-for="industry in project.industries" :key="industry"
                class="px-2 py-1 text-xs bg-secondary text-background rounded">
                {{ industry }}
              </span>
            </div>

            <!-- Link zur Detailseite -->
            <NuxtLink :to="`/projekte/${project.slug}`" class="gradient-border-button">
              Mehr erfahren
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Keine Ergebnisse -->
      <div v-else class="text-center py-16">
        <div class="text-6xl mb-4 text-accent">🔍</div>
        <h3 class="text-xl font-semibold text-primary mb-2">Keine Projekte gefunden</h3>
        <p class="text-dark mb-4">Versuchen Sie es mit anderen Filtern oder setzen Sie die Auswahl zurück.</p>
        <button @click="clearAllFilters"
          class="px-6 py-3 bg-accent text-background rounded-full hover:bg-accent-light transition-colors duration-200">
          Filter zurücksetzen
        </button>
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
  ogImage: 'https://www.eulah.de/images/projects-og.jpg',
  twitterCard: 'summary_large_image',
  canonical: 'https://www.eulah.de/projekte'
})

const solarrexImg = "/images/solarrex2.jpg";
const solardetectionImg = "/images/solarpanel.jpg";
const shortifyImg = "/images/shortify.png";

const projects = ref([
  {
    id: 0,
    slug: "solarrex",
    title: "Solarrex GmbH",
    description: "PV-Installation - Leads-Generierung",
    image: solarrexImg,
    icon: "☀️",
    services: ["SEO", "Online Marketing"],
    industries: ["Handwerk & Bau", "Energie"]
  },
  {
    id: 1,
    slug: "solardetection",
    title: "Automatische Solaranlagen-Erkennung",
    description: "KI-gestützte Solaranlagen-Erkennung & Energie-Effizienz-Klassen",
    image: solardetectionImg,
    icon: "🛰️",
    services: ["KI-Entwicklung", "Automatisierung", "Softwareentwicklung"],
    industries: ["Handwerk & Bau", "Energie"]
  },
  {
    id: 2,
    slug: "shortify",
    title: "Shortify",
    description: "Automatisierte Short-Videos aus Finanznews & Finanzdaten",
    image: shortifyImg,
    icon: "🎬",
    services: ["Automatisierung", "KI-Entwicklung", "Softwareentwicklung"],
    industries: ["Content Creator"]
  },
]);

// Filter-Optionen
const availableServices = ref([
  "SEO",
  "Online Marketing",
  "Webentwicklung",
  "Softwareentwicklung",
  "KI-Entwicklung",
  "Automatisierung",
  "IT-Services"
]);

const availableIndustries = ref([
  "Handwerk & Bau",
  "Logistik",
  "Gastronomie & Hotellerie",
  "Gesundheitswesen",
  "Hausverwaltungen",
  "Rechts- & Steuerberatung",
  "Content Creator",
]);

// Filter-State
const activeFilters = ref({
  services: [],
  industries: []
});

// Computed Properties
const hasActiveFilters = computed(() => {
  return activeFilters.value.services.length > 0 || activeFilters.value.industries.length > 0;
});

const filteredProjects = computed(() => {
  if (!hasActiveFilters.value) {
    return projects.value;
  }

  return projects.value.filter(project => {
    const matchesService = activeFilters.value.services.length === 0 ||
      activeFilters.value.services.some(service => project.services.includes(service));

    const matchesIndustry = activeFilters.value.industries.length === 0 ||
      activeFilters.value.industries.some(industry => project.industries.includes(industry));

    return matchesService && matchesIndustry;
  });
});

// Filter-Methoden
function toggleFilter(type, value) {
  const filters = activeFilters.value[type];
  const index = filters.indexOf(value);

  if (index > -1) {
    filters.splice(index, 1);
  } else {
    filters.push(value);
  }
}

function removeFilter(type, value) {
  const filters = activeFilters.value[type];
  const index = filters.indexOf(value);
  if (index > -1) {
    filters.splice(index, 1);
  }
}

function clearAllFilters() {
  activeFilters.value.services = [];
  activeFilters.value.industries = [];
}

// Existing mobile/intersection logic
const projectElements = ref([]);
const intersectionRatios = ref([]);
const activeProjectId = ref(null);
const isMobile = ref(false);
const route = useRoute();
let observer = null;

function handleResize() {
  isMobile.value = window.innerWidth < 640;
}

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);

  observer = new IntersectionObserver(observerCallback, {
    rootMargin: "0px",
    threshold: Array.from({ length: 11 }, (_, i) => i / 10)
  });

  intersectionRatios.value = projects.value.map(() => 0);
  projectElements.value.forEach((el) => observer.observe(el));

  const hasReloaded = sessionStorage.getItem(`reloaded-${route.path}`);

  if (!hasReloaded && import.meta.client) {
    sessionStorage.setItem(`reloaded-${route.path}`, 'true');
    window.location.reload();
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  if (observer) observer.disconnect();

  if (import.meta.client) {
    sessionStorage.removeItem(`reloaded-${route.path}`);
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
  activeProjectId.value = filteredProjects.value[maxIndex]?.id;
}
</script>

<style scoped>
/* Existing styles */
.bg-surface-glossy {
  background: linear-gradient(145deg, var(--color-surface), var(--color-background));
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

.hover\:shadow-glow:hover {
  box-shadow: 0 4px 20px rgba(77, 166, 255, 0.5);
}

.gradient-border-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: var(--color-background);
  background: var(--color-primary);
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
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gradient-border-button:hover::before {
  opacity: 1;
}

.is-active-mobile {
  transform: scale(1.1);
  box-shadow: 0 4px 20px rgba(77, 166, 255, 0.5);
}

.is-active-mobile .bg-accent {
  opacity: 0.2 !important;
}

.is-active-mobile img {
  transform: scale(1.1);
}
</style>