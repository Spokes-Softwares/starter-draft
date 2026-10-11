import path from "node:path";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

const appIntegrationDirs = ["auth", "operations", "tenant", "hubs"] as const;

export default defineConfig(({ mode }) => {
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
      fileParallelism: false,
      maxWorkers: 1,
      env,
      projects: [
        ...appIntegrationDirs.map((app) => ({
          extends: true as const,
          test: {
            name: app,
            include: [`packages/db/src/integration-tests/${app}/**/*.test.ts`],
          },
        })),
        {
          extends: true,
          test: {
            name: "default",
            include: ["**/*.test.{ts,tsx}"],
            exclude: [
              "**/node_modules/**",
              "**/.next/**",
              "**/e2e/**",
              "apps/**",
              "packages/db/src/integration-tests/**",
            ],
          },
        },
      ],
    },
  };
});
