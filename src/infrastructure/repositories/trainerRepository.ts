import { db } from "../data";
import { trainers } from "../data/schema";
import { Trainer, NewTrainer } from "../../domain/entities/Trainer";
import { eq } from "drizzle-orm";

export class TrainerRepository {
  /**
   * Récupère toutes les entrées de dresseurs dans la base de données.
   * @returns {Promise<any[]>} Une promesse qui résout avec un tableau de tous les dresseurs.
   */
  findAll() {
    return db.query.trainers.findMany({
      columns: {
        id: true,
        username: true,
        password: true,
        refreshToken: true,
      },
    });
  }

  /**
   * Récupère un dresseur spécifique par son identifiant.
   * @param {string} id - L'identifiant du dresseur à récupérer.
   * @returns {Promise<any>} Une promesse qui résout avec le dresseur trouvé.
   */
  findById(id: string) {
    return db.query.trainers.findFirst({
      where: eq(trainers.id, id),
      columns: {
        id: true,
        username: true,
        password: true,
        refreshToken: true,
      },
    });
  }

  /**
   * Récupère un dresseur spécifique par son nom d'utilisateur.
   * @param {string} username - Le nom d'utilisateur du dresseur à récupérer.
   * @returns {Promise<any>} Une promesse qui résout avec le dresseur trouvé.
   */
  findByUsername(username: string) {
    return db.query.trainers.findFirst({
      where: eq(trainers.username, username),
      columns: {
        id: true,
        username: true,
        password: true,
      },
    });
  }

  /**
   * Crée une nouvelle entrée de dresseur dans la base de données.
   * @param {NewTrainer} trainerData - Les données du nouveau dresseur.
   * @returns {Promise<any>} Une promesse qui résout avec les détails du dresseur créé.
   */
  create(trainerData: NewTrainer) {
    return db.insert(trainers).values(trainerData).execute();
  }

  /**
   * Met à jour les données d'un dresseur existant.
   * @param {Partial<Trainer> & { id: string }} trainer - Un objet contenant les données à mettre à jour et l'identifiant du dresseur.
   * @returns {Promise<any>} Une promesse qui résout avec les détails du dresseur mis à jour.
   */
  update(trainer: Partial<Trainer> & { id: string }) {
    return db
      .update(trainers)
      .set(trainer)
      .where(eq(trainers.id, trainer.id))
      .execute();
  }

  /**
   * Supprime une entrée de dresseur de la base de données.
   * @param {string} id - L'identifiant du dresseur à supprimer.
   * @returns {Promise<boolean>} Une promesse qui indique si la suppression a été réussie.
   */
  delete(id: string) {
    try {
      db.delete(trainers).where(eq(trainers.id, id)).execute();
      return true;
    } catch (err) {
      console.error("Error deleting trainer:", err);
      throw new Error("Impossible de supprimer le dresseur");
    }
  }
}
