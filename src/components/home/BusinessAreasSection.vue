<template>
  <section class="relative py-24 md:py-32 bg-gray-50 overflow-hidden">
    <!-- Background: Grid + subtle gradients -->
    <div class="absolute inset-0 -z-20 pointer-events-none">
      <!-- Grid -->
      <svg class="w-full h-full text-gray-200/60" xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0 L0 0 0 40" fill="none" stroke="currentColor" stroke-width="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <!-- Subtle background elements -->
      <div class="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-100/30 blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-orange-100/30 blur-3xl"></div>
    </div>

    <div class="container mx-auto px-4 md:px-8 text-center relative max-w-7xl">
      <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
        Unsere Geschäftsbereiche
      </h2>
      <p class="mt-6 max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
        Wir begleiten Sie vom ersten Konzept bis zum laufenden Betrieb. <br />
        Unser Fokus: messbare Ergebnisse, vereinfachte Abläufe und nachhaltiges Wachstum – ganz ohne unnötige
        Komplexität.
      </p>

      <!-- Value proposition cards -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        <div
          class="flex items-center justify-start gap-3 px-6 py-4 rounded-xl bg-white shadow-sm border border-gray-200 text-left">
          <span class="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 text-blue-600 shrink-0">
            <i class="fas fa-bolt text-lg" aria-hidden="true"></i>
          </span>
          <span class="text-gray-700">
            <strong class="text-gray-900">Einfach loslegen</strong><br>
            <span class="text-sm">wir liefern, Sie nutzen</span>
          </span>
        </div>
        <div
          class="flex items-center justify-start gap-3 px-6 py-4 rounded-xl bg-white shadow-sm border border-gray-200 text-left">
          <span class="flex items-center justify-center w-10 h-10 rounded-xl bg-green-100 text-green-600 shrink-0">
            <i class="fas fa-chart-line text-lg" aria-hidden="true"></i>
          </span>
          <span class="text-gray-700">
            <strong class="text-gray-900">Mehr Zeit fürs Wesentliche</strong><br>
            <span class="text-sm">weniger Klicks, weniger Fehler</span>
          </span>
        </div>
        <div
          class="flex items-center justify-start gap-3 px-6 py-4 rounded-xl bg-white shadow-sm border border-gray-200 text-left">
          <span class="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 shrink-0">
            <!-- Fix: kompatibles FA5-Icon -->
            <i class="fas fa-shield-alt text-lg" aria-hidden="true"></i>
          </span>
          <span class="text-gray-700">
            <strong class="text-gray-900">Datenschutz inklusive</strong><br>
            <span class="text-sm">DSGVO-konform</span>
          </span>
        </div>
      </div>

      <!-- Service cards grid -->
      <div class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        <NuxtLink v-for="area in areas" :key="area.title" :to="`/leistungen#${area.hash}`"
          class="group relative block h-full rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 focus-visible:ring-offset-2"
          :aria-label="`Zum Leistungsbereich: ${area.title}`">

          <!-- Hover effect background -->
          <div
            class="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          </div>

          <!-- Main card -->
          <div
            class="relative h-full rounded-2xl border border-gray-200 bg-white p-8 text-left shadow-sm hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-2 group-hover:border-blue-200 flex flex-col"
            data-animate>
            <!-- Icon -->
            <div
              class="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
              <i :class="area.icon" class="text-2xl" aria-hidden="true"></i>
            </div>

            <!-- Content -->
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ area.title }}</h3>
            <p class="text-gray-600 leading-relaxed mb-6">{{ area.desc }}</p>

            <!-- Feature badges -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span v-for="bullet in area.bullets" :key="bullet"
                class="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                {{ bullet }}
              </span>
            </div>

            <!-- Call to action - fixed bottom-left -->
            <div
              class="mt-auto self-start flex items-center gap-2 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
              <span>Mehr erfahren</span>
              <i class="fas fa-arrow-right transition-transform group-hover:translate-x-1" aria-hidden="true"></i>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Bottom CTA section -->
      <div class="mt-20 space-y-6">
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink to="/leistungen"
            class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:text-white hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1">
            <i class="fas fa-th-large" aria-hidden="true"></i>
            Alle Leistungen entdecken
          </NuxtLink>
          <NuxtLink to="/kontakt"
            class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-300 hover:text-black hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1">
            <i class="fas fa-comment-dots" aria-hidden="true"></i>
            Unverbindlich beraten lassen
          </NuxtLink>
        </div>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Gemeinsam finden wir die Lösung mit dem größten Hebel für Ihr Ziel.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

