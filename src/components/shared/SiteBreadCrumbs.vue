<template>
    <UBreadcrumb :items="items" />
</template>

<script setup lang="ts">

const items = useBreadcrumbItems({
    schemaOrg: true,     // erzeugt BreadcrumbList JSON-LD pro aktueller Seite
    hideRoot: false,
    hideCurrent: false,
})
</script>
