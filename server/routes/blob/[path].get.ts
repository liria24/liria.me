import { z } from 'zod'

const params = z.object({
    path: z.string().min(1),
})

export default eventHandler(async () => {
    const { path } = await validateParams(params)
    const storage = useStorage('blob')

    const result = await storage.getMeta(path)

    return sendRedirect(useEvent(), result.url as string)
})
