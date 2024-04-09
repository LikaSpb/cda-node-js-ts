import { Router } from "express";
import {
  getAllPokemons,
  getPokemonById,
} from "../controllers/pokemonController";

const router = Router();

router.get("/pokemons", getAllPokemons);
router.get("/pokemons/:id", getPokemonById);

export default router;
