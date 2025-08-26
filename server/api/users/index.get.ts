import database from '@@/database'

export default defineApi(async () => {
    const data = await database.query.user.findMany({
        columns: {
            id: true,
            createdAt: true,
            name: true,
            image: true,
            description: true,
            website: true,
            public: true,
        },
        orderBy: (user, { desc }) => [desc(user.createdAt)],
        with: {
            links: {
                columns: {
                    url: true,
                    title: true,
                    description: true,
                },
            },
            images: {
                columns: {
                    url: true,
                    alt: true,
                    link: true,
                },
            },
            skills: {
                with: {
                    skill: {
                        columns: {
                            name: true,
                            description: true,
                            icon: true,
                        },
                    },
                },
                columns: {
                    description: true,
                },
            },
        },
    })

    return data
})
