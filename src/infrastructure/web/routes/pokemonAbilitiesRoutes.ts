import { Router } from "express";
import {
  addAbilityToPokemon,
  removeAbilityFromPokemon,
  getAbilitiesForPokemon
} from "../controllers/PokemonAbilitiesController";

const router = Router();

// Ajouter une capacité à un Pokémon
router.post("/pokemons/:pokemonId/abilities/:abilityId", addAbilityToPokemon);

// Supprimer une capacité d'un Pokémon
router.delete("/pokemons/:pokemonId/abilities/:abilityId", removeAbilityFromPokemon);

// Lister toutes les capacités d'un Pokémon spécifique
router.get("/pokemons/:pokemonId/abilities", getAbilitiesForPokemon);

export default router;
