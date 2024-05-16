import { PokemonService } from "../../../domain/services/PokemonService";
import * as express from "express";
const pokemonService = new PokemonService();

/**
 * Récupère tous les Pokémon.
 * @param {express.Request} req - La requête HTTP.
 * @param {express.Response} res - La réponse HTTP.
 */
export const getAllPokemons = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const pokemons = await pokemonService.getAllPokemons();
    res.json(pokemons);
  } catch (error) {
    const err = error as Error;
    res.status(500).send("Une erreur inconnue s'est produite: " + err.message);
  }
};

/**
 * Récupère un Pokémon par son identifiant.
 * @param {express.Request} req - La requête HTTP.
 * @param {express.Response} res - La réponse HTTP.
 */
export const getPokemonById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const pokemon = await pokemonService.getPokemonById(id);
    if (pokemon) {
      res.json(pokemon);
    } else {
      res.status(404).send("Pokémon non trouvé");
    }
  } catch (error) {
    const err = error as Error;
    res.status(500).send("Une erreur inconnue s'est produite: " + err.message);
  }
};

/**
 * Crée un nouveau Pokémon.
 * @param {express.Request} req - La requête HTTP.
 * @param {express.Response} res - La réponse HTTP.
 */
export const createPokemon = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const newPokemon = await pokemonService.createPokemon(req.body);
    res.status(201).json(newPokemon);
  } catch (error) {
    const err = error as Error;
    res.status(500).send("Impossible de créer le Pokémon: " + err.message);
  }
};

/**
 * Met à jour un Pokémon existant.
 * @param {express.Request} req - La requête HTTP.
 * @param {express.Response} res - La réponse HTTP.
 */
export const updatePokemon = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const updatedPokemon = await pokemonService.updatePokemon(id, req.body);
    if (updatedPokemon) {
      res.json(updatedPokemon);
    } else {
      res.status(404).send("Pokémon non trouvé");
    }
  } catch (error) {
    const err = error as Error;
    res.status(500).send("Une erreur inconnue s'est produite: " + err.message);
  }
};

/**
 * Supprime un Pokémon par son identifiant.
 * @param {express.Request} req - La requête HTTP.
 * @param {express.Response} res - La réponse HTTP.
 */
export const deletePokemon = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const success = await pokemonService.deletePokemon(id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).send("Pokémon non trouvé");
    }
  } catch (error) {
    const err = error as Error;
    res.status(500).send("Une erreur inconnue s'est produite: " + err.message);
  }
};
