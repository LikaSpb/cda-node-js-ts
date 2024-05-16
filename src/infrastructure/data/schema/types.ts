import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const types = pgTable('types', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 255}).notNull(),
})