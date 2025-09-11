<template>
  <section class="py-16 bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-8">
        Unsere Technologiepartner
      </h2>
      <div class="flex flex-wrap items-center justify-center gap-8">
        <img
          v-for="partner in partners"
          :key="partner.alt"
          :src="partner.src"
          :alt="partner.alt"
          class="h-12 md:h-16 object-contain filter grayscale hover:grayscale-0 transition"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const partners = [
  { src: "/images/partners/microsoft.svg", alt: "Microsoft" },
  { src: "/images/partners/aws.svg", alt: "Amazon Web Services" },
  { src: "/images/partners/hetzner.svg", alt: "Hetzner" },
  { src: "/images/partners/snowflake.svg", alt: "Snowflake" },
  { src: "/images/partners/sap.svg", alt: "SAP" },
];
</script>

<style scoped></style>
