import express from "express";
import {
  registerTrainer,
  loginTrainer,
} from "../controllers/trainerController";

const router = express.Router();

router.post("/register", registerTrainer);
router.post("/login", loginTrainer);

export default router;
