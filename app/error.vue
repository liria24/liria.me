<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: {
        type: Object as PropType<NuxtError>,
        default: () => ({
            status: 500,
            statusText: 'Unknown Error',
        }),
    },
})
</script>

<template>
    <UApp>
        <NuxtRouteAnnouncer />
        <NuxtLoadingIndicator />
        <NuxtLayout>
            <div class="mt-24 flex w-full flex-col items-center justify-center gap-4">
                <h1 class="text-7xl font-extralight">
                    {{ props.error.status }}
                </h1>
                <h2 class="text-muted text-lg">
                    {{ props.error.statusText }}
                </h2>
                <UButton to="/" label="Home" variant="soft" size="lg" />
            </div>
        </NuxtLayout>
    </UApp>
</template>
