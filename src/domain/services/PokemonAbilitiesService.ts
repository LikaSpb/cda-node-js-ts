import { PokemonAbilitiesRepository } from "../../infrastructure/repositories/PokemonAbilitiesRepository";
import { NewPokemonAbility } from "../entities/PokemonAbility";

export class PokemonAbilitiesService {
  private pokemonAbilitiesRepository: PokemonAbilitiesRepository;

  /**
   * Initialise une nouvelle instance de PokemonAbilitiesService.
   */
  constructor() {
    this.pokemonAbilitiesRepository = new PokemonAbilitiesRepository();
  }

  /**
   * Récupère toutes les capacités associées à un Pokémon spécifique.
   * @param {string} pokemonId - L'ID du Pokémon pour lequel récupérer les capacités.
   * @returns {Promise<any[]>} Une promesse qui résout avec une liste des capacités.
   */
  getAbilitiesForPokemon = async (pokemonId: string) => {
    return this.pokemonAbilitiesRepository.findAbilitiesForPokemon(pokemonId);
  };

  /**
   * Associe une nouvelle capacité à un Pokémon.
   * @param {string} pokemonId - L'ID du Pokémon auquel ajouter la capacité.
   * @param {string} abilityId - L'ID de la capacité à ajouter.
   * @returns {Promise<boolean>} Une promesse qui indique si l'ajout a été réussi.
   */
  addAbilityToPokemon = async (pokemonId: string, abilityId: string) => {
    return this.pokemonAbilitiesRepository.addAbilityToPokemon(
      pokemonId,
      abilityId
    );
  };

  /**
   * Supprime une capacité associée à un Pokémon.
   * @param {string} pokemonId - L'ID du Pokémon duquel retirer la capacité.
   * @param {string} abilityId - L'ID de la capacité à retirer.
   * @returns {Promise<boolean>} Une promesse qui indique si la suppression a été réussie.
   */
  removeAbilityFromPokemon = async (pokemonId: string, abilityId: string) => {
    return this.pokemonAbilitiesRepository.removeAbilityFromPokemon(
      pokemonId,
      abilityId
    );
  };

  /**
   * Récupère toutes les capacités disponibles.
   * @returns {Promise<any[]>} Une promesse qui résout avec la liste de toutes les capacités.
   */
  getAllAbilities = async () => {
    return this.pokemonAbilitiesRepository.findAllAbilities();
  };

  /**
   * Récupère une capacité spécifique par son ID.
   * @param {string} abilityId - L'ID de la capacité à récupérer.
   * @returns {Promise<any>} Une promesse qui résout avec la capacité demandée.
   */
  getAbilityById = async (abilityId: string) => {
    return this.pokemonAbilitiesRepository.findAbilityById(abilityId);
  };

  /**
   * Crée une nouvelle capacité dans la base de données.
   * @param {NewPokemonAbility} abilityData - Les données de la nouvelle capacité à créer.
   * @returns {Promise<any>} Une promesse qui résout avec la capacité créée.
   */
  createAbility = async (abilityData: NewPokemonAbility) => {
    return this.pokemonAbilitiesRepository.createAbility(abilityData);
  };

  /**
   * Met à jour une capacité existante.
   * @param {string} abilityId - L'ID de la capacité à mettre à jour.
   * @param {NewPokemonAbility} abilityData - Les nouvelles données pour la capacité.
   * @returns {Promise<any>} Une promesse qui résout avec la capacité mise à jour.
   */
  updateAbility = async (abilityId: string, abilityData: NewPokemonAbility) => {
    return this.pokemonAbilitiesRepository.updateAbility(
      abilityId,
      abilityData
    );
  };

  /**
   * Supprime une capacité de la base de données.
   * @param {string} abilityId - L'ID de la capacité à supprimer.
   * @returns {Promise<boolean>} Une promesse qui indique si la suppression a été réussie.
   */
  deleteAbility = async (abilityId: string) => {
    return this.pokemonAbilitiesRepository.deleteAbility(abilityId);
  };
}
