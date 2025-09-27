<template>
    <div class="space-y-20">

        <!-- HERO -->
        <header class="relative overflow-hidden rounded-3xl">
            <!-- dekorative Akzent-Blobs -->
            <div class="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-20"
                style="background: radial-gradient(40% 40% at 50% 50%, var(--color-secondary), transparent 70%);"></div>
            <div class="pointer-events-none absolute -bottom-24 -left-24 w-[440px] h-[440px] rounded-full blur-3xl opacity-20"
                style="background: radial-gradient(40% 40% at 50% 50%, var(--color-accent), transparent 70%);"></div>

            <div
                class="relative grid lg:grid-cols-2 gap-10 items-center p-8 md:p-12 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)] rounded-3xl">
                <!-- Copy -->
                <div>
                    <span v-if="post?.region || post?.city"
                        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white/60 text-sm text-gray-700 mb-4 backdrop-blur">
                        <svg class="w-4 h-4 text-[var(--color-accent)]" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                        </svg>
                        {{ post?.city }}{{ post?.region ? `, ${post.region}` : '' }}
                    </span>

                    <h1 class="text-5xl font-bold mb-4 tracking-tight text-[var(--color-primary)]">
                        {{ post?.hero?.title || post?.title }}
                    </h1>

                    <p class="text-xl text-dark/80 max-w-2xl leading-relaxed">
                        {{ post?.hero?.subtitle || post?.heroSubtitle || post?.metaDescription }}
                    </p>

                    <!-- Key-Highlights -->
                    <div v-if="post?.intro?.kicker || (post?.intro?.bullets && post.intro.bullets.length)"
                        class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                        <div v-if="post?.intro?.kicker"
                            class="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-3 py-2 backdrop-blur">
                            <span class="inline-flex w-2 h-2 rounded-full bg-[var(--color-accent)]"></span>
                            <span class="font-medium">{{ post.intro.kicker }}</span>
                        </div>
                        <div v-for="(b, i) in (post?.intro?.bullets || []).slice(0, 2)" :key="`kicker-${i}`"
                            class="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-3 py-2 backdrop-blur">
                            <span class="inline-flex w-2 h-2 rounded-full bg-[var(--color-secondary)]"></span>
                            <span>{{ b }}</span>
                        </div>
                    </div>

                    <!-- EIN CTA im Hero -->
                    <div class="mt-8">
                        <NuxtLink :to="post?.hero?.ctaHref || post?.ctaHref || '/kontakt'" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold shadow hover:shadow-lg transition
                             bg-[var(--color-primary)] hover:bg-[var(--color-secondary)]">
                            {{ post?.hero?.ctaText || post?.ctaText || 'Jetzt Beratung anfragen' }}
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
                            </svg>
                        </NuxtLink>
                    </div>
                </div>

                <!-- Media -->
                <figure class="relative m-2">
                    <div
                        class="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[color:rgba(77,166,255,0.22)] to-[color:rgba(255,153,0,0.18)] blur-2xl">
                    </div>
                    <img :src="imgErrored ? defaultHero : imageUrl"
                        :alt="`IT-Unternehmen in ${post?.city || 'Ihrer Stadt'}`"
                        class="relative w-full aspect-[16/10] object-cover rounded-2xl shadow-lg ring-1 ring-black/5"
                        loading="eager" decoding="async" @error="imgErrored = true" />
                    <figcaption
                        class="absolute bottom-3 left-3 text-xs bg-white/90 backdrop-blur px-2 py-1 rounded-full text-gray-700">
                        Symbolbild {{ post?.city || 'Standort' }}
                    </figcaption>
                </figure>
            </div>
        </header>

        <!-- Long Intro (Absätze) -->
        <section v-if="chunksIntro.length" class="max-w-3xl mx-auto px-2">
            <div v-for="(p, i) in chunksIntro" :key="`li-${i}`" class="prose prose-lg max-w-none mb-5 text-gray-800"
                v-html="renderMarkdown(p)">
            </div>
        </section>

        <section>
            <HomeBusinessAreasSection class="mt-6" />
        </section>

        <!-- Trust Cards -->
        <section v-if="post?.trust?.cards?.length" class="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4">
            <div v-for="(card, i) in post.trust.cards" :key="`trust-${i}`"
                class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                <h3 class="text-xl font-semibold mb-2 text-[var(--color-primary)]">{{ card.title }}</h3>
                <p class="text-gray-700">{{ card.text }}</p>
            </div>
        </section>


        <!-- Local Section -->
        <section v-if="post?.local?.heading || post?.local?.paragraphs?.length" class="max-w-5xl mx-auto px-4">
            <h2 class="text-3xl font-bold mb-4">
                <span class="text-[var(--color-primary)]">{{ post?.local?.heading || `Ihr IT-Partner in ${post?.city}`
                }}</span>
            </h2>
            <div class="grid gap-4">
                <p v-for="(p, i) in (post?.local?.paragraphs || [])" :key="`local-${i}`"
                    class="prose prose-lg max-w-none text-gray-800" v-html="renderMarkdown(p)">
                </p>
            </div>
        </section>



        <!-- Long Deep Dive -->
        <section v-if="chunksDeepDive.length" class="max-w-3xl mx-auto px-2">
            <div v-for="(p, i) in chunksDeepDive" :key="`ld-${i}`" class="prose prose-lg max-w-none mb-5 text-gray-800"
                v-html="renderMarkdown(p)">
            </div>
        </section>

        <!-- Bottom CTA (aus Frontmatter cta, fallback auf hero/cta) -->
        <section class="text-white py-12 px-6 rounded-2xl text-center max-w-5xl mx-auto
                    bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
            <h2 class="text-3xl font-bold mb-4 text-white">
                {{ post?.cta?.title || `IT-Beratung in ${post?.city} – unverbindlich & persönlich` }}
            </h2>
            <p class="mb-6">{{ post?.cta?.text || 'Wir melden uns schnellstmöglich und besprechen Ihre Anforderungen.'
                }}</p>
            <NuxtLink :to="post?.cta?.ctaHref || post?.hero?.ctaHref || post?.ctaHref || '/kontakt'"
                class="px-6 py-3 rounded-xl bg-white text-[var(--color-primary)] font-semibold shadow hover:shadow-lg transition">
                {{ post?.cta?.ctaText || post?.hero?.ctaText || post?.ctaText || 'Jetzt Kontakt aufnehmen' }}
            </NuxtLink>
        </section>


        <!-- Externe Ressourcen (kontextualisiert) -->
        <section v-if="post?.resources?.items?.length" class="max-w-4xl mx-auto px-4">
            <h2 class="text-2xl font-bold mb-4">Weiterführende Anlaufstellen in {{ post?.city }}</h2>
            <ul class="space-y-3">
                <li v-for="(item, i) in post.resources.items" :key="`res-${i}`"
                    class="rounded-xl border border-gray-200 bg-white p-4 hover:shadow transition">
                    <a :href="item.href" target="_blank" rel="noopener nofollow"
                        class="font-medium hover:underline !text-[var(--color-primary)]">
                        {{ item.label }}
                    </a>
                    <p v-if="item.blurb" class="text-sm text-gray-600 mt-1">{{ item.blurb }}</p>
                </li>
            </ul>
        </section>

        <!-- Nearby Crosslinks -->
        <section v-if="post?.nearby?.slugs?.length" class="max-w-5xl mx-auto px-4">
            <h2 class="text-2xl font-bold mb-4">Weitere Standorte in der Nähe</h2>
            <div class="flex flex-wrap gap-2">
                <NuxtLink v-for="slug in post.nearby.slugs" :key="slug" :to="`/standorte/${slug}`" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white
                         hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)] transition">
                    <span class="inline-flex w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]"></span>
                    {{ humanize(slug) }}
                </NuxtLink>
            </div>
        </section>


        <!-- FAQ (deine bestehende Komponente) -->
        <HomeFaqSection />
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'

