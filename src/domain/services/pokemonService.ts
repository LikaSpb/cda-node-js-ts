import * as pokemonRepository from "../../infrastructure/repositories/pokemonRepository";
import { Pokemon, PokemonData } from "../../domain/entities/pokemon";

export const getAllPokemons = async (): Promise<Pokemon[]> => {
  return await pokemonRepository.findAll();
};

export const getPokemonById = async (
  id: number
): Promise<Pokemon | undefined> => {
  return await pokemonRepository.findById(id);
};

export const createPokemon = async (
  pokemonData: PokemonData
): Promise<Pokemon> => {
  return await pokemonRepository.create(pokemonData);
};

export const updatePokemon = async (
  id: number,
  pokemonData: Partial<PokemonData>
): Promise<Pokemon | undefined> => {
  return await pokemonRepository.update(id, pokemonData);
};

export const deletePokemon = async (id: number): Promise<boolean> => {
  return await pokemonRepository.remove(id);
};
