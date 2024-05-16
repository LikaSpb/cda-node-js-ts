import { PokemonAbilitiesService } from "../../../domain/services/PokemonAbilitiesService";
import * as express from "express";
const pokemonAbilitiesService = new PokemonAbilitiesService();

/**
 * Récupère toutes les capacités associées à un Pokémon spécifique.
 * @param {express.Request} req - La requête HTTP.
 * @param {express.Response} res - La réponse HTTP.
 */
export const getAbilitiesForPokemon = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const abilities = await pokemonAbilitiesService.getAbilitiesForPokemon(
      req.params.pokemonId
    );
    res.json(abilities);
  } catch (error) {
    const err = error as Error;
    res.status(500).send("Une erreur inconnue s'est produite: " + err.message);
  }
};

/**
 * Associe une capacité à un Pokémon.
 * @param {express.Request} req - La requête HTTP.
 * @param {express.Response} res - La réponse HTTP.
 */
export const addAbilityToPokemon = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { pokemonId, abilityId } = req.params;
    await pokemonAbilitiesService.addAbilityToPokemon(pokemonId, abilityId);
    res.status(204).send();
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .send("Impossible d'ajouter la capacité au Pokémon: " + err.message);
  }
};

/**
 * Retire une capacité d'un Pokémon.
 * @param {express.Request} req - La requête HTTP.
 * @param {express.Response} res - La réponse HTTP.
 */
export const removeAbilityFromPokemon = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { pokemonId, abilityId } = req.params;
    const success = await pokemonAbilitiesService.removeAbilityFromPokemon(
      pokemonId,
      abilityId
    );
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).send("Capacité ou Pokémon non trouvé");
    }
  } catch (error) {
    const err = error as Error;
    res.status(500).send("Une erreur inconnue s'est produite: " + err.message);
  }
};
