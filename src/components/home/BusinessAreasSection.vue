<template>
  <section class="relative py-24 md:py-32 bg-surface overflow-hidden">
    <!-- Hintergrund: Grid + weiche Farbverläufe + dezente Glows -->
    <div class="absolute inset-0 -z-20 pointer-events-none">
      <!-- Grid -->
      <svg class="w-full h-full text-border/40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M120 0 L0 0 0 120" fill="none" stroke="currentColor" stroke-width="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <!-- radial glows -->
      <div class="absolute -top-24 -left-24 w-[42rem] h-[42rem] rounded-full bg-accent/10 blur-3xl"></div>
      <div class="absolute -bottom-24 -right-24 w-[36rem] h-[36rem] rounded-full bg-primary/10 blur-3xl"></div>
    </div>

    <div class="container mx-auto px-4 md:px-8 text-center relative">
      <!-- Kicker -->
      <span
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-white/70 dark:bg-black/20 backdrop-blur text-xs font-medium text-foreground/70">
        <i class="fas fa-sparkles text-accent" aria-hidden="true"></i>
        Leistungen & Mehrwert
      </span>

      <h2 class="mt-4 text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary tracking-tight">
        Lösungen, die sichtbar wirken
      </h2>
      <p class="mt-6 max-w-2xl mx-auto text-lg text-foreground/70 leading-relaxed">
        Wir begleiten Sie vom ersten Konzept bis zum laufenden Betrieb. Unser Fokus: messbare Ergebnisse,
        vereinfachte Abläufe und nachhaltiges Wachstum – ganz ohne unnötige Komplexität.
      </p>

      <!-- Value bar / Kundenversprechen -->
      <div class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <div
          class="flex items-center justify-center gap-3 px-4 py-2 rounded-xl border border-border bg-white/70 dark:bg-black/20 backdrop-blur">
          <span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-accent/15 text-accent"><i
              class="fas fa-bolt" aria-hidden="true"></i></span>
          <span class="text-foreground/80"><strong>Schnell startklar</strong> – pragmatisch & iterativ</span>
        </div>
        <div
          class="flex items-center justify-center gap-3 px-4 py-2 rounded-xl border border-border bg-white/70 dark:bg-black/20 backdrop-blur">
          <span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 text-primary"><i
              class="fas fa-chart-line" aria-hidden="true"></i></span>
          <span class="text-foreground/80"><strong>Sichtbarer Nutzen</strong> – KPIs im Blick</span>
        </div>
        <div
          class="flex items-center justify-center gap-3 px-4 py-2 rounded-xl border border-border bg-white/70 dark:bg-black/20 backdrop-blur">
          <span
            class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"><i
              class="fas fa-shield-check" aria-hidden="true"></i></span>
          <span class="text-foreground/80"><strong>Sicher skalierbar</strong> – Zukunft fest eingeplant</span>
        </div>
      </div>

      <!-- Grid mit Karten -->
      <div class="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <NuxtLink v-for="area in areas" :key="area.title" :to="`/leistungen#${area.hash}`"
          class="group relative block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/60"
          :aria-label="`Zum Leistungsbereich: ${area.title}`">
          <!-- Fancy Border -->
          <div
            class="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent/35 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          </div>

          <!-- Card -->
          <div
            class="relative h-full rounded-2xl border border-border bg-white/80 dark:bg-zinc-900/60 backdrop-blur p-6 text-left shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1"
            data-animate>
            <span
              class="mb-5 inline-flex items-center justify-center w-16 h-16 rounded-2xl border border-border bg-white shadow-[0_0_14px_rgba(255,215,0,0.35)] text-3xl text-accent"
              aria-hidden="true">
              <i :class="area.icon"></i>
            </span>

            <h3 class="text-lg font-semibold text-foreground">{{ area.title }}</h3>
            <p class="mt-2 text-sm text-foreground/70 leading-snug">{{ area.desc }}</p>

            <!-- Mini-Benefits -->
            <ul class="mt-4 flex flex-wrap gap-2">
              <li v-for="b in area.bullets" :key="b"
                class="px-2.5 py-1 text-[11px] rounded-full border border-border bg-white/60 dark:bg-black/20 text-foreground/70">
                {{ b }}
              </li>
            </ul>

            <!-- Inline-CTA -->
            <div class="mt-5 flex items-center gap-2 text-sm font-medium text-primary">
              <span>Mehr erfahren</span>
              <i class="fas fa-arrow-right transition-transform group-hover:translate-x-1" aria-hidden="true"></i>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- CTA Bereich -->
      <div class="mt-16">
        <NuxtLink to="/leistungen"
          class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl shadow hover:shadow-lg hover:bg-primary/90 transition">
          <i class="fas fa-grid-2" aria-hidden="true"></i>
          Alle Leistungen entdecken
        </NuxtLink>
        <NuxtLink to="/kontakt"
          class="ml-3 inline-flex items-center gap-2 px-6 py-3 bg-transparent text-foreground font-medium rounded-xl border border-border hover:bg-white/60 dark:hover:bg-white/10 transition">
          <i class="fas fa-message-dots" aria-hidden="true"></i>
          Unverbindlich beraten lassen
        </NuxtLink>
        <p class="mt-3 text-sm text-foreground/70">Gemeinsam finden wir die Lösung mit dem größten Hebel für Ihr Ziel.
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
  }
]

const areas = baseAreas.map(a => ({ ...a, hash: slugify(a.title) }))

// Simple Intersection Observer für sanfte Fade-/Slide-in Animationen
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
    { threshold: 0.18 }
  )

  items.forEach((el) => {
    el.classList.add('reveal')
    io.observe(el)
  })
})
</script>

<style scoped>
/***********************
  Reveal Animation
************************/
.reveal {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity .6s ease, transform .6s ease;
}

.reveal-in {
  opacity: 1;
  transform: translateY(0);
}
</style>
