<template>
  <div class="min-h-screen bg-background text-dark">
    <NuxtLink to="/projekte" class="inline-flex items-center text-accent hover:text-accent-light font-medium ml-6 mt-6 transition-colors duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Zurück zu Projekten
    </NuxtLink>

    <div class="max-w-4xl mx-auto py-16 px-6 space-y-16">
      <header class="text-center space-y-4">
        <h1 class="text-5xl font-bold text-primary">{{ post.title }}</h1>
        <p class="text-xl text-dark">{{ post.subtitle }}</p>
        <div class="flex flex-wrap justify-center gap-2 mt-4">
          <span class="px-3 py-1 bg-surface rounded-full text-sm">{{ post.branche }}</span>
          <span class="px-3 py-1 bg-surface rounded-full text-sm">{{ post.groesse }}</span>
          <span v-for="leistung in post.leistungen" :key="leistung" class="px-3 py-1 bg-surface rounded-full text-sm">{{ leistung }}</span>
        </div>
        <ul class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <li v-for="(zahl,i) in post.kennzahlen" :key="i" class="bg-surface p-4 rounded-lg shadow">{{ zahl }}</li>
        </ul>
      </header>

      <section v-if="post.video" class="flex justify-center">
        <video :src="post.video" controls class="w-full max-h-[80vh] rounded-lg object-contain"></video>
      </section>

      <section>
        <h2 class="text-3xl font-semibold mb-4 text-primary text-center">Ausgangslage</h2>
        <p class="text-lg leading-relaxed">{{ post.ausgangslage }}</p>
      </section>

      <section>
        <h2 class="text-3xl font-semibold mb-4 text-primary text-center">Lösung</h2>
        <ul class="list-disc pl-5 space-y-2">
          <li v-for="(punkt,i) in post.loesung" :key="i">{{ punkt }}</li>
        </ul>
      </section>

      <section>
        <h2 class="text-3xl font-semibold mb-4 text-primary text-center">Ergebnis</h2>
        <ul class="list-disc pl-5 space-y-2">
          <li v-for="(punkt,i) in post.ergebnis" :key="i">{{ punkt }}</li>
        </ul>
      </section>

      <section>
        <h2 class="text-3xl font-semibold mb-4 text-primary text-center">Nächste Schritte / Betrieb</h2>
        <p class="text-lg leading-relaxed">{{ post.naechste }}</p>
      </section>

      <section v-if="post.images?.length">
        <h2 class="text-3xl font-semibold mb-4 text-primary text-center">Bilder</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <NuxtImg v-for="(img,i) in post.images" :key="i" :src="img" class="rounded-xl shadow-lg w-full h-auto object-cover" alt="Projekt Bild" />
        </div>
      </section>

      <section class="text-center">
        <h2 class="text-3xl font-semibold mb-10 text-primary">Bereit für Ihr eigenes Projekt?</h2>
        <div class="flex flex-col sm:flex-row justify-center gap-6">
          <button @click="scrollToFunnel" class="px-8 py-4 bg-gradient-to-r from-accent to-orange-600 text-background rounded-full font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30">Jetzt beraten lassen</button>
          <button @click="scrollToFunnel" class="px-8 py-4 border-2 border-accent rounded-full font-medium text-accent transform transition-all duration-300 hover:scale-105 hover:text-accent-light hover:border-accent-light hover:shadow-lg hover:shadow-accent/20">Co-Founder finden</button>
        </div>
      </section>

      <footer class="text-center">
        <NuxtLink to="/projekte" class="inline-flex items-center text-accent hover:text-accent-dark transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Zurück zu Projekten
        </NuxtLink>
      </footer>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { data: post } = await useAsyncData(route.path, () =>
  queryCollection('projekte').path(route.path).first()
)

function scrollToFunnel() {
  const funnel = document.getElementById('lead-funnel')
  if (funnel) funnel.scrollIntoView({ behavior: 'smooth' })
}

const baseUrl = 'https://www.eulah.de'
const canonicalUrl = `${baseUrl}${route.path}`

useHead(() => ({
  title: post.value ? `${post.value.title} | Eulah Software Projekte` : 'Projekt',
  link: [{ key: 'canonical', rel: 'canonical', href: canonicalUrl }],
  meta: [
    { name: 'description', content: post.value ? post.value.subtitle : '' }
  ]
}))
</script>

<style>
</style>

