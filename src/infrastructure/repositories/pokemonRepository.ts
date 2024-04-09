import fs from 'fs';
import path from 'path';

interface Pokemon {
  id: number;
  name: string;
  type: string;
}

const dataPath = path.join(__dirname, '..', 'data', 'pokemons.json');

export const findAll = async (): Promise<Pokemon[]> => {
  try {
    const jsonData = await fs.promises.readFile(dataPath, 'utf-8');
    const pokemons: Pokemon[] = JSON.parse(jsonData);
    return pokemons;
  } catch (err) {
    console.error('Error reading the pokemons data file:', err);
    throw err;
  }
};

export const findById = async (id: number): Promise<Pokemon | undefined> => {
  try {
    const jsonData = await fs.promises.readFile(dataPath, 'utf-8');
    const pokemons: Pokemon[] = JSON.parse(jsonData);
    return pokemons.find(pokemon => pokemon.id === id);
  } catch (err) {
    console.error('Error reading the pokemons data file:', err);
    throw err;
  }
};
