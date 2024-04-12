import { NextFunction, Request, Response } from "express";
import env from "../config/env";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = env;

/**
 * Middleware d'authentification pour vérifier le JWT fourni dans les en-têtes de requête.
 * Si le JWT est valide, il décode le token et attache le payload au req.user pour être utilisé
 * dans les routes suivantes. S'il n'y a pas de JWT, ou si le JWT est invalide, une réponse
 * d'erreur est renvoyée.
 *
 * @param {Request} req - L'objet de requête Express, utilisé pour accéder aux en-têtes.
 * @param {Response} res - L'objet de réponse Express, utilisé pour envoyer des réponses.
 * @param {NextFunction} next - La fonction callback pour passer au middleware suivant.
 */
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(403).send({ message: "Token missing" });

  const token = authHeader.split(" ")[1];

  try {
    // Décode le token en utilisant la clé secrète spécifiée et vérifie sa validité
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    // Attache les données décodées à l'objet de requête pour une utilisation ultérieure
    req.user = { id: decoded.id, name: decoded.name };

    next(); // Passe au middleware suivant si le token est valide
  } catch (err) {
    // En cas d'erreur dans la vérification du token, envoie une réponse d'erreur 401
    return res.status(401).send({ message: "Unauthorized" });
  }
};
