import fs from "fs";
import path from "path";
import { Pokemon, PokemonData } from "../../domain/entities/pokemon";

const dataPath = path.join(
  __dirname,
  "../../infrastructure/data/pokemons.json"
);

const readPokemonFile = async (): Promise<Pokemon[]> => {
  const data = await fs.promises.readFile(dataPath, "utf-8");
  return JSON.parse(data);
};

const writePokemonFile = async (data: Pokemon[]) => {
  await fs.promises.writeFile(dataPath, JSON.stringify(data, null, 2), "utf-8");
};

export const findAll = async (): Promise<Pokemon[]> => {
  return await readPokemonFile();
};


export const findById = async (id: number): Promise<Pokemon | undefined> => {
  const pokemons = await readPokemonFile();
  return pokemons.find((pokemon) => pokemon.id === id);
};

export const create = async (pokemonData: PokemonData): Promise<Pokemon> => {
  const pokemons = await readPokemonFile();
  // Calcul de l'ID suivant : 1 si la liste est vide, sinon max(id) + 1
  const nextId =
    pokemons.length > 0
      ? Math.max(...pokemons.map((p) => p.id as number)) + 1
      : 1;
  const newPokemon: Pokemon = { ...pokemonData, id: nextId, typeId: [] };

  pokemons.push(newPokemon);
  await writePokemonFile(pokemons);
  return newPokemon;
};

export const update = async (
  id: number,
  pokemonData: Partial<PokemonData>
): Promise<Pokemon | undefined> => {
  const pokemons = await readPokemonFile();
  const index = pokemons.findIndex((pokemon) => pokemon.id === id);
  if (index === -1) return undefined;
  pokemons[index] = { ...pokemons[index], ...pokemonData };
  await writePokemonFile(pokemons);
  return pokemons[index];
};

export const remove = async (id: number): Promise<boolean> => {
  const pokemons = await readPokemonFile();
  const filteredPokemons = pokemons.filter((pokemon) => pokemon.id !== id);
  await writePokemonFile(filteredPokemons);
  return filteredPokemons.length < pokemons.length;
};
