<script setup lang="ts">
defineRouteRules({
    prerender: true,
})
defineSeo({
    title: 'Liria',
    titleTemplate: '%s',
    description: '',
    type: 'website',
})
</script>

<template>
    <div class="grid h-full grid-cols-1 gap-8 lg:grid-cols-2">
        <NuxtLink
            to="https://eicosapenta.booth.pm"
            target="_blank"
            :class="
                cn(
                    'flex flex-col items-center justify-center gap-4 rounded-2xl p-8',
                    'ring-2 ring-neutral-200 dark:ring-neutral-800',
                    'hover:ring-neutral-300 dark:hover:ring-neutral-600',
                    'focus-visible:ring-4 focus-visible:ring-neutral-300 focus-visible:outline-none dark:focus-visible:ring-neutral-600',
                    'transition duration-200 ease-in-out'
                )
            "
        >
            <div class="flex items-baseline">
                <span class="text-4xl font-bold tracking-tight"> Liria </span>
                <span class="text-4xl font-thin tracking-tight">
                    Graphics
                </span>
            </div>
        </NuxtLink>
        <NuxtLink
            to="https://avatio.me"
            target="_blank"
            :class="
                cn(
                    'flex flex-col items-center justify-center gap-5 rounded-2xl p-8',
                    'ring-2 ring-neutral-200 dark:ring-neutral-800',
                    'hover:ring-neutral-300 dark:hover:ring-neutral-600',
                    'focus-visible:ring-4 focus-visible:ring-neutral-300 focus-visible:outline-none dark:focus-visible:ring-neutral-600',
                    'transition duration-200 ease-in-out'
                )
            "
        >
            <NuxtImg src="/logo_avatio.svg" alt="Avatio" class="h-9" />
            <p class="text-muted text-sm">Share Your VRSNS Avatars.</p>
        </NuxtLink>
    </div>
</template>
