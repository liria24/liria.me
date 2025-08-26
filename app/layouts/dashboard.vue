<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const { $session } = useNuxtApp()
const session = await $session()

const title = 'Liria'

const { data: users } = await useFetch('/api/users', {
    key: 'users',
    dedupe: 'defer',
    default: () => [],
})

const open = ref(false)

const links = [
    [
        {
            label: 'Storage',
            icon: 'lucide:database',
            to: '/admin/storage',
        },
        {
            label: 'Icons',
            icon: 'lucide:image',
            to: '/admin/icons',
        },
        {
            label: 'Users',
            icon: 'lucide:users-round',
            to: '/admin/users',
            badge: users.value.length,
            onSelect: () => {
                open.value = false
            },
        },
        {
            label: 'Products',
            icon: 'lucide:package',
            defaultOpen: true,
            type: 'trigger',
            children: [
                {
                    icon: 'local:avatio',
                    label: 'Avatio',
                    to: 'https://avatio.me',
                    target: '_blank',
                },
            ],
        },
    ],
    [
        {
            label: 'Email',
            icon: 'lucide:at-sign',
            to: 'mailto:hello@liria.me',
        },
        {
            label: 'X/Twitter',
            icon: 'simple-icons:x',
            to: 'https://x.com/liria_24',
            target: '_blank',
        },
        {
            label: 'GitHub',
            icon: 'simple-icons:github',
            to: 'https://github.com/liria24',
            target: '_blank',
        },
    ],
] satisfies NavigationMenuItem[][]
</script>

<template>
    <Html>
        <Head>
            <Title>{{ title }}</Title>
        </Head>

        <Body>
            <UMain>
                <UDashboardGroup unit="rem">
                    <UDashboardSidebar
                        id="default"
                        v-model:open="open"
                        collapsible
                        resizable
                        class="bg-elevated/25"
                        :ui="{ footer: 'lg:border-t lg:border-default' }"
                    >
                        <template #header="{ collapsed }">
                            <div
                                :data-collapsed="collapsed"
                                class="flex w-full items-center justify-between gap-2 pl-2 data-[collapsed=true]:flex-col data-[collapsed=true]:pt-5 data-[collapsed=true]:pl-0"
                            >
                                <NuxtLink to="/">
                                    <Icon name="local:liria" size="24" />
                                </NuxtLink>

                                <UDashboardSidebarCollapse />
                            </div>
                        </template>

                        <template #default="{ collapsed }">
                            <UNavigationMenu
                                :collapsed="collapsed"
                                :items="links[0]"
                                orientation="vertical"
                                tooltip
                                popover
                            />

                            <UNavigationMenu
                                :collapsed="collapsed"
                                :items="links[1]"
                                orientation="vertical"
                                tooltip
                                class="mt-auto"
                            />
                        </template>

                        <template #footer>
                            <UUser
                                :name="session?.user.name"
                                :description="`@${session?.user.id}`"
                                :avatar="{
                                    src: session?.user.image || undefined,
                                    icon: 'lucide:user-round',
                                }"
                            />
                        </template>
                    </UDashboardSidebar>

                    <slot />
                </UDashboardGroup>
            </UMain>
        </Body>
    </Html>
</template>
