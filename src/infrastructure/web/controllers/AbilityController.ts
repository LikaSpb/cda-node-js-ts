import { Request, Response } from "express";
import { AbilityService } from "../../../domain/services/AbilityService";

const abilityService = new AbilityService();

/**
 * Récupère toutes les capacités.
 * @param {Request} req - La requête HTTP.
 * @param {Response} res - La réponse HTTP.
 */
export const getAllAbilities = async (req: Request, res: Response) => {
  try {
    const abilities = await abilityService.getAllAbilities();
    res.json(abilities);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

/**
 * Récupère une capacité par son identifiant.
 * @param {Request} req - La requête HTTP.
 * @param {Response} res - La réponse HTTP.
 */
export const getAbilityById = async (req: Request, res: Response) => {
  try {
    const ability = await abilityService.getAbilityById(req.params.id);
    if (ability) {
      res.json(ability);
    } else {
      res.status(404).send("Ability not found");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

/**
 * Crée une nouvelle capacité.
 * @param {Request} req - La requête HTTP.
 * @param {Response} res - La réponse HTTP.
 */
export const createAbility = async (req: Request, res: Response) => {
  try {
    const newAbility = await abilityService.createAbility(req.body);
    res.status(201).json(newAbility);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

/**
 * Met à jour une capacité existante.
 * @param {Request} req - La requête HTTP.
 * @param {Response} res - La réponse HTTP.
 */
export const updateAbility = async (req: Request, res: Response) => {
  try {
    const updatedAbility = await abilityService.updateAbility(
      req.params.id,
      req.body
    );
    res.json(updatedAbility);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

/**
 * Supprime une capacité par son identifiant.
 * @param {Request} req - La requête HTTP.
 * @param {Response} res - La réponse HTTP.
 */
export const deleteAbility = async (req: Request, res: Response) => {
  try {
    const success = await abilityService.deleteAbility(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).send("Ability not found");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

/**
 * Récupère toutes les capacités associées à un Pokémon spécifique.
 * @param {Request} req - La requête HTTP.
 * @param {Response} res - La réponse HTTP.
 */
export const getAbilitiesForPokemon = async (req: Request, res: Response) => {
  try {
    const abilities = await abilityService.getAbilitiesForPokemon(
      req.params.pokemonId
    );
    res.json(abilities);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

/**
 * Associe une capacité à un Pokémon.
 * @param {Request} req - La requête HTTP.
 * @param {Response} res - La réponse HTTP.
 */
export const addAbilityToPokemon = async (req: Request, res: Response) => {
  try {
    const { pokemonId, abilityId } = req.params;
    await abilityService.addAbilityToPokemon(pokemonId, abilityId);
    res.status(204).send();
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

/**
 * Retire une capacité d'un Pokémon.
 * @param {Request} req - La requête HTTP.
 * @param {Response} res - La réponse HTTP.
 */
export const removeAbilityFromPokemon = async (req: Request, res: Response) => {
  try {
    const { pokemonId, abilityId } = req.params;
    await abilityService.removeAbilityFromPokemon(pokemonId, abilityId);
    res.status(204).send();
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
