<script setup lang="ts">
const { $signInSocial } = useNuxtApp()

const providers = [
    {
        label: 'GitHub',
        icon: 'i-simple-icons-github',
        onClick: () => {
            $signInSocial('github')
        },
    },
]
</script>

<template>
    <div class="flex flex-col items-center justify-center gap-4 p-4">
        <UPageCard class="w-full max-w-md">
            <UAuthForm :providers="providers" />
        </UPageCard>
    </div>
</template>
