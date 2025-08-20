<template>
    <div class="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl sm:text-4xl font-heading font-bold text-primary mb-6 sm:mb-8 text-center sm:text-left">
                Blog
            </h1>

            <!-- List of Blog Posts -->
            <div class="space-y-6 sm:space-y-8">
                <article v-for="post in allPosts ?? []" :key="post._id"
                    class="group relative bg-gradient-to-br from-gradient-start to-gradient-end p-4 sm:p-6 rounded-lg shadow-xl transition-all hover:shadow-2xl">
                    <NuxtLink :to="post.path" class="absolute inset-0 z-10" />

                    <div class="flex flex-col space-y-3 sm:space-y-4">
                        <div class="flex flex-wrap items-center space-x-2 text-secondary text-xs sm:text-sm">
                            <time class="font-body">{{ formatDate(post.date) }}</time>
                            <span class="text-accent">•</span>
                            <span class="font-body">{{ post.author }}</span>
                        </div>

                        <h2 class="text-xl sm:text-2xl font-heading font-bold text-primary">
                            {{ post.title }}
                        </h2>

                        <p class="text-sm sm:text-base text-secondary font-body leading-relaxed">
                            {{ post.description }}
                        </p>

                        <div class="flex flex-wrap gap-2">
                            <span v-for="tag in post.tags" :key="tag"
                                class="px-2 sm:px-3 py-1 text-xs sm:text-sm font-body bg-accent-dark rounded-full text-background transition-colors">
                                {{ tag }}
                            </span>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()


const { data: allPosts, error, isFetching } = await useAsyncData(route.path, async () => {
    try {
        const posts = await queryCollection('blog')
            .order('date', 'DESC')
            .select('path', 'title', 'description', 'date', 'author', 'tags')
            .all();
        return posts || []; // Gib immer ein Array zurück
    } catch (err) {
        console.error("🔥 Fehler beim Laden der Blog-Posts:", err);
        throw new Error("Konnte Blog-Posts nicht laden");
    }
}, {
    default: () => [] // WICHTIG: Verhindert Hydration-Fehler bei Preview
});


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

// Format the date to a German locale
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};


</script>

<style scoped>
article {
    padding: 1rem;
    border-radius: 6px;
}

article:hover {
    background-color: var(--color-primary);
    border-color: var(--color-secondary);
    color: var(--color-background);
}

/* Ensure better mobile spacing */
@media (max-width: 640px) {
    .min-h-screen {
        padding-top: 8rem;
        padding-bottom: 8rem;
    }
}
</style>