import { copy, del } from '@vercel/blob'
import { z } from 'zod'

const body = z.object({
    fromPathname: z.string().min(1),
    toName: z.string().min(1),
})

const { blob } = useRuntimeConfig()
const token = blob.readWriteToken

export default defineApi(
    async () => {
        const { fromPathname, toName } = await validateBody(body)

        const toPathname = fromPathname
            .split('/')
            .slice(0, -1)
            .concat(toName)
            .join('/')

        const result = await copy(fromPathname, toPathname, {
            token,
            access: 'public',
            allowOverwrite: false,
        })

        await del(fromPathname, { token })

        return {
            result,
        }
    },
    {
        requireAdmin: true,
    }
)
