import jwt from "jsonwebtoken";
import env from "../../config/env";
import bcrypt from "bcrypt";
import { TrainerRepository } from "../../infrastructure/repositories/TrainerRepository";

const { REFRESH_SECRET, JWT_SECRET } = env;

export class AuthService {
  private refreshTokenStore: Map<string, string> = new Map();
  private saltRounds = 10;
  private trainerRepository: TrainerRepository = new TrainerRepository();

  /**
   * Génère un token d'accès JWT pour un utilisateur.
   * @param {string} userId - L'ID de l'utilisateur pour lequel générer le token.
   * @returns {string} Le token JWT généré.
   */
  issueAccessToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15m" });
  }

  /**
   * Génère un token de rafraîchissement JWT pour un utilisateur.
   * @param {string} userId - L'ID de l'utilisateur pour lequel générer le token de rafraîchissement.
   * @returns {Promise<string>} Le token de rafraîchissement JWT généré.
   */
  async issueRefreshToken(userId: string): Promise<string> {
    const refreshToken = jwt.sign({ userId }, REFRESH_SECRET, {
      expiresIn: "7d",
    });
    this.refreshTokenStore.set(userId, refreshToken);
    return refreshToken;
  }

  /**
   * Rafraîchit le token d'accès en utilisant un token de rafraîchissement existant.
   * @param {string} refreshToken - Le token de rafraîchissement à valider et à utiliser pour générer un nouveau token d'accès.
   * @returns {Promise<string>} Un nouveau token d'accès JWT.
   * @throws {Error} Si le token de rafraîchissement est invalide ou expiré.
   */
  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const payload = jwt.verify(
        refreshToken,
        REFRESH_SECRET
      ) as jwt.JwtPayload;
      if (!payload.userId) {
        throw new Error("Invalid token payload");
      }
      return this.issueAccessToken(payload.userId);
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw new Error("Invalid refresh token");
    }
  }

  /**
   * Crée un nouveau formateur dans la base de données.
   * @param {string} username - Le nom d'utilisateur du nouveau formateur.
   * @param {string} password - Le mot de passe du formateur, qui sera haché avant stockage.
   * @returns {Promise<object>} Le formateur créé.
   * @throws {Error} Si le nom d'utilisateur existe déjà.
   */
  async createTrainer(username: string, password: string) {
    const existingTrainer = await this.trainerRepository.findByUsername(
      username
    );
    if (existingTrainer) {
      throw new Error("Username already exists");
    }
    const hash = await bcrypt.hash(password, this.saltRounds);
    return this.trainerRepository.create({ username, password: hash });
  }

  /**
   * Authentifie un formateur en vérifiant son nom d'utilisateur et son mot de passe.
   * @param {string} username - Le nom d'utilisateur du formateur à authentifier.
   * @param {string} password - Le mot de passe à vérifier.
   * @returns {Promise<{ accessToken: string; refreshToken: string } | null>} Les tokens d'accès et de rafraîchissement si l'authentification réussit, sinon null.
   */
  async authenticateTrainer(
    username: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    const trainer = await this.trainerRepository.findByUsername(username);
    if (!trainer) {
      return null;
    }

    const match = await bcrypt.compare(password, trainer.password);
    if (match) {
      const accessToken = this.issueAccessToken(trainer.id.toString());
      const refreshToken = await this.issueRefreshToken(trainer.id.toString());
      return { accessToken, refreshToken };
    }
    return null;
  }
}
