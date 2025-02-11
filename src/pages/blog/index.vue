<template>
    <div class="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-4xl font-heading font-bold text-primary mb-8">Blog</h1>

            <!-- Loading and Error States -->
            <div v-if="isFetching" class="text-secondary">Loading posts...</div>
            <div v-else-if="error" class="text-red-500">
                Error loading posts.
                <pre class="mt-2 text-xs">{{ error.message }}</pre>
            </div>

            <!-- List of Blog Posts -->
            <div v-else class="space-y-8">
                <article v-for="post in allPosts" :key="post._id"
                    class="group relative bg-gradient-to-br from-gradient-start to-gradient-end p-6 rounded-lg shadow-xl transition-all hover:shadow-2xl">
                    <!-- Construct the link using the cleaned-up path -->
                    <NuxtLink :to="post.path" class="absolute inset-0 z-10" />

                    <div class="flex flex-col space-y-4">
                        <div class="flex items-center space-x-2 text-secondary">
                            <time class="text-sm font-body">{{ formatDate(post.date) }}</time>
                            <span class="text-accent">•</span>
                            <span class="text-sm font-body">{{ post.author }}</span>
                        </div>

                        <h2 class="text-2xl font-heading font-bold text-primary">
                            {{ post.title }}
                        </h2>

                        <p class="text-secondary font-body leading-relaxed">
                            {{ post.description }}
                        </p>

                        <div class="flex flex-wrap gap-2">
                            <!-- Updated tag styling with a darker blue background for better contrast -->
                            <span v-for="tag in post.tags" :key="tag"
                                class="px-3 py-1 text-sm font-body bg-accent-dark rounded-full text-white transition-colors">
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
const { data: allPosts, error, isFetching } = await useAsyncData('blog-posts', () =>
    queryCollection('blog')
        .order('date', 'DESC')
        .select('path', 'title', 'description', 'date', 'author', 'tags')
        .all()
);

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
    transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, color 0.3s ease-in-out;
    background-color: #1E1E1E;
    /* Standard Hintergrund */
    border: 1px solid rgba(255, 255, 255, 0.1);
    /* Dezente Umrandung */
    border-radius: 8px;
    /* Leichte Abrundung */
    padding: 1.5rem;
    color: #A3A3A3;
    /* Standard Textfarbe */
}

article:hover {
    background-color: #003F5C;
    /* Sanfter Wechsel zu einem dunklen Blauton */
    border-color: #00D4FF;
    /* Kräftigere Outline */
    color: #FFFFFF;
    /* Weißer Text für bessere Sichtbarkeit */
}

article:focus-within {
    outline: 2px solid #00D4FF;
    outline-offset: 3px;
}
</style>

