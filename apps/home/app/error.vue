<script setup lang="ts">
import type { NuxtError } from '#app'
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()

const props = defineProps({
    error: {
        type: Object as PropType<NuxtError>,
        default: () => ({
            statusCode: 500,
            statusMessage: 'Unknown Error',
        }),
    },
})
</script>

<template>
    <UApp :locale="locales[locale]">
        <NuxtRouteAnnouncer />
        <NuxtLoadingIndicator />
        <NuxtLayout>
            <div
                class="mt-24 flex w-full flex-col items-center justify-center gap-4"
            >
                <h1 class="text-7xl font-extralight">
                    {{ props.error.statusCode }}
                </h1>
                <h2 class="text-muted text-lg">
                    {{ props.error.message }}
                </h2>
                <UButton
                    :to="$localePath('/')"
                    label="Home"
                    variant="soft"
                    size="lg"
                />
            </div>
        </NuxtLayout>
    </UApp>
</template>
