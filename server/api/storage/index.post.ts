import { put } from '@vercel/blob'
import { z } from 'zod'

const formData = z.object({
    pathname: z.string().min(1),
    blob: z.union([z.instanceof(Blob), z.instanceof(File)]),
    allowOverwrite: z.boolean().default(false),
})

const config = useRuntimeConfig()

export default defineApi(
    async () => {
        const { pathname, blob, allowOverwrite } =
            await validateFormData(formData)

        const result = await put(pathname, blob, {
            token: config.blob.readWriteToken,
            access: 'public',
            allowOverwrite,
        })

        return {
            result,
        }
    },
    {
        requireAdmin: true,
    }
)
