import sharp from 'sharp'
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

        // 元画像を取得
        const baseURL = getRequestURL(event).origin
        const response = await $fetch<ArrayBuffer>('/logo-liria.png', {
            baseURL,
            responseType: 'arrayBuffer',
        })
        const imageBuffer = Buffer.from(response)

        // sharpで画像を処理
        let transformer = sharp(imageBuffer).resize(size, size, {
            fit: 'inside',
            withoutEnlargement: false,
        })

        // フォーマットに応じて変換
        if (format === 'jpg' || format === 'jpeg') {
            transformer = transformer.jpeg({ quality: 90 })
            setHeader(event, 'Content-Type', 'image/jpeg')
        } else if (format === 'webp') {
            transformer = transformer.webp({ quality: 90 })
            setHeader(event, 'Content-Type', 'image/webp')
        } else if (format === 'png') {
            transformer = transformer.png()
            setHeader(event, 'Content-Type', 'image/png')
        }

        // バッファに変換
        const outputBuffer = await transformer.toBuffer()

        // キャッシュヘッダーを設定
        setHeader(event, 'Cache-Control', `max-age=${60 * 60 * 24 * 7}`) // 7 days
        setHeader(event, 'CDN-Cache-Control', `max-age=${60 * 60 * 24 * 30}`) // 30 days

        return outputBuffer
    } catch (error) {
        console.error('Error processing avatar image:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to process image',
        })
    }
})
