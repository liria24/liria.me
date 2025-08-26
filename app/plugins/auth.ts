import type { auth } from '@@/auth'
import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/vue'

export default defineNuxtPlugin(() => {
    const client = createAuthClient({
        baseURL: import.meta.env.NUXT_BETTER_AUTH_URL as string,
        plugins: [adminClient(), inferAdditionalFields<typeof auth>()],
    })

    type Session = typeof client.$Infer.Session

    const globalSession = useState<Session | null | undefined>(
        'auth:session',
        () => undefined
    )

    return {
        provide: {
            authClient: client,

            session: async () => {
                if (globalSession.value !== undefined) return globalSession

                const { data: session } = await client.useSession(
                    (url, options) =>
                        useFetch(url, {
                            ...options,
                            key: 'auth-session',
                            dedupe: 'defer',
                        })
                )

                globalSession.value = session.value
                return session
            },

            refreshSession: async () => {
                const { data: session } = await client.useSession(
                    (url, options) =>
                        useFetch(url, { ...options, dedupe: false })
                )

                // グローバルステートを更新
                globalSession.value = session.value
                return session
            },

            sessions: async () => {
                const sessions = await client.listSessions()
                return sessions
            },

            signInSocial: async (provider: 'github') =>
                await client.signIn.social({ provider }),

            signOut: async () => {
                const toast = useToast()

                const result = await client.signOut()
                if (result.data?.success) {
                    toast.add({
                        title: 'ログアウトしました',
                        description: 'ページを更新しています...',
                        progress: false,
                    })
                    navigateTo('/', { external: true })
                }
            },
        },
    }
})
