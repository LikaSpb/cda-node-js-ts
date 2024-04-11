import { Router } from "express";
import {
  getAllPokemons,
  getPokemonById,
  createPokemon,
  updatePokemon,
  deletePokemon,
} from "../controllers/pokemonController";

const router = Router();

router.get("/pokemons", getAllPokemons);

router.get("/pokemons/:id", getPokemonById);

router.post("/pokemons", createPokemon);

router.put("/pokemons/:id", updatePokemon);

router.delete("/pokemons/:id", deletePokemon);

export default router;
