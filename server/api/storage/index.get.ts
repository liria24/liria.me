import { list } from '@vercel/blob'
import { z } from 'zod'

const query = z.object({
    limit: z.number().default(100).optional(),
    orderBy: z.enum(['name', 'size', 'createdAt']).default('name').optional(),
})

const config = useRuntimeConfig()

export default defineApi(
    async () => {
        const { limit, orderBy } = await validateQuery(query)

        const { folders, blobs } = await list({
            mode: 'folded',
            limit,
            token: config.blob.readWriteToken,
        })

        return {
            folders,
            blobs,
        }
    },
    {
        requireAdmin: true,
    }
)
