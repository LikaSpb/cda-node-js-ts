import { NextFunction, Response, Request } from "express";
import { response } from "../utils/response";

/**
 * Middleware pour la gestion centralisée des erreurs.
 * Capture toutes les erreurs lancées dans les routes ou les middleware précédents.
 * Log l'erreur et renvoie une réponse HTTP standardisée avec un code d'erreur 500.
 *
 * @param {Error} err - L'erreur capturée lors de l'exécution des requêtes.
 * @param {Request} req - L'objet de requête Express.
 * @param {Response} res - L'objet de réponse Express, utilisé pour envoyer la réponse.
 * @param {NextFunction} next - La fonction callback pour passer au middleware suivant.
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack); // Log l'erreur dans la console du serveur.
  return response(res, { statusCode: 500, message: "Internal Server Error" });
};
