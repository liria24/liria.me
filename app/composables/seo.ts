import type { OgImageComponents } from '#og-image/components'

type OgImageInput = {
    [T in keyof OgImageComponents]: {
        component: Parameters<typeof defineOgImage<T>>[0]
        props?: Parameters<typeof defineOgImage<T>>[1]
        options?: Parameters<typeof defineOgImage<T>>[2]
    }
}[keyof OgImageComponents]

interface Args {
    title?: string
    titleTemplate?: string
    description?: string
    image?: string | OgImageInput
    type?: 'website' | 'article'
    twitterCard?: 'summary' | 'summary_large_image'
    schemaOrg?: {
        webSite?: boolean
        webPage?: {
            datePublished?: string | Date
            dateModified?: string | Date
            breadcrumb?: {
                name: string
                item: string
            }[]
        }
    }
}

export const useSeo = ({
    title,
    titleTemplate,
    description,
    image,
    type,
    twitterCard,
    schemaOrg,
}: Args) => {
    const config = useRuntimeConfig()
    const route = useRoute()

    useSeoMeta({
        title: title,
        ogTitle: title,
        titleTemplate: titleTemplate,
        description,
        ogDescription: description,
        twitterTitle: title,
        twitterDescription: description,
        twitterCard: twitterCard || 'summary',
    })
    useHead({
        meta: [
            {
                property: 'og:type',
                content: type || (route.path === '/' ? 'website' : 'article'),
            },
        ],
        link: [{ rel: 'icon', href: '/favicon.ico' }],
    })

    let ogImage: string | undefined = undefined

    if (image && typeof image === 'string') {
        ogImage = image.startsWith('/') ? `${config.public.siteUrl}${image}` : image
        useSeoMeta({
            ogImage: ogImage,
            twitterImage: ogImage,
        })
    } else if (typeof image === 'object') {
        const ogImageResult = defineOgImage(image.component, image.props, image.options)
        ogImage = ogImageResult[0]
    }

    const schemaOrgItems = []

    if (schemaOrg?.webSite)
        schemaOrgItems.push(
            defineWebSite({
                name: title,
                description,
                inLanguage: 'ja-JP',
            })
        )
    if (schemaOrg?.webPage)
        schemaOrgItems.push(
            defineWebPage({
                name: title,
                description,
                datePublished: schemaOrg.webPage.datePublished,
                dateModified: schemaOrg.webPage.dateModified,
                breadcrumb: schemaOrg.webPage.breadcrumb
                    ? defineBreadcrumb({
                          itemListElement: schemaOrg.webPage.breadcrumb,
                      })
                    : undefined,
                primaryImageOfPage: ogImage,
                inLanguage: 'ja-JP',
            })
        )

    if (schemaOrg) useSchemaOrg(schemaOrgItems)
}
