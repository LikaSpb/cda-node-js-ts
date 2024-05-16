/**
 * @fileoverview Contrôleur pour gérer les opérations sur les batailles (battles).
 * Utilise le service BattleService pour effectuer des opérations CRUD et autres sur les batailles.
 */

import { Request, Response } from "express";
import { BattleService } from "../../../domain/services/BattleService";

const battleService = new BattleService();

/**
 * Récupère toutes les batailles.
 * @param {Request} req - La requête HTTP.
 * @param {Response} res - La réponse HTTP.
 */
export const getAllBattles = async (req: Request, res: Response) => {
  const battles = await battleService.getAllBattles();
  res.json(battles);
};

/**
 * Récupère une bataille par son identifiant.
 * @param {Request} req - La requête HTTP.
 * @param {Response} res - La réponse HTTP.
 */
export const getBattleById = async (req: Request, res: Response) => {
  const battle = await battleService.getBattleById(req.params.id);
  battle ? res.json(battle) : res.status(404).send("Battle not found");
};

/**
 * Crée une nouvelle bataille.
 * @param {Request} req - La requête HTTP.
 * @param {Response} res - La réponse HTTP.
 */
export const createBattle = async (req: Request, res: Response) => {
  const newBattle = await battleService.createBattle(req.body);
  res.status(201).json(newBattle);
};

/**
 * Met à jour une bataille existante.
 * @param {Request} req - La requête HTTP.
 * @param {Response} res - La réponse HTTP.
 */
export const updateBattle = async (req: Request, res: Response) => {
  const updatedBattle = await battleService.updateBattle(req.params.id, req.body);
  updatedBattle ? res.json(updatedBattle) : res.status(404).send("Battle not found");
};

/**
 * Supprime une bataille par son identifiant.
 * @param {Request} req - La requête HTTP.
 * @param {Response} res - La réponse HTTP.
 */
export const deleteBattle = async (req: Request, res: Response) => {
  const success = await battleService.deleteBattle(req.params.id);
  success ? res.status(204).send() : res.status(404).send("Battle not found");
};
