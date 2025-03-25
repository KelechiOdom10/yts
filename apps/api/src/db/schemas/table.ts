import { databaseConfig } from "@yts/shared";
import { sqliteTableCreator } from "drizzle-orm/sqlite-core/table";

export const sqliteTable = sqliteTableCreator(
  (name) => `${databaseConfig.prefix}_${name}`,
);
