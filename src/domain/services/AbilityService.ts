import { AbilityRepository } from "../../infrastructure/repositories/AbilityRepository";
import { Ability } from "../entities/Ability";

export class AbilityService {
  private abilityRepository: AbilityRepository;

  constructor() {
    this.abilityRepository = new AbilityRepository();
  }

  // Récupère toutes les capacités stockées dans la base de données.
  async getAllAbilities() {
    return await this.abilityRepository.findAll();
  }

  // Récupère une capacité par son ID.
  async getAbilityById(id: string) {
    return await this.abilityRepository.findById(id);
  }

  // Crée une nouvelle capacité dans la base de données.
  async createAbility(abilityData: Ability) {
    return await this.abilityRepository.create(abilityData);
  }

  // Met à jour les données d'une capacité existante.
  async updateAbility(id: string, abilityData: Ability) {
    return await this.abilityRepository.update(id, abilityData);
  }

  // Supprime une capacité de la base de données.
  async deleteAbility(id: string) {
    return await this.abilityRepository.delete(id);
  }

  // Récupère les capacités associées à un Pokémon spécifique.
  async getAbilitiesForPokemon(pokemonId: string) {
    return await this.abilityRepository.findAbilitiesForPokemon(pokemonId);
  }

  // Ajoute une capacité à un Pokémon.
  async addAbilityToPokemon(pokemonId: string, abilityId: string) {
    return await this.abilityRepository.addAbilityToPokemon(
      pokemonId,
      abilityId
    );
  }

  // Retire une capacité d'un Pokémon.
  async removeAbilityFromPokemon(pokemonId: string, abilityId: string) {
    return await this.abilityRepository.removeAbilityFromPokemon(
      pokemonId,
      abilityId
    );
  }
}
