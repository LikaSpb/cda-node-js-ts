import { db } from "../data";
import { pokemons } from "../data/schema";
import { NewPokemons } from "../../domain/entities/Pokemon";
import { eq } from "drizzle-orm";

export class PokemonRepository {
  /**
   * Récupère toutes les entrées de Pokémon dans la base de données.
   * @returns {Promise<any[]>} Une promesse qui résout avec un tableau de tous les Pokémon.
   */
  findAll() {
    return db.query.pokemons.findMany({
      columns: {
        id: true,
        name: true,
        typeId: true,
      },
    });
  }

  /**
   * Récupère un Pokémon spécifique par son identifiant.
   * @param {string} id - L'identifiant du Pokémon à récupérer.
   * @returns {Promise<any>} Une promesse qui résout avec le Pokémon trouvé.
   */
  findById(id: string) {
    return db.query.pokemons.findFirst({
      where: eq(pokemons.id, id),
      columns: {
        id: true,
        name: true,
        typeId: true,
      },
    });
  }

  /**
   * Crée une nouvelle entrée de Pokémon dans la base de données.
   * @param {NewPokemons} pokemonData - Les données du nouveau Pokémon.
   * @returns {Promise<any>} Une promesse qui résout avec les détails du Pokémon créé.
   */
  create(pokemonData: NewPokemons) {
    return db.insert(pokemons).values(pokemonData).execute();
  }

  /**
   * Met à jour les données d'un Pokémon existant.
   * @param {string} id - L'identifiant du Pokémon à mettre à jour.
   * @param {Partial<NewPokemons>} pokemonData - Un objet contenant les données à mettre à jour.
   * @returns {Promise<any>} Une promesse qui résout avec les détails du Pokémon mis à jour.
   */
  update(id: string, pokemonData: Partial<NewPokemons>) {
    return db
      .update(pokemons)
      .set(pokemonData)
      .where(eq(pokemons.id, id))
      .execute();
  }

  /**
   * Supprime une entrée de Pokémon de la base de données.
   * @param {string} id - L'identifiant du Pokémon à supprimer.
   * @returns {Promise<boolean>} Une promesse qui indique si la suppression a été réussie.
   */
  delete(id: string) {
    return db
      .delete(pokemons)
      .where(eq(pokemons.id, id))
      .execute()
      .catch((err) => {
        console.error("Error during deleting pokemon:", err);
        throw new Error("Impossible de supprimer le pokémon");
      });
  }
}
