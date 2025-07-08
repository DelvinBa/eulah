<template>
    <section id="about"
        class="container mx-auto px-4 md:px-6 py-20 md:py-32 flex flex-col items-center text-center relative z-10">
        <div
            class="bg-black/50 backdrop-blur-lg rounded-2xl shadow-3xl p-8 md:p-16 max-w-3xl md:max-w-4xl border border-gray-700 relative overflow-hidden">
            <!-- Background Glow -->
            <div class="absolute inset-0 bg-accent/10 rounded-2xl blur-3xl animate-pulse"></div>

            <div class="relative z-10">
                <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 md:mb-8 text-white">
                    Wer wir sind
                </h2>

                <p class="text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed">
                    Wir sind ein Team aus <span
                        class="text-accent font-semibold text-xl sm:text-2xl md:text-3xl">Softwareentwicklern,
                        Innovatoren und Unternehmern</span>,
                    das Unternehmen und Einzelpersonen dabei hilft, ihre digitalen Ideen Wirklichkeit werden zu lassen.
                </p>

                <div class="mt-8 md:mt-10">
                    <a href="/kontakt"
                        class="inline-block px-6 md:px-8 py-3 md:py-4 text-lg md:text-2xl font-semibold choice">
                        Kontaktieren Sie uns
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.choice {
    position: relative;
    padding: 1.5rem;
    background: #111111;
    border: 1px solid #ffffff;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
}

.choice:hover {
    transform: scale(1.03);
    box-shadow: 0 0 15px rgba(0, 212, 255, 0.7),
        0 0 25px rgba(0, 176, 232, 0.5),
        inset 0 0 15px rgba(0, 212, 255, 0.3);
    border-color: #00d4ff;
}
</style>