<template>
  <div class="max-w-3xl mx-auto bg-black-glossy rounded-lg shadow-xl p-8 border border-gray-800">
    <h2 class="text-2xl font-bold mb-6 text-white">Starten Sie mit uns durch!</h2>
    <p class="text-gray-400 mb-6">
      Beantworten Sie ein paar kurze Fragen, damit wir Ihre Anfrage optimal bearbeiten können.
    </p>

    <!-- Schritt 1: Interesse auswählen -->
    <div v-if="step === 1" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        class="p-6 bg-black-glossy rounded-lg border border-gray-700 hover:border-accent hover:shadow-accent transition duration-300 cursor-pointer"
        @click="setInterest('Softwareentwicklung')"
      >
        <div class="text-4xl mb-2 text-white">💻</div>
        <h3 class="text-lg font-semibold text-white">Softwareentwicklung</h3>
        <p class="text-gray-400 text-sm mt-2">Maßgeschneiderte Softwarelösungen.</p>
      </div>

      <div
        class="p-6 bg-black-glossy rounded-lg border border-gray-700 hover:border-accent hover:shadow-accent transition duration-300 cursor-pointer"
        @click="setInterest('Digitales Marketing')"
      >
        <div class="text-4xl mb-2 text-white">📈</div>
        <h3 class="text-lg font-semibold text-white">Digitales Marketing</h3>
        <p class="text-gray-400 text-sm mt-2">Strategien für mehr Reichweite.</p>
      </div>

      <div
        class="p-6 bg-black-glossy rounded-lg border border-gray-700 hover:border-accent hover:shadow-accent transition duration-300 cursor-pointer"
        @click="setInterest('Web Scraping')"
      >
        <div class="text-4xl mb-2 text-white">⚙️</div>
        <h3 class="text-lg font-semibold text-white">Web Scraping</h3>
        <p class="text-gray-400 text-sm mt-2">Extraktion von Web-Daten.</p>
      </div>
    </div>

    <!-- Schritt 2: Dynamische Fragen basierend auf Auswahl -->
    <div v-else-if="step === 2" class="space-y-6">
      <p class="text-lg text-white mb-4">
        Fragen zu Ihrer Auswahl: <span class="font-bold">{{ form.interest }}</span>
      </p>
      <div v-if="form.interest === 'Softwareentwicklung'" class="space-y-4">
        <h4 class="text-white">Welche Art von Software benötigen Sie?</h4>
        <div v-for="option in softwareOptions" :key="option" class="space-y-2">
          <label class="text-white">
            <input
              v-model="form.details.softwareType"
              type="radio"
              :value="option"
              class="mr-2"
            >
            {{ option }}
          </label>
        </div>
      </div>
      <div v-else-if="form.interest === 'Digitales Marketing'" class="space-y-4">
        <h4 class="text-white">Welche Marketingstrategien interessieren Sie?</h4>
        <div v-for="option in marketingOptions" :key="option" class="space-y-2">
          <label class="text-white">
            <input
              v-model="form.details.marketingStrategies"
              type="checkbox"
              :value="option"
              class="mr-2"
            >
            {{ option }}
          </label>
        </div>
      </div>
      <div v-else-if="form.interest === 'Web Scraping'" class="space-y-4">
        <h4 class="text-white">Welche Art von Daten möchten Sie extrahieren?</h4>
        <div v-for="option in scrapingOptions" :key="option" class="space-y-2">
          <label class="text-white">
            <input
              v-model="form.details.scrapingType"
              type="radio"
              :value="option"
              class="mr-2"
            >
            {{ option }}
          </label>
        </div>
      </div>
      <button
        class="w-full py-3 px-6 mt-4 rounded-lg bg-transparent border border-gray-700 text-white hover:border-accent hover:shadow-accent transition"
        @click="nextStep"
      >
        Weiter
      </button>
    </div>

    <!-- Schritt 3: Kontaktdaten -->
    <div v-else-if="step === 3" class="space-y-6">
      <p class="text-lg text-white mb-4">Bitte geben Sie Ihre Kontaktdaten ein:</p>
      <form class="space-y-4" @submit.prevent="submitForm">
        <input
          v-model="form.name"
          type="text"
          placeholder="Ihr Name"
          class="w-full p-3 bg-black text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
          required
        >
        <input
          v-model="form.email"
          type="email"
          placeholder="Ihre E-Mail-Adresse"
          class="w-full p-3 bg-black text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
          required
        >
        <input
          v-model="form.phone"
          type="tel"
          placeholder="Ihre Telefonnummer"
          class="w-full p-3 bg-black text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
          required
        >
        <button
          type="submit"
          class="w-full py-3 px-6 rounded-lg bg-transparent border border-gray-700 text-white hover:border-accent hover:shadow-accent transition"
        >
          Absenden
        </button>
      </form>
    </div>

    <!-- Schritt 4: Abschluss -->
    <div v-else-if="step === 4">
      <p class="text-lg text-white">
        Vielen Dank, {{ form.name }}! Wir haben Ihre Anfrage erhalten und melden uns bald bei Ihnen.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const step = ref(1);
const form = ref({
  interest: '',
  details: {},
  name: '',
  email: '',
  phone: '',
});

const softwareOptions = ['Web-App', 'Mobile-App', 'Desktop-Software'];
const marketingOptions = ['SEO', 'Social Media', 'Content Marketing', 'Email Marketing'];
const scrapingOptions = ['Produktdaten', 'Websites', 'Preise & Angebote'];

const setInterest = (interest) => {
  form.value.interest = interest;
  step.value = 2;
};

const nextStep = () => {
  step.value = 3;
};

const submitForm = () => {
  console.log('Form submitted:', form.value);
  step.value = 4;
  // API-Aufruf oder Backend-Verarbeitung hier einfügen
};
</script>

<style>
.bg-black-glossy {
  background: linear-gradient(145deg, #0a0a0a, #1a1a1a);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.05);
}

.hover\:shadow-accent:hover {
  box-shadow: 0 0 20px 5px #00d4ff; /* Leichter Heiligenschein */
}
</style>
