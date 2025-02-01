<template>
    <section class="bg-black text-white min-h-screen py-16">
        <div class="container mx-auto px-6 space-y-16">
            <!-- Projekt-Titel -->
            <header class="text-center">
                <h1 class="text-5xl font-extrabold mb-6">{{ project.title }}</h1>
                <p class="text-gray-400 text-xl italic">{{ project.description }}</p>
            </header>

            <!-- Video (groß und kinoreif) -->
            <div v-if="project.video" class="w-full flex justify-center">
                <div class="relative w-3/4 max-w-screen-lg">
                    <video ref="videoPlayer" autoplay muted loop class="rounded-xl shadow-xl w-full outline-none"
                        @click="togglePlay">
                        <source :src="project.video" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div class="absolute bottom-4 left-4 flex items-center space-x-4">
                        <button class="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                            @click="toggleMute">
                            {{ isMuted ? '🔇' : '🔊' }}
                        </button>
                        <input type="range" min="0" max="1" step="0.1" v-model="volume" @input="adjustVolume"
                            class="w-24 appearance-none h-4 bg-gray-600 rounded-lg overflow-hidden" />
                    </div>
                </div>
            </div>

            <!-- Die Geschichte -->
            <section class="text-center max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold mb-6">The Story</h2>
                <p class="text-gray-300 text-lg leading-relaxed">{{ project.story }}</p>
            </section>

            <!-- Zahlen -->
            <section class="text-center max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold mb-6">Key Insights</h2>
                <ul class="space-y-4 text-gray-300 text-lg">
                    <li v-for="(fact, index) in project.numbers" :key="index">{{ fact }}</li>
                </ul>
            </section>
        </div>
    </section>
</template>

<script setup>


import videoSolar from "@/assets/videos/solar.mp4";

const projects = [
    {
        slug: "solarrex",
        title: "Solarrex GmbH",
        description: "Eine innovative Plattform, die die Benutzererfahrung revolutioniert.",
        story: "Solarrex hat Solarenergie revolutioniert und ermöglicht den Nutzern einen einzigartigen Zugang zu erneuerbaren Energien. Unsere Plattform bringt Innovation, Effizienz und Nachhaltigkeit zusammen und hat bereits viele Meilensteine erreicht.",
        video: videoSolar,
        numbers: ["Revenue: €100,000", "Growth: 20%"],
    },
    // Weitere Projekte können hier hinzugefügt werden
];

const route = useRoute();
const project = ref(projects.find((p) => p.slug === route.params.slug));

if (!project.value) {
    throw createError({
        statusCode: 404,
        message: 'Project not found',
    });
}

const videoPlayer = ref(null);
const isMuted = ref(true);
const volume = ref(0.5);

function toggleMute() {
    if (videoPlayer.value) {
        isMuted.value = !isMuted.value;
        videoPlayer.value.muted = isMuted.value;
    }
}

function adjustVolume() {
    if (videoPlayer.value) {
        videoPlayer.value.volume = volume.value;
        if (volume.value > 0) {
            isMuted.value = false;
            videoPlayer.value.muted = false;
        }
    }
}

function togglePlay() {
    if (videoPlayer.value) {
        if (videoPlayer.value.paused) {
            videoPlayer.value.play();
        } else {
            videoPlayer.value.pause();
        }
    }
}
</script>

<style scoped>
h1 {
    text-transform: uppercase;
    letter-spacing: 3px;
}

h2 {
    border-bottom: 3px solid #38bdf8;
    padding-bottom: 10px;
    display: inline-block;
    margin: 0 auto;
}

video {
    outline: none;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.7);
    border-radius: 1rem;
    cursor: pointer;
}

video::-webkit-media-controls {
    display: none;
}

video::-webkit-media-controls-timeline,
video::-webkit-media-controls-current-time,
video::-webkit-media-controls-time-remaining,
video::-webkit-media-controls-enclosure,
video::-webkit-media-controls-fullscreen-button,
video::-webkit-media-controls-overflow-button {
    display: none !important;
}

button {
    background-color: #374151;
    color: white;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #4b5563;
}

input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background: #38bdf8;
    border-radius: 50%;
    cursor: pointer;
}

input[type="range"] {
    appearance: none;
    height: 8px;
    background: #6b7280;
    outline: none;
    border-radius: 4px;
}
</style>
