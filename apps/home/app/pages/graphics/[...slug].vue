<script setup lang="ts">
const route = useRoute()
const path = Array.isArray(route.params.slug)
    ? route.params.slug.join('/')
    : route.params.slug || ''

const { data } = await useAsyncData(() =>
    queryCollection('graphics').path(`/graphics/${path}`).first()
)

if (!data.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
    })
}

useSeoMeta({
    title: data.value?.title,
    description: data.value?.description,
})
</script>

<template>
    <ContentRenderer
        v-if="data"
        :value="data"
        class="prose prose-zinc prose-invert"
    />
</template>
