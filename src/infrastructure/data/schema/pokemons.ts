import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { types } from "./types"; 

export const pokemons = pgTable("pokemons", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  typeId: uuid("typeId")
    .references(() => types.id)
    .notNull(),
});
