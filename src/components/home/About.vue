<template>
    <section id="about"
        class="container mx-auto px-4 md:px-6 py-20 md:py-32 flex flex-col items-center text-center relative z-10">
        <div
            class="bg-surface/80 backdrop-blur-lg rounded-2xl shadow-3xl p-8 md:p-16 max-w-3xl md:max-w-4xl border border-surface relative overflow-hidden">
            <!-- Background Glow -->
            <div class="absolute inset-0 bg-accent/10 rounded-2xl blur-3xl animate-pulse"></div>

            <div class="relative z-10">
                <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 md:mb-8 text-primary">
                    Wer wir sind
                </h2>

                <p class="text-dark text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed">
                    Seit 15 Jahren begleiten wir Unternehmen in allen IT-Fragen. Unser
                    <span class="text-accent font-semibold text-xl sm:text-2xl md:text-3xl">zertifiziertes Team</span>
                    arbeitet mit starken Partnern wie Microsoft und Cisco zusammen und betreut
                    zahlreiche zufriedene Kunden.
                </p>

                <div class="flex justify-center gap-8 mt-6 md:mt-8 text-4xl text-accent">
                    <i class="fab fa-microsoft" aria-hidden="true"></i>
                    <i class="fab fa-cisco" aria-hidden="true"></i>
                </div>

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
    background: var(--color-primary);
    border: 1px solid var(--color-secondary);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
    color: var(--color-background);
}

.choice:hover {
    transform: scale(1.03);
    box-shadow: 0 0 15px rgba(77, 166, 255, 0.7),
        0 0 25px rgba(77, 166, 255, 0.5),
        inset 0 0 15px rgba(77, 166, 255, 0.3);
    border-color: var(--color-secondary);
}
</style>