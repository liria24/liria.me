<script setup lang="ts">
const graphicsItems = [
    {
        slug: 'crystal-horn',
        name: 'Crystal Horn',
        price: '1000 JPY',
        image: 'item_crystal_horn.png',
    },
    {
        slug: 'charm-choker',
        name: 'Charm Choker',
        price: '500 JPY',
        image: 'item_charm_choker.png',
    },
    {
        slug: 'logo-pack',
        name: 'Logo Pack',
        price: '200 JPY',
        image: 'item_logo_pack.png',
    },
    {
        slug: 'keyholder',
        name: 'Keyholder',
        price: 'FREE',
        image: 'item_keyholder.png',
    },
    {
        slug: 'reward-nyaacup6',
        name: 'Reward Nyaacup6',
        price: 'N/A',
        image: 'item_reward_nyaacup6.png',
    },
]

defineSeo({
    title: 'Liria',
    titleTemplate: '%s',
    description: 'Small Circle by Liry24',
    type: 'website',
})
</script>

<template>
    <div class="flex flex-col gap-8">
        <div class="grid min-h-[92dvh]">
            <div
                class="flex w-full items-end justify-between gap-4 self-end pb-12"
            >
                <span
                    class="text-toned text-9xl leading-none font-black text-nowrap sm:text-[172px] lg:text-[220px]"
                >
                    Liria<span class="animate-blink">.</span>
                </span>

                <Icon
                    name="lucide:arrow-down"
                    size="48"
                    class="text-dimmed mb-6 animate-pulse"
                />
            </div>
        </div>

        <section id="graphics" class="flex flex-col items-start gap-4 pt-24">
            <div
                class="flex w-full flex-col items-start justify-between gap-x-1 gap-y-3 lg:flex-row lg:items-baseline"
            >
                <div class="flex items-baseline gap-8">
                    <NuxtLink
                        to="https://eicosapenta.booth.pm"
                        target="_blank"
                        class="group flex items-baseline gap-1"
                    >
                        <div class="flex items-baseline">
                            <span class="text-5xl font-bold tracking-tight">
                                Liria
                            </span>
                            <span class="text-5xl font-thin tracking-tighter">
                                Graphics
                            </span>
                        </div>

                        <span
                            class="text-muted ml-3 font-light transition-colors group-hover:text-[#fc4d50]"
                        >
                            booth.pm
                        </span>
                        <Icon
                            name="lucide:arrow-up-right"
                            size="18"
                            class="text-muted mb-1 self-end transition-colors group-hover:text-[#fc4d50]"
                        />
                    </NuxtLink>

                    <UButton
                        to="/graphics"
                        trailing-icon="lucide:arrow-right"
                        variant="link"
                        :ui="{ trailingIcon: 'size-[18px]' }"
                        class="p-0 text-base font-medium"
                    >
                        Documents
                    </UButton>
                </div>

                <p class="text-muted font-light">
                    Accessories and Assets Shop for VRChat Avatars
                </p>
            </div>

            <div class="flex flex-wrap gap-4">
                <NuxtLink
                    v-for="(item, index) in graphicsItems"
                    :key="'graphics-item-' + index"
                    :to="`/graphics/${item.slug}`"
                    class="group relative flex flex-col items-center"
                >
                    <NuxtImg
                        v-slot="{ src, imgAttrs, isLoaded }"
                        :src="`/graphics/${item.image}`"
                        alt="Graphics Item"
                        :width="176"
                        :height="176"
                        custom
                        class="aspect-square shrink-0 object-cover opacity-100 transition-opacity group-hover:opacity-25"
                    >
                        <img v-if="isLoaded" :src="src" v-bind="imgAttrs" />
                        <USkeleton
                            v-else
                            class="m-2 aspect-square size-40 shrink-0"
                        />
                    </NuxtImg>
                    <p class="text-muted text-sm font-light">
                        {{ item.name }}
                    </p>
                    <p class="text-dimmed mt-1 text-xs font-light">
                        {{ item.price }}
                    </p>

                    <div
                        class="absolute top-20 flex items-center gap-1 opacity-0 drop-shadow-lg drop-shadow-black transition-opacity group-hover:opacity-100"
                    >
                        <p class="text-sm leading-none font-light">Open Docs</p>
                        <Icon
                            name="lucide:arrow-right"
                            size="20"
                            class="text-toned"
                        />
                    </div>
                </NuxtLink>
            </div>
        </section>

        <section id="avatio" class="flex flex-col gap-8 pt-24">
            <div
                class="flex w-full flex-col items-start justify-between gap-x-1 gap-y-3 lg:flex-row lg:items-baseline"
            >
                <div class="flex items-end gap-8">
                    <NuxtLink
                        to="https://avatio.me"
                        target="_blank"
                        class="group flex items-end gap-1"
                    >
                        <NuxtImg
                            src="/avatio/logo.svg"
                            alt="Avatio"
                            class="mb-1 h-12"
                        />

                        <span
                            class="text-muted ml-3 font-light transition-colors group-hover:text-emerald-400"
                        >
                            avatio.me
                        </span>
                        <Icon
                            name="lucide:arrow-up-right"
                            size="18"
                            class="text-muted mb-1 self-end transition-colors group-hover:text-emerald-400"
                        />
                    </NuxtLink>
                </div>

                <p class="text-muted font-light">
                    Sharing Platform for VRSNS Avatar Setups
                </p>
            </div>

            <NuxtImg
                src="/avatio/screenshot.png"
                alt="Avatio"
                class="h-96 w-full object-contain opacity-15"
            />
        </section>

        <section id="presocial" class="flex flex-col gap-8 pt-24">
            <div
                class="flex w-full flex-col items-start justify-between gap-x-1 gap-y-3 lg:flex-row lg:items-baseline"
            >
                <div class="flex items-baseline gap-8">
                    <NuxtLink
                        to="https://presocial.vercel.app"
                        target="_blank"
                        class="group flex items-baseline gap-1"
                    >
                        <span
                            class="text-center text-5xl font-thin tracking-tighter"
                        >
                            Presocial
                        </span>

                        <span
                            class="text-muted ml-3 font-light transition-colors group-hover:text-blue-500"
                        >
                            presocial.vercel.app
                        </span>
                        <Icon
                            name="lucide:arrow-up-right"
                            size="18"
                            class="text-muted mb-1 self-end transition-colors group-hover:text-blue-500"
                        />
                    </NuxtLink>
                </div>

                <p class="text-muted font-light">
                    Simple tool to preview X/Twitter posts
                </p>
            </div>

            <NuxtImg
                src="/presocial/screenshot.png"
                alt="Presocial"
                class="h-96 w-full object-contain opacity-15"
            />
        </section>
    </div>
</template>
