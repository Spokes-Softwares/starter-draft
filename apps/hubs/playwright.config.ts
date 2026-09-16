import { defineConfig, devices, type Project } from "@playwright/test";

export const hubsBaseURL = "http://localhost:3002";

/** Project for the root Playwright config (testDir relative to repo root). */
export const hubsProject = {
  name: "hubs",
  testDir: "apps/hubs/e2e",
  use: {
    ...devices["Desktop Chrome"],
    baseURL: hubsBaseURL,
  },
} satisfies Project;

export const hubsWebServer = {
  command: "pnpm --filter hubs dev",
  url: hubsBaseURL,
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
    baseURL: hubsBaseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "hubs", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm dev",
    url: hubsBaseURL,
    reuseExistingServer: !process.env.CI,
  },
});
