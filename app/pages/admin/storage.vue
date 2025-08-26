<script lang="ts" setup>
definePageMeta({
    middleware: 'admin',
    layout: 'dashboard',
})

const nuxtApp = useNuxtApp()

const file = ref<File | null>(null)
const pathname = ref('/')
const uploading = ref(false)
const modalUpload = ref(false)

const selectedItems = ref<number[]>([])

const { data, status, refresh } = useFetch('/api/storage', {
    dedupe: 'defer',
    getCachedData: (key, nuxtApp, ctx) => {
        if (ctx.cause === 'refresh:manual') return
        return nuxtApp.isHydrating
            ? nuxtApp.payload.data[key]
            : nuxtApp.static.data[key]
    },
    headers:
        import.meta.server && nuxtApp.ssrContext?.event.headers
            ? nuxtApp.ssrContext.event.headers
            : undefined,
})

const upload = async () => {
    if (!file.value) return

    try {
        modalUpload.value = false
        uploading.value = true

        const formData = new FormData()
        formData.append('pathname', file.value.name)
        formData.append('blob', file.value)

        await $fetch('/api/storage', {
            method: 'POST',
            body: formData,
        })

        file.value = null
        refresh()
    } catch (error) {
        console.error('Error uploading file:', error)
    } finally {
        uploading.value = false
    }
}

defineShortcuts({
    ctrl_d: () => (selectedItems.value = []),
})
</script>

<template>
    <UDashboardPanel id="storage" :ui="{ body: 'p-0 sm:p-0' }">
        <template #header>
            <UDashboardNavbar
                icon="lucide:database"
                title="Storage"
                :ui="{ right: 'gap-3' }"
            />

            <UDashboardToolbar>
                <template #left>
                    <div class="flex items-center gap-3">
                        <Icon
                            v-if="status === 'pending'"
                            name="svg-spinners:ring-resize"
                            size="20"
                            class="text-muted"
                        />
                        <Icon
                            v-else
                            name="lucide:folder"
                            size="20"
                            class="text-muted"
                        />
                        <span class="text-toned text-sm leading-none">/</span>
                    </div>
                </template>

                <template #right>
                    <div class="flex items-center gap-2">
                        <UButton
                            icon="lucide:rotate-ccw"
                            variant="soft"
                            @click="refresh()"
                        />

                        <UModal v-model:open="modalUpload" title="Upload File">
                            <UButton
                                :loading="uploading"
                                icon="lucide:plus"
                                :label="uploading ? 'Uploading...' : 'Upload'"
                                variant="subtle"
                            />

                            <template #body>
                                <div class="flex flex-col gap-2">
                                    <UFileUpload
                                        v-model="file"
                                        layout="list"
                                        position="inside"
                                        class="min-h-48"
                                    />
                                    <UInput
                                        v-model="pathname"
                                        placeholder="/path/to"
                                    />
                                </div>
                            </template>

                            <template #footer>
                                <div class="flex w-full justify-end gap-2">
                                    <UButton
                                        label="Cancel"
                                        variant="ghost"
                                        @click="modalUpload = false"
                                    />
                                    <UButton
                                        :loading="uploading"
                                        :disabled="!file || uploading"
                                        icon="lucide:upload"
                                        label="Upload"
                                        color="neutral"
                                        size="lg"
                                        @click="upload"
                                    />
                                </div>
                            </template>
                        </UModal>
                    </div>
                </template>
            </UDashboardToolbar>
        </template>

        <template #body>
            <div class="relative size-full">
                <div class="grid grid-cols-6 p-4 sm:p-6">
                    <StorageFile
                        v-for="(item, index) in data?.blobs"
                        :key="index"
                        :item="item"
                        @refresh="refresh"
                    />
                </div>
            </div>
        </template>
    </UDashboardPanel>
</template>
