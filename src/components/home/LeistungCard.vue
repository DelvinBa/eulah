<template>
    <div class="relative p-6 md:p-8 lg:p-10 bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl shadow-2xl border border-gray-800 hover:border-accent transition-transform duration-300 ease-out transform hover:scale-105 group overflow-hidden"
        tabindex="0" aria-labelledby="leistung-title" aria-describedby="leistung-description">
        <!-- Glow-Effekt -->
        <div
            class="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
        </div>

        <!-- Icon & Titel -->
        <div class="flex items-center justify-center text-center relative z-10">
            <i :class="icon"
                class="text-accent text-3xl md:text-4xl lg:text-5xl mr-3 md:mr-4 group-hover:text-white transition-colors duration-300"></i>
            <h3 id="leistung-title"
                class="text-xl md:text-2xl lg:text-3xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                {{ title }}
            </h3>
        </div>

        <!-- Beschreibung -->
        <p id="leistung-description"
            class="text-gray-300 mt-3 md:mt-4 lg:mt-5 leading-relaxed relative z-10 text-sm md:text-lg lg:text-xl">
            {{ description }}
        </p>

        <!-- Details -->
        <div class="mt-4 md:mt-6 lg:mt-8 text-left relative z-10">
            <template v-if="title === 'Softwareentwicklung'">
                <div class="mt-3 md:mt-4 flex items-center space-x-3 md:space-x-4">
                    <span class="text-accent text-2xl md:text-3xl lg:text-4xl font-bold">99%</span>
                    <p class="text-gray-400 text-sm md:text-lg lg:text-xl">Erfolgsquote bei Projektauslieferung</p>
                </div>
                <div class="mt-1 md:mt-2 flex items-center space-x-3 md:space-x-4">
                    <span class="text-accent text-2xl md:text-3xl lg:text-4xl font-bold">10</span>
                    <p class="text-gray-400 text-sm md:text-lg lg:text-xl">Jahre kumulierte Entwickler-Erfahrung</p>
                </div>
            </template>

            <template v-else-if="title === 'Digitales Marketing'">
                <div class="mt-3 md:mt-4 flex items-center space-x-3 md:space-x-4">
                    <span class="text-accent text-2xl md:text-3xl lg:text-4xl font-bold">240%</span>
                    <p class="text-gray-400 text-sm md:text-lg lg:text-xl">Durchschnittlicher Anstieg der Klickrate</p>
                </div>
                <div class="mt-1 md:mt-2 flex items-center space-x-3 md:space-x-4">
                    <span class="text-accent text-2xl md:text-3xl lg:text-4xl font-bold">1,600+</span>
                    <p class="text-gray-400 text-sm md:text-lg lg:text-xl">Leads in den letzten 12 Monaten generiert</p>
                </div>
            </template>

            <template v-else-if="title === 'Webseiten & Online-Shops'">
                <div class="mt-3 md:mt-4 flex items-center space-x-3 md:space-x-4">
                    <span class="text-accent text-2xl md:text-3xl lg:text-4xl font-bold">3.8x</span>
                    <p class="text-gray-400 text-sm md:text-lg lg:text-xl">Steigerung der Conversion-Rate</p>
                </div>
                <div class="mt-1 md:mt-2 flex items-center space-x-3 md:space-x-4">
                    <span class="text-accent text-2xl md:text-3xl lg:text-4xl font-bold">37%</span>
                    <p class="text-gray-400 text-sm md:text-lg lg:text-xl">Weniger Absprünge im Checkout</p>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
});
</script>

<style scoped>
/* Responsive Design */
@media (max-width: 768px) {
    .text-4xl {
        font-size: 1.75rem;
    }

    .text-3xl {
        font-size: 1.25rem;
    }

    .p-8 {
        padding: 1.5rem;
    }

    .mt-6 {
        margin-top: 1.25rem;
    }
}

/* Optimized Hover Effects */
.group:hover .group-hover\:text-white {
    color: white;
}

.group:hover .group-hover\:text-accent {
    color: var(--accent);
}

/* Glow Effect */
.bg-accent\/10 {
    backdrop-filter: blur(6px);
}
</style>
