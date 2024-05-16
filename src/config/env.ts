/**
 * @fileoverview Ce fichier contient la configuration des variables d'environnement utilisées dans l'application.
 * Il définit les valeurs par défaut pour chaque variable d'environnement requise par l'application, garantissant
 * ainsi que l'application dispose de toutes les configurations nécessaires pour fonctionner correctement,
 * même si certaines variables ne sont pas définies dans l'environnement externe.
 */

import { EnvConfig } from "../types/env";

const env: EnvConfig = {
  PORT: parseInt(process.env.PORT || "8000"),
  JWT_SECRET: process.env.JWT_SECRET || "MonS3cr3tTropBienGardé123:!",
  FRONTEND_URL : process.env.JWT_SECRET || "http://localhost:5173",
  REFRESH_SECRET:
    process.env.REFRESH_SECRET || "MonS3cr3tTropBienGardé123IlEstR3fr3sh§:!",
  NODE_ENV:
    (process.env.NODE_ENV as "development" | "production" | "test") ||
    "development",
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:admin@localhost:5432/my_pokemon_db"
};

export default env;
