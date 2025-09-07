<template>
    <div class="bg-background rounded-3xl shadow-2xl border border-surface overflow-hidden">
        <!-- Header -->
        <div :class="`bg-gradient-to-r ${service.gradient} p-8 text-white relative overflow-hidden`">
            <div class="relative z-10">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                        <div
                            class="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mr-6">
                            <i :class="service.icon" class="text-3xl text-white" aria-hidden="true"></i>
                        </div>
                        <div>
                            <h3 class="text-3xl font-bold mb-2">{{ service.title }}</h3>
                            <p class="text-lg opacity-90">{{ service.shortDesc }}</p>
                        </div>
                    </div>
                    <button @click="$emit('close')"
                        class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors duration-300 flex items-center justify-center">
                        <i class="fas fa-times text-white"></i>
                    </button>
                </div>
            </div>

            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-10">
                <div
                    class="absolute top-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-32 -translate-y-32">
                </div>
                <div
                    class="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white transform -translate-x-24 translate-y-24">
                </div>
            </div>
        </div>

        <!-- Content -->
        <div class="p-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Features -->
                <div>
                    <h4 class="text-xl font-bold text-primary mb-6 flex items-center">
                        <div :class="`w-6 h-6 rounded-lg bg-gradient-to-br ${service.gradient} mr-3`"></div>
                        Unsere Leistungen
                    </h4>
                    <div class="space-y-4">
                        <div v-for="(feature, index) in service.features" :key="index"
                            class="flex items-start bg-surface/50 rounded-xl p-4 hover:bg-surface transition-colors duration-300">
                            <div
                                :class="`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mt-2 mr-4 flex-shrink-0`">
                            </div>
                            <span class="text-dark leading-relaxed">{{ feature }}</span>
                        </div>
                    </div>
                </div>

                <!-- Benefits -->
                <div>
                    <h4 class="text-xl font-bold text-primary mb-6 flex items-center">
                        <div class="w-6 h-6 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 mr-3"></div>
                        Ihre Vorteile
                    </h4>
                    <div class="space-y-4">
                        <div v-for="(benefit, index) in service.benefits" :key="index"
                            class="flex items-start bg-green-50 rounded-xl p-4 border border-green-100">
                            <div
                                class="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                                <i class="fas fa-check text-white text-xs"></i>
                            </div>
                            <span class="text-dark leading-relaxed">{{ benefit }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Technologies -->
            <div class="mt-8 pt-8 border-t border-surface">
                <h4 class="text-xl font-bold text-primary mb-6 flex items-center">
                    <div class="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 mr-3"></div>
                    Verwendete Technologien
                </h4>
                <div class="flex flex-wrap gap-3">
                    <span v-for="tech in service.technologies" :key="tech"
                        :class="`px-4 py-2 bg-gradient-to-r ${service.gradient} text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-shadow duration-300`">
                        {{ tech }}
                    </span>
                </div>
            </div>

            <!-- Call to Actions -->
            <div class="mt-8 pt-8 border-t border-surface">
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        :class="`bg-gradient-to-r ${service.gradient} text-white hover:shadow-lg px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105`">
                        <i class="fas fa-calendar-alt mr-2"></i>
                        Beratungstermin vereinbaren
                    </button>
                    <button
                        class="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
                        <i class="fas fa-envelope mr-2"></i>
                        Kostenlose Anfrage
                    </button>
                    <button
                        class="text-secondary hover:text-primary px-8 py-3 rounded-full font-semibold transition-colors duration-300">
                        <i class="fas fa-eye mr-2"></i>
                        Referenzen ansehen
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    service: {
        type: Object,
        required: true
    }
})

defineEmits(['close'])
</script>

<style scoped></style>