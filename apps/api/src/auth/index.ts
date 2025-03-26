import Elysia, { type Context } from "elysia";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { siteConfig } from "@yts/shared";
import { db } from "../db";
import * as schema from "../db/schemas";
import { sendMagicLinkEmail } from "../emails";

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    usePlural: true,
    schema,
  }),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        const to = email;
        const subject = `Your ${siteConfig.name} Login Link`;

        await sendMagicLinkEmail({
          to,
          subject,
          url,
        });
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
  account: {
    accountLinking: { enabled: true },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes in seconds
    },
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
