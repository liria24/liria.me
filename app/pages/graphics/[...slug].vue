<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

defineRouteRules({
    prerender: true,
    headers: {
        'Cache-Control': `max-age=${60 * 60 * 24}`,
        'CDN-Cache-Control': `max-age=${60 * 60 * 24 * 31}`,
    },
})

const route = useRoute()

const { data: navigation } = await useAsyncData('navigation', async () => {
    const nav: ContentNavigationItem[] = [
        {
            title: 'Liria Graphics',
            icon: 'local:liria',
            path: '/graphics',
            children: (await queryCollectionNavigation('graphics'))[0]
                ?.children,
        },
    ]

    return nav
})

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
                <UContentNavigation
                    :navigation="navigation"
                    :ui="{
                        linkLeadingIcon: 'size-4',
                        linkTrailingIcon: 'size-4',
                    }"
                />
            </UPageAside>
        </template>

        <ContentRenderer v-if="page" :value="page" />

        <template #right>
            <UContentToc :links="page?.body?.toc?.links">
                <template #bottom>
                    <UPageLinks
                        :links="[
                            {
                                label: 'BOOTH',
                                icon: 'local:booth',
                                to: 'https://eicosapenta.booth.pm',
                                target: '_blank',
                            },
                            {
                                label: 'GitHub',
                                icon: 'simple-icons:github',
                                to: 'https://github.com/liria24',
                                target: '_blank',
                            },
                        ]"
                        :ui="{ linkLeadingIcon: 'size-4' }"
                    />
                </template>
            </UContentToc>
        </template>
    </UPage>
</template>
