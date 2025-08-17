<script setup lang="ts">
defineRouteRules({
    prerender: true,
})

const route = useRoute()

const { data: navigation } = await useAsyncData('navigation', () =>
    queryCollectionNavigation('graphics')
)

const path = Array.isArray(route.params.slug)
    ? route.params.slug.join('/')
    : route.params.slug || ''

const { data: page } = await useAsyncData(() =>
    queryCollection('graphics').path(`/graphics/${path}`).first()
)

if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
    })
}

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
