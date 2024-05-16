import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const trainers = pgTable('trainers', {
    id: uuid('id').defaultRandom().primaryKey(),
    username: varchar('username', { length: 255}).notNull(),
    password: varchar('password', { length: 255}).notNull(),
    refreshToken: varchar('refresh_token', { length: 255})
})