const route = useRoute()
const { data: post } = await useAsyncData(route.path, () =>
    queryCollection('standorte').path(route.path).first()
)

/** Bildstrategie */
const imgErrored = ref(false)
const defaultHero = '/images/standorte/default.jpg'

const slugifyCity = (name) => (name || '').toString().trim().toLowerCase().replace(/\s+/g, '-')
const localCityImage = (city, ext = 'jpg') => {
    const s = slugifyCity(city)
    return s ? `/images/standorte/${s}.${ext}` : defaultHero
}

const imageUrl = computed(() => {
    const fmImg = post.value?.hero?.image || post.value?.heroImage
    const cleaned = typeof fmImg === 'string' ? fmImg.trim() : ''
    if (cleaned) return cleaned
    if (post.value?.city) return localCityImage(post.value.city)
    return defaultHero
})

/** Text-Absätze als Array */
const chunksIntro = computed(() => splitParas(post.value?.longIntro))
const chunksDeepDive = computed(() => splitParas(post.value?.longDeepDive))
function splitParas(text) {
    if (!text || typeof text !== 'string') return []
    return text
        .split(/\n{2,}/g)
        .map(p => p.trim())
        .filter(Boolean)
}

function renderMarkdown(text) {
    if (!text) return ''

    // Kompakte Bullet-Listen
    if (/^\s*-\s+/m.test(text)) {
        const items = text
            .split(/\n/)
            .filter(l => l.trim().startsWith('- '))
            .map(l =>
                l.replace(/^\s*-\s+/, '')
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.+?)\*/g, '<em>$1</em>')
            )
        return `<ul class="space-y-2">
      ${items.map(i =>
            `<li class="flex items-start gap-3">
           <span class="mt-1 w-5 h-5 flex-none rounded-full bg-[var(--color-secondary)] text-white text-xs flex items-center justify-center">✓</span>
           <span class="text-gray-800 leading-relaxed">${i}</span>
         </li>`).join('')}
    </ul>`
    }

    // Inline Markdown
    let html = text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\[(.+?)\]\((.+?)\)/g,
            '<a href="$2" target="_blank" rel="noopener" class="text-[var(--color-primary)] hover:underline">$1</a>')
        .replace(/\n/g, '<br>')

    return `<p class="leading-relaxed">${html}</p>`
}
c




/** SEO */
useSeoMeta({
    title: post.value?.metaTitle || post.value?.title || post.value?.hero?.title || 'IT-Unternehmen',
    description: post.value?.metaDescription || post.value?.meta?.description || '',
    ogTitle: post.value?.metaTitle || post.value?.title || post.value?.hero?.title || 'IT-Unternehmen',
    ogDescription: post.value?.metaDescription || post.value?.meta?.description || '',
    ogImage: imageUrl.value
})

/** Helfer */
function humanize(slug) {
    if (!slug) return ''
    return slug
        .toString()
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
}
</script>
