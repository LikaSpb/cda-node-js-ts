import fs from "fs";
import path from "path";
import { Trainer } from "../../domain/entities/trainer";

const dataPath = path.join(
  __dirname,
  "../../infrastructure/data/trainers.json"
);

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

const readTrainerFile = async (): Promise<Trainer[]> => {
  try {
    const data = await fs.promises.readFile(dataPath, "utf-8");
    return JSON.parse(data) as Trainer[];
  } catch (error) {
    console.error("Failed to read trainers file:", error);
    throw new Error("Failed to read trainers data");
  }
};

export const findByUsername = async (
  username: string
): Promise<Trainer | undefined> => {
  const trainers = await readTrainerFile();
  return trainers.find((trainer: Trainer) => trainer.username === username);
};
