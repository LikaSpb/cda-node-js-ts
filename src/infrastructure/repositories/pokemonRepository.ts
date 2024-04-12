import fs from "fs";
import path from "path";
import { Pokemon, PokemonData } from "../../domain/entities/pokemon";

const dataPath = path.join(
  __dirname,
  "../../infrastructure/data/pokemons.json"
);

/**
 * Lit le fichier JSON des Pokémon et le convertit en tableau de Pokémon.
 * @returns {Promise<Pokemon[]>} Une promesse résolue avec un tableau de Pokémon.
 */
const readPokemonFile = async (): Promise<Pokemon[]> => {
  const data = await fs.promises.readFile(dataPath, "utf-8");
  return JSON.parse(data);
};

/**
 * Écrit un tableau de Pokémon dans le fichier JSON.
 * @param {Pokemon[]} data - Tableau de Pokémon à écrire.
 */
const writePokemonFile = async (data: Pokemon[]) => {
  await fs.promises.writeFile(dataPath, JSON.stringify(data, null, 2), "utf-8");
};

/**
 * Récupère tous les Pokémon enregistrés.
 * @returns {Promise<Pokemon[]>} Une promesse résolue avec un tableau de tous les Pokémon.
 */
export const findAll = async (): Promise<Pokemon[]> => {
  return await readPokemonFile();
};

/**
 * Trouve un Pokémon par son identifiant.
 * @param {number} id - Identifiant du Pokémon à trouver.
 * @returns {Promise<Pokemon | undefined>} Une promesse résolue avec le Pokémon trouvé ou undefined si aucun Pokémon n'est trouvé.
 */
export const findById = async (id: number): Promise<Pokemon | undefined> => {
  const pokemons = await readPokemonFile();
  return pokemons.find((pokemon) => pokemon.id === id);
};

/**
 * Crée un nouveau Pokémon et l'ajoute au stockage.
 * @param {pokemonData} pokemonData- Les données du nouveau Pokémon.
 * @returns {Promise<Pokemon>} Une promesse résolue avec le Pokémon nouvellement créé.
 */
export const create = async (pokemonData: PokemonData): Promise<Pokemon> => {
  const pokemons = await readPokemonFile();
  const nextId =
    pokemons.length > 0
      ? Math.max(...pokemons.map((p) => p.id as number)) + 1
      : 1;
  const newPokemon: Pokemon = {
    id: nextId,
    name: pokemonData.name,
    typeId: pokemonData.typeId,
  };

  pokemons.push(newPokemon);
  await writePokemonFile(pokemons);
  return newPokemon;
};

/**
 * Met à jour un Pokémon par son ID avec les nouvelles données fournies.
 * @param {number} id - ID du Pokémon à mettre à jour.
 * @param {Partial<PokemonData>} pokemonData - Données partielles pour la mise à jour du Pokémon.
 * @returns {Promise<Pokemon | undefined>} Une promesse résolue avec le Pokémon mis à jour, ou undefined si aucun Pokémon correspondant n'a été trouvé.
 */
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

/**
 * Supprime un Pokémon du stockage par son identifiant.
 * @param {number} id - Identifiant du Pokémon à supprimer.
 * @returns {Promise<boolean>} Une promesse résolue avec true si le Pokémon a été supprimé, ou false si aucun Pokémon correspondant n'a été trouvé.
 */
export const remove = async (id: number): Promise<boolean> => {
  const pokemons = await readPokemonFile();
  const filteredPokemons = pokemons.filter((pokemon) => pokemon.id !== id);
  await writePokemonFile(filteredPokemons);
  return filteredPokemons.length < pokemons.length;
};
