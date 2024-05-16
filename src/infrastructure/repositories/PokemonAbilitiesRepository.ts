import { db } from "../data";
import { abilities, pokemonAbilities } from "../data/schema";
import { and, eq } from "drizzle-orm";

export class PokemonAbilitiesRepository {
  /**
   * Récupère toutes les capacités associées à un Pokémon spécifique.
   * @param {string} pokemonId - L'identifiant du Pokémon pour lequel récupérer les capacités.
   * @returns {Promise<any[]>} Une promesse qui résout avec une liste des capacités associées au Pokémon.
   */
  findAbilitiesForPokemon(pokemonId: string) {
    return db.query.pokemonAbilities.findMany({
      where: eq(pokemonAbilities.pokemonId, pokemonId),
      columns: {
        id: true,
        pokemonId: true,
        abilityId: true,
      },
    });
  }

  /**
   * Associe une capacité à un Pokémon.
   * @param {string} pokemonId - L'identifiant du Pokémon auquel ajouter la capacité.
   * @param {string} abilityId - L'identifiant de la capacité à ajouter.
   * @returns {Promise<any>} Une promesse qui indique si l'ajout a été réussi.
   */
  addAbilityToPokemon(pokemonId: string, abilityId: string) {
    return db
      .insert(pokemonAbilities)
      .values({ pokemonId, abilityId })
      .execute();
  }

  /**
   * Retire une capacité d'un Pokémon.
   * @param {string} pokemonId - L'identifiant du Pokémon dont retirer la capacité.
   * @param {string} abilityId - L'identifiant de la capacité à retirer.
   * @returns {Promise<any>} Une promesse qui indique si la suppression a été réussie.
   */
  removeAbilityFromPokemon(pokemonId: string, abilityId: string) {
    return db
      .delete(pokemonAbilities)
      .where(
        and(
          eq(pokemonAbilities.pokemonId, pokemonId),
          eq(pokemonAbilities.abilityId, abilityId)
        )
      )
      .execute();
  }

  /**
   * Récupère toutes les capacités disponibles.
   * @returns {Promise<any[]>} Une promesse qui résout avec une liste de toutes les capacités.
   */
  findAllAbilities() {
    return db.query.abilities.findMany({
      columns: {
        id: true,
        name: true,
      },
    });
  }

  /**
   * Récupère une capacité spécifique par son identifiant.
   * @param {string} abilityId - L'identifiant de la capacité à récupérer.
   * @returns {Promise<any>} Une promesse qui résout avec la capacité trouvée.
   */
  findAbilityById(abilityId: string) {
    return db.query.abilities.findFirst({
      where: eq(abilities.id, abilityId),
      columns: {
        id: true,
        name: true,
      },
    });
  }

  /**
   * Crée une nouvelle capacité dans la base de données.
   * @param {any} abilityData - Les données de la nouvelle capacité.
   * @returns {Promise<any>} Une promesse qui résout avec les détails de la capacité créée.
   */
  createAbility(abilityData: any) {
    return db.insert(abilities).values(abilityData).execute();
  }

  /**
   * Met à jour les données d'une capacité existante.
   * @param {string} abilityId - L'identifiant de la capacité à mettre à jour.
   * @param {any} abilityData - Les nouvelles données pour la capacité.
   * @returns {Promise<any>} Une promesse qui résout avec les détails de la capacité mise à jour.
   */
  updateAbility(abilityId: string, abilityData: any) {
    return db
      .update(abilities)
      .set(abilityData)
      .where(eq(abilities.id, abilityId))
      .execute();
  }

  /**
   * Supprime une capacité de la base de données.
   * @param {string} abilityId - L'identifiant de la capacité à supprimer.
   * @returns {Promise<any>} Une promesse qui indique si la suppression a été réussie.
   */
  deleteAbility(abilityId: string) {
    return db.delete(abilities).where(eq(abilities.id, abilityId)).execute();
  }
}
