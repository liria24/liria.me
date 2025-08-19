<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
</script>

<template>
    <UApp>
        <NuxtRouteAnnouncer />
        <NuxtLoadingIndicator />
        <NuxtLayout>
            <Analytics />
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>
