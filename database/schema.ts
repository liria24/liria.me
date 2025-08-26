import { relations } from 'drizzle-orm'
import {
    bigint,
    boolean,
    foreignKey,
    index,
    integer,
    pgTable,
    text,
    timestamp,
} from 'drizzle-orm/pg-core'

export const user = pgTable(
    'user',
    {
        id: text().primaryKey(),
        name: text().notNull(),
        email: text().notNull().unique(),
        emailVerified: boolean('email_verified').default(false).notNull(),
        image: text(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
        role: text(),
        banned: boolean(),
        banReason: text('ban_reason'),
        banExpires: timestamp('ban_expires'),
        description: text(),
        website: text(),
        public: boolean().default(true).notNull(),
    },
    (table) => [
        index('user_email_index').on(table.email),
        index('user_public_index').on(table.public),
    ]
)

export const session = pgTable('session', {
    id: text().primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text().notNull().unique(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, {
            onUpdate: 'cascade',
            onDelete: 'cascade',
        }),
    impersonatedBy: text('impersonated_by'),
})

export const account = pgTable(
    'account',
    {
        id: text().primaryKey(),
        accountId: text('account_id').notNull(),
        providerId: text('provider_id').notNull(),
        userId: text('user_id')
            .notNull()
            .references(() => user.id, {
                onUpdate: 'cascade',
                onDelete: 'cascade',
            }),
        accessToken: text('access_token'),
        refreshToken: text('refresh_token'),
        idToken: text('id_token'),
        accessTokenExpiresAt: timestamp('access_token_expires_at'),
        refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
        scope: text(),
        password: text(),
        createdAt: timestamp('created_at').notNull(),
        updatedAt: timestamp('updated_at').notNull(),
    },
    (table) => [index('account_user_id_index').on(table.userId)]
)

export const verification = pgTable(
    'verification',
    {
        id: text().primaryKey(),
        identifier: text().notNull(),
        value: text().notNull(),
        expiresAt: timestamp('expires_at').notNull(),
        createdAt: timestamp('created_at').defaultNow(),
        updatedAt: timestamp('updated_at').defaultNow(),
    },
    (table) => [index('verification_identifier_index').on(table.identifier)]
)

export const userLinks = pgTable(
    'user_links',
    {
        id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
        userId: text().notNull(),
        url: text().notNull(),
        title: text(),
        description: text(),
    },
    (table) => [
        index('user_links_user_id_index').on(table.userId),
        foreignKey({
            name: 'user_links_user_id_fkey',
            columns: [table.userId],
            foreignColumns: [user.id],
        })
            .onDelete('cascade')
            .onUpdate('cascade'),
    ]
)

export const userImages = pgTable(
    'user_images',
    {
        id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        userId: text().notNull(),
        url: text().notNull(),
        alt: text().notNull(),
        link: text(),
    },
    (table) => [
        index('user_images_user_id_index').on(table.userId),
        foreignKey({
            name: 'user_images_user_id_fkey',
            columns: [table.userId],
            foreignColumns: [user.id],
        })
            .onDelete('cascade')
            .onUpdate('cascade'),
    ]
)

export const skills = pgTable(
    'skills',
    {
        id: text().primaryKey(),
        name: text().notNull(),
        description: text(),
        icon: text().notNull(),
    },
    (table) => [index('skills_id_index').on(table.id)]
)

export const userSkills = pgTable(
    'user_skills',
    {
        id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
        userId: text().notNull(),
        skillId: text().notNull(),
        description: text(),
    },
    (table) => [
        index('user_skills_user_id_index').on(table.userId),
        foreignKey({
            name: 'user_skills_user_id_fkey',
            columns: [table.userId],
            foreignColumns: [user.id],
        })
            .onDelete('cascade')
            .onUpdate('cascade'),
        foreignKey({
            name: 'user_skills_skill_id_fkey',
            columns: [table.skillId],
            foreignColumns: [skills.id],
        })
            .onDelete('cascade')
            .onUpdate('cascade'),
    ]
)

export const icons = pgTable(
    'icons',
    {
        id: text().primaryKey(),
        createdAt: timestamp('created_at').defaultNow(),
        updatedAt: timestamp('updated_at').defaultNow(),
        body: text().notNull(),
        width: integer().notNull(),
        height: integer().notNull(),
    },
    (table) => [index('icons_id_index').on(table.id)]
)

export const userRelations = relations(user, ({ many }) => ({
    accounts: many(account),
    links: many(userLinks),
    images: many(userImages),
    skills: many(userSkills),
}))

export const accountRelations = relations(account, ({ one }) => ({
    user: one(user, {
        fields: [account.userId],
        references: [user.id],
    }),
}))

export const verificationRelations = relations(verification, ({ one }) => ({
    user: one(user, {
        fields: [verification.identifier],
        references: [user.email],
    }),
}))

export const userLinksRelations = relations(userLinks, ({ one }) => ({
    user: one(user, {
        fields: [userLinks.userId],
        references: [user.id],
    }),
}))

export const userImagesRelations = relations(userImages, ({ one }) => ({
    user: one(user, {
        fields: [userImages.userId],
        references: [user.id],
    }),
}))

export const skillsRelations = relations(skills, ({ many }) => ({
    users: many(userSkills),
}))

export const userSkillsRelations = relations(userSkills, ({ one }) => ({
    user: one(user, {
        fields: [userSkills.userId],
        references: [user.id],
    }),
    skill: one(skills, {
        fields: [userSkills.skillId],
        references: [skills.id],
    }),
}))
