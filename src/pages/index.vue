<template>
  <section class="bg-background text-dark font-body overflow-hidden relative">

    <!-- Hero Section -->
    <ClientOnly>
      <HomeHeroSection />
      <template #fallback>
        <div style="height: 100vh;"></div>
      </template>


    </ClientOnly>

    <HomeAbout />
    
    <!-- Leistungen -->
    <HomeServicesSection />

    <!-- Social Proof (Logos) -->
    <HomeSocialProof />

    <!-- Warum wir -->
    <HomeProjectsSection />

    <!-- Blog Section -->
    <HomeBlogCarousel />

    <!-- FAQ -->
    <HomeFaqSection />

  </section>
</template>

<script setup>

useSeoMeta({
  title: 'Ihr Partner für ganzheitliche IT-Lösungen',
  description: 'Von IT-Support bis Cloud-Infrastruktur – alles aus einer Hand.',
  ogTitle: 'Ihr Partner für ganzheitliche IT-Lösungen',
  ogDescription: 'Von IT-Support bis Cloud-Infrastruktur – alles aus einer Hand.',
  ogImage: 'https://www.eulah.de/images/og-image.jpg', // Ersetze mit einem echten Bild
  // twitterCard: 'summary_large_image',
  canonical: 'https://www.eulah.de'
})


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
