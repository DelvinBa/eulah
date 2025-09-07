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

      <!-- FAQ Items -->
      <div class="max-w-4xl mx-auto space-y-4">
        <div v-for="(faq, index) in faqs" :key="faq.q"
          class="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <button @click="toggleFaq(index)"
            class="w-full text-left p-6 sm:p-8 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300"
            :class="[
              openFaqs[index] ? 'bg-gradient-to-r from-primary/5 to-secondary/5' : 'hover:bg-gray-50'
            ]">
            <div class="flex items-center justify-between">
              <h3 class="text-lg sm:text-xl font-bold text-gray-900 pr-4 group-hover:text-primary transition-colors">
                {{ faq.q }}
              </h3>

              <!-- Toggle Icon -->
              <div class="flex-shrink-0 ml-4">
                <div class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300" :class="[
                  openFaqs[index]
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
            <div v-show="openFaqs[index]" class="overflow-hidden">
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

const faqs = [
  {
    q: 'Bietet ihr auch 24/7 Support?',
    a: 'Ja, unser Team steht Ihnen rund um die Uhr zur Verfügung. Wir bieten verschiedene Support-Level an - von der Standard-Betreuung während der Geschäftszeiten bis hin zum Premium 24/7-Service für kritische Systeme. Dabei nutzen wir moderne Ticket-Systeme und Remote-Support-Tools für schnelle Hilfe.',
    action: { text: 'Support-Pakete ansehen', url: '#' }
  },
  {
    q: 'Welche Regionen betreut ihr?',
    a: 'Wir arbeiten deutschlandweit und betreuen Kunden sowohl vor Ort als auch remote. Unser Hauptsitz befindet sich in Baden-Württemberg, aber durch unsere mobile Arbeitsweise und digitale Infrastruktur können wir Projekte in ganz Deutschland realisieren. Remote-Services sind sogar international möglich.'
  },
  {
    q: 'Welche Zertifizierungen besitzt euer Team?',
    a: 'Unsere Spezialisten sind umfassend zertifiziert, darunter Microsoft (Azure, Office 365), Cisco (Netzwerk-Technologien), AWS (Cloud Services) und weitere branchenspezifische Qualifikationen. Wir legen großen Wert auf kontinuierliche Weiterbildung und halten unsere Zertifizierungen stets aktuell.',
    action: { text: 'Mehr über unser Team', url: '#' }
  },
  {
    q: 'Wie lange dauert die Umsetzung eines Projekts?',
    a: 'Die Projektdauer hängt vom Umfang und der Komplexität ab. Einfache Websites sind oft in 2-4 Wochen fertig, während komplexe Software-Entwicklungen oder ERP-Implementierungen 3-6 Monate dauern können. Wir erstellen für jedes Projekt einen detaillierten Zeitplan mit Meilensteinen.'
  },
  {
    q: 'Welche Kosten kommen auf mich zu?',
    a: 'Unsere Preise sind transparent und projektabhängig. Wir bieten sowohl Festpreise für definierte Projekte als auch flexible Stunden- oder Tagessätze für laufende Betreuung. Nach einem kostenlosen Beratungsgespräch erhalten Sie ein detailliertes Angebot ohne versteckte Kosten.'
  },
  {
    q: 'Bietet ihr auch Schulungen für unser Team an?',
    a: 'Selbstverständlich! Wir glauben daran, dass erfolgreiche Digitalisierung nur mit gut geschulten Teams funktioniert. Wir bieten maßgeschneiderte Schulungen, Workshops und Online-Trainings für alle von uns implementierten Systeme und modernen Technologien an.'
  }
]

// Reactive state for tracking open FAQs
const openFaqs = ref({})

// Toggle FAQ function
const toggleFaq = (index) => {
  openFaqs.value[index] = !openFaqs.value[index]
}

// Animation functions for smooth height transitions
const onEnter = (el) => {
  el.style.height = '0'
  el.offsetHeight // trigger reflow
  el.style.height = el.scrollHeight + 'px'
}

const onLeave = (el) => {
  el.style.height = el.scrollHeight + 'px'
  el.offsetHeight // trigger reflow
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