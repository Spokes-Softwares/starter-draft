import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@repo/ui/lib/utils": path.resolve(
        __dirname,
        "packages/ui/src/lib/utils.ts",
      ),
    },
  },
  test: {
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/.next/**"],
  },
});
