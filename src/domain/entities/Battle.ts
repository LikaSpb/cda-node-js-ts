import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { battles } from "../../infrastructure/data/schema/battles";

export type Battle = InferSelectModel<typeof battles>;
export type NewBattle = InferInsertModel<typeof battles>;

export type BattleColumns = { [K in keyof Battle]?: boolean };
