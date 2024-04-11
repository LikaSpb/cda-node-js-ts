import fs from "fs";
import path from "path";
import { Type } from "../../domain/entities/type";

const dataPath = path.join(__dirname, "../../../data/types.json");

const readTypeFile = async (): Promise<Type[]> => {
  const data = await fs.promises.readFile(dataPath, "utf-8");
  return JSON.parse(data);
};

const writeTypeFile = async (data: Type[]) => {
  await fs.promises.writeFile(dataPath, JSON.stringify(data, null, 2), "utf-8");
};

export const findAll = async (): Promise<Type[]> => {
  return await readTypeFile();
};

export const findById = async (id: number): Promise<Type | undefined> => {
  const types = await readTypeFile();
  return types.find((type: Type) => type.id === id);
};
