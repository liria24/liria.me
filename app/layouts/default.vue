<script lang="ts" setup>
const { app } = useAppConfig()
</script>

<template>
    <Html>
        <Head>
            <Title>{{ app.title }}</Title>
        </Head>

        <Body>
            <UContainer class="flex min-h-dvh w-full flex-col gap-6">
                <UHeader
                    :toggle="false"
                    :ui="{ container: 'px-0' }"
                    class="border-0"
                >
                    <template #title>
                        <Icon
                            name="local:liria"
                            size="32"
                            class="text-highlighted"
                        />
                    </template>

                    <template #right>
                        <div class="flex items-center gap-2">
                            <UButton
                                :to="app.links.twitter"
                                target="_blank"
                                aria-label="X"
                                icon="simple-icons:x"
                                variant="ghost"
                                :ui="{
                                    leadingIcon: 'size-4.5 m-px',
                                }"
                            />
                            <UButton
                                :to="app.links.github"
                                target="_blank"
                                aria-label="GitHub"
                                icon="simple-icons:github"
                                variant="ghost"
                            />
                        </div>
                    </template>
                </UHeader>

                <UMain class="grid min-h-0 grow px-3">
                    <slot />
                </UMain>

                <UFooter>
                    <template #right>
                        <p class="text-dimmed text-sm">
                            &copy; {{ new Date().getFullYear() }} Liria
                        </p>
                    </template>
                </UFooter>
            </UContainer>
        </Body>
    </Html>
</template>
