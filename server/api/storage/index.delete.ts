import { del } from '@vercel/blob'
import { z } from 'zod'

const body = z.object({
    pathname: z.string().min(1),
})

const { blob } = useRuntimeConfig()
const token = blob.readWriteToken

export default defineApi(
    async () => {
        const { pathname } = await validateBody(body)

        await del(pathname, { token })

        return null
    },
    {
        requireAdmin: true,
    }
)
