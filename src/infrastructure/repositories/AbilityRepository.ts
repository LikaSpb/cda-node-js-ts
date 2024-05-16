import { db } from "../data";
import { abilities } from "../data/schema/abilities";
import { pokemonAbilities } from "../data/schema";
import { NewAbility } from "../../domain/entities/Ability";
import { and, eq } from "drizzle-orm";

export class AbilityRepository {
  /**
   * Récupère toutes les capacités disponibles.
   */
  findAll() {
    return db.query.abilities.findMany({
      columns: { id: true, name: true },
    });
  }

  /**
   * Récupère une capacité spécifique par son identifiant.
   * @param {string} id - L'identifiant de la capacité à récupérer.
   */
  findById(id: string) {
    return db.query.abilities.findFirst({
      where: eq(abilities.id, id),
      columns: { id: true, name: true, description: true, effect: true },
    });
  }

  /**
   * Crée une nouvelle capacité dans la base de données.
   * @param {NewAbility} abilityData - Les données de la nouvelle capacité.
   */
  create(abilityData: NewAbility) {
    return db.insert(abilities).values(abilityData).execute();
  }

  /**
   * Met à jour une capacité existante.
   * @param {string} id - L'identifiant de la capacité à mettre à jour.
   * @param {NewAbility} abilityData - Les nouvelles données pour la capacité.
   */
  update(id: string, abilityData: NewAbility) {
    return db
      .update(abilities)
      .set(abilityData)
      .where(eq(abilities.id, id))
      .execute();
  }

  /**
   * Supprime une capacité de la base de données.
   * @param {string} id - L'identifiant de la capacité à supprimer.
   */
  delete(id: string) {
    return db.delete(abilities).where(eq(abilities.id, id)).execute();
  }

  /**
   * Récupère toutes les capacités associées à un Pokémon spécifique.
   * @param {string} pokemonId - L'identifiant du Pokémon pour lequel récupérer les capacités.
   */
  findAbilitiesForPokemon(pokemonId: string) {
    return db.query.pokemonAbilities.findMany({
      where: eq(pokemonAbilities.pokemonId, pokemonId),
      columns: { id: true, pokemonId: true, abilityId: true },
    });
  }

  /**
   * Associe une capacité à un Pokémon.
   * @param {string} pokemonId - L'identifiant du Pokémon auquel ajouter la capacité.
   * @param {string} abilityId - L'identifiant de la capacité à ajouter.
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
}
