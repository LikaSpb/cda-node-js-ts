/**
 * @fileoverview Définitions des types pour la manipulation des entités 'Ability' dans la base de données.
 * Ce fichier utilise Drizzle ORM pour inférer les types de modèles utilisés lors des opérations de sélection
 * et d'insertion sur la table des 'abilities'.
 */

import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { abilities } from "../../infrastructure/data/schema/abilities";

export type Ability = InferSelectModel<typeof abilities>;
export type NewAbility = InferInsertModel<typeof abilities>;
