<template>
  <section id="process" class="py-20 bg-background">
    <div class="container mx-auto px-4 md:px-6">
      <h2
        class="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary text-center mb-16"
      >
        Unser Projektablauf
      </h2>
      <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
        <div
          v-for="step in steps"
          :key="step.title"
          class="flex flex-col items-center text-center"
        >
          <div
            class="w-16 h-16 mb-4 flex items-center justify-center text-accent text-4xl"
          >
            <i :class="step.icon" aria-hidden="true"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ step.title }}</h3>
          <p class="text-dark leading-relaxed">{{ step.description }}</p>
        </div>
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
      "Sie erreichen uns telefonisch oder per Mail – wir hören zu und analysieren Ihren Bedarf.",
  },
  {
    title: "Projektplanung & Beratung",
    icon: "fas fa-lightbulb",
    description:
      "Gemeinsam entwickeln wir eine individuelle Strategie und beraten zu passenden Technologien.",
  },
  {
    title: "Entwicklung & Umsetzung",
    icon: "fas fa-code",
    description:
      "Unser Team entwickelt maßgeschneiderte Softwarelösungen und implementiert moderne IT-Systeme.",
  },
  {
    title: "Test & Qualitätssicherung",
    icon: "fas fa-vial",
    description:
      "Gründliche Tests stellen sicher, dass alles stabil und sicher läuft.",
  },
  {
    title: "Go-Live & Support",
    icon: "fas fa-rocket",
    description:
      "Wir begleiten den Launch und stehen für langfristigen Support bereit.",
  },
];
</script>

<style scoped></style>
