<template>
  <section class="relative py-20 bg-surface">
    <div class="absolute inset-0 bg-gradient-to-b from-background/60 to-surface pointer-events-none"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

      <!-- Header -->
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
        Starke Partner. Stärkere Lösungen!
      </h2>
      <p class="max-w-3xl mx-auto text-muted-foreground text-responsive mb-14">
        Als innovatives Softwareunternehmen bauen wir auf starke Partnerschaften,
        um nachhaltigen Mehrwert für unsere Kunden zu schaffen. Unsere Technologiepartner
        bringen führendes Fachwissen, modernste Tools und bewährte Ressourcen ein.
        Gemeinsam entwickeln wir Lösungen, die technisch exzellent und optimal auf
        die Anforderungen unserer Kunden zugeschnitten sind.
      </p>

      <!-- Logos -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-12 items-center justify-items-center">
        <div v-for="partner in partners" :key="partner.alt"
          class="group flex items-center justify-center w-40 h-24 bg-background rounded-xl shadow-sm hover:shadow-md transition">
          <img :src="partner.src" :alt="partner.alt"
            class="max-h-14 md:max-h-16 max-w-[140px] object-contain filter grayscale group-hover:grayscale-0 transition duration-300 ease-in-out"
            loading="lazy" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const partners = [
  { src: "/images/partners/microsoft.svg", alt: "Microsoft" },
  { src: "/images/partners/sap.svg", alt: "SAP" },
  { src: "/images/partners/hetzner.svg", alt: "Hetzner" },
  { src: "/images/partners/aws.svg", alt: "Amazon Web Services" },
  { src: "/images/partners/dell.svg", alt: "Dell" },
  { src: "/images/partners/snowflake.svg", alt: "Snowflake" },
  { src: "/images/partners/docker.svg", alt: "Docker" },
  { src: "/images/partners/github.svg", alt: "Github" },
];
</script>
