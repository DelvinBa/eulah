<template>
  <section class="bg-black text-white min-h-screen">

    <!-- Hero Section -->
    <div class="container mx-auto px-6 py-16 text-center">
      <h1 class="text-6xl font-extrabold mb-6 animate-fade-in">
        Willkommen bei <span class="text-gray-300">Eulah</span>
      </h1>
      <p class="text-xl text-gray-400 mb-8 animate-slide-in">
        Ihr Partner für <span class="text-white">Softwareentwicklung</span>, 
        <span class="text-white">Digitales Marketing</span> und 
        <span class="text-white">Automatisierung</span>.
      </p>
      <button class="bg-transparent border border-gray-600 text-white py-3 px-8 rounded-full shadow-lg hover:border-accent hover:text-accent transition">
        Jetzt entdecken
      </button>
    </div>

    <!-- About Section -->
    <div id="about" class="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between">
      <div class="lg:w-1/2 text-center lg:text-left">
        <h2 class="text-4xl font-bold mb-4 animate-fade-in">Über Eulah</h2>
        <p class="text-gray-400 text-lg animate-slide-in">
          Bei Eulah setzen wir auf Innovation und Präzision, um außergewöhnliche digitale Erlebnisse zu schaffen.
          Unsere Lösungen in den Bereichen Softwareentwicklung, Marketing und Automatisierung helfen Ihnen, Ihre Vision zu verwirklichen.
        </p>
      </div>
      <div class="lg:w-1/2 mt-8 lg:mt-0">

      </div>
    </div>

    <!-- Services Section -->
    <div id="services" class="py-16">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-center mb-12 animate-fade-in">Unsere Leistungen</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <!-- Card 1 -->
          <div
            class="p-6 bg-black rounded-lg shadow-lg border border-gray-700 hover:border-accent hover:shadow-accent transition duration-300 animate-slide-in"
          >
            <h3 class="text-2xl font-semibold text-white">Software</h3>
            <p class="text-gray-400 mt-4">
              Maßgeschneiderte Softwarelösungen, die Innovation und Effizienz vereinen.
            </p>
          </div>
          <!-- Card 2 -->
          <div
            class="p-6 bg-black rounded-lg shadow-lg border border-gray-700 hover:border-accent hover:shadow-accent transition duration-300 animate-slide-in"
          >
            <h3 class="text-2xl font-semibold text-white">Digitales Marketing</h3>
            <p class="text-gray-400 mt-4">
              Ihre Marke sichtbar machen – mit Strategien, die wirken.
            </p>
          </div>
          <!-- Card 3 -->
          <div
            class="p-6 bg-black rounded-lg shadow-lg border border-gray-700 hover:border-accent hover:shadow-accent transition duration-300 animate-slide-in"
          >
            <h3 class="text-2xl font-semibold text-white">Automatisierung</h3>
            <p class="text-gray-400 mt-4">
              Intelligente Prozesse für maximale Produktivität.
            </p>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import Header from '~/components/shared/Header.vue';



export default {
  name: "HomePage",
  components: {
    Header,
  },
};
</script>
