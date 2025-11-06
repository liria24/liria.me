import { z } from 'zod'

const AVATAR_REGEX = /^\/avatar\.(png|jpg|jpeg|webp)$/i

const sizeValidator = z
    .union([z.string().regex(/^\d+$/), z.number()])
    .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val))
    .refine((val) => val > 0 && val <= 2048, {
        message: 'Size must be between 1 and 2048',
    })

const query = z
    .object({
        size: sizeValidator.optional(),
        s: sizeValidator.optional(),
    })
    .transform((data) => ({
        size: data.size ?? data.s ?? 2048,
    }))

export default defineEventHandler(async (event) => {
    const path = getRequestURL(event).pathname
    const match = path.match(AVATAR_REGEX)

    // このミドルウェアが処理すべきパスでなければスキップ
    if (!match) return

    const format = match[1].toLowerCase()

    try {
        // クエリパラメータのバリデーション
        const result = await getValidatedQuery(event, (q) => query.safeParse(q))
        if (!result.success) {
            throw createError({
                statusCode: 400,
                message: 'Invalid query parameters',
            })
        }
        const { size } = result.data

        const img = useImage()

        // キャッシュヘッダーを設定
        setHeader(event, 'Cache-Control', `max-age=${60 * 60 * 24 * 7}`) // 7 days
        setHeader(event, 'CDN-Cache-Control', `max-age=${60 * 60 * 24 * 30}`) // 30 days

        return sendRedirect(
            event,
            img('/logo-liria.png', {
                width: size,
                height: size,
                format: format,
                fit: 'cover',
            })
        )
    } catch (error) {
        console.error('Error processing avatar image:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to process image',
        })
    }
})
