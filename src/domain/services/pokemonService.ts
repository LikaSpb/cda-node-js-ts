import * as pokemonRepository from "../../infrastructure/repositories/pokemonRepository";

export const getAllPokemons = async () => {
  return await pokemonRepository.findAll();
};

export const getPokemonById = async (id: number) => {
  return await pokemonRepository.findById(id);
};
