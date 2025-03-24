import { Elysia } from "elysia";

const app = new Elysia({ prefix: "/api" })
  .use(
    cors({
      origin: "http://localhost:4321",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export default app;
export type App = typeof app;
