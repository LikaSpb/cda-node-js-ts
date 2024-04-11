import bcrypt from "bcrypt";
import * as trainerRepository from "../../infrastructure/repositories/trainerRepository";
import jwt from "jsonwebtoken";
import env from "../../config/env";

const saltRounds = 10;

const { REFRESH_SECRET, JWT_SECRET } = env;

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
  if (!trainer) {
    return null;
  }
  const match = await bcrypt.compare(password, trainer.password);
  if (match) {
    const accessToken = jwt.sign(
      { id: trainer.id, username: trainer.username },
      JWT_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { id: trainer.id, username: trainer.username },
      REFRESH_SECRET,
      { expiresIn: "7d" }
    );
    return { accessToken, refreshToken };
  } else {
    return null;
  }
};
