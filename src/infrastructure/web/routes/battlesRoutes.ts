import { Router } from "express";
import {
  getAllBattles,
  getBattleById,
  createBattle,
  updateBattle,
  deleteBattle
} from "../controllers/BattleController";
import { isAuthenticated } from "../../../middlewares/isAuthenticated";
import { refreshTokenMiddleware } from "../../../middlewares/refreshToken";

const router = Router();

// GET localhost:8000/battles
router.get("/battles", getAllBattles);

// GET localhost:8000/battles/:id
router.get("/battles/:id", getBattleById);

// POST localhost:8000/battles
router.post(
  "/battles",
  refreshTokenMiddleware,
  isAuthenticated,
  createBattle
);

// PUT localhost:8000/battles/:id
router.put(
  "/battles/:id",
  refreshTokenMiddleware,
  isAuthenticated,
  updateBattle
);

// DELETE localhost:8000/battles/:id
router.delete(
  "/battles/:id",
  refreshTokenMiddleware,
  isAuthenticated,
  deleteBattle
);

export default router;
