import { db } from "../data";
import { types } from "../data/schema";
import { Type } from "../../domain/entities/Type";
import { eq } from "drizzle-orm";

/**
 * Repository qui gère le CRUD des types de Pokémon
 */
export class TypeRepository {
  /**
   * Récupère tous les types de Pokémon
   */
   findAll() {
    try {
      return db.query.types.findMany({
        columns: {
          id: true,
          name: true,
        },
      });
    } catch (err) {
      console.error("Error fetching all types:", err);
      throw new Error("Impossible de récupérer les types");
    }
  }

  /**
   * Récupère un type de Pokémon par son identifiant
   * @param id - L'identifiant du type
   */
   findById(id: string) {
    try {
      return db.query.types.findFirst({
        where: eq(types.id, id),
        columns: {
          id: true,
          name: true,
        },
      });
    } catch (err) {
      console.error("Error fetching type by ID:", err);
      throw new Error("Impossible de récupérer le type");
    }
  }

  /**
   * Crée un nouveau type de Pokémon
   * @param type - Les données du nouveau type
   */
   createType(type: Omit<Type, "id">) {
    try {
      return db.insert(types).values(type).execute();
    } catch (err) {
      console.error("Error creating type:", err);
      throw new Error("Impossible de créer le type");
    }
  }

  /**
   * Met à jour un type de Pokémon
   * @param id - L'identifiant du type à mettre à jour
   * @param type - Les nouvelles données pour le type
   */
   updateType(id: string, type: Partial<Type>) {
    try {
      return db.update(types).set(type).where(eq(types.id, id)).execute();
    } catch (err) {
      console.error("Error updating type:", err);
      throw new Error("Impossible de mettre à jour le type");
    }
  }

  /**
   * Supprime un type de Pokémon par son identifiant
   * @param id - L'identifiant du type à supprimer
   */
  async deleteType(id: string) {
    return db
      .delete(types)
      .where(eq(types.id, id))
      .catch((err) => {
        console.error("Error deleting type:", err);
        throw new Error("Impossible de supprimer le type");
      });
  }
}
