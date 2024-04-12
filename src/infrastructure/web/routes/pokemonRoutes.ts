import { Router } from "express";
import {
  getAllPokemons,
  getPokemonById,
  createPokemon,
  updatePokemon,
  deletePokemon,
} from "../controllers/PokemonController";
import { isAuthenticated } from "../../../middlewares/isAuthenticated";
import { refreshTokenMiddleware } from "../../../middlewares/refreshToken";

const router = Router();

// GET localhost:8000/pokemons
router.get("/pokemons", getAllPokemons);

// GET localhost:8000/pokemons/:id
router.get("/pokemons/:id", getPokemonById);

// POST localhost:8000/pokemons
router.post(
  "/pokemons",
  refreshTokenMiddleware,
  isAuthenticated,
  createPokemon
);

// PUT localhost:8000/pokemons/:id
router.put(
  "/pokemons/:id",
  refreshTokenMiddleware,
  isAuthenticated,
  updatePokemon
);

// DELETE localhost:8000/pokemons/:id
router.delete(
  "/pokemons/:id",
  refreshTokenMiddleware,
  isAuthenticated,
  deletePokemon
);

export default router;
