import * as express from "express";
import * as pokemonService from "../../../domain/services/pokemonService";

/**
 * Obtient tous les Pokémon et les renvoie au format JSON.
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
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send(err.message);
    } else {
      res.status(400).send("Une erreur inconnue s'est produite");
    }
  }
};

/**
 * Obtient un Pokémon par son identifiant et le renvoie au format JSON.
 * @param {express.Request} req - La requête HTTP.
 * @param {express.Response} res - La réponse HTTP.
 */
export const getPokemonById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const pokemon = await pokemonService.getPokemonById(Number(req.params.id));
    if (pokemon) {
      res.json(pokemon);
    } else {
      res.status(404).send("Pokémon non trouvé");
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send(err.message);
    } else {
      res.status(400).send("Une erreur inconnue s'est produite");
    }
  }
};

/**
 * Crée un nouveau Pokémon avec les données fournies et le renvoie au format JSON.
 * @param {express.Request} req - La requête HTTP.
 * @param {express.Response} res - La réponse HTTP.
 */
export const createPokemon = async (
  req: express.Request,
  res: express.Response
) => {
  const newPokemon = await pokemonService.createPokemon(req.body);
  res.status(201).json(newPokemon);
};

/**
 * Met à jour un Pokémon existant avec les données fournies et le renvoie au format JSON.
 * @param {express.Request} req - La requête HTTP.
 * @param {express.Response} res - La réponse HTTP.
 */
export const updatePokemon = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).send("Format d'ID invalide");
    }

    const updatedPokemon = await pokemonService.updatePokemon(id, req.body);

    if (updatedPokemon) {
      res.json(updatedPokemon);
    } else {
      res.status(404).send("Pokémon non trouvé");
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("Une erreur inconnue s'est produite");
    }
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
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).send("Format d'ID invalide");
    }

    const success = await pokemonService.deletePokemon(id);

    if (success) {
      res.status(204).send();
    } else {
      res.status(404).send("Pokémon non trouvé");
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("Une erreur inconnue s'est produite");
    }
  }
};
