import type { VercelConfig } from '@vercel/config/v1'

export const config: VercelConfig = {
    cleanUrls: true,
    trailingSlash: false,

    bulkRedirectsPath: JSON.stringify([
        {
            source: '/liry24',
            destination: 'https://liry24.com',
            permanent: true,
        },
    ]),
}
