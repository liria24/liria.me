import { routes, type VercelConfig } from '@vercel/config/v1'

export const config: VercelConfig = {
    cleanUrls: true,
    trailingSlash: false,

    redirects: [routes.redirect('/liry24', 'https://liry24.com', { permanent: true })],
}
