// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      // @ts-ignore
      tailwindcss(),
      // @ts-ignore
      TanStackRouterVite({
        target: "react",
        autoCodeSplitting: true,
        routesDirectory: "./src/app/routes",
        generatedRouteTree: "./src/app/routeTree.gen.ts",
        routeFileIgnorePrefix: "-",
        quoteStyle: "double",
      }),
    ],
  },

  integrations: [react()],
  output: "static",
  adapter: vercel(),
});
