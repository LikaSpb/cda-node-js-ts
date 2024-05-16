import { BattleRepository } from "../../infrastructure/repositories/BattleRepository";

/**
 * Classe de service pour la gestion des combats dans l'application.
 * Offre des méthodes pour la récupération, la création, la mise à jour et la suppression des combats.
 */
export class BattleService {
  private battleRepository: BattleRepository;

  /**
   * Initialise une nouvelle instance de BattleService.
   */
  constructor() {
    this.battleRepository = new BattleRepository();
  }

  /**
   * Récupère tous les combats enregistrés dans la base de données.
   * @returns {Promise<any[]>} Une promesse qui renvoie la liste de tous les combats.
   */
  async getAllBattles() {
    return this.battleRepository.findAll();
  }

  /**
   * Récupère les détails d'un combat spécifique par son ID.
   * @param {string} id - L'ID du combat à récupérer.
   * @returns {Promise<any>} Une promesse qui renvoie le combat correspondant à l'ID fourni.
   */
  async getBattleById(id: string) {
    return this.battleRepository.findById(id);
  }

  /**
   * Crée un nouveau combat dans la base de données.
   * @param {any} battleData - Les données du combat à créer.
   * @returns {Promise<any>} Une promesse qui renvoie les détails du combat créé.
   */
  async createBattle(battleData: any) {
    return this.battleRepository.create(battleData);
  }

  /**
   * Met à jour les données d'un combat existant.
   * @param {string} id - L'ID du combat à mettre à jour.
   * @param {any} battleData - Les nouvelles données pour le combat.
   * @returns {Promise<any>} Une promesse qui renvoie le combat mis à jour.
   */
  async updateBattle(id: string, battleData: any) {
    return this.battleRepository.update(id, battleData);
  }

  /**
   * Supprime un combat de la base de données.
   * @param {string} id - L'ID du combat à supprimer.
   * @returns {Promise<boolean>} Une promesse qui indique si la suppression a été réussie.
   */
  async deleteBattle(id: string) {
    return this.battleRepository.delete(id);
  }
}
