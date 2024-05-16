import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";

export const abilities = pgTable("abilities", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description").notNull(),
    effect: text("effect").notNull()
});
