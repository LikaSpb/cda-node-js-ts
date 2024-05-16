import { pgTable, uuid } from "drizzle-orm/pg-core";
import { pokemons } from "./pokemons";
import { abilities } from "./abilities";

export const pokemonAbilities = pgTable("pokemon_abilities", {
  id: uuid("id").defaultRandom().primaryKey(),
  pokemonId: uuid("pokemonId").references(() => pokemons.id),
  abilityId: uuid("abilityId").references(() => abilities.id),
});
