<template>
  <section class="bg-background text-dark font-body overflow-hidden relative">
    <!-- Hero Section -->
    <ClientOnly>
      <HomeHeroSection />
      <template #fallback>
        <div style="height: 100vh"></div>
      </template>
    </ClientOnly>


    <!-- Social Proof (Logos) -->
    <HomeSocialProof />

    <!-- Geschäftsbereiche -->
    <HomeBusinessAreasSection />
    <!-- Projektablauf -->
    <HomeProcessSection />


    <!-- Warum wir -->
    <HomeProjectsSection />

    <!-- Technologiepartner -->
    <HomePartnersSection />

    <!-- Blog Section -->
    <HomeBlogCarousel />

    <!-- FAQ -->
    <HomeFaqSection />
  </section>
</template>

<script setup>
import { defineLocalBusiness } from 'nuxt-schema-org/schema'

useSeoMeta({
  title: "ANPASSEN",
  description: "ANPASSEN",
  ogTitle: "ANPASSEN",
  ogDescription:
    "ANPASSEN",
  ogImage: "https://www.eulah.de/images/og-image.jpg", // Ersetze mit einem echten Bild
  // twitterCard: 'summary_large_image',
  canonical: "https://www.eulah.de",
});


// 👉 Nur auf der Homepage: LocalBusiness / ProfessionalService
useSchemaOrg([
  defineLocalBusiness({
    '@type': 'ProfessionalService',
    '@id': 'https://www.eulah.de/#local',
    name: 'Eulah IT',
    url: 'https://www.eulah.de',
    image: 'https://www.eulah.de/logo.png',
    priceRange: '€€',
    telephone: '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sudbrackstraße 12',
      postalCode: '33611',
      addressLocality: 'Bielefeld',
      addressRegion: 'NRW',
      addressCountry: 'DE'
    },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '19:00'
    }],
    parentOrganization: {
      '@id': 'https://www.eulah.de/#organization' // Verknüpft mit eurer Brand aus nuxt.config
    }
  }),

  defineWebSite({
    '@id': 'https://www.eulah.de/#website',
    url: 'https://www.eulah.de',
    name: 'Eulah IT',
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: 'https://www.eulah.de/suche?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    ],
    publisher: { '@id': 'https://www.eulah.de/#organization' }
  }),
  
  defineWebPage({
    '@id': 'https://www.eulah.de/#webpage',
    name: 'Eulah IT – Ihr Partner für ganzheitliche IT-Lösungen',
    url: 'https://www.eulah.de',
    description: 'ANPASSEN',
    isPartOf: { '@id': 'https://www.eulah.de/#website' },
    about: { '@id': 'https://www.eulah.de/#organization' },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: 'https://www.eulah.de/images/og-image.jpg'
    },
    breadcrumb: { '@id': 'https://www.eulah.de/#breadcrumb' }
  })
])
</script>

<style scoped>
.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .animate-carousel {
    animation: carousel 40s linear infinite;
  }

  .text-4xl {
    font-size: 2rem;
  }

  .text-5xl {
    font-size: 2.5rem;
  }

  .text-6xl {
    font-size: 3rem;
  }
}
</style>
