import bcrypt from "bcrypt";
import * as trainerRepository from "../../infrastructure/repositories/trainerRepository";
import { AuthService } from "./AuthService";

const saltRounds = 10;

const authService = new AuthService();

export const createTrainer = async (username: string, password: string) => {
  const existingTrainer = await trainerRepository.findByUsername(username);
  if (existingTrainer) {
    throw new Error("Username already exists");
  }
  const hash = await bcrypt.hash(password, saltRounds);
  return trainerRepository.create({ username, password: hash });
};

export const authenticateTrainer = async (
  username: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string } | null> => {
  const trainer = await trainerRepository.findByUsername(username);
  if (!trainer || trainer.id === undefined) {
    // S'il n'y a pas de trainer ou si l'id est undefined, retourne null
    return null;
  }

  const match = await bcrypt.compare(password, trainer.password);
  if (match) {
    // l'instance de AuthService pour générer les tokens
    const accessToken = authService.issueAccessToken(trainer.id.toString());
    const refreshToken = authService.issueRefreshToken(trainer.id.toString());
    return { accessToken, refreshToken };
  } else {
    return null;
  }
};
