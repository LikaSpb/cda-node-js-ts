import { Request, Response, NextFunction } from "express";

/**
 * Middleware pour logger les requêtes HTTP reçues par le serveur.
 * Ce logger affiche la date et l'heure actuelle, la méthode HTTP et le chemin de la requête.
 * Cela aide à suivre le trafic entrant sur le serveur et à diagnostiquer les problèmes en fournissant
 * un historique clair des actions exécutées sur l'API.
 *
 * @param {Request} req - L'objet de requête Express, contenant les informations sur la requête HTTP entrante.
 * @param {Response} res - L'objet de réponse Express, utilisé ici uniquement pour passer au middleware suivant.
 * @param {NextFunction} next - La fonction callback pour passer au middleware suivant dans la chaîne.
 */
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`); // Log la date, la méthode et le chemin de la requête
  next(); // Passe au prochain middleware
};

export default requestLogger;
