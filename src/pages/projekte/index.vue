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

      <!-- Filter -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row gap-8">
          <div>
            <label class="block text-sm font-medium mb-2">Dienstleistungen</label>
            <div class="flex flex-wrap gap-2">
              <label v-for="service in serviceOptions" :key="service" class="flex items-center gap-1">
                <input type="checkbox" :value="service" v-model="selectedServices" class="accent-accent">
                <span>{{ service }}</span>
              </label>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Branchen</label>
            <div class="flex flex-wrap gap-2">
              <label v-for="industry in industryOptions" :key="industry" class="flex items-center gap-1">
                <input type="checkbox" :value="industry" v-model="selectedIndustries" class="accent-accent">
                <span>{{ industry }}</span>
              </label>
            </div>
          </div>
        </div>
        <div v-if="selectedServices.length || selectedIndustries.length" class="flex flex-wrap gap-2 mt-4">
          <span v-for="service in selectedServices" :key="service" class="px-3 py-1 bg-surface rounded-full text-sm">
            {{ service }} <button @click="removeService(service)" class="ml-1">×</button>
          </span>
          <span v-for="industry in selectedIndustries" :key="industry" class="px-3 py-1 bg-surface rounded-full text-sm">
            {{ industry }} <button @click="removeIndustry(industry)" class="ml-1">×</button>
          </span>
        </div>
      </div>

      <!-- Projekt-Cards -->
      <div v-if="!filteredProjects.length" class="text-center mt-8">
        <p>Keine Projekte gefunden. <button @click="resetFilters" class="text-accent underline">Filter zurücksetzen</button></p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in filteredProjects" :key="project.id" class="relative bg-surface-glossy rounded-lg overflow-hidden shadow-lg group transition-all duration-500 transform hover:scale-110 hover:shadow-glow text-dark">
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
  ogImage: 'https://www.eulah.de/images/projects-og.jpg',
  twitterCard: 'summary_large_image',
  canonical: 'https://www.eulah.de/projekte'
})

const serviceOptions = ["Managed IT", "Cloud", "Automatisierung", "Marketing"]
const industryOptions = ["Handwerk", "Energie", "Gesundheit", "Finanzen", "Medien"]

const selectedServices = ref([])
const selectedIndustries = ref([])

const solarrexImg = "/images/solarrex2.jpg"
const solardetectionImg = "/images/solarpanel.jpg"
const shortifyImg = "/images/shortify.png"

const projects = ref([
  {
    id: 0,
    slug: "solarrex",
    title: "Solarrex GmbH",
    description: "PV-Installation - Leads-Generierung",
    image: solarrexImg,
    icon: "☀️",
    services: ["Marketing"],
    industries: ["Energie"],
  },
  {
    id: 1,
    slug: "solardetection",
    title: "Solarpanel Detection System",
    description: "KI-gestützte Solaranlagen-Erkennung & Energie-Effizienz-Klassen",
    image: solardetectionImg,
    icon: "🛰️",
    services: ["Cloud", "Automatisierung"],
    industries: ["Energie"],
  },
  {
    id: 2,
    slug: "shortify",
    title: "Shortify",
    description: "Automatisierte Short-Videos aus Finanznews & Finanzdaten",
    image: shortifyImg,
    icon: "🎬",
    services: ["Automatisierung", "Cloud"],
    industries: ["Medien"],
  },
])

const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    const serviceMatch = !selectedServices.value.length || selectedServices.value.some(s => project.services.includes(s))
    const industryMatch = !selectedIndustries.value.length || selectedIndustries.value.some(i => project.industries.includes(i))
    return serviceMatch && industryMatch
  })
})

function removeService(service) {
  selectedServices.value = selectedServices.value.filter(s => s !== service)
}
function removeIndustry(industry) {
  selectedIndustries.value = selectedIndustries.value.filter(i => i !== industry)
}
function resetFilters() {
  selectedServices.value = []
  selectedIndustries.value = []
}
</script>

<style scoped>
/* Glänzender Hintergrund */
.bg-surface-glossy {
  background: linear-gradient(145deg, var(--color-surface), var(--color-background));
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* Hover-Shadows (Desktop und Tablets) */
.hover\:shadow-glow:hover {
  box-shadow: 0 4px 20px rgba(77, 166, 255, 0.5);
}

/* Button mit Gradient-Umrandung */
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
</style>
