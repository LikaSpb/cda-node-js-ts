import { db } from "../data";
import { battles } from "../data/schema/battles";
import { eq } from "drizzle-orm";

export class BattleRepository {
  /**
   * Récupère toutes les batailles enregistrées dans la base de données.
   */
  findAll() {
    return db.query.battles.findMany();
  }

  /**
   * Récupère une bataille spécifique par son identifiant.
   * @param {string} id - L'identifiant de la bataille à récupérer.
   */
  findById(id: string) {
    return db.query.battles.findFirst({
      where: eq(battles.id, id),
    });
  }

  /**
   * Crée une nouvelle bataille dans la base de données.
   * @param {any} battleData - Les données de la nouvelle bataille.
   */
  create(battleData: any) {
    return db.insert(battles).values(battleData).execute();
  }

  /**
   * Met à jour les données d'une bataille existante.
   * @param {string} id - L'identifiant de la bataille à mettre à jour.
   * @param {any} battleData - Les nouvelles données pour la bataille.
   */
  update(id: string, battleData: any) {
    return db
      .update(battles)
      .set(battleData)
      .where(eq(battles.id, id))
      .execute();
  }

  /**
   * Supprime une bataille de la base de données.
   * @param {string} id - L'identifiant de la bataille à supprimer.
   */
  delete(id: string) {
    return db.delete(battles).where(eq(battles.id, id)).execute();
  }
}
