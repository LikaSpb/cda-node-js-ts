import { Router } from 'express';
import { getAllPokemons, getPokemonById } from '../controllers/pokemonController';
import requestLogger from '../../../middlewares/requestLogger';

const router = Router();

// router.get('/pokemons', getAllPokemons);
router.get('/pokemons', requestLogger, getAllPokemons);


router.get('/pokemons/:id', getPokemonById);

export default router;
