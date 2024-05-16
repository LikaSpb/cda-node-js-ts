import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { trainers } from "../../infrastructure/data/schema/trainers"

export type Trainer = InferSelectModel<typeof trainers>;
export type NewTrainer = InferInsertModel<typeof trainers>;

export type TrainerColumns = { [K in keyof Trainer]?: boolean }