import { defineConfig } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_AUTH_TOKEN = process.env.DATABASE_AUTH_TOKEN;

if (!DATABASE_URL || !DATABASE_AUTH_TOKEN) {
  throw new Error(
    "Missing required environment variables: DATABASE_URL and DATABASE_AUTH_TOKEN must be defined",
  );
}

export default defineConfig({
  schema: "./src/db/schemas/index.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN,
  },

  verbose: true,
  strict: true,
});
