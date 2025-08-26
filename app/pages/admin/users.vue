<script lang="ts" setup>
definePageMeta({
    middleware: 'admin',
    layout: 'dashboard',
})

const { data: users } = await useFetch('/api/users', {
    key: 'users',
    dedupe: 'defer',
    default: () => [],
})
</script>

<template>
    <UDashboardPanel id="users">
        <template #header>
            <UDashboardNavbar icon="lucide:users-round" title="Users" />
        </template>

        <template #body>
            <UPageList>
                <UPageCard
                    v-for="(user, index) in users"
                    :key="index"
                    variant="subtle"
                    target="_blank"
                    :ui="{ header: 'w-full', footer: 'w-full' }"
                    class="w-full"
                >
                    <template #header>
                        <div
                            class="flex w-full items-start justify-between gap-4"
                        >
                            <UUser
                                :name="user.name"
                                :description="user.description || undefined"
                                :avatar="{
                                    src: user.image || undefined,
                                    icon: 'lucide:user-round',
                                }"
                                size="xl"
                            />

                            <UButton icon="lucide:menu" variant="soft" />
                        </div>
                    </template>

                    <template #body>
                        <div class="flex flex-col gap-3 empty:hidden">
                            <div
                                class="flex flex-wrap items-center gap-2 empty:hidden"
                            >
                                <NuxtImg
                                    v-for="(image, imgIndex) in user.images"
                                    :key="imgIndex"
                                    :src="image.url"
                                    :alt="image.alt"
                                />
                            </div>
                            <div
                                class="flex flex-wrap items-center gap-2 empty:hidden"
                            >
                                <UTooltip
                                    v-for="(skill, skillIndex) in user.skills"
                                    :key="skillIndex"
                                    :text="skill.skill.name"
                                    :delay-duration="100"
                                >
                                    <Icon
                                        :name="skill.skill.icon"
                                        :size="18"
                                        class="text-dimmed z-10"
                                    />
                                </UTooltip>
                            </div>
                        </div>
                    </template>

                    <template #footer>
                        <div class="flex w-full items-center gap-2">
                            <UButton
                                :to="user.website || undefined"
                                icon="lucide:arrow-up-right"
                                label="Website"
                                variant="outline"
                                color="neutral"
                            />
                            <UButton
                                v-for="(link, linkIndex) in user.links"
                                :key="linkIndex"
                                :to="link.url"
                                icon="lucide:arrow-up-right"
                                :label="link.title || undefined"
                                variant="outline"
                            />
                        </div>
                    </template>
                </UPageCard>
            </UPageList>
        </template>
    </UDashboardPanel>
</template>
