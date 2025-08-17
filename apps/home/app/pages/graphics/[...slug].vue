<script setup lang="ts">
defineRouteRules({
    prerender: true,
})

const route = useRoute()

const { data: navigation } = await useAsyncData('navigation', () =>
    queryCollectionNavigation('graphics')
)

const { data: page } = await useAsyncData(route.path, () =>
    queryCollection('graphics').path(route.path).first()
)

if (!page.value)
    throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
    })

useSeoMeta({
    title: page.value?.title,
    titleTemplate: '%s | LiriaGraphics',
    description: page.value?.description,
})
</script>

<template>
    <UPage>
        <template #left>
            <UPageAside>
                <UContentNavigation :navigation="navigation" />
            </UPageAside>
        </template>

        <ContentRenderer v-if="page" :value="page" />

        <template #right>
            <UContentToc :links="page?.body?.toc?.links" />
        </template>
    </UPage>
</template>
