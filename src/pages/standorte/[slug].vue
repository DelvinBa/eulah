<template>
    <div class="space-y-16">
        <!-- Breadcrumbs -->
        <nav class="text-sm">
            <ol class="flex flex-wrap items-center gap-2">
                <li>
                    <NuxtLink to="/" class="hover:underline !text-primary hover:!text-secondary">Start</NuxtLink>
                </li>
                <li class="text-gray-400">/</li>
                <li>
                    <NuxtLink to="/standorte" class="hover:underline !text-primary hover:!text-secondary">Standorte
                    </NuxtLink>
                </li>
                <li class="text-gray-400">/</li>
                <li aria-current="page" class="text-gray-600">{{ post?.city || post?.title }}</li>
            </ol>
        </nav>

        <!-- Hero -->
        <header class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface to-background">
            <div class="grid lg:grid-cols-2 gap-10 items-center p-8 md:p-12">
                <div>
                    <span v-if="post?.region || post?.city"
                        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface text-sm text-gray-600 mb-4">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                        </svg>
                        {{ post?.city }}{{ post?.region ? `, ${post.region}` : '' }}
                    </span>

                    <h1 class="text-5xl font-bold mb-4 tracking-tight text-primary">
                        {{ post?.title }}
                    </h1>

                    <p class="text-xl text-dark/80 max-w-2xl leading-relaxed">
                        {{ post?.heroSubtitle || post?.metaDescription }}
                    </p>

                    <!-- nur EIN CTA im Hero -->
                    <div class="mt-8">
                        <NuxtLink :to="post?.ctaHref || '/kontakt'" class="btn-primary inline-flex items-center gap-2">
                            {{ post?.ctaText || 'Jetzt Beratung anfragen' }}
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
                            </svg>
                        </NuxtLink>
                    </div>
                </div>

                <figure class="relative">
                    <img :src="heroImage" :alt="`IT-Unternehmen in ${post?.city || 'Ihrer Stadt'}`"
                        class="w-full max-h-[480px] object-cover rounded-2xl shadow" loading="eager" decoding="async" />
                </figure>
            </div>
        </header>

        <!-- Content -->
        <main class="space-y-16">
            <!-- Markdown Intro & Body (fließender Text aus .md) -->
            <article class="prose max-w-3xl mx-auto prose-headings:text-primary prose-a:!text-primary">
                <ContentRenderer v-if="post" :value="post" />
            </article>

            <!-- Services Section (deine Kachel-Komponente) -->
            <section class="max-w-6xl mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-6">Unsere IT-Dienstleistungen in {{ post?.city }}</h2>
                <p class="text-center text-gray-600 mb-10">
                    Passgenau für Ihre Anforderungen – von IT-Support bis Cloud & Sicherheit.
                </p>
                <HomeBusinessAreasSection />
            </section>

            <!-- Externe Links -->
            <section v-if="post?.externalLinks?.length" class="max-w-4xl mx-auto px-4">
                <h2 class="text-2xl font-bold mb-4">Nützliche Ressourcen in {{ post?.city }}</h2>
                <ul class="space-y-2">
                    <li v-for="(link, i) in post.externalLinks" :key="i">
                        <a :href="link.href" target="_blank" rel="noopener nofollow"
                            class="hover:underline !text-primary">
                            {{ link.label }}
                        </a>
                    </li>
                </ul>
            </section>

            <!-- Bottom CTA (beibehalten) -->
            <section class="bg-primary text-white py-12 px-6 rounded-2xl text-center max-w-5xl mx-auto">
                <h2 class="text-3xl font-bold mb-4 text-white">
                    IT-Beratung in {{ post?.city }} – unverbindlich & persönlich
                </h2>
                <p class="mb-6">Eulah IT meldet sich schnellstmöglich und bespricht Ihre Anforderungen.</p>
                <NuxtLink :to="post?.ctaHref || '/kontakt'"
                    class="px-6 py-3 rounded-xl bg-white text-primary font-semibold shadow hover:shadow-lg transition">
                    {{ post?.ctaText || 'Jetzt Kontakt aufnehmen' }}
                </NuxtLink>
            </section>
        </main>

        <!-- FAQ (deine Komponente am Seitenende) -->
        <HomeFaqSection />
    </div>
</template>

<script setup>
import { computed } from 'vue'
const route = useRoute()
const { data: post } = await useAsyncData(route.path, () =>
    queryCollection('standorte').path(route.path).first()
)

/** Robustere Bild-Fallbacks:
 * 1) heroImage wenn gesetzt & nicht leer
 * 2) Stadtbild (Unsplash featured)
 * 3) Generisches Tech-Bild
 */
const heroImage = computed(() => {
    const raw = post.value?.heroImage
    const cleaned = typeof raw === 'string' ? raw.trim() : ''
    if (cleaned) return cleaned
    const city = post.value?.city?.toLowerCase()
    if (city) {
        return `https://source.unsplash.com/featured/1600x900/?${encodeURIComponent(city)},germany,city`
    }
    return 'https://source.unsplash.com/featured/1600x900/?it,technology'
})

useSeoMeta({
    title: post.value?.title || 'IT-Unternehmen',
    description: post.value?.metaDescription || '',
    ogTitle: post.value?.title || 'IT-Unternehmen',
    ogDescription: post.value?.metaDescription || '',
    ogImage: heroImage.value
})


// Runtime-URL & Organization-@id (kommt aus deiner nuxt.config identity)
const config = useRuntimeConfig()
const siteUrl = (config.public?.siteUrl || 'https://www.eulah.de').replace(/\/$/, '')
const orgId = `${siteUrl}/#organization`

const city = post.value?.city
const region = post.value?.region

// 👉 Deine angebotenen Services + Ziel-URLs (bitte anpassen)
const services = [
    { name: 'Managed IT Services', path: '/services/managed-it/' },
    { name: 'Cloud & Infrastruktur', path: '/services/cloud/' },
    { name: 'IT-Sicherheit & Compliance', path: '/services/it-sicherheit/' },
    { name: 'Softwareentwicklung', path: '/services/softwareentwicklung/' },
    { name: 'KI-Lösungen', path: '/services/ki/' },
    { name: 'Support & Helpdesk', path: '/services/support/' }
]

// JSON-LD: für jede Leistung ein Service-Knoten mit areaServed (City + Region + Country)
useSchemaOrg([
    ...services.map((s, i) => ({
        '@type': 'Service',
        '@id': `${siteUrl}${useRoute().path}#service-${i + 1}`,
        name: `${s.name} in ${city}`,
        serviceType: s.name,
        url: `${siteUrl}${s.path}`,                 // Ziel-URL der Service-Detailseite
        provider: { '@id': orgId },
        areaServed: [
            { '@type': 'City', name: city },
            region ? { '@type': 'AdministrativeArea', name: region } : undefined,
            { '@type': 'Country', name: 'Deutschland' }
        ].filter(Boolean)
        // optional: offers / Offer, wenn ihr Preise/CTAs strukturiert abbilden wollt
    }))
])

</script>

<style scoped>
/* kleine Verfeinerungen */
.prose :deep(a) {
    text-decoration: underline;
}
</style>
