<template>
  <section class="py-24 bg-gradient-to-br from-background via-surface to-background">
    <div class="container mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6">
          Häufig gestellte Fragen
        </h2>
        <p class="text-xl text-secondary max-w-3xl mx-auto">
          Hier findest du Antworten auf die wichtigsten Fragen rund um unsere Dienstleistungen und Services
        </p>
      </div>

      <!-- Service Tabs -->
      <div class="mb-10">
        <div class="flex flex-wrap justify-center gap-4">
          <button v-for="service in services" :key="service.id" @click="activeService = service.id"
            class="px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-colors"
            :class="[
              activeService === service.id
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
            ]">
            {{ service.title }}
          </button>
        </div>
      </div>

      <!-- FAQ Items -->
      <div class="max-w-4xl mx-auto space-y-4">
        <div v-for="(faq, index) in faqsByService[activeService]" :key="faq.q"
          class="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <button @click="toggleFaq(activeService, index)"
            class="w-full text-left p-6 sm:p-8 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300"
            :class="[
              openFaqs[activeService]?.[index] ? 'bg-gradient-to-r from-primary/5 to-secondary/5' : 'hover:bg-gray-50'
            ]">
            <div class="flex items-center justify-between">
              <h3 class="text-lg sm:text-xl font-bold text-gray-900 pr-4 group-hover:text-primary transition-colors">
                {{ faq.q }}
              </h3>

              <!-- Toggle Icon -->
              <div class="flex-shrink-0 ml-4">
                <div class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300" :class="[
                  openFaqs[activeService]?.[index]
                    ? 'bg-primary text-white transform rotate-45'
                    : 'bg-gray-100 text-gray-600 group-hover:bg-primary group-hover:text-white'
                ]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            </div>
          </button>

          <!-- Answer Content -->
          <transition name="slide-down" @enter="onEnter" @leave="onLeave">
            <div v-show="openFaqs[activeService]?.[index]" class="overflow-hidden">
              <div class="px-6 sm:px-8 pb-6 sm:pb-8">
                <div class="border-t border-gray-200 pt-6">
                  <p class="text-gray-700 leading-relaxed text-base sm:text-lg">
                    {{ faq.a }}
                  </p>

                  <!-- Optional: Action Button -->
                  <div v-if="faq.action" class="mt-6">
                    <button
                      class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                      {{ faq.action.text }}
                      <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-16">
        <div class="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 sm:p-12 text-white max-w-3xl mx-auto">
          <h3 class="text-2xl sm:text-3xl font-bold mb-4">
            Weitere Fragen?
          </h3>
          <p class="text-lg sm:text-xl mb-8 text-white/90">
            Unser Team hilft dir gerne weiter. Kontaktiere uns für eine kostenlose Beratung.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              class="px-8 py-4 bg-white text-primary rounded-full font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Jetzt Kontakt aufnehmen
            </button>
            <button
              class="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-primary transition-all duration-200">
              Kostenlose Beratung
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const services = [
  { id: 'software', title: 'Software & App-Entwicklung' },
  { id: 'web', title: 'Web & Online-Präsenz' },
  { id: 'ai', title: 'KI & Datenanalyse' },
  { id: 'it-services', title: 'IT-Services & Digital Workplace' },
  { id: 'consulting', title: 'Beratung & Förderung' }
]

