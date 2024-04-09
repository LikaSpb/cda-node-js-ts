import * as express from 'express';
import * as pokemonService from '../../../domain/services/pokemonService';

export const getAllPokemons = async (req: express.Request, res: express.Response) => {
    try {
      const pokemons = await pokemonService.getAllPokemons();
      res.json(pokemons);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      } else {
        res.status(500).send('An unknown error occurred');
      }
    }
  };
  
  export const getPokemonById = async (req: express.Request, res: express.Response) => {
    try {
      const pokemon = await pokemonService.getPokemonById(Number(req.params.id));
      if (pokemon) {
        res.json(pokemon);
      } else {
        res.status(404).send('Pokémon not found');
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      } else {
        res.status(500).send('An unknown error occurred');
      }
    }
  };
  
