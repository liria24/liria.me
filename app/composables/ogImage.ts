export const useOgImage = async (props: { title?: string; description?: string } = {}) => {
    if (!props.title && props.description) return undefined

    try {
        const response = await $fetch('/api/og-image', {
            method: 'POST',
            body: props,
        })

        return response.url ?? undefined
    } catch (error) {
        if (import.meta.server) console.warn('Failed to issue OG image URL', error)
        return undefined
    }
}
