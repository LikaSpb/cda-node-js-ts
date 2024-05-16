import { PokemonRepository } from "../../infrastructure/repositories/PokemonRepository";
import { NewPokemons, Pokemon } from "../entities/Pokemon";

export class PokemonService {
  private pokemonRepository: PokemonRepository;

  /**
   * Construit une nouvelle instance de PokemonService.
   */
  constructor() {
    this.pokemonRepository = new PokemonRepository();
  }

  /**
   * Récupère une liste de tous les Pokémon disponibles.
   */
  getAllPokemons = async () => {
    return this.pokemonRepository.findAll();
  };

  /**
   * Récupère un Pokémon spécifique par son identifiant.
   * @param {string} id - L'identifiant du Pokémon à récupérer.
   */
  getPokemonById = async (id: string) => {
    return this.pokemonRepository.findById(id);
  };

  /**
   * Crée un nouveau Pokémon dans la base de données.
   * @param {NewPokemons} pokemonData - Les données du nouveau Pokémon à créer.
   */
  createPokemon = async (pokemonData: NewPokemons) => {
    return this.pokemonRepository.create(pokemonData);
  };

  /**
   * Met à jour les données d'un Pokémon existant.
   * @param {string} id - L'identifiant du Pokémon à mettre à jour.
   * @param {Partial<NewPokemons>} pokemonData - Un objet contenant les données à mettre à jour.
   */
  updatePokemon = async (id: string, pokemonData: Partial<NewPokemons>) => {
    return this.pokemonRepository.update(id, pokemonData);
  };

  /**
   * Supprime un Pokémon de la base de données.
   * @param {string} id - L'identifiant du Pokémon à supprimer.
   */
  deletePokemon = async (id: string) => {
    return this.pokemonRepository.delete(id);
  };
}
