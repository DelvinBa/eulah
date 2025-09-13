<template>
    <div class="min-h-screen bg-gradient-to-br from-background via-surface to-background py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
            <!-- Back Link -->
            <NuxtLink to="/blog"
                class="mb-8 inline-flex items-center text-primary hover:text-secondary font-body transition-colors font-semibold">
                ← Zurück zum Blog
            </NuxtLink>
            <article class="bg-white rounded-2xl shadow-xl overflow-hidden">
                <!-- Header with Featured Image and Overlay -->
                <header class="relative">
                    <NuxtImg v-if="post.image" :src="post.image" :alt="post.title"
                        class="w-full h-56 md:h-96 object-cover" />
                    <!-- Improved gradient overlay for better text readability -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <!-- Title, Meta & Tags -->
                    <div class="absolute bottom-0 p-6 md:p-8 w-full">
                        <h1
                            class="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 drop-shadow-lg">
                            {{ post.title }}
                        </h1>
                        <div class="flex items-center space-x-3 mb-4">
                            <time class="text-sm md:text-base font-body text-white/90 drop-shadow-sm">
                                {{ formatDate(post.date) }}
                            </time>
                            <span class="text-white/70">•</span>
                            <span class="text-sm md:text-base font-body text-white/90 drop-shadow-sm">
                                {{ post.author }}
                            </span>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="tag in post.tags" :key="tag"
                                class="px-3 py-1.5 text-xs md:text-sm bg-white/90 text-primary rounded-full font-medium shadow-lg backdrop-blur-sm border border-white/20">
                                {{ tag }}
                            </span>
                        </div>
                    </div>
                </header>

                <!-- Main Content -->
                <div class="p-6 md:p-8 lg:p-10">
                    <!-- Render markdown with custom heading components -->
                    <ContentRenderer :value="post" :components="customHeadings" class="prose prose-lg max-w-none" />
                </div>

                <!-- Call-to-Action Section -->
                <section
                    class="p-6 md:p-8 lg:p-10 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 border-t border-gray-200">
                    <h2 class="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-dark mb-6">
                        Was als nächstes?
                    </h2>
                    <div class="grid md:grid-cols-2 gap-6">
                        <!-- Card 1 -->
                        <div
                            class="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                            <h3 class="text-lg font-semibold text-primary mb-3">
                                Für Unternehmen, die wachsen wollen:
                            </h3>
                            <p class="text-gray-700 mb-4">
                                ✅ Lassen Sie uns gemeinsam Ihr digitales Projekt umsetzen! Buche ein kostenloses
                                Erstgespräch.
                            </p>
                            <button @click="scrollToFunnel"
                                class="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                Jetzt unverbindlich beraten lassen
                            </button>
                        </div>
                        <!-- Card 2 -->
                        <div
                            class="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                            <h3 class="text-lg font-semibold text-primary mb-3">
                                Für Startup-Gründer & Innovatoren:
                            </h3>
                            <p class="text-gray-700 mb-4">
                                ✅ Haben Sie eine Idee für ein digitales Produkt? Lass uns gemeinsam daran
                                arbeiten!
                            </p>
                            <button @click="scrollToFunnel"
                                class="w-full bg-gradient-to-r from-accent to-orange-500 hover:from-orange-500 hover:to-accent text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                Prototyp entwickeln – Hier anfragen!
                            </button>
                        </div>
                    </div>
                </section>

                <!-- Footer -->
                <footer class="p-6 md:p-8 border-t border-gray-200 bg-gray-50">
                    <NuxtLink to="/blog"
                        class="inline-flex items-center text-primary hover:text-secondary font-body font-semibold transition-colors">
                        ← Zurück zum Blog
                    </NuxtLink>
                </footer>
            </article>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()

definePageMeta({
    key: route => route.fullPath
})

// Fetch the blog post using the current slug and re-fetch when the route changes
const { data: post, error, refresh } = await useAsyncData(
    () => queryCollection('blog').path(`/blog/${route.params.slug}`).first(),
    { watch: [() => route.fullPath] }
)

// Ensure a fresh fetch when navigating between different slugs
watch(() => route.params.slug, () => refresh())



// Format date to German locale
const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// Define custom heading components using h() (instead of JSX)
const MyH1 = defineComponent({
    setup(_, { slots }) {
        return () =>
            h(
                'h1',
                { class: 'text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-dark my-6 border-b-2 border-primary/20 pb-2' },
                slots.default ? slots.default() : ''
            )
    }
})
const MyH2 = defineComponent({
    setup(_, { slots }) {
        return () =>
            h(
                'h2',
                { class: 'text-xl md:text-2xl lg:text-3xl font-heading font-bold text-dark my-5 border-l-4 border-primary pl-4' },
                slots.default ? slots.default() : ''
            )
    }
})
const MyH3 = defineComponent({
    setup(_, { slots }) {
        return () =>
            h(
                'h3',
                { class: 'text-lg md:text-xl lg:text-2xl font-heading font-semibold text-dark my-4' },
                slots.default ? slots.default() : ''
            )
    }
})
const customHeadings = { h1: MyH1, h2: MyH2, h3: MyH3 }

const config = useRuntimeConfig()


// Scroll to lead funnel section function
const isClicked = ref(false)
const isMenuOpen = ref(false)
function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
}
function scrollToFunnel() {
    isClicked.value = true
    const funnelSection = document.getElementById('lead-funnel')
    if (funnelSection) {
        funnelSection.scrollIntoView({ behavior: 'smooth' })
    }
    if (isMenuOpen.value) {
        toggleMenu()
    }
}
</script>

<style scoped>
/* Override default prose styles to match the light theme */
.prose {
    --tw-prose-body: theme('colors.gray.700');
    --tw-prose-headings: theme('colors.gray.900');
    --tw-prose-links: theme('colors.blue.600');
    --tw-prose-bold: theme('colors.gray.900');
    --tw-prose-captions: theme('colors.gray.600');
    --tw-prose-code: theme('colors.blue.700');
    --tw-prose-pre-bg: theme('colors.gray.50');
    --tw-prose-hr: theme('colors.gray.300');
    --tw-prose-quotes: theme('colors.gray.600');
    --tw-prose-quote-borders: theme('colors.blue.300');
    --tw-prose-counters: theme('colors.gray.600');
    --tw-prose-bullets: theme('colors.gray.400');
    line-height: 1.8;
}

.prose p {
    @apply text-gray-700 leading-relaxed mb-4;
}

.prose ul,
.prose ol {
    @apply text-gray-700;
}

.prose blockquote {
    @apply border-l-4 border-primary bg-blue-50 p-4 my-6 rounded-r-lg;
}

.prose code:not(pre code) {
    @apply bg-gray-100 text-primary px-2 py-1 rounded text-sm font-mono;
}

.prose pre {
    @apply bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto;
}

.prose a {
    @apply text-primary hover:text-secondary transition-colors duration-200 font-medium;
}

/* Custom button hover effects */
button:hover {
    box-shadow: 0 8px 25px rgba(30, 115, 190, 0.3);
}

.bg-gradient-to-r.from-accent:hover {
    box-shadow: 0 8px 25px rgba(255, 153, 0, 0.3);
}
</style>