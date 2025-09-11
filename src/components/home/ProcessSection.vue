<template>
  <section id="prozess" aria-label="Prozess" class="relative py-18 md:py-24">
    <!-- Dekorativer Hintergrund -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
      <div class="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-accent/10 blur-3xl"></div>
    </div>

    <div class="container mx-auto max-w-7xl px-4 md:px-6 relative">
      <!-- Überschrift -->
      <header class="text-center">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary leading-tight">
          Ablauf der Zusammenarbeit mit Eulah IT
        </h2>
        <p class="mt-3 text-muted-foreground max-w-3xl mx-auto">
          Von der ersten Kontaktaufnahme bis zum stabilen Betrieb.
        </p>

        <!-- Fortschrittsanzeige -->
        <div class="mx-auto mt-6 max-w-2xl">
          <div class="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div class="h-full rounded-full bg-primary transition-all duration-500" :style="{ width: progress + '%' }"
              role="progressbar" :aria-valuenow="activeIndex + 1" :aria-valuemin="1" :aria-valuemax="steps.length"
              aria-label="Fortschritt Prozess"></div>
          </div>

        </div>
      </header>

      <!-- Layout: links Timeline, rechts Inhalt -->
      <div class="mt-12 grid gap-8 lg:grid-cols-12">
        <!-- Linke Spalte: Step-Navigation / Timeline -->
        <nav class="lg:col-span-4" aria-label="Prozessschritte">
          <div class="lg:sticky lg:top-24">
            <div class="relative ps-5">
              <!-- Vertikale Linie -->
              <div class="timeline-line absolute left-0 top-0 bottom-0 w-px" aria-hidden="true"></div>

              <ol class="space-y-3">
                <li v-for="(step, i) in steps" :key="step.title" class="relative">
                  <!-- Knoten auf der Linie -->
                  <span
                    class="absolute -left-2 top-5 inline-flex h-4 w-4 items-center justify-center rounded-full border border-border bg-background shadow-sm"
                    :class="{ 'ring-2 ring-primary/40': activeIndex === i }"></span>

                  <!-- Step-Karte -->
                  <button type="button" @click="setActive(i)" :aria-current="activeIndex === i ? 'step' : false"
                    class="group w-full flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    :class="[
                      activeIndex === i
                        ? 'border-primary/40 bg-primary/5 shadow-md ring-1 ring-primary/20'
                        : 'border-border/70 hover:border-foreground/20 hover:shadow-sm',
                      isComplete(i) && activeIndex !== i ? 'bg-success/5 border-success/30' : ''
                    ]">
                    <span
                      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-semibold transition-all"
                      :class="[
                        isComplete(i)
                          ? 'bg-success text-success-foreground'
                          : activeIndex === i
                            ? 'bg-primary text-primary-foreground scale-105'
                            : 'bg-muted text-foreground/85'
                      ]">
                      <i v-if="isComplete(i)" class="fas fa-check" aria-hidden="true"></i>
                      <span v-else>{{ i + 1 }}</span>
                    </span>

                    <i :class="step.icon" class="shrink-0 text-accent/90" aria-hidden="true"></i>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-semibold leading-tight line-clamp-1">{{ step.title }}</p>
                      <p class="text-xs text-muted-foreground line-clamp-1">{{ step.teaser }}</p>
                    </div>

                    <i class="fas fa-chevron-right opacity-0 transition group-hover:opacity-60 text-muted-foreground"
                      aria-hidden="true"></i>
                  </button>
                </li>
              </ol>
            </div>

            <!-- Mobile Step-Chips -->
            <div class="mt-4 flex gap-2 overflow-x-auto lg:hidden no-scrollbar" aria-hidden="true">
              <button v-for="(step, i) in steps" :key="'chip-' + step.title" @click="setActive(i)"
                class="whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition"
                :class="activeIndex === i ? 'border-primary bg-primary/10' : 'border-border hover:border-foreground/30'">
                {{ i + 1 }}. {{ step.title }}
              </button>
            </div>
          </div>
        </nav>

        <!-- Rechte Spalte: Details zum aktiven Schritt -->
        <article
          class="lg:col-span-8 rounded-2xl border border-border/60 bg-white/60 p-6 md:p-7 shadow-sm dark:bg-white/[.04] backdrop-blur"
          aria-live="polite">
          <header class="flex items-start justify-between gap-4">
            <div class="min-w-0 flex items-center gap-3">
              <span
                class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                <i :class="current.icon" aria-hidden="true"></i>
              </span>
              <div>
                <p class="text-xs uppercase tracking-wide text-muted-foreground">Schritt {{ activeIndex + 1 }} von {{
                  steps.length }}</p>
                <h3 class="mt-1 text-xl md:text-2xl font-semibold leading-snug">{{ current.title }}</h3>
              </div>
            </div>
            <div class="hidden md:flex items-center gap-2">
              <button @click="prevStep"
                class="rounded-xl border border-border/70 px-3 py-2 text-sm hover:shadow transition"
                aria-label="Vorheriger Schritt" title="Alt + ←">
                <i class="fas fa-arrow-left" aria-hidden="true"></i>
              </button>
              <button @click="nextStep"
                class="rounded-xl border border-primary/40 px-3 py-2 text-sm hover:shadow transition"
                aria-label="Nächster Schritt" title="Alt + →">
                <i class="fas fa-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
          </header>

          <Transition name="fade-slide" mode="out-in">
            <div :key="activeIndex">
              <p class="mt-4 text-base leading-relaxed text-foreground/90">
                {{ current.description }}
              </p>

              <ul class="mt-5 list-disc ps-5 text-sm md:text-base space-y-2 marker:text-foreground/60">
                <li v-for="(p, idx) in current.points" :key="idx" class="leading-relaxed">
                  {{ p }}
                </li>
              </ul>

              <!-- CTA-Button nur wenn vorhanden -->
              <div v-if="current.cta" class="mt-6">
                <a :href="current.cta.url"
                  class="inline-block px-5 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition">
                  {{ current.cta.label }}
                </a>
              </div>
            </div>
          </Transition>

          <!-- Mobile Navigation unten -->
          <div class="mt-6 flex items-center justify-between md:hidden">
            <button @click="prevStep"
              class="rounded-xl border border-border/70 px-4 py-2 text-sm hover:shadow transition"
              aria-label="Vorheriger Schritt">
              <i class="fas fa-arrow-left mr-2" aria-hidden="true"></i> Zurück
            </button>
            <button @click="nextStep"
              class="rounded-xl border border-primary/40 px-4 py-2 text-sm hover:shadow transition"
              aria-label="Nächster Schritt">
              Weiter <i class="fas fa-arrow-right ml-2" aria-hidden="true"></i>
            </button>
          </div>


        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

