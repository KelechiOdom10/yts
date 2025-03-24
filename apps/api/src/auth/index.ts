import Elysia, { type Context } from "elysia";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { db } from "../db";
import { users, sessions, verifications, accounts } from "../db/schemas";

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    usePlural: true,
    schema: {
      user: users,
      session: sessions,
      verification: verifications,
      account: accounts,
    },
  }),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        // send email to user
      },
    }),
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
  rateLimit: {
    enabled: true,
  },
});

const betterAuthView = (context: Context) => {
  const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"];
  // validate request method
  if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
    return auth.handler(context.request);
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    context.error(405);
  }
};

const authService = new Elysia().all("/auth/*", betterAuthView);

export { authService, auth, betterAuthView };
