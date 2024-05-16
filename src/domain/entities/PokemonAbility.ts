import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pokemonAbilities } from "../../infrastructure/data/schema";

export type PokemonAbility = InferSelectModel<typeof pokemonAbilities>;
export type NewPokemonAbility = InferInsertModel<typeof pokemonAbilities>;
