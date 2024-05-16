import { TypeRepository } from "../../infrastructure/repositories/TypeRepository";

export class TypeService {
  private typeRepository: TypeRepository;

  /**
   * Construit une nouvelle instance de TypeService et initialise le repository associé.
   */
  constructor() {
    this.typeRepository = new TypeRepository();
  }

  /**
   * Récupère une liste de tous les types disponibles.
   * @returns {Promise<any[]>} Une promesse qui résout avec un tableau de tous les types.
   */
  getAllTypes = async () => {
    return this.typeRepository.findAll();
  };

  /**
   * Récupère un type spécifique par son identifiant.
   * @param {string} id - L'identifiant du type à récupérer.
   * @returns {Promise<any>} Une promesse qui résout avec le type demandé.
   */
  getTypeById = async (id: string) => {
    return this.typeRepository.findById(id);
  };

  /**
   * Crée un nouveau type dans la base de données.
   * @param {any} typeData - Les données du nouveau type à créer.
   * @returns {Promise<any>} Une promesse qui résout avec le détail du type créé.
   */
  createType = async (typeData: any) => {
    return this.typeRepository.createType(typeData);
  };

  /**
   * Met à jour les données d'un type existant.
   * @param {string} id - L'identifiant du type à mettre à jour.
   * @param {any} typeData - Un objet contenant les données à mettre à jour.
   * @returns {Promise<any>} Une promesse qui résout avec le type mis à jour.
   */
  updateType = async (id: string, typeData: any) => {
    return this.typeRepository.updateType(id, typeData);
  };

  /**
   * Supprime un type de la base de données.
   * @param {string} id - L'identifiant du type à supprimer.
   * @returns {Promise<boolean>} Une promesse qui indique si la suppression a été réussie.
   */
  deleteType = async (id: string) => {
    return this.typeRepository.deleteType(id);
  };
}
