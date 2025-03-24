import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

import { betterAuthView, auth } from "./auth";

const app = new Elysia({ prefix: "/api" })
  .use(
    cors({
      origin: "http://localhost:4321",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .get("/", () => "Hello Elysia")
  .all("/auth/*", betterAuthView);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export default app;
export { auth };
export type App = typeof app;
