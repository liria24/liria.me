import { defineCollection, defineContentConfig } from '@nuxt/content'
import { defineRobotsSchema } from '@nuxtjs/robots/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'
import { defineSchemaOrgSchema } from 'nuxt-schema-org/content'
import { z } from 'zod'

export default defineContentConfig({
    collections: {
        graphics: defineCollection({
            source: 'graphics/*.md',
            type: 'page',
            schema: z.object({
                updatedAt: z.string().optional(),
                schemaOrg: defineSchemaOrgSchema(),
                sitemap: defineSitemapSchema(),
                robots: defineRobotsSchema(),
            }),
        }),
    },
})
