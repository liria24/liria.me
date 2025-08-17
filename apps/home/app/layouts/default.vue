<script lang="ts" setup>
const title = 'Liria'
</script>

<template>
    <Html>
        <Head>
            <Title>{{ title }}</Title>
        </Head>

        <Body>
            <UContainer class="flex min-h-[100dvh] w-full flex-col gap-6">
                <UHeader :ui="{ container: 'px-0' }" class="border-0">
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
                                to="https://x.com/liria_24"
                                target="_blank"
                                aria-label="X"
                                icon="simple-icons:x"
                                variant="ghost"
                            />
                            <UButton
                                to="https://github.com/liria24"
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
