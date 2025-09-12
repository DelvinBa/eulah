<template>
    <div class="min-h-screen bg-gradient-to-br from-background via-surface to-background py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
            <!-- Back Link -->
            <NuxtLink to="/blog"
                class="mb-8 inline-flex items-center text-accent hover:text-accent-hover font-body transition-colors">
                ← Zurück zum Blog
            </NuxtLink>
            <article class="bg-white rounded-2xl shadow-lg overflow-hidden">
                <!-- Header with Featured Image and Overlay -->
                <header class="relative">
                    <NuxtImg v-if="post.image" :src="post.image" :alt="post.title"
                        class="w-full h-56 md:h-96 object-cover" />
                    <!-- Overlay for improved contrast -->
                    <div class="absolute inset-0 bg-dark bg-opacity-40"></div>
                    <!-- Title, Meta & Tags -->
                    <div class="absolute bottom-0 p-4 md:p-6">
                        <h1 class="text-2xl md:text-4xl font-heading font-bold text-primary">
                            {{ post.title }}
                        </h1>
                        <div class="flex items-center space-x-2 mt-2">
                            <time class="text-xs md:text-sm font-body text-secondary">
                                {{ formatDate(post.date) }}
                            </time>
                            <span class="text-secondary">•</span>
                            <span class="text-xs md:text-sm font-body text-secondary">
                                {{ post.author }}
                            </span>
                        </div>
                        <div class="mt-4 flex flex-wrap gap-2">
                            <span v-for="tag in post.tags" :key="tag"
                                class="px-2 py-1 text-xs md:text-sm bg-accent/10 text-accent rounded-full">
                                {{ tag }}
                            </span>
                        </div>
                    </div>
                </header>

                <!-- Main Content -->
                <div class="p-4 md:p-6">
                    <!-- Render markdown with custom heading components -->
                    <ContentRenderer :value="post" :components="customHeadings" class="prose max-w-none" />
                </div>

                <!-- Call-to-Action Section -->
                <section
                    class="p-4 md:p-6 bg-gradient-to-br from-background via-surface to-background border-t border-surface">
                    <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">
                        Was als nächstes?
                    </h2>
                    <div class="space-y-4">
                        <div>
                            <p class="text-dark mb-2">
                                <strong>Für Unternehmen, die digitale Lösungen suchen:</strong>
                            </p>
                            <p class="text-dark mb-4">
                                ✅ Lassen Sie uns gemeinsam Ihr digitales Projekt umsetzen! Buche ein kostenloses
                                Erstgespräch.
                            </p>
                            <button @click="scrollToFunnel"
                                class="bg-primary hover:bg-secondary text-background font-body py-2 px-4 rounded transition-colors">
                                Jetzt unverbindlich beraten lassen
                            </button>
                        </div>
                        <div>
                            <p class="text-dark mb-2">
                                <strong>Für Startup-Gründer & Innovatoren:</strong>
                            </p>
                            <p class="text-dark mb-4">
                                ✅ Haben Sie eine Idee für ein digitales Produkt? Lass uns gemeinsam daran
                                arbeiten!
                            </p>
                            <button @click="scrollToFunnel"
                                class="bg-primary hover:bg-secondary text-background font-body py-2 px-4 rounded transition-colors">
                                Technischen Co-Founder finden – Hier anfragen!
                            </button>
                        </div>
                    </div>
                </section>

                <!-- Footer -->
                <footer class="p-4 md:p-6 border-t border-surface">
                    <NuxtLink to="/blog"
                        class="inline-flex items-center text-accent hover:text-accent-hover font-body transition-colors">
                        ← Zurück zum Blog
                    </NuxtLink>
                </footer>
            </article>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()

// Fetch the blog post using the full path with prefix "/blog/"
const { data: post, error } = await useAsyncData(route.path, () =>
    queryCollection('blog').path(route.path).first(),
)

// Clean up when leaving the page
onBeforeUnmount(() => {
    if (import.meta.client) {
        // Remove the reload status for this page
        sessionStorage.removeItem(`reloaded-${route.path}`)
    }
})

// Add onMounted hook to reload page once
onMounted(() => {
    // Check if we haven't reloaded yet
    const hasReloaded = sessionStorage.getItem(`reloaded-${route.path}`)

    if (!hasReloaded && import.meta.client) {
        // Mark this page as reloaded
        sessionStorage.setItem(`reloaded-${route.path}`, 'true')
        // Reload the page
        window.location.reload()
    }
})


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
                { class: 'text-2xl md:text-4xl font-heading font-bold text-primary my-4' },
                slots.default ? slots.default() : ''
            )
    }
})
const MyH2 = defineComponent({
    setup(_, { slots }) {
        return () =>
            h(
                'h2',
                { class: 'text-xl md:text-3xl font-heading font-bold text-primary my-3' },
                slots.default ? slots.default() : ''
            )
    }
})
const MyH3 = defineComponent({
    setup(_, { slots }) {
        return () =>
            h(
                'h3',
                { class: 'text-lg md:text-2xl font-heading font-bold text-primary my-2' },
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

<style>
/* Override default prose styles to match the light theme */
.prose {
    --tw-prose-body: theme('colors.dark');
    --tw-prose-headings: theme('colors.primary.500');
    --tw-prose-links: theme('colors.accent');
    --tw-prose-bold: theme('colors.primary.500');
    --tw-prose-captions: theme('colors.dark');
    --tw-prose-code: theme('colors.primary.500');
    --tw-prose-pre-bg: theme('colors.surface');
    --tw-prose-hr: theme('colors.accent-dark');
}
</style>
