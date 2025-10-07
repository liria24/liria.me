import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import sharp from 'sharp'
import { z } from 'zod'

const params = z.object({
    format: z.enum(['png', 'jpg', 'jpeg', 'webp']),
})

const query = z.object({
    s: z
        .union([z.string().regex(/^\d+$/), z.number()])
        .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val))
        .refine((val) => val > 0 && val <= 2048, {
            message: 'Size must be between 1 and 2048',
        })
        .optional()
        .default(2048),
})

export default defineEventHandler(async (event) => {
    const { format } = await validateParams(params)
    const { s } = await validateQuery(query)

    try {
        // ロゴ画像のパスを解決
        const logoPath = resolve(process.cwd(), 'public/logo-liria.png')

        // 画像ファイルを読み込み
        const imageBuffer = await readFile(logoPath)

        // sharpで画像を処理
        let transformer = sharp(imageBuffer).resize(s, s, {
            fit: 'inside',
            withoutEnlargement: false,
        })

        // フォーマットに応じて変換
        const normalizedFormat = format.toLowerCase()
        if (normalizedFormat === 'jpg' || normalizedFormat === 'jpeg') {
            transformer = transformer.jpeg({ quality: 90 })
            setHeader(event, 'Content-Type', 'image/jpeg')
        } else if (normalizedFormat === 'webp') {
            transformer = transformer.webp({ quality: 90 })
            setHeader(event, 'Content-Type', 'image/webp')
        } else if (normalizedFormat === 'png') {
            transformer = transformer.png()
            setHeader(event, 'Content-Type', 'image/png')
        }

        // バッファに変換
        const outputBuffer = await transformer.toBuffer()

        return outputBuffer
    } catch (error) {
        console.error('Error processing logo image:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to process image',
        })
    }
})
