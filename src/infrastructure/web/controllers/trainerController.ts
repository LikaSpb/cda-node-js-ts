import { Request, Response } from "express";
import { AuthService } from "../../../domain/services/AuthService";
import { TrainerRepository } from "../../repositories/TrainerRepository";

const authService = new AuthService();
const trainerRpository = new TrainerRepository();

/**
 * Enregistre un nouveau dresseur avec un nom d'utilisateur et un mot de passe.
 * @param {Request} req - La requête HTTP, contenant dans le corps le nom d'utilisateur et le mot de passe.
 * @param {Response} res - La réponse HTTP.
 */
export const registerTrainer = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({
        message: "Le nom d'utilisateur et le mot de passe sont requis.",
      });
    }
    const newTrainer = await authService.createTrainer(username, password);
    return res.status(201).send({ username: username }); // Assure-toi que newTrainer contient username
  } catch (error) {
    if (error instanceof Error && error.message === "Username already exists") {
      return res.status(409).send({ message: error.message });
    }
    console.error(error);
    return res.status(500).send({ message: "Erreur interne du serveur" });
  }
};

/**
 * Connecte un dresseur en vérifiant son nom d'utilisateur et son mot de passe.
 * @param {Request} req - La requête HTTP, contenant dans le corps le nom d'utilisateur et le mot de passe.
 * @param {Response} res - La réponse HTTP.
 */
export const loginTrainer = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const tokens = await authService.authenticateTrainer(username, password);
    if (tokens) {
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/refresh-token",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).send({ accessToken: tokens.accessToken });
    } else {
      return res.status(401).send({ message: "Identifiants invalides" });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: "Erreur interne du serveur" });
  }
};
