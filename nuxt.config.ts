import { defineOrganization } from 'nuxt-schema-org/schema'

const baseUrl = import.meta.env.NUXT_PUBLIC_SITE_URL || 'https://liria.me'
const title = 'Liria'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',

    devtools: { enabled: true, timeline: { enabled: true } },

    modules: [
        '@nuxt/ui',
        '@nuxt/content',
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxtjs/robots',
        '@nuxtjs/sitemap',
        'nuxt-link-checker',
        'nuxt-og-image',
        'nuxt-schema-org',
        'nuxt-seo-utils',
    ],

    plugins: [{ src: '~/plugins/axe.client.ts', mode: 'client' }],

    css: ['~/assets/css/main.css'],

    routeRules: {
        '/': {
            prerender: true,
            headers: {
                'Cache-Control': `max-age=${60 * 60 * 24}`, // 1 day
                'CDN-Cache-Control': `max-age=${60 * 60 * 24 * 30}`, // 30 days
            },
        },
        '/__og-image__/image/og.png': {
            headers: {
                'Cache-Control': `max-age=${60 * 60 * 24}`, // 1 day
                'CDN-Cache-Control': `max-age=${60 * 60 * 24 * 30}`, // 30 days
            },
        },
    },

    nitro: {
        preset: 'vercel',
        compressPublicAssets: true,
        vercel: {
            config: {
                images: {
                    minimumCacheTTL: 2678400, // 31 days
                },
            },
        },
        experimental: {
            asyncContext: true,
        },
    },

    vite: {
        optimizeDeps: {
            include: import.meta.dev ? ['axe-core'] : [],
        },
    },

    runtimeConfig: {
        accessToken: '',
        discord: {
            token: '',
            channelId: '',
        },
        public: {
            siteUrl: '',
        },
    },

    site: {
        url: baseUrl,
        name: title,
        trailingSlash: false,
    },

    app: {
        head: {
            htmlAttrs: { lang: 'ja-JP', prefix: 'og: https://ogp.me/ns#' },
            title,
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                { name: 'icon', content: '/favicon.svg' },
                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: baseUrl },
                { property: 'og:title', content: title },
                { property: 'og:site_name', content: title },
            ],
        },
    },

    colorMode: {
        preference: 'dark',
    },

    content: {
        build: {
            markdown: {
                remarkPlugins: {
                    'remark-breaks': {},
                },
            },
        },
        experimental: { sqliteConnector: 'native' },
    },

    fonts: {
        families: [{ name: 'Geist', provider: 'google' }],
        defaults: {
            weights: [100, 200, 300, 300, 400, 500, 600, 700, 800, 900],
        },
    },

    icon: {
        customCollections: [{ prefix: 'local', dir: './app/assets/icons' }],
        clientBundle: {
            icons: [
                'lucide:chevron-right',
                'lucide:chevron-left',
                'lucide:chevron-down',
                'lucide:chevron-up',
                'lucide:arrow-down',
                'lucide:arrow-right',
                'lucide:arrow-up-right',
                'lucide:tag',
                'simple-icons:github',
                'simple-icons:x',
            ],
            scan: true,
            includeCustomCollections: true,
        },
    },

    ogImage: {
        fonts: [
            'Geist:200',
            'Geist:400',
            'Geist:700',
            'Geist:800',
            'Geist:900',
        ],
    },

    schemaOrg: {
        identity: defineOrganization({
            name: 'Liria',
            description: 'Small Circle by Liry24',
            logo: {
                url: '/logo-liria.png',
                width: 460,
                height: 460,
            },
            email: 'hello@liria.me',
            sameAs: ['https://x.com/liria_24', 'https://github.com/liria24'],
        }),
    },

    robots: {
        allow: ['Twitterbot', 'facebookexternalhit'],
        blockNonSeoBots: true,
        blockAiBots: true,
    },

    experimental: {
        scanPageMeta: true,
        payloadExtraction: true,
        inlineRouteRules: true,
    },
})
