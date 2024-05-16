import { Router } from "express";
import {
  getAllTypes,
  getTypeById,
  createType,
  updateType,
  deleteType,
} from "../controllers/TypeController";

const router = Router();

// GET tous les types
router.get("/types", getAllTypes);

// GET un type par ID
router.get("/types/:id", getTypeById);

// POST créer un nouveau type
router.post("/types", createType);

// PUT mettre à jour un type
router.put("/types/:id", updateType);

// DELETE supprimer un type
router.delete("/types/:id", deleteType);

export default router;
