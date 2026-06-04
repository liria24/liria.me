<script lang="ts" setup>
const { app } = useAppConfig()
</script>

<template>
    <UContainer class="flex min-h-dvh w-full flex-col gap-6">
        <UHeader :toggle="false" :ui="{ container: 'px-0' }" class="border-0">
            <template #title>
                <Icon name="liria:liria" size="32" class="text-highlighted" />
            </template>

            <template #right>
                <div class="flex items-center">
                    <UTheme :props="{ button: { target: '_blank', variant: 'ghost' } }">
                        <UButton
                            :to="app.links.twitter"
                            aria-label="X"
                            icon="mingcute:social-x-fill"
                        />
                        <UButton
                            :to="app.links.github"
                            aria-label="GitHub"
                            icon="mingcute:github-fill"
                        />
                    </UTheme>
                </div>
            </template>
        </UHeader>

        <UMain class="grid min-h-0 grow px-3">
            <slot />
        </UMain>

        <UFooter>
            <template #right>
                <p class="text-dimmed text-sm">&copy; {{ new Date().getFullYear() }} Liria</p>
            </template>
        </UFooter>
    </UContainer>
</template>
