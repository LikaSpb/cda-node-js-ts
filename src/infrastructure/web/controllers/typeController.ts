import * as express from "express";
import * as typeService from "../../../domain/services/typeService";

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
    const type = await typeService.getTypeById(Number(req.params.id));
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
