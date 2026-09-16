import path from "node:path";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => {
  // Empty prefix so NEXT_PUBLIC_* / SUPABASE_* from .env.local land on process.env
  const env = loadEnv(mode, process.cwd(), "");

  return {
    resolve: {
      alias: {
        "@repo/ui/lib/utils": path.resolve(
          __dirname,
          "packages/ui/src/lib/utils.ts",
        ),
      },
    },
    test: {
      env,
      include: ["**/*.{test,spec}.{ts,tsx}"],
      exclude: ["**/node_modules/**", "**/.next/**", "**/e2e/**"],
    },
  };
});
