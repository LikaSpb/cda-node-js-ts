import { pgTable, uuid, timestamp, varchar } from "drizzle-orm/pg-core";
import { pokemons } from "./pokemons";

export const battles = pgTable("battles", {
  id: uuid("id").defaultRandom().primaryKey(),
  pokemonId: uuid("pokemonId")
    .references(() => pokemons.id)
    .notNull(),
  opponentPokemonId: uuid("opponentPokemonId")
    .references(() => pokemons.id)
    .notNull(),
  winnerPokemonId: uuid("winnerPokemonId").references(() => pokemons.id),
  battleDate: timestamp("battleDate").notNull(),
  location: varchar("location", { length: 255 }),
});
