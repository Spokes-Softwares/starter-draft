import { defineConfig, devices, type Project } from "@playwright/test";

export const operationsBaseURL = "http://localhost:3000";

/** Project for the root Playwright config (testDir relative to repo root). */
export const operationsProject = {
  name: "operations",
  testDir: "apps/operations/e2e",
  use: {
    ...devices["Desktop Chrome"],
    baseURL: operationsBaseURL,
  },
} satisfies Project;

export const operationsWebServer = {
  command: "pnpm --filter operations dev",
  url: operationsBaseURL,
  reuseExistingServer: !process.env.CI,
};

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: operationsBaseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "operations", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm dev",
    url: operationsBaseURL,
    reuseExistingServer: !process.env.CI,
  },
});
