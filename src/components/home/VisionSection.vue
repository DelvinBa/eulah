<template>
    <div class="min-h-screen w-full flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
        <div class="relative w-full max-w-xl md:max-w-3xl">
            <!-- Main card -->
            <div class="relative bg-[#121212] rounded-2xl p-6 md:p-10 overflow-hidden border border-[#A3A3A3]/30 
                shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all duration-500 ease-in-out 
                group hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] hover:border-[#FFD700] hover:scale-105">

                <!-- Goldene Glanzeffekte -->
                <div class="absolute inset-0 bg-gradient-to-br from-transparent via-[#FFD700]/20 to-transparent opacity-0 
                    transition-opacity duration-500 ease-in-out group-hover:opacity-100">
                </div>

                <!-- Content -->
                <div class="relative z-10 text-center">
                    <!-- Title -->
                    <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide mb-4 md:mb-6 text-[#FFFFFF] drop-shadow-lg 
                        transition-all duration-500 ease-in-out ">
                        Unsere Vision
                    </h2>

                    <p class="text-lg sm:text-xl md:text-2xl leading-relaxed text-[#E0E0E0] font-light drop-shadow-md 
                        transition-all duration-500 ease-in-out ">
                        „Wir glauben an die Kraft von Partnerschaften und daran, dass
                        <u>großartige Ideen nur durch Zusammenarbeit</u>
                        Realität werden. Unser Ziel ist es, Unternehmen mit innovativen digitalen
                        Lösungen zu unterstützen, Projekte mitzugestalten und gemeinsam etwas
                        <b>Bleibendes</b> zu schaffen."
                    </p>

                    <!-- Goldene Trennlinie -->
                    <div class="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent my-4 md:my-6 mx-auto 
                        transition-all duration-500 ease-in-out">
                    </div>

                    <!-- Tech stack icons mit goldenem Hover -->
                    <div class="flex flex-wrap justify-center gap-4 md:gap-6 opacity-90">
                        <i v-for="icon in techIcons" :key="icon" :class="icon" class="text-2xl sm:text-3xl text-[#E0E0E0] transition-transform duration-300 ease-out 
                           hover:opacity-100 hover:scale-110 group-hover:text-[#FFD700] drop-shadow-md">
                        </i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const techIcons = [
    'fab fa-vuejs',
    'fab fa-node',
    'fab fa-python',
    'fab fa-aws',
    'fab fa-docker',
    'fab fa-github'
];
</script>

<style>

</style>
