<template>
  <section id="services" class="py-24 bg-surface">
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-12">Unsere Leistungen</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <HomeServiceCard
          v-for="service in services"
          :key="service.title"
          :title="service.title"
          :description="service.description"
          :icon="service.icon"
          :link="service.link"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import HomeServiceCard from './ServiceCard.vue'

const services = [
  {
    title: 'IT-Support & Helpdesk',
    description: 'Schnelle Hilfe für Ihre Mitarbeiter und Systeme.',
    icon: 'fas fa-headset',
    link: '/leistungen/it-support'
  },
  {
    title: 'Netzwerk- & Servermanagement',
    description: 'Stabile und sichere IT-Infrastrukturen.',
    icon: 'fas fa-server',
    link: '/leistungen/netzwerk-server'
  },
  {
    title: 'Cloud-Lösungen & Microsoft 365',
    description: 'Flexibel arbeiten mit modernen Cloud-Diensten.',
    icon: 'fas fa-cloud',
    link: '/leistungen/cloud'
  },
  {
    title: 'Cybersecurity & Datenschutz',
    description: 'Schutz vor Bedrohungen und DSGVO-konform.',
    icon: 'fas fa-shield-alt',
    link: '/leistungen/cybersecurity'
  },
  {
    title: 'IT-Strategie & Beratung',
    description: 'Zukunftsfähige IT-Konzepte für Ihr Wachstum.',
    icon: 'fas fa-chess',
    link: '/leistungen/beratung'
  },
  {
    title: 'Individuelle Software / Automatisierung',
    description: 'Effizienz durch maßgeschneiderte Lösungen.',
    icon: 'fas fa-code',
    link: '/leistungen/software'
  }
]
</script>

<style scoped>
</style>
