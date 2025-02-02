<template>
    <div>
        <ContentRenderer v-if="allPosts" :value="allPosts" />
        <div v-else>Posts not found</div>
    </div>
    {{ allPosts }}
</template>

<script setup>
definePageMeta({
    middleware: 'redirect',
});

const allPosts = await queryCollection('blog').all()


</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