const faqsByService = {
  software: [
    {
      q: 'Wie läuft die Entwicklung einer individuellen Software ab?',
      a: 'Wir starten mit einer Analyse Ihrer Anforderungen, erstellen ein Konzept und entwickeln in agilen Sprints den Prototyp bis zum fertigen Produkt.'
    },
    {
      q: 'Welche Technologien setzt ihr ein?',
      a: 'Je nach Projekt nutzen wir moderne Frameworks wie Vue.js, Node.js, .NET oder Flutter für performante Anwendungen.'
    },
    {
      q: 'Bietet ihr auch Wartung und Weiterentwicklung an?',
      a: 'Ja, nach dem Go-Live begleiten wir Ihre Software langfristig und übernehmen Updates sowie neue Funktionen.'
    }
  ],
  web: [
    {
      q: 'Optimiert ihr Websites für Suchmaschinen?',
      a: 'Natürlich, SEO-Optimierung ist fester Bestandteil unserer Webprojekte, damit Sie besser gefunden werden.'
    },
    {
      q: 'Könnt ihr auch Online-Shops umsetzen?',
      a: 'Wir realisieren E-Commerce-Lösungen mit Systemen wie Shopify oder individuellen Shop-Frameworks.'
    },
    {
      q: 'Übernehmt ihr die laufende Betreuung?',
      a: 'Auf Wunsch kümmern wir uns um Updates, Inhalte und Performance Ihrer Website.'
    }
  ],
  ai: [
    {
      q: 'Wie kann KI meinem Unternehmen helfen?',
      a: 'Durch intelligente Automatisierung, Vorhersagen und personalisierte Kundenerlebnisse steigern wir Effizienz und Umsatz.'
    },
    {
      q: 'Welche Daten werden für Machine Learning benötigt?',
      a: 'Das hängt vom Use Case ab, typischerweise genügen vorhandene Unternehmensdaten, die wir gemeinsam aufbereiten.'
    },
    {
      q: 'Sind meine Daten sicher?',
      a: 'Wir achten streng auf Datenschutz und setzen auf sichere Infrastruktur sowie Verschlüsselung.'
    }
  ],
  'it-services': [
    {
      q: 'Übernehmt ihr die Wartung unserer IT-Infrastruktur?',
      a: 'Ja, wir betreuen Ihre Systeme proaktiv und bieten bei Bedarf 24/7-Support.'
    },
    {
      q: 'Unterstützt ihr bei der Einrichtung von Microsoft 365?',
      a: 'Wir richten Microsoft 365 ein, migrieren Daten und schulen Ihr Team im Umgang.'
    },
    {
      q: 'Gibt es einen Notfallsupport?',
      a: 'Im Ernstfall steht unser Team kurzfristig bereit, um Ausfälle zu beheben.'
    }
  ],
  consulting: [
    {
      q: 'Helft ihr bei Förderanträgen?',
      a: 'Wir unterstützen bei der Auswahl passender Programme und der Antragstellung für Zuschüsse.'
    },
    {
      q: 'Wie läuft eine Digitalisierungsberatung ab?',
      a: 'Gemeinsam analysieren wir den Status quo, definieren Ziele und entwickeln eine individuelle Roadmap.'
    },
    {
      q: 'Welche Branchen betreut ihr?',
      a: 'Wir arbeiten branchenübergreifend und passen unsere Beratung an Ihre spezifischen Anforderungen an.'
    }
  ]
}

const activeService = ref(services[0].id)

const openFaqs = ref({})

const toggleFaq = (service, index) => {
  if (!openFaqs.value[service]) {
    openFaqs.value[service] = {}
  }
  openFaqs.value[service][index] = !openFaqs.value[service][index]
}

const onEnter = (el) => {
  el.style.height = '0'
  el.offsetHeight
  el.style.height = el.scrollHeight + 'px'
}

const onLeave = (el) => {
  el.style.height = el.scrollHeight + 'px'
  el.offsetHeight
  el.style.height = '0'
}
</script>

<style scoped>
/* Slide down animation */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.slide-down-enter-from {
  height: 0;
  opacity: 0;
}

.slide-down-leave-to {
  height: 0;
  opacity: 0;
}

/* Smooth transitions for all elements */
* {
  transition-property: transform, box-shadow, background-color, border-color, color, height, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus styles for better accessibility */
button:focus {
  outline: none;
}

button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Custom hover effects */
.group:hover .group-hover\:bg-primary {
  background-color: var(--color-primary);
}

.group:hover .group-hover\:text-white {
  color: white;
}

/* Responsive text sizing */
@media (max-width: 640px) {
  h2 {
    font-size: 2.25rem;
  }

  h3 {
    font-size: 1.125rem;
  }
}
</style>