// Klarer, allgemein gehaltener IT‑Service‑Prozess (ohne separaten Test/QA‑Schritt)
const steps = [
  {
    title: 'Kontaktaufnahme',
    icon: 'fas fa-handshake',
    description:
      "Sie erreichen uns telefonisch, per Mail oder Formular. In einem kurzen Erstgespräch klären wir Ziele, Rahmenbedingungen und mögliche Risiken – kostenfrei und unverbindlich.",
    points: [
      'Kostenfreie Erstberatung & Bedarfsklärung',
      'Vertrauliche Bedarfsanalyse & Zieldefinition',
      'Erste grobe Aufwandsschätzung'
    ]
  },
  {
    title: 'Projektplanung',
    icon: 'fas fa-diagram-project',
    description:
      "Wir strukturieren Anforderungen, priorisieren gemeinsam und empfehlen passende Technologien. Daraus entsteht eine Roadmap mit klaren Meilensteinen und Verantwortlichkeiten.",
    points: [
      'Anforderungsanalyse und Backlog-Erstellung',
      'Technologie- & Architektur-Empfehlungen',
      'Transparenter Projektplan mit Meilensteinen'
    ]
  },
  {
    title: 'Implementierung & Einführung',
    icon: 'fas fa-screwdriver-wrench',
    description:
      "Wir realisieren die geplanten IT-Lösungen, passen Systeme an Ihre Umgebung an und begleiten die Einführung. Qualitätssicherung, Dokumentation und eine saubere Übergabe sorgen für einen reibungslosen Start.",
    points: [
      "Umsetzung & Konfiguration der vereinbarten Lösungen",
      "Integration in bestehende Systeme & Prozesse",
      "Abnahme mit Dokumentation & Übergabe"
    ]
  },
  {
    title: 'Betrieb & Support',
    icon: 'fas fa-headset',
    description:
      "Nach der Einführung bleiben wir Ihr Partner für den laufenden Betrieb. Ob Supportanfragen, Wartung oder schrittweise Weiterentwicklung – wir stellen sicher, dass Ihre Lösung langfristig zuverlässig funktioniert.",
    points: [
      "Support & Hilfestellung im laufenden Betrieb",
      "Regelmäßige Wartung & Pflege",
      "Bedarfsgerechte Weiterentwicklung"
    ]
  },
  {
    title: "Kunde werden",
    icon: "fas fa-star",
    teaser: "Ihr nächster Schritt",
    description:
      "Starten Sie jetzt die Zusammenarbeit mit uns – unkompliziert und unverbindlich. Gemeinsam finden wir den passenden Einstieg für Ihr Projekt oder Ihre IT-Anforderungen.",
    cta: {
      label: "Jetzt Kontakt aufnehmen",
      url: "/kontakt",
    },
    isCta: true // Markierung, dass dieser Schritt sich von den Prozess-Schritten unterscheidet
  }
]

const activeIndex = ref(0)
const current = computed(() => steps[activeIndex.value])
const progress = computed(() => Math.round(((activeIndex.value + 1) / steps.length) * 100))

function setActive(i) { activeIndex.value = i }
function nextStep() { activeIndex.value = (activeIndex.value + 1) % steps.length }
function prevStep() { activeIndex.value = (activeIndex.value - 1 + steps.length) % steps.length }
function isComplete(i) { return i < activeIndex.value }

// Tastatur-Navigation (Alt + Pfeiltasten)
function onKey(e) {
  if (e.altKey && e.key === 'ArrowRight') { e.preventDefault(); nextStep() }
  if (e.altKey && e.key === 'ArrowLeft') { e.preventDefault(); prevStep() }
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
/* Sanfte Radialverläufe werden über Utility-Klassen ergänzt */

/* Timeline-Linie mit Farbverlauf */
.timeline-line {
  background: linear-gradient(to bottom, hsl(var(--primary) / .4), transparent 40%, hsl(var(--accent) / .25));
}

/* Transition für Contentwechsel */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 280ms ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* KBD Badge */
.kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid hsl(var(--border));
  border-bottom-width: 2px;
  min-width: 1.4rem;
  height: 1.4rem;
  padding: 0 0.3rem;
  border-radius: 0.375rem;
  font-size: 0.7rem;
}

/* Versteckte Scrollbars bei Chips */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Utility-Farben (optional, falls nicht in Design‑Tokens vorhanden) */
:root {
  /* nur Fallbacks */
}

:where(.dark) .bg-success {
  --tw-bg-opacity: 1;
}

.bg-success {
  background-color: rgba(16, 185, 129, var(--tw-bg-opacity, 1));
}

.text-success-foreground {
  color: white;
}
</style>
