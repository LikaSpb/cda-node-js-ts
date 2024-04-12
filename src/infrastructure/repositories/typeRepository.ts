import fs from "fs";
import path from "path";
import { Type } from "../../domain/entities/type";

const dataPath = path.join(__dirname, "../../../data/types.json");

/**
 * Lit le fichier JSON des types et le convertit en tableau de types.
 * @returns {Promise<Type[]>} Une promesse résolue avec un tableau de tous les types.
 */
const readTypeFile = async (): Promise<Type[]> => {
  const data = await fs.promises.readFile(dataPath, "utf-8");
  return JSON.parse(data);
};

/**
 * Écrit un tableau de types dans le fichier JSON.
 * @param {Type[]} data - Le tableau de types à écrire.
 */
const writeTypeFile = async (data: Type[]) => {
  await fs.promises.writeFile(dataPath, JSON.stringify(data, null, 2), "utf-8");
};

/**
 * Récupère tous les types enregistrés.
 * @returns {Promise<Type[]>} Une promesse résolue avec un tableau de tous les types.
 */
export const findAll = async (): Promise<Type[]> => {
  return await readTypeFile();
};

/**
 * Trouve un type par son identifiant.
 * @param {number} id - L'identifiant du type à trouver.
 * @returns {Promise<Type | undefined>} Une promesse résolue avec le type trouvé ou undefined si aucun type n'est trouvé.
 */
export const findById = async (id: number): Promise<Type | undefined> => {
  const types = await readTypeFile();
  return types.find((type: Type) => type.id === id);
};
