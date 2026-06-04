import { defineOrganization } from 'nuxt-schema-org/schema'

const baseUrl = import.meta.env.NUXT_PUBLIC_SITE_URL || 'https://liria.me'
const title = 'Liria'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-06-03',

    future: {
        compatibilityVersion: 5,
    },

    devtools: { enabled: true, timeline: { enabled: true } },

    modules: [
        '@nuxt/ui',
        '@nuxt/content',
        '@nuxt/image',
        '@nuxtjs/robots',
        '@nuxtjs/sitemap',
        'nuxt-link-checker',
        'nuxt-og-image',
        'nuxt-schema-org',
        'nuxt-seo-utils',
        '@nuxt/hints',
        '@nuxt/a11y',
    ],

    css: ['~/assets/css/main.css'],

    vite: {
        vue: {
            features: {
                optionsAPI: false,
            },
        },
        optimizeDeps: {
            include: [
                '@nuxt/ui > prosemirror-state',
                '@nuxt/ui > prosemirror-transform',
                '@nuxt/ui > prosemirror-model',
                '@nuxt/ui > prosemirror-view',
                '@nuxt/ui > prosemirror-gapcursor',
            ],
        },
    },

    nitro: {
        preset: 'cloudflare_module',
        cloudflare: {
            deployConfig: true,
            nodeCompat: true,
            wrangler: {
                name: 'liria-me',
                workers_dev: false,
                vars: {
                    NUXT_PUBLIC_SITE_URL: 'https://liria.me',
                },
                routes: [{ pattern: 'liria.me', custom_domain: true }],
                d1_databases: [
                    {
                        binding: 'DB',
                        database_name: 'liria-me',
                        database_id: 'e4373f21-df61-479b-ba46-5a953c7df0f9',
                    },
                ],
            },
        },
        routeRules: {
            '/liry24': { redirect: { to: 'https://liry24.com', statusCode: 301 } },
        },
        compressPublicAssets: true,
        experimental: {
            asyncContext: true,
        },
    },

    typescript: {
        tsConfig: {
            compilerOptions: {
                noUncheckedIndexedAccess: true,
            },
        },
    },

    runtimeConfig: {
        public: {
            siteUrl: baseUrl,
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
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'icon', content: '/favicon.ico' },
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
        database: {
            type: 'd1',
            bindingName: 'DB',
        },
        experimental: {
            sqliteConnector: 'native',
        },
    },

    fonts: {
        families: [
            { name: 'Geist', provider: 'google', preload: true, global: true },
            { name: 'Geist Mono', provider: 'google' },
            { name: 'Cormorant', provider: 'google', preload: true },
        ],
        defaults: {
            weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        },
    },

    icon: {
        clientBundle: {
            scan: true,
            includeCustomCollections: true,
        },
        serverBundle: {
            collections: [
                {
                    prefix: 'liria',
                    fetchEndpoint: 'https://icons.liria.me/liria.json',
                },
            ],
        },
    },

    image: {
        provider: 'cloudflare',
        cloudflare: {
            baseURL: 'https://liria.me',
        },
        domains: ['github.com'],
    },

    schemaOrg: {
        identity: defineOrganization({
            name: 'Liria',
            description: 'Small Circle by Liry24',
            logo: {
                url: `${baseUrl}/avatar.png?s=460`,
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

    ui: {
        experimental: {
            componentDetection: true,
        },
    },

    experimental: {
        crossOriginPrefetch: true,
        sharedPrerenderData: true,
        granularCachedData: true,
        inlineRouteRules: true,
        extractAsyncDataHandlers: true,
        typescriptPlugin: true,
        nitroAutoImports: true,
    },
})
