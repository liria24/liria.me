export default defineNuxtRouteMiddleware(async () => {
    const { $authClient } = useNuxtApp()

    const { data: session } = await $authClient.useSession((url, options) =>
        useFetch(url, { ...options, dedupe: 'defer' })
    )

    if (session.value?.user?.role !== 'admin') return navigateTo('/')
})
