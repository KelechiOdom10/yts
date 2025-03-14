import { DATABASE_PREFIX } from "@yts/shared";
import { sqliteTableCreator } from "drizzle-orm/sqlite-core/table";

export const sqliteTable = sqliteTableCreator(
  (name) => `${DATABASE_PREFIX}_${name}`,
);
