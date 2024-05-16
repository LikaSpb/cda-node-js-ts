/**
 * @fileoverview Configuration pour Drizzle ORM pour se connecter à la base de données PostgreSQL
 * en utilisant les variables d'environnement. Cette configuration définit l'emplacement du schéma,
 * le répertoire de sortie pour les fichiers générés, le dialecte de la base de données et les détails
 * de connexion à la base de données.
 */


import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import env from './env';

const { DATABASE_URL } = env;

export default defineConfig({
    schema: 'src/infrastructure/data/schema/index.ts',
    out: 'src/infrastructure/data/drizzle',
    dialect: "postgresql",
    dbCredentials: {
        url: DATABASE_URL
    },
    verbose: true,
});
