import { Client, GatewayIntentBits } from 'discord.js'
import { z } from 'zod/v4'

const body = z
    .object({
        content: z.string().optional(),
        embeds: z
            .array(
                z.object({
                    title: z.string().optional(),
                    description: z.string().optional(),
                    color: z.number().optional(),
                    url: z.url().optional(),
                    timestamp: z.iso.datetime().optional(),
                    thumbnail: z
                        .object({
                            url: z.url(),
                        })
                        .optional(),
                    image: z
                        .object({
                            url: z.url(),
                        })
                        .optional(),
                    author: z
                        .object({
                            name: z.string(),
                            url: z.url().optional(),
                            icon_url: z.url().optional(),
                        })
                        .optional(),
                    fields: z
                        .array(
                            z.object({
                                name: z.string(),
                                value: z.string(),
                                inline: z.boolean().optional(),
                            })
                        )
                        .optional(),
                    footer: z
                        .object({
                            text: z.string(),
                            icon_url: z.url().optional(),
                        })
                        .optional(),
                })
            )
            .max(10)
            .optional(),
    })
    .refine(
        (data) => {
            const hasContent = data.content && data.content.trim().length > 0
            const hasEmbeds = data.embeds && data.embeds.length > 0
            return hasContent || hasEmbeds
        },
        {
            message: 'Either content or embeds must be provided',
        }
    )

export default defineEventHandler(async () => {
    const config = useRuntimeConfig()

    const headers = getRequestHeaders(useEvent())
    if (headers.authorization !== config.accessToken)
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Invalid access token',
        })

    const { content, embeds } = await validateBody(body)

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ],
    })
    await client.login(config.discord.token)

    try {
        const channel = await client.channels.fetch(config.discord.channelId)

        if (!channel || !channel.isSendable()) return

        const messageOptions: any = {}
        if (content) messageOptions.content = content
        if (embeds) messageOptions.embeds = embeds

        await channel.send(messageOptions)
    } finally {
        await client.destroy()
    }
})
