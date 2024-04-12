import express from "express";
import {
  registerTrainer,
  loginTrainer,
} from "../controllers/TrainerController";

const router = express.Router();

// POST localhost:8000/register
// Route pour enregistrer un nouveau dresseur. Exige un nom d'utilisateur et un mot de passe.
// {
//   "username": "test",
//   "password": "test"
// }
router.post("/register", registerTrainer);

// POST localhost:8000/login
// Route pour connecter un dresseur. Exige un nom d'utilisateur et un mot de passe et renvoie un token d'accès.
router.post("/login", loginTrainer);

export default router;
