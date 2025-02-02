<template>
    <section class="bg-black py-24 md:py-32 overflow-hidden">
        <div class="container mx-auto px-4 md:px-6 text-center">
            <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-8">
                Bereits von führenden Unternehmen vertraut
            </h2>
            <div class="carousel">
                <div class="carousel-track">
                    <!-- Duplicate the logos to ensure a smooth infinite loop -->
                    <template v-for="n in 2" :key="n">
                        <img v-for="(logo, index) in logos" :key="`${n}-${index}`" :src="logo.src" :alt="logo.alt"
                            :class="logo.class" loading="lazy">
                    </template>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const logos = [
    { src: "/images/solarrex_logo.png", alt: "Solarrex Logo", class: "logo" },
    { src: "/images/babylon_logo.png", alt: "Babylon Bahndienste Logo", class: "logo large-logo" },
    { src: "/images/getlink_logo.svg", alt: "GetLink Logo", class: "logo" },
    { src: "/images/debac_logo.png", alt: "Debacq Logo", class: "logo" }
];
</script>

<style scoped>
/* Carousel wrapper */
.carousel {
    display: flex;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 100%;
}

/* Track containing the logos */
.carousel-track {
    display: flex;
    align-items: center;
    gap: 5rem;
    width: max-content;
    animation: scroll 20s linear infinite;
}

/* Logo styling */
.logo {
    height: 100px;
    max-height: 100px;
    object-fit: contain;
    filter: brightness(1) contrast(1);
}

.large-logo {
    height: 180px;
    max-height: 180px;
}

/* Keyframe animation for smooth scrolling */
@keyframes scroll {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-50%);
    }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .carousel-track {
        gap: 3rem;
    }

    .logo {
        height: 80px;
        max-height: 80px;
    }

    .large-logo {
        height: 120px;
        max-height: 120px;
    }
}

@media (max-width: 480px) {
    .carousel-track {
        gap: 2rem;
    }

    .logo {
        height: 64px;
        max-height: 64px;
    }

    .large-logo {
        height: 100px;
        max-height: 100px;
    }
}
</style>
