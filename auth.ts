import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin } from 'better-auth/plugins'
import { nanoid } from 'nanoid'
import database from './database'

const USER_ID_LENGTH = 10

export const auth = betterAuth({
    appName: 'Liria',

    baseURL: import.meta.env.NUXT_BETTER_AUTH_URL as string,
    secret: import.meta.env.NUXT_BETTER_AUTH_SECRET as string,

    trustedOrigins: ['http://localhost:3000', 'https://liria.me'],

    database: drizzleAdapter(database, {
        provider: 'pg',
    }),

    emailAndPassword: {
        enabled: true,
        disableSignUp: true,
    },

    socialProviders: {
        github: {
            clientId: import.meta.env.GITHUB_CLIENT_ID as string,
            clientSecret: import.meta.env.GITHUB_CLIENT_SECRET as string,
            disableSignUp: true,
        },
    },

    user: {
        additionalFields: {
            description: {
                type: 'string',
                required: false,
            },
            website: {
                type: 'string',
                required: false,
            },
            public: {
                type: 'boolean',
                defaultValue: true,
                required: true,
            },
        },
    },

    deleteUser: {
        enabled: true,
    },

    plugins: [admin()],

    cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
    },

    onAPIError: {
        throw: true,
    },

    advanced: {
        database: {
            generateId: () => nanoid(USER_ID_LENGTH),
        },
    },
})

export type Session = typeof auth.$Infer.Session
