<template>

    <div class="min-h-screen bg-gradient-to-br from-background via-surface to-background py-12 px-4 sm:px-6 lg:px-8">

        <div class="max-w-7xl mx-auto">

            <!-- Header Section -->

            <div class="text-center mb-12">

                <h1 class="text-4xl sm:text-5xl font-bold text-primary mb-4">Unsere Standorte</h1>

                <p class="text-xl text-secondary max-w-3xl mx-auto">

                    Finden Sie Eulah IT an über 100 Standorten in NRW und Niedersachsen.

                </p>

            </div>



            <!-- Search Section -->

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

                            <input v-model="searchQuery" type="text" placeholder="Nach Städten oder Regionen suchen..."
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

                    {{ filteredStandorte.length }}

                    {{ filteredStandorte.length === 1 ? 'Standort gefunden' : 'Standorte gefunden' }}

                </p>

            </div>



            <!-- Standorte Grid -->

            <div v-if="paginatedStandorte.length > 0"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                <article v-for="item in paginatedStandorte" :key="item.slug"
                    class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col">

                    <NuxtLink :to="`/standorte/${item.slug}`" class="flex flex-col h-full">

                        <!-- Image Section -->

                        <div
                            class="relative h-48 bg-gradient-to-br from-primary to-secondary overflow-hidden flex-shrink-0">

                            <img v-if="item.heroImage" :src="item.heroImage" :alt="item.title"
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy" />

                            <div v-else class="w-full h-full flex items-center justify-center">

                                <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-white/60" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">

                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />

                                </svg>

                            </div>

                        </div>



                        <!-- Content Section -->

                        <div class="p-6 flex-1 flex flex-col min-h-0">

                            <div class="flex-1 mb-4">

                                <h2
                                    class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">

                                    {{ item.title }}

                                </h2>

                                <p class="text-gray-600 text-sm line-clamp-3">

                                    {{ item.metaDescription || item.heroSubtitle }}

                                </p>

                            </div>



                            <div class="flex items-center justify-between pt-3 border-t border-gray-100">

                                <span
                                    class="text-sm font-medium text-primary group-hover:text-accent transition-colors">

                                    Standort ansehen →

                                </span>

                                <span class="text-xs text-gray-500">{{ item.city }}{{ item.region ? ', ' + item.region :

                                    '' }}</span>

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

                <h3 class="text-2xl font-bold text-gray-700 mb-4">Keine Standorte gefunden</h3>

                <p class="text-gray-500 mb-8">Versuche es mit einem anderen Suchbegriff.</p>

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



const searchQuery = ref('')

const currentPage = ref(1)



// Alle Standorte laden

const { data: allStandorte } = await useAsyncData('standorte-list', async () => {

    const items = await queryCollection('standorte')

        .select('slug', 'title', 'metaDescription', 'heroSubtitle', 'heroImage', 'city', 'region')

        .all()



    // Alphabetisch nach Stadt sortieren (Fallback: nach title, falls city fehlt)

    return (items || []).sort((a, b) => (a.city || a.title).localeCompare(b.city || b.title))

}, {

    default: () => []

})



// Filter

const filteredStandorte = computed(() => {

    if (!allStandorte.value) return []

    let items = [...allStandorte.value]



    if (searchQuery.value.trim()) {

        const q = searchQuery.value.trim().toLowerCase()

        items = items.filter(item =>

            item.title?.toLowerCase().includes(q) ||

            item.city?.toLowerCase().includes(q) ||

            item.region?.toLowerCase().includes(q) ||

            item.metaDescription?.toLowerCase().includes(q)

        )

    }



    return items

})



// Pagination

const ITEMS_PER_PAGE = 12

const totalPages = computed(() =>

    Math.max(1, Math.ceil(filteredStandorte.value.length / ITEMS_PER_PAGE))

)

const paginatedStandorte = computed(() => {

    const start = (currentPage.value - 1) * ITEMS_PER_PAGE

    return filteredStandorte.value.slice(start, start + ITEMS_PER_PAGE)

})



// Methods

const clearSearch = () => {

    searchQuery.value = ''

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



// Watchers

watch(searchQuery, () => { currentPage.value = 1 })

watch(filteredStandorte, () => {

    if (currentPage.value > totalPages.value) currentPage.value = totalPages.value

})

</script>