<template>
    <div class="min-h-screen bg-gradient-to-br from-background via-surface to-background py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
            <!-- Header Section -->
            <div class="text-center mb-12">
                <h1 class="text-4xl sm:text-5xl font-bold text-primary mb-4">
                    Ratgeber 
                </h1>
                <p class="text-xl text-secondary max-w-3xl mx-auto">
                    Entdecke wertvolle Tipps, Tricks und Insights rund um Digitalisierung,
                    Software-Entwicklung und moderne Technologien
                </p>
            </div>

            <!-- Search Section (only) -->
            <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div class="flex items-center gap-6">
                    <!-- Search Bar -->
                    <div class="flex-1 w-full">
                        <div class="relative">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input v-model="searchQuery" type="text" placeholder="Nach Artikeln suchen..."
                                class="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-base" />
                        </div>
                    </div>
                </div>

                <!-- Active Filters Display -->
                <div v-if="searchQuery" class="mt-4 flex items-center gap-3">
                    <span class="text-sm font-medium text-gray-600">Aktiver Filter:</span>
                    <div class="flex flex-wrap gap-2">
                        <span
                            class="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                            Suche: "{{ searchQuery }}"
                            <button @click="clearSearch" class="hover:bg-accent/20 rounded-full p-1">
                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                                </svg>
                            </button>
                        </span>
                    </div>
                </div>
            </div>

            <!-- Results Counter -->
            <div class="mb-6 text-center">
                <p class="text-gray-600">
                    {{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'Artikel gefunden' : 'Artikel gefunden'
                    }}
                </p>
            </div>

            <!-- Blog Posts Grid (paginated: 3 rows per page) -->
            <div v-if="paginatedPosts.length > 0"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <article v-for="post in paginatedPosts" :key="post._id"
                    class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                    <NuxtLink :to="post.path" class="block h-full">
                        <!-- Image Section -->
                        <div class="relative h-48 bg-gradient-to-br from-primary to-secondary overflow-hidden">
                            <img v-if="post.image" :src="post.image" :alt="post.title"
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy" />
                            <div v-else class="w-full h-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-white/60" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <!-- Date Badge -->
                            <div
                                class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                                {{ formatDate(post.date) }}
                            </div>
                        </div>

                        <!-- Content Section -->
                        <div class="p-6 h-full flex flex-col">
                            <div class="flex-1">
                                <h2
                                    class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    {{ post.title }}
                                </h2>

                                <p class="text-gray-600 text-sm line-clamp-3 mb-4">
                                    {{ post.description }}
                                </p>
                            </div>

                            <!-- Tags and Author -->
                            <div class="space-y-3">
                                <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2">
                                    <button v-for="tag in post.tags" :key="tag" @click.stop.prevent="searchByTag(tag)"
                                        class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                                        {{ tag }}
                                    </button>
                                </div>

                                <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <div class="flex items-center gap-2">
                                        <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                            <span class="text-white text-xs font-bold">{{ post.author?.charAt(0) || 'E'
                                            }}</span>
                                        </div>
                                        <span class="text-xs text-gray-500">{{ post.author }}</span>
                                    </div>

                                    <div
                                        class="flex items-center text-primary group-hover:text-accent transition-colors">
                                        <span class="text-sm font-medium mr-2">Lesen</span>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </NuxtLink>
                </article>
            </div>

            <!-- No Results State -->
            <div v-else class="text-center py-16">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto w-24 h-24 text-gray-300 mb-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.007-5.824-2.696M15 6.25a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 class="text-2xl font-bold text-gray-700 mb-4">Keine Artikel gefunden</h3>
                <p class="text-gray-500 mb-8">Versuche es mit anderen Suchbegriffen.</p>
                <button @click="clearSearch"
                    class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
                    Filter zurücksetzen
                </button>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="mt-10 flex items-center justify-center gap-2">
                <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                    class="px-3 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50">
                    Zurück
                </button>

                <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="[
                    'min-w-[40px] px-3 py-2 rounded-lg text-sm border',
                    currentPage === page
                        ? 'bg-primary text-white border-primary shadow'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                ]">
                    {{ page }}
                </button>

                <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
                    class="px-3 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50">
                    Weiter
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()

definePageMeta({
    key: route => route.fullPath
})

// Reactive state
const searchQuery = ref('')
const currentPage = ref(1)
const columns = ref(1) // responsive column count (xl:4, lg:3, md:2, sm:1)

const { data: allPosts } = await useAsyncData(
    () => queryCollection('blog')
        .select('path', 'title', 'description', 'date', 'author', 'tags', 'image')
        .all(),
    {
        watch: [() => route.fullPath],
        default: () => []
    }
)

// Computed: filter by search
const filteredPosts = computed(() => {
    if (!allPosts.value) return []

    let posts = [...allPosts.value]

    if (searchQuery.value.trim()) {
        const query = searchQuery.value.trim().toLowerCase()
        posts = posts.filter(post =>
            post.title?.toLowerCase().includes(query) ||
            post.description?.toLowerCase().includes(query) ||
            post.tags?.some(tag => tag.toLowerCase().includes(query))
        )
    }

    return posts
})

// Pagination helpers: show exactly 3 rows per page based on current breakpoint
const itemsPerPage = computed(() => columns.value * 3)
const totalPages = computed(() => Math.max(1, Math.ceil(filteredPosts.value.length / itemsPerPage.value)))
const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredPosts.value.slice(start, end)
})

// Methods
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const clearSearch = () => {
    searchQuery.value = ''
    currentPage.value = 1
}

const searchByTag = (tag) => {
    searchQuery.value = tag
    currentPage.value = 1
}

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
}

// Watch for search changes and reset pagination
watch(searchQuery, () => {
    currentPage.value = 1
})

// Responsive columns detection aligned with Tailwind breakpoints
const updateColumns = () => {
    if (typeof window === 'undefined') return
    const w = window.innerWidth
    if (w >= 1280) columns.value = 4 // xl
    else if (w >= 1024) columns.value = 3 // lg
    else if (w >= 768) columns.value = 2 // md
    else columns.value = 1 // sm
}

// Keep currentPage within bounds if filtered list shrinks
watch([filteredPosts, itemsPerPage], () => {
    if (currentPage.value > totalPages.value) currentPage.value = totalPages.value
})

// Clean up when leaving the page
onBeforeUnmount(() => {
    if (import.meta.client) {
        window.removeEventListener('resize', updateColumns)
    }
})

// Mounted
onMounted(() => {
    updateColumns()
    if (import.meta.client) {
        window.addEventListener('resize', updateColumns)
    }
})
</script>

<style scoped>
/* Line clamp utilities for text truncation */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Ensure better mobile spacing */
@media (max-width: 640px) {
    .min-h-screen {
        padding-top: 8rem;
        padding-bottom: 8rem;
    }

    /* Single column on mobile */
    .grid {
        grid-template-columns: 1fr;
    }
}

/* Smooth transitions for all interactive elements */
* {
    transition-property: transform, box-shadow, background-color, border-color, color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
}
</style>
