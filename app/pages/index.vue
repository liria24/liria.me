<script setup lang="ts">
const { app } = useAppConfig()

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
        slug: 'fictitious-logo-pack',
        name: 'Fictitious Logo Pack',
        price: '200 JPY',
        image: 'item_fictitious_logo_pack.png',
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

const users = [
    {
        name: 'Liry24',
        description: 'Designer / Developer',
        avatar: {
            src: 'https://github.com/Liry24.png',
            alt: 'Liry24 Avatar',
        },
        website: 'https://liry24.com',
        images: [
            {
                src: 'https://liry24.com/arts/telephones.jpg',
                alt: 'Telephones',
            },
            {
                src: 'https://liry24.com/arts/coleman.jpg',
                alt: 'Coleman',
            },
            {
                src: 'https://liry24.com/arts/danboard.jpg',
                alt: 'Danboard',
            },
            {
                src: 'https://liry24.com/arts/gate.jpg',
                alt: 'Gate',
            },
        ],
        skills: [
            {
                label: 'Blender',
                icon: 'simple-icons:blender',
                iconSize: 20,
            },
            {
                label: 'Maya',
                icon: 'simple-icons:autodeskmaya',
            },
            {
                label: 'Houdini',
                icon: 'simple-icons:houdini',
            },
            {
                label: 'Unity',
                icon: 'simple-icons:unity',
            },
            {
                label: 'Photoshop',
                icon: 'simple-icons:adobephotoshop',
                iconSize: 19,
            },
            {
                label: 'Illustrator',
                icon: 'simple-icons:adobeillustrator',
                iconSize: 19,
            },
            {
                label: 'Affinity',
                icon: 'simple-icons:affinity',
            },
            {
                label: 'DaVinci Resolve',
                icon: 'simple-icons:davinciresolve',
                iconSize: 19,
            },
            {
                label: 'Visual Studio Code',
                icon: 'simple-icons:visualstudiocode',
            },
            {
                label: 'Git',
                icon: 'simple-icons:git',
                iconSize: 19,
            },
            {
                label: 'TypeScript',
                icon: 'simple-icons:typescript',
            },
            {
                label: 'Python',
                icon: 'simple-icons:python',
            },
            {
                label: 'Nuxt',
                icon: 'simple-icons:nuxt',
                iconSize: 20,
            },
            {
                label: 'Astro',
                icon: 'simple-icons:astro',
            },
            {
                label: 'Tauri',
                icon: 'simple-icons:tauri',
            },
            {
                label: 'Tailwind CSS',
                icon: 'simple-icons:tailwindcss',
            },
            {
                label: 'PostgreSQL',
                icon: 'simple-icons:postgresql',
            },
        ],
    },
]

defineSeo({
    title: 'Liria',
    titleTemplate: '%s',
    description: 'Small Circle by Liry24',
    type: 'website',
})

defineOgImageComponent('home')
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

        <UPageSection
            id="graphics"
            headline="Store"
            description="Accessories and Assets Shop for VRChat Avatars."
            :links="[
                {
                    label: 'Visit booth.pm',
                    to: app.links.booth,
                    target: '_blank',
                    color: 'neutral',
                    trailingIcon: 'lucide:arrow-up-right',
                },
                {
                    label: 'Documents',
                    to: '/graphics',
                    icon: 'lucide:book-text',
                    variant: 'subtle',
                },
            ]"
            orientation="horizontal"
        >
            <template #title>
                <div class="flex items-baseline">
                    <span class="text-5xl font-bold tracking-tight">
                        Liria
                    </span>
                    <span class="text-5xl font-thin tracking-tighter">
                        Graphics
                    </span>
                </div>
            </template>

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
                        :alt="item.name"
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
        </UPageSection>

        <UPageSection
            id="avatio"
            headline="Website"
            description="Sharing Platform for VRSNS Avatar Setups."
            :links="[
                {
                    label: 'Visit avatio.me',
                    to: app.links.avatio,
                    target: '_blank',
                    color: 'neutral',
                    trailingIcon: 'lucide:arrow-up-right',
                },
            ]"
            orientation="horizontal"
        >
            <template #title>
                <NuxtImg
                    src="/avatio/logo.svg"
                    alt="Avatio"
                    class="mb-1 h-12"
                />
            </template>

            <NuxtImg
                src="/avatio/screenshot.png"
                alt="Avatio"
                class="w-full rounded-2xl"
            />
        </UPageSection>

        <UPageSection
            id="presocial"
            headline="Website"
            description="Simple tool to preview X/Twitter posts."
            :links="[
                {
                    label: 'Visit presocial.vercel.app',
                    to: app.links.presocial,
                    target: '_blank',
                    color: 'neutral',
                    trailingIcon: 'lucide:arrow-up-right',
                },
            ]"
            orientation="horizontal"
        >
            <template #title>
                <span class="text-center text-5xl font-thin tracking-tighter">
                    Presocial
                </span>
            </template>

            <NuxtImg
                src="/presocial/screenshot.png"
                alt="Presocial"
                class="w-full rounded-2xl"
            />
        </UPageSection>

        <UPageCTA
            title="Members"
            variant="soft"
            orientation="horizontal"
            :links="[
                {
                    label: 'Contact us',
                    to: app.links.email,
                    variant: 'subtle',
                    icon: 'lucide:at-sign',
                    ui: { leadingIcon: 'size-4.5' },
                },
                {
                    label: 'Follow me',
                    to: app.links.twitter,
                    target: '_blank',
                    variant: 'outline',
                    icon: 'simple-icons:x',
                    ui: { leadingIcon: 'size-4' },
                },
            ]"
        >
            <UPageList>
                <UPageCard
                    v-for="(user, index) in users"
                    :key="index"
                    variant="subtle"
                    :to="user.website"
                    target="_blank"
                    spotlight
                    :ui="{ body: 'w-full' }"
                    class="w-full max-w-xl self-center"
                >
                    <template #header>
                        <UUser
                            :name="user.name"
                            :description="user.description"
                            :avatar="user.avatar"
                            size="xl"
                        />
                    </template>

                    <template #body>
                        <div
                            class="grid w-full gap-2 empty:hidden"
                            style="
                                grid-template-columns: repeat(
                                    2,
                                    minmax(0, 1fr)
                                );
                            "
                        >
                            <NuxtImg
                                v-for="(image, imageIndex) in user.images"
                                :key="imageIndex"
                                :src="image.src"
                                :alt="image.alt"
                                :height="128"
                                class="h-20 w-full rounded-lg object-cover"
                            />
                        </div>
                    </template>

                    <template #footer>
                        <div class="flex flex-wrap items-center gap-2">
                            <UTooltip
                                v-for="(skill, skillIndex) in user.skills"
                                :key="skillIndex"
                                :text="skill.label"
                                :delay-duration="100"
                            >
                                <Icon
                                    :name="skill.icon"
                                    :size="16"
                                    class="text-dimmed z-10"
                                />
                            </UTooltip>
                        </div>
                    </template>
                </UPageCard>
            </UPageList>
        </UPageCTA>
    </div>
</template>
