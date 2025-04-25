<template>
    <section id="target-audience"
        class="target-audience-section py-20 md:py-40 mt-20 md:mt-40 bg-gradient-to-b from-black via-gray-900 to-black">
        <div class="container mx-auto px-4 md:px-6 relative z-20 text-center">
            <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-12 md:mb-16 text-white">
                Unsere Zielgruppe
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                <Card
                    class="p-6 md:p-10 bg-black/70 rounded-2xl shadow-2xl border border-gray-700 hover:scale-105 transition-transform duration-300 hover:shadow-accent/50 focus:outline-none focus:ring-4 focus:ring-accent text-white relative overflow-hidden backdrop-blur-lg">
                    <template #title>
                        <h3 id="unternehmen-title" class="text-2xl md:text-3xl font-semibold text-white">Für Unternehmen
                        </h3>
                    </template>
                    <template #content>
                        <p id="unternehmen-description" class="text-gray-300 mt-4 leading-relaxed text-lg md:text-2xl">
                            Software, Webseiten & Marketing <br> individuell & zielgerichtet.
                        </p>
                        <div class="mt-6 md:mt-8">
                            <span class="text-accent text-4xl md:text-5xl font-bold">50+</span>
                            <p class="text-gray-400 mt-2 text-lg md:text-2xl">Projekte erfolgreich umgesetzt</p>
                        </div>
                    </template>
                </Card>
                <Card
                    class="p-6 md:p-10 bg-black/70 rounded-2xl shadow-2xl border border-gray-700 hover:scale-105 transition-transform duration-300 hover:shadow-accent/50 focus:outline-none focus:ring-4 focus:ring-accent text-white relative overflow-hidden backdrop-blur-lg">
                    <template #title>
                        <h3 id="innovatoren-title" class="text-2xl md:text-3xl font-semibold text-white">Für Innovatoren
                        </h3>
                    </template>
                    <template #content>
                        <p id="innovatoren-description" class="text-gray-300 mt-4 leading-relaxed text-lg md:text-2xl">
                            Ihr habt eine Software-Idee? <br> Wir setzen sie mit euch um.
                        </p>
                        <div class="mt-6 md:mt-8">
                            <span class="text-accent text-4xl md:text-5xl font-bold">3</span>
                            <p class="text-gray-400 mt-2 text-lg md:text-2xl">Innovative Startup-Ideen realisiert</p>
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </section>
</template>

<script setup>
import Card from 'primevue/card';
</script>

<style scoped>


</style>
