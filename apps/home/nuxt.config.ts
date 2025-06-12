import tailwindcss from '@tailwindcss/vite'
import { defineOrganization } from 'nuxt-schema-org/schema'

const baseUrl = import.meta.env.NUXT_PUBLIC_SITE_URL || 'https://liria.me'
const title = 'Liria'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    future: {
        compatibilityVersion: 4,
    },
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true, timeline: { enabled: true } },
    modules: [
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxt/ui',
        '@nuxtjs/i18n',
        '@nuxtjs/robots',
        '@nuxtjs/sitemap',
        'nuxt-link-checker',
        'nuxt-schema-org',
        'nuxt-seo-utils',
    ],
    plugins: [{ src: '~/plugins/axe.client.ts', mode: 'client' }],
    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [tailwindcss()],
        optimizeDeps: {
            include: import.meta.dev ? ['axe-core'] : [],
        },
    },
    routeRules: {
        '/': { prerender: true },
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
            htmlAttrs: { prefix: 'og: https://ogp.me/ns#' },
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
    fonts: {
        families: [{ name: 'Geist', provider: 'google' }],
        defaults: {
            weights: [100, 200, 300, 300, 400, 500, 600, 700, 800, 900],
        },
    },
    i18n: {
        baseUrl,
        defaultLocale: 'en',
        locales: [
            {
                code: 'en',
                language: 'en-US',
                name: 'English (US)',
                file: 'en.json',
            },
            {
                code: 'ja',
                language: 'ja-JP',
                name: '日本語',
                file: 'ja.json',
            },
        ],
        bundle: {
            optimizeTranslationDirective: false,
        },
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
        },
    },
    icon: {
        customCollections: [{ prefix: 'local', dir: './app/assets/icons' }],
        clientBundle: {
            scan: true,
            includeCustomCollections: true,
        },
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
        blockNonSeoBots: true,
        blockAiBots: true,
    },
    nitro: {
        preset: 'vercel',
        experimental: {
            asyncContext: true,
        },
    },
    experimental: {
        scanPageMeta: true,
        payloadExtraction: true,
    },
})
