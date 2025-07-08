<template>
  <section class="bg-background text-primary min-h-screen relative font-body overflow-hidden">
    <HomeParticles class="absolute inset-0 z-0 pointer-events-none" />

    <!-- Hero Section -->
    <ClientOnly>
      <template #fallback>
        <!-- This empty container will display until HomeEulahAnimation is loaded -->
        <div style="height: 100vh;"></div>
      </template>
      <HomeEulahAnimation />
    </ClientOnly>

    <!-- Wer wir sind -->
    <HomeAbout />

    <!-- Unsere Zielgruppe -->
    <HomeZielgruppeSection />

    <!-- Unsere Leistungen -->
    <section id="services" class="py-32 bg-black mt-40">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-12">Unsere Leistungen</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <HomeLeistungCard title="Webseiten & Online-Shops"
            description="Maßgeschneiderte digitale Erlebnisse, die begeistern." icon="fas fa-globe"
            class="hover:shadow-3xl" />
          <HomeLeistungCard title="Softwareentwicklung"
            description="Von der Idee bis zur Umsetzung – leistungsstarke Softwarelösungen." icon="fas fa-code"
            class="hover:shadow-3xl" />
          <HomeLeistungCard title="Digitales Marketing" description="Datengetriebene Kampagnen für nachhaltigen Erfolg."
            icon="fas fa-bullhorn" class="hover:shadow-3xl" />
        </div>
      </div>
    </section>

    <!-- Unsere Vision -->
    <HomeVisionSection />

    <!-- Social Proof -->
    <HomeSocialProof />

  </section>
</template>

<script setup>

useSeoMeta({
  title: 'Digitale Lösungen für Unternehmen & Startups',
  description: 'Von der ersten Code-Zeile bis zur Skalierung – wir entwickeln Software, digitale Produkte & Marketingstrategien für nachhaltigen Erfolg.',
  ogTitle: 'Digitale Lösungen für Unternehmen & Startups',
  ogDescription: 'Von Code zu Cashflow – wir entwickeln digitale Produkte mit echtem Marktwert. Skalierbar, innovativ & wirtschaftlich erfolgreich.',
  ogImage: 'https://www.eulah.de/images/og-image.jpg', // Ersetze mit einem echten Bild
  // twitterCard: 'summary_large_image',
  canonical: 'https://www.eulah.de'
})


</script>


<style scoped>
.particles-container,
.particles-container canvas {
  pointer-events: none;
}


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
