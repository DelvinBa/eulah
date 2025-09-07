<template>
    <section class="bg-surface py-12 md:py-16 overflow-hidden">
        <div class="container mx-auto px-4 md:px-6 text-center">
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
    { src: "/images/the-grill.png", alt: "GetLink Logo", class: "logo" }
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
    height: 80px;
    max-height: 80px;
    object-fit: contain;
    filter: grayscale(100%);
}

.large-logo {
    height: 140px;
    max-height: 140px;
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
        height: 64px;
        max-height: 64px;
    }

    .large-logo {
        height: 100px;
        max-height: 100px;
    }
}

@media (max-width: 480px) {
    .carousel-track {
        gap: 2rem;
    }

    .logo {
        height: 48px;
        max-height: 48px;
    }

    .large-logo {
        height: 80px;
        max-height: 80px;
    }
}
</style>
