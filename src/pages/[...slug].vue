
<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div class="text-center p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg max-w-md">
            <h1 class="text-6xl font-bold text-red-500">404</h1>
            <p class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-2">Seite nicht gefunden</p>
            <p class="text-gray-500 dark:text-gray-400 mt-2">
                Die Seite, die du suchst, existiert nicht oder wurde verschoben.
            </p>
            <Button @click="$router.push('/')" label="Zurück zur Startseite" raised severity="help">
            </Button>
        </div>
    </div>
</template>


<script setup lang="ts">
import Button from 'primevue/button';

useHead({
    title: '404',
    meta: [
        {
            name: 'description',
            content: 'Page not found',
        },
    ],
})

</script>