// Helper: slugify for in-page anchors
const slugify = (s) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')

const baseAreas = [
  {
    title: 'Software-Entwicklung',
    icon: 'fas fa-code',
    desc: 'Individuelle Anwendungen, die sich nahtlos in Ihre Prozesse einfügen und echte Mehrwerte liefern.',
    bullets: ['MVP bis Enterprise', 'SaaS & Apps', 'API-first']
  },
  {
    title: 'Prozessdigitalisierung',
    icon: 'fas fa-diagram-project',
    desc: 'Medienbrüche schließen, Durchlaufzeiten reduzieren und Qualität steigern – End-to-End gedacht.',
    bullets: ['Workflow-Automation', 'No/Low-Code', 'Change Enablement']
  },
  {
    title: 'Online-Präsenz',
    icon: 'fas fa-globe',
    desc: 'Von Marke bis Conversion: sichtbar werden, Vertrauen aufbauen und Leads skalieren.',
    bullets: ['Webseiten & Shops', 'SEO/Performance', 'UX & Content']
  },
  {
    title: 'Daten & KI',
    icon: 'fas fa-brain',
    desc: 'Daten nutzbar machen: Muster erkennen, Entscheidungen beschleunigen und Prozesse smart steuern.',
    bullets: ['Analytics & BI', 'KI-Assistenten', 'Prognosen']
  },
  {
    title: 'IT-Infrastruktur',
    icon: 'fas fa-server',
    desc: 'Stabil, sicher und skalierbar: die Basis, damit Innovation verlässlich laufen kann.',
    bullets: ['Cloud & DevOps', 'Security by Design', 'Monitoring']
  },
  {
    title: 'Beratung & Strategie',
    icon: 'fas fa-lightbulb',
    desc: 'Wir schaffen Klarheit und leiten Ihre digitale Transformation mit klaren Schritten.',
    bullets: ['Digitale Roadmaps', 'Innovationsberatung', 'Transformation & Change']
  }
]

const areas = baseAreas.map(a => ({ ...a, hash: slugify(a.title) }))

// Intersection Observer for smooth animations
onMounted(() => {
  const items = document.querySelectorAll('[data-animate]')
  if (!('IntersectionObserver' in window) || !items.length) return

  const io = new IntersectionObserver(
    entries => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  )

  items.forEach((el, index) => {
    el.classList.add('reveal')
    el.style.transitionDelay = `${index * 100}ms`
    io.observe(el)
  })
})
</script>

<style scoped>
/* Reveal Animation */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.reveal-in {
  opacity: 1;
  transform: translateY(0);
}

/* Enhanced hover effects */
.group:hover .fas.fa-arrow-right {
  animation: arrow-bounce 0.6s ease-in-out;
}

@keyframes arrow-bounce {

  0%,
  100% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(4px);
  }
}

/* Focus styles for accessibility */
.group:focus-visible {
  transform: scale(1.02);
}

/* Improved responsive grid */
@media (min-width: 1024px) and (max-width: 1279px) {
  .lg\:grid-cols-3>* {
    min-height: 320px;
  }
}

@media (min-width: 1280px) {
  .lg\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 400px));
    justify-content: center;
  }
}
</style>
