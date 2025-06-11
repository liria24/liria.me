<script setup lang="ts">
const graphicsItems = [
    { name: 'Crystal Horn', price: '1000 JPY', image: 'item_crystal_horn.png' },
    { name: 'Charm Choker', price: '500 JPY', image: 'item_charm_choker.png' },
    { name: 'Logo Pack', price: '200 JPY', image: 'item_logo_pack.png' },
    { name: 'Keyholder', price: 'FREE', image: 'item_keyholder.png' },
    {
        name: 'Reward Nyaacup6',
        price: 'N/A',
        image: 'item_reward_nyaacup6.png',
    },
]
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
                    'group relative flex flex-col items-center justify-center gap-4 rounded-2xl p-8 shadow-none shadow-white/20',
                    'ring-2 ring-neutral-200 dark:ring-neutral-800',
                    'hover:ring-neutral-300 dark:hover:ring-neutral-600',
                    'focus-visible:ring-4 focus-visible:ring-neutral-300 focus-visible:outline-none dark:focus-visible:ring-neutral-600',
                    'hover:shadow-lg focus-visible:shadow-lg',
                    'transition duration-200 ease-in-out'
                )
            "
        >
            <div
                class="flex grow flex-col items-center justify-center gap-2 pt-8 pb-6"
            >
                <div class="flex items-baseline">
                    <span class="text-4xl font-bold tracking-tight">
                        Liria
                    </span>
                    <span class="text-4xl font-thin tracking-tighter">
                        Graphics
                    </span>
                </div>

                <div class="flex items-center gap-2">
                    <Icon name="local:booth" size="14" class="text-muted" />
                    <p class="text-muted text-xs font-light tracking-wider">
                        Available on BOOTH
                    </p>
                </div>
            </div>

            <div class="flex flex-wrap justify-center gap-4">
                <div
                    v-for="(item, index) in graphicsItems"
                    :key="'graphics-item-' + index"
                    class="flex flex-col items-center"
                >
                    <NuxtImg
                        :src="`/graphics/${item.image}`"
                        alt="Graphics Item"
                        class="w-32 object-cover"
                    />
                    <p class="text-muted text-sm font-light">
                        {{ item.name }}
                    </p>
                    <p class="text-dimmed mt-1 text-xs font-light">
                        {{ item.price }}
                    </p>
                </div>
            </div>

            <div
                class="absolute top-0 right-0 m-3 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100"
            >
                <Icon
                    name="lucide:arrow-up-right"
                    size="24"
                    class="text-muted"
                />
            </div>
        </NuxtLink>
        <NuxtLink
            to="https://avatio.me"
            target="_blank"
            :class="
                cn(
                    'group relative flex flex-col items-center justify-center gap-4 rounded-2xl p-8 shadow-none shadow-white/20',
                    'ring-2 ring-neutral-200 dark:ring-neutral-800',
                    'hover:ring-neutral-300 dark:hover:ring-neutral-600',
                    'focus-visible:ring-4 focus-visible:ring-neutral-300 focus-visible:outline-none dark:focus-visible:ring-neutral-600',
                    'hover:shadow-lg focus-visible:shadow-lg',
                    'transition duration-200 ease-in-out',
                    'overflow-hidden'
                )
            "
        >
            <NuxtImg
                src="/avatio/screenshot.png"
                alt="Avatio"
                class="absolute inset-0 size-full object-cover opacity-15 transition-opacity group-hover:opacity-30"
            />

            <div
                class="flex grow flex-col items-center justify-center gap-2 pt-8 pb-6 drop-shadow-xl drop-shadow-black"
            >
                <NuxtImg src="/logo/avatio.svg" alt="Avatio" class="h-9" />
                <p class="text-muted text-sm">Share Your VRSNS Avatars.</p>
            </div>

            <div
                class="absolute top-0 right-0 m-3 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100"
            >
                <Icon
                    name="lucide:arrow-up-right"
                    size="24"
                    class="text-muted"
                />
            </div>
        </NuxtLink>
    </div>
</template>
