import { Router } from "express";
import {
  getAllAbilities,
  getAbilityById,
  createAbility,
  updateAbility,
  deleteAbility,
  getAbilitiesForPokemon,
  addAbilityToPokemon,
  removeAbilityFromPokemon,
} from "../controllers/AbilityController";

const router = Router();

// GET localhost:8000/abilities
router.get("/abilities", getAllAbilities);

// GET localhost:8000/abilities/:id
router.get("/abilities/:id", getAbilityById);

// POST localhost:8000/abilities
router.post("/abilities", createAbility);

// PUT localhost:8000/abilities/:id
router.put("/abilities/:id", updateAbility);

// DELETE localhost:8000/abilities/:id
router.delete("/abilities/:id", deleteAbility);

// GET localhost:8000/pokemons/:pokemonId/abilities
router.get("/pokemons/:pokemonId/abilities", getAbilitiesForPokemon);

// POST localhost:8000/pokemons/:pokemonId/abilities/:abilityId
router.post("/pokemons/:pokemonId/abilities/:abilityId", addAbilityToPokemon);

// DELETE localhost:8000/pokemons/:pokemonId/abilities/:abilityId
router.delete(
  "/pokemons/:pokemonId/abilities/:abilityId",
  removeAbilityFromPokemon
);

export default router;
