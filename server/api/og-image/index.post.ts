import { request } from '@liria24/og-image'
import { z } from 'zod'

const body = z.object({
    title: z.string().trim().min(1).max(120).optional(),
    description: z.string().trim().max(240).optional(),
})

export default defineEventHandler<Promise<{ url: string | null }>>(async () => {
    const props = await validateBody(body)

    try {
        return await request({ preset: 'liria', props })
    } catch (error) {
        console.warn('Failed to issue OG image URL', error)
        return { url: null }
    }
})
