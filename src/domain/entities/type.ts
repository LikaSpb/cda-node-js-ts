import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { types } from "../../infrastructure/data/schema/types";

export type Type = InferSelectModel<typeof types>;
export type NewType = InferInsertModel<typeof types>;

export type TypeColumns = { [K in keyof Type]?: Type };
