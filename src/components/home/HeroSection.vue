<template>
    <section ref="sectionRef"
        class="relative min-h-[90vh] lg:min-h-screen flex items-center justify-start overflow-hidden">
        <!-- Background Video -->
        <video ref="videoEl" autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover">
            <source :src="videos[3]" type="video/mp4" />
        </video>

        <!-- Cinematic Overlay (Gradient + Vignette) -->
        <div class="absolute inset-0 z-0 bg-gradient-to-r from-primary via-primary/70 via-30% to-transparent"></div>
        <div class="absolute inset-0 z-0 bg-black/40 mix-blend-multiply"></div>

        <!-- Content -->
        <div class="relative z-10 container mx-auto px-6 md:px-12">
            <div class="max-w-2xl">

                    <h1
                        class="text-white text-3xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight drop-shadow-[0_10px_30px_rgba(0,0,0,.4)]">
                        Better IT. <br/> Better Business.
                </h1>

                <p class="text-white/90 text-lg md:text-2xl max-w-xl mt-6 leading-relaxed">
                    Von IT-Infrastruktur bis individueller Software – wir bringen Ihr Unternehmen sicher in die digitale
                    Zukunft.
                </p>

                <div class="mt-10 flex flex-col sm:flex-row gap-4">
                    <button @click="scrollToFunnel"
                        class="bg-accent hover:bg-orange-600 text-white font-medium rounded-xl text-lg px-8 py-4 shadow-xl shadow-accent/40 transition-all duration-300">
                        Kostenfreies Erstgespräch
                    </button>
                    <NuxtLink to="/leistungen"
                        class="bg-white/10  border border-white/30 hover:bg-white hover:text-dark font-medium rounded-xl text-lg px-8 py-4 shadow-lg shadow-black/30 transition-all duration-300">
                        Unsere Leistungen
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const videos = [
    '/videos/hero/hero1.mp4',
    '/videos/hero/hero2.mp4',
    '/videos/hero/hero3.mp4',
    '/videos/hero/hero4.mp4'
]

const scrollToFunnel = () => {
    const el = document.getElementById('lead-funnel')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
section::after {
    /* Subtile Vignette für filmischen Effekt */
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 250px rgba(0, 0, 0, 0.5);
    z-index: 1;
    pointer-events: none;
}
</style>
