import { z } from 'zod/v4'

const body = z.object({
    content: z.string().min(1, 'Content is required'),
})

export default defineEventHandler(async () => {
    const config = useRuntimeConfig()

    const headers = getRequestHeaders(useEvent())
    if (headers.authorization !== config.accessToken)
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Invalid access token',
        })

    const { content } = await validateBody(body)

    const client = await getDiscordClient()

    try {
        const channel = await client.channels.fetch(config.discord.channelId)

        if (!channel || !channel.isSendable()) return
        await channel.send(content)
    } finally {
        await client.destroy()
    }
})
