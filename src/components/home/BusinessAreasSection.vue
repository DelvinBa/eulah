<template>
  <section class="py-18 md:py-24 bg-surface">
    <div class="container mx-auto px-4 md:px-6 text-center">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary">
        Unsere Geschäftsbereiche
      </h2>
      <div class="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <div
          v-for="area in areas"
          :key="area.title"
          class="flex flex-col items-center gap-3 text-foreground/90"
        >
          <span
            class="flex items-center justify-center w-20 h-20 rounded-full border border-border bg-white shadow text-3xl text-accent"
            aria-hidden="true"
          >
            <i :class="area.icon"></i>
          </span>
          <p class="text-sm font-medium leading-snug">
            {{ area.title }}
          </p>
        </div>
      </div>
      <div class="mt-10">
        <NuxtLink
          to="/leistungen"
          class="inline-block px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg shadow hover:bg-primary/90 transition"
        >
          Zu unseren Leistungen
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const areas = [
  { title: 'ERP: Microsoft Dynamics 365 Business Central', icon: 'fas fa-chart-pie' },
  { title: 'Microsoft Dynamics 365 CRM', icon: 'fas fa-people-group' },
  { title: 'Dokumentenmanagement', icon: 'fas fa-folder-open' },
  { title: 'Business Intelligence', icon: 'fas fa-chart-line' },
  { title: 'IT-Infrastruktur', icon: 'fas fa-network-wired' },
  { title: 'KI-Agents', icon: 'fas fa-robot' }
]
</script>

