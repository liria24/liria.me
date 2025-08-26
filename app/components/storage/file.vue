<script lang="ts" setup>
import type { ListBlobResultBlob } from '@vercel/blob'
import type { ContextMenuItem } from '@nuxt/ui'
import type { SerializeObject } from 'nitropack'

interface Props {
    item: SerializeObject<ListBlobResultBlob>
    active?: boolean
}
const props = defineProps<Props>()

const emit = defineEmits(['select', 'refresh'])

const toast = useToast()

const renameMode = ref(false)
const renameText = ref(props.item.pathname)
const renaming = ref(false)

const rename = async () => {
    if (!renameText.value.length || renameText.value === props.item.pathname) {
        renameText.value = props.item.pathname
        renameMode.value = false
        return
    }

    try {
        renaming.value = true

        await $fetch('/api/storage', {
            method: 'PATCH',
            body: {
                fromPathname: props.item.pathname,
                toName: renameText.value,
            },
        })

        emit('refresh')
        renameMode.value = false
    } catch (error) {
        console.error('Error renaming file:', error)
        toast.add({
            title: 'Error renaming file.',
            color: 'error',
        })
    } finally {
        renaming.value = false
    }
}

const deleteFile = async () => {
    if (!confirm('Are you sure you want to delete this file?')) {
        return
    }

    try {
        await $fetch('/api/storage', {
            method: 'DELETE',
            body: {
                pathname: props.item.pathname,
            },
        })

        emit('refresh')
    } catch (error) {
        console.error('Error deleting file:', error)
        toast.add({
            title: 'Error deleting file.',
            color: 'error',
        })
    }
}

const items = ref<ContextMenuItem[][]>([
    [
        {
            label: 'Download',
            icon: 'lucide:download',
            onSelect: () =>
                navigateTo(props.item.downloadUrl, {
                    external: true,
                }),
        },
        {
            label: 'Rename',
            icon: 'lucide:pen-line',
            onSelect: () => {
                renameMode.value = true
            },
        },
    ],
    [
        {
            label: 'Delete',
            icon: 'lucide:trash-2',
            color: 'error',
            onSelect: deleteFile,
        },
    ],
])
</script>

<template>
    <UContextMenu
        :items
        :ui="{
            content: 'w-48',
        }"
    >
        <UButton
            :active="props.active"
            active-variant="subtle"
            variant="ghost"
            color="neutral"
            class="p-2"
            @click="emit('select')"
        >
            <div class="flex w-full flex-col items-center gap-2">
                <NuxtImg
                    v-if="props.item.pathname.endsWith('.png')"
                    :src="props.item.url"
                    class="size-full min-h-32 max-w-32 rounded-md"
                />
                <UInput
                    v-if="renameMode"
                    v-model="renameText"
                    :loading="renaming"
                    :placeholder="props.item.pathname"
                    variant="outline"
                    size="sm"
                    autofocus
                    @change="rename"
                    @keydown.enter="rename"
                />
                <span v-else class="text-sm">
                    {{ props.item.pathname }}
                </span>
            </div>
        </UButton>
    </UContextMenu>
</template>
