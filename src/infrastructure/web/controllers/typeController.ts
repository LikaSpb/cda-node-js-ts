import * as express from "express";
import { TypeService } from "../../../domain/services/TypeService";
const typeService = new TypeService();

/**
 * Récupère et renvoie tous les types de Pokémon disponibles.
 * @param {express.Request} req - La requête HTTP.
 * @param {express.Response} res - La réponse HTTP.
 */
export const getAllTypes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const types = await typeService.getAllTypes();
    res.json(types);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("Une erreur inconnue s'est produite");
    }
  }
};

/**
 * Récupère et renvoie un type de Pokémon spécifique par son identifiant.
 * @param {express.Request} req - La requête HTTP, contenant l'identifiant du type dans les paramètres de l'URL.
 * @param {express.Response} res - La réponse HTTP.
 */
export const getTypeById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const type = await typeService.getTypeById(req.params.id);
    if (type) {
      res.json(type);
    } else {
      res.status(404).send("Type non trouvé");
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
 * Crée un nouveau type de Pokémon.
 * @param {express.Request} req - La requête HTTP, contenant les données du nouveau type dans le corps de la requête.
 * @param {express.Response} res - La réponse HTTP.
 */
export const createType = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const newType = await typeService.createType(req.body);
    res.status(201).json(newType);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("Une erreur inconnue s'est produite");
    }
  }
};

/**
 * Met à jour un type de Pokémon existant.
 * @param {express.Request} req - La requête HTTP, contenant l'identifiant dans les paramètres de l'URL et les nouvelles données dans le corps de la requête.
 * @param {express.Response} res - La réponse HTTP.
 */
export const updateType = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const updatedType = await typeService.updateType(req.params.id, req.body);
    if (updatedType) {
      res.json(updatedType);
    } else {
      res.status(404).send("Type non trouvé");
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
 * Supprime un type de Pokémon par son identifiant.
 * @param {express.Request} req - La requête HTTP, contenant l'identifiant du type dans les paramètres de l'URL.
 * @param {express.Response} res - La réponse HTTP.
 */
export const deleteType = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const success = await typeService.deleteType(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).send("Type non trouvé");
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("Une erreur inconnue s'est produite");
    }
  }
};
