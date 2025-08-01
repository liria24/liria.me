import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        graphics: defineCollection({
            source: 'graphics/*.md',
            type: 'page',
        }),
    },
})
