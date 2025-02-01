<template>
    {{post}}
</template>

<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
    return queryCollection('blog').path(slug).first()
})
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
}

.prose {
    max-width: 100%;
}
</style>
