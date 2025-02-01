<template>
    <NuxtParticles id="tsparticles" url="/particles.json" @load="onLoad"></NuxtParticles>
</template>


<script setup lang="ts">
import type { Container } from "@tsparticles/engine";

const onLoad = (container: Container) => {
    console.log("Particles loaded:", container);
    container.pause(); // Optional: Animation pausieren
    setTimeout(() => container.play(), 2000); // Optional: Animation fortsetzen
};
</script>


<style scoped>

</style>