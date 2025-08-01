<script lang="ts" setup>
const title = 'Liria'
</script>

<template>
    <Html>
        <Head>
            <Title>{{ title }}</Title>
        </Head>
        <Body>
            <UContainer class="flex min-h-[100dvh] w-full flex-col gap-16">
                <header class="mt-6 flex w-full items-center justify-between">
                    <NuxtLink to="/" class="flex items-center gap-2.5">
                        <NuxtImg
                            src="/logo/liria.svg"
                            alt="Liria"
                            :width="32"
                            class="size-8"
                        />
                    </NuxtLink>

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
                </header>

                <main class="grid grow px-3">
                    <slot />
                </main>

                <footer class="flex w-full justify-end gap-4 px-4 pt-12 pb-4">
                    <p class="text-dimmed text-sm">
                        &copy; {{ new Date().getFullYear() }} Liria
                    </p>
                </footer>
            </UContainer>
        </Body>
    </Html>
</template>
