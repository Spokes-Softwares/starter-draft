import path from "node:path";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

const appIntegrationDirs = ["auth", "operations", "tenant", "hubs"] as const;

const colocatedIntegrationTests: Partial<
  Record<(typeof appIntegrationDirs)[number], string[]>
> = {
  auth: [
    "packages/db/src/queries/user/**/*.integration.test.ts",
    "packages/db/src/actions/**/*.integration.test.ts",
  ],
  operations: [
    "packages/db/src/queries/get-actions/**/*.integration.test.ts",
    "apps/operations/actions/**/*.integration.test.ts",
  ],
};

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
          resolve:
            app === "operations"
              ? {
                  alias: {
                    "@": path.resolve(__dirname, "apps/operations"),
                  },
                }
              : undefined,
          test: {
            name: app,
            include: [
              `packages/db/src/integration-tests/${app}/**/*.test.ts`,
              ...(colocatedIntegrationTests[app] ?? []),
            ],
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
              "packages/db/src/**/*.integration.test.ts",
            ],
          },
        },
      ],
    },
  };
});
