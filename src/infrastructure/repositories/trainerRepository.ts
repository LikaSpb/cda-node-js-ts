import fs from "fs";
import path from "path";
import { Trainer } from "../../domain/entities/trainer";

const dataPath = path.join(
  __dirname,
  "../../infrastructure/data/trainers.json"
);

/**
 * Crée un nouveau dresseur et l'ajoute au fichier JSON.
 * @param {string} username - Le nom d'utilisateur du dresseur.
 * @param {string} password - Le mot de passe du dresseur.
 * @returns {Promise<Trainer>} Une promesse résolue avec le dresseur nouvellement créé.
 */
export const create = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<Trainer> => {
  const trainers = await readTrainerFile();
  const newTrainer: Trainer = {
    id:
      trainers.length > 0
        ? Math.max(...trainers.map((t) => t.id as number)) + 1
        : 1,
    username,
    password,
  };
  trainers.push(newTrainer);
  await fs.promises.writeFile(
    dataPath,
    JSON.stringify(trainers, null, 2),
    "utf-8"
  );
  return newTrainer;
};

/**
 * Lit le fichier JSON des dresseur et le convertit en tableau de dresseurs.
 * @returns {Promise<Trainer[]>} Une promesse résolue avec un tableau de dresseurs.
 */
const readTrainerFile = async (): Promise<Trainer[]> => {
  try {
    const data = await fs.promises.readFile(dataPath, "utf-8");
    return JSON.parse(data) as Trainer[];
  } catch (error) {
    console.error("Échec de la lecture du fichier des dresseurs :", error);
    throw new Error("Échec de la lecture des données des dresseurs");
  }
};

/**
 * Trouve un dresseur par son nom d'utilisateur.
 * @param {string} username - Le nom d'utilisateur du dresseur à trouver.
 * @returns {Promise<Trainer | undefined>} Une promesse résolue avec le dresseur trouvé ou undefined si aucun dresseur n'est trouvé.
 */
export const findByUsername = async (
  username: string
): Promise<Trainer | undefined> => {
  const trainers = await readTrainerFile();
  return trainers.find((trainer: Trainer) => trainer.username === username);
};
