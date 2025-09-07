<template>
  <section id="projects" class="py-24 bg-gradient-to-br from-background via-surface to-background">
    <div class="container mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Unsere Leistungen
        </h2>
        <p class="text-xl text-dark max-w-3xl mx-auto leading-relaxed">
          Von maßgeschneiderter Software bis hin zu KI-Lösungen – wir digitalisieren Ihr Unternehmen mit modernsten
          Technologien und durchdachten Strategien.
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
        <ServiceCard v-for="service in services" :key="service.id" :service="service" @click="selectService(service)" />
      </div>

      <!-- Detailed View Modal/Expanded Card -->
      <div v-if="selectedService" class="mt-16">
        <ServiceDetail :service="selectedService" @close="selectedService = null" />
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-16">
        <div class="bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl text-background">
          <h3 class="text-2xl font-bold mb-4">Bereit für Ihr nächstes Projekt?</h3>
          <p class="text-lg mb-6 opacity-90">
            Lassen Sie uns gemeinsam die perfekte Lösung für Ihre Anforderungen entwickeln.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              class="bg-background text-primary hover:bg-surface px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
              Kostenloses Beratungsgespräch
            </button>
            <button
              class="border-2 border-background text-background hover:bg-background hover:text-primary px-8 py-3 rounded-full font-semibold transition-all duration-300">
              Projekte ansehen
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

import ServiceCard from './ServiceCard.vue'
import ServiceDetail from './ServiceDetail.vue'

const selectedService = ref(null)

const services = [
  {
    id: 'software',
    title: 'Software & App-Entwicklung',
    shortDesc: 'Maßgeschneiderte Lösungen für jeden Bedarf',
    icon: 'fas fa-code',
    gradient: 'from-blue-500 to-purple-600',
    features: [
      'Individuelle Softwarelösungen (Desktop, Web & App)',
      'ERP- & CRM-Systeme',
      'Warenwirtschaft & Prozessoptimierung',
      'Business Process Management (BPM)',
      'Robotic Process Automation (RPA)'
    ],
    technologies: ['Vue.js', 'Python', 'Node.js', '.NET', 'Flutter'],
    benefits: [
      'Effizienzsteigerung um bis zu 80%',
      'Reduzierte Betriebskosten',
      'Skalierbare Architektur',
      'Intuitive Benutzeroberflächen'
    ]
  },
  {
    id: 'web',
    title: 'Web & Online-Präsenz',
    shortDesc: 'Starker Webauftritt für maximale Reichweite',
    icon: 'fas fa-globe',
    gradient: 'from-green-500 to-teal-600',
    features: [
      'Responsive Websites & Landing Pages',
      'E-Commerce & Webshops',
      'SEO-Optimierung',
      'Social Media Marketing',
      'Online-Kampagnen & Ads'
    ],
    technologies: ['Nuxt.js', 'WordPress', 'Shopify', 'Google Ads', 'SEO Tools'],
    benefits: [
      'Höhere Conversion-Raten',
      'Bessere Suchmaschinen-Rankings',
      'Mobile-First Design',
      'Messbare Marketingerfolge'
    ]
  },
  {
    id: 'ai',
    title: 'KI & Datenanalyse',
    shortDesc: 'Intelligente Automatisierung mit KI',
    icon: 'fas fa-brain',
    gradient: 'from-purple-500 to-pink-600',
    features: [
      'Custom KI-Modelle & Machine Learning',
      'Big Data Analytics',
      'Intelligente Chatbots',
      'Sprachassistenten',
      'Web Scraping & Datenextraktion'
    ],
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Pandas', 'Apache Spark'],
    benefits: [
      'Automatisierte Entscheidungsfindung',
      'Predictive Analytics',
      '24/7 Kundenservice durch Bots',
      'Datenbasierte Insights'
    ]
  },
  {
    id: 'it-services',
    title: 'IT-Services & Digital Workplace',
    shortDesc: 'Moderne IT-Infrastrukturen für Ihr Team',
    icon: 'fas fa-server',
    gradient: 'from-orange-500 to-red-600',
    features: [
      'IT-Installation, Wartung & Support',
      'Microsoft 365 & Collaboration Tools',
      'VoIP & Cloud-Telefonie',
      'Dokumentenmanagement',
      'Cloud-Lösungen & Migration'
    ],
    technologies: ['Microsoft 365', 'Azure', 'Teams', 'SharePoint', 'VoIP-Systeme'],
    benefits: [
      'Verbesserte Teamzusammenarbeit',
      'Ortsunabhängiges Arbeiten',
      'Zentrale Datenverwaltung',
      'Professioneller IT-Support'
    ]
  },
  {
    id: 'consulting',
    title: 'Beratung & Förderung',
    shortDesc: 'Strategische Begleitung Ihrer Digitalisierung',
    icon: 'fas fa-lightbulb',
    gradient: 'from-yellow-500 to-orange-600',
    features: [
      'Digitalisierungsberatung',
      'IT-Strategieentwicklung',
      'Zuschuss- & Fördermittelberatung',
      'Change Management',
      'Technologie-Roadmaps'
    ],
    technologies: ['Beratungsframeworks', 'Projektmanagement-Tools', 'Analytics'],
    benefits: [
      'Bis zu 70% Förderung möglich',
      'Strukturierte Digitalisierung',
      'Risikominimierung',
      'Langfristige IT-Strategie'
    ]
  }
]

const selectService = (service) => {
  selectedService.value = selectedService.value?.id === service.id ? null : service
}
</script>

<style scoped></style>