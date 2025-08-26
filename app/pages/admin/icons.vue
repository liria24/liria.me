<script lang="ts" setup>
definePageMeta({
    middleware: 'admin',
    layout: 'dashboard',
})
</script>

<template>
    <UDashboardPanel id="icons">
        <template #header>
            <UDashboardNavbar icon="lucide:image" title="Icons" />
        </template>

        <template #body> </template>
    </UDashboardPanel>
</template>
