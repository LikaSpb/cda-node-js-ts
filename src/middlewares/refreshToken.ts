import { Request, Response, NextFunction } from "express";
import { AuthService } from "../domain/services/AuthService";

const authService = new AuthService();

/**
 * Middleware pour rafraîchir le token d'accès à l'aide d'un token de rafraîchissement.
 * Ce middleware vérifie la présence d'un token de rafraîchissement dans les cookies de la requête.
 * S'il est présent et valide, un nouveau token d'accès est généré, stocké dans les cookies,
 * et la requête peut continuer. Si le token de rafraîchissement est absent ou invalide,
 * une erreur est renvoyée.
 *
 * @param {Request} req - L'objet de requête Express, utilisé pour accéder aux cookies.
 * @param {Response} res - L'objet de réponse Express, utilisé pour envoyer des réponses.
 * @param {NextFunction} next - La fonction callback pour passer au middleware suivant.
 */
export const refreshTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) return next(); // Passe au middleware suivant si aucun token de rafraîchissement n'est présent

  try {
    const newAccessToken = await authService.refreshAccessToken(refreshToken);
    if (newAccessToken) {
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true, // Empêche l'accès au token via JavaScript dans le navigateur
        secure: process.env.NODE_ENV === "production", // Envoie le cookie uniquement sur HTTPS en production
        path: "/", // Définit le chemin du cookie
        maxAge: 15 * 60 * 1000, // Définit la durée de vie du cookie à 15 minutes
      });
      next(); // Passe au middleware suivant avec le nouveau token d'accès
    } else {
      return res
        .status(401)
        .send({ message: "Unauthorized - Token refresh failed" });
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return res
      .status(401)
      .send({ message: "Unauthorized - Invalid refresh token" });
  }
};
