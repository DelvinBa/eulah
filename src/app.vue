<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  htmlAttrs: {
    lang: 'de'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ]
})


// ✅ API-Daten von ProvenExpert holen
const { data: rating } = await useFetch('/api/provenexpert')

// ✅ Schema nur einfügen, wenn Werte vorhanden sind
if (rating.value?.ratingValue && rating.value?.reviewCount) {
  useSchemaOrg([
    {
      '@type': 'Organization',
      '@id': 'https://www.eulah.de/#organization', // referenziert Identity aus nuxt.config
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(rating.value.ratingValue),
        bestRating: '5',
        worstRating: '1',
        reviewCount: rating.value.reviewCount
      }
    }
  ])
}
</script>
