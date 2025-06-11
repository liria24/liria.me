import { Client, GatewayIntentBits } from 'discord.js'

export const getDiscordClient = async () => {
    const config = useRuntimeConfig()

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ],
    })
    await client.login(config.discord.token)

    return client
}
