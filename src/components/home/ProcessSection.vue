<template>
  <section id="prozess" aria-label="Prozess" class="py-16 md:py-20 bg-background">
    <div class="container mx-auto px-4 md:px-6">
      <!-- Überschrift: bewusst kleiner, da sie lang ist -->
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary text-center leading-tight">
        Zusammenarbeit mit Eulah IT in Bielefeld – Unser Prozess
      </h2>
      <p class="mt-3 text-center text-muted-foreground max-w-3xl mx-auto">
        Transparent, iterativ und auf den Punkt: So begleiten wir Ihr IT‑Projekt
        von der ersten Idee bis zum stabilen Betrieb.
      </p>

      <!-- Desktop/Tablet: horizontaler Stepper mit Karten -->
      <div class="hidden lg:flex items-stretch mt-14">
        <template v-for="(step, i) in steps" :key="step.title">
          <!-- Step -->
          <div class="flex-1 flex flex-col items-center px-4">
            <div class="relative group">
              <div
                class="w-14 h-14 rounded-full bg-accent/10 border border-accent/40 flex items-center justify-center text-accent text-2xl shadow-sm transition-transform group-hover:-translate-y-0.5">
                <i :class="step.icon" aria-hidden="true"></i>
                <span class="sr-only">Schritt {{ i + 1 }}</span>
              </div>
              <span
                class="absolute -top-2 -right-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">#{{
                i + 1 }}</span>
            </div>

            <article
              class="mt-5 w-full bg-white/5 rounded-2xl border border-border/50 p-6 backdrop-blur-sm hover:shadow-lg transition">
              <h3 class="text-lg font-semibold text-foreground text-center">
                {{ step.title }}
              </h3>
              <p class="mt-2 text-sm text-muted-foreground text-center leading-relaxed">
                {{ step.description }}
              </p>
              <ul class="mt-4 space-y-2 text-sm text-foreground/90 text-left max-w-sm mx-auto">
                <li v-for="point in step.points" :key="point" class="flex items-start gap-2">
                  <i class="fas fa-check mt-0.5" aria-hidden="true"></i>
                  <span>{{ point }}</span>
                </li>
              </ul>
            </article>
          </div>

          <!-- Connector -->
          <div v-if="i < steps.length - 1" class="flex items-center">
            <div class="h-[2px] w-20 xl:w-28 bg-gradient-to-r from-accent/60 to-transparent rounded-full mt-7"></div>
          </div>
        </template>
      </div>

      <!-- Mobile: vertikale Timeline -->
      <ol class="lg:hidden relative mt-10 border-s border-border">
        <li v-for="(step, i) in steps" :key="step.title" class="ms-6 pb-10 last:pb-0">
          <span
            class="absolute -start-3.5 mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 border border-accent/40 text-accent">
            <i :class="step.icon" aria-hidden="true"></i>
          </span>
          <h3 class="text-base font-semibold">{{ i + 1 }}. {{ step.title }}</h3>
          <p class="mt-1 text-sm text-muted-foreground leading-relaxed">
            {{ step.description }}
          </p>
          <ul class="mt-3 space-y-1.5 text-sm">
            <li v-for="point in step.points" :key="point" class="flex items-start gap-2">
              <i class="fas fa-check mt-0.5" aria-hidden="true"></i>
              <span>{{ point }}</span>
            </li>
          </ul>
        </li>
      </ol>

      <!-- CTA -->
      <div class="mt-12 text-center">
        <a href="#kontakt"
          class="inline-flex items-center gap-2 rounded-2xl border border-primary/30 px-5 py-3 text-sm font-medium hover:shadow-lg transition">
          <i class="fas fa-paper-plane" aria-hidden="true"></i>
          Jetzt unverbindlich anfragen
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    title: "Kontaktaufnahme",
    icon: "fas fa-phone",
    description:
      "Sie erreichen uns telefonisch, per Mail oder Formular. In einem kurzen Erstgespräch klären wir Ziele, Rahmenbedingungen und mögliche Risiken – kostenfrei und unverbindlich.",
    points: [
      "Kostenfreie Erstberatung (15–30 Min)",
      "Vertrauliche Bedarfsanalyse & Zieldefinition",
      "Erste grobe Aufwandsschätzung"
    ]
  },
  {
    title: "Projektplanung & Beratung",
    icon: "fas fa-lightbulb",
    description:
      "Wir strukturieren Anforderungen, priorisieren gemeinsam und empfehlen passende Technologien. Daraus entsteht eine Roadmap mit klaren Meilensteinen und Verantwortlichkeiten.",
    points: [
      "Workshops & Backlog-Erstellung",
      "Technologie- & Architektur-Empfehlungen",
      "Transparenter Projektplan mit Meilensteinen"
    ]
  },
  {
    title: "Entwicklung & Umsetzung",
    icon: "fas fa-code",
    description:
      "Iterative Entwicklung in kurzen Sprints sorgt für schnelle Ergebnisse und frühes Feedback. Wir setzen auf saubere Architektur, Code-Reviews und CI/CD für zuverlässige Deployments.",
    points: [
      "Agile Sprints mit regelmäßigen Demos",
      "Code-Reviews, CI/CD-Pipeline, Versionskontrolle",
      "Nachvollziehbare Dokumentation"
    ]
  },
  {
    title: "Test & Qualitätssicherung",
    icon: "fas fa-vial",
    description:
      "Automatisierte und manuelle Tests sichern Stabilität, Performance und Sicherheit. Sie erhalten klare Testberichte und eine saubere Abnahme.",
    points: [
      "Unit-, Integrations- & E2E-Tests",
      "Performance- und Sicherheitschecks",
      "Abnahmeprotokolle & Bugtracking"
    ]
  },
  {
    title: "Go-Live & Support",
    icon: "fas fa-rocket",
    description:
      "Der Rollout erfolgt kontrolliert – mit Monitoring, Backup-Strategie und Notfallplan. Danach begleiten wir Sie langfristig mit Wartung, Updates und Support-SLAs.",
    points: [
      "Stufenweiser Rollout & Monitoring",
      "Übergabe, Schulungen & Know-how-Transfer",
      "Wartung, Updates & Support-SLA"
    ]
  }
];
</script>

<style scoped>
/* Optional: sanfte Karte-Optik auch bei dunklen Themes angenehm */
:root {
  /* Nur als Fallback, falls Design-Tokens fehlen */
  --border: rgba(0, 0, 0, 0.08);
}

.border-border {
  border-color: var(--border);
}
</style>
