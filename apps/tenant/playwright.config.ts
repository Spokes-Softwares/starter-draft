import { defineConfig, devices, type Project } from "@playwright/test";

export const tenantBaseURL = "http://localhost:3001";

/** Project for the root Playwright config (testDir relative to repo root). */
export const tenantProject = {
  name: "tenant",
  testDir: "apps/tenant/e2e",
  use: {
    ...devices["Desktop Chrome"],
    baseURL: tenantBaseURL,
  },
} satisfies Project;

export const tenantWebServer = {
  command: "pnpm --filter tenant dev",
  url: tenantBaseURL,
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
    baseURL: tenantBaseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "tenant", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm dev",
    url: tenantBaseURL,
    reuseExistingServer: !process.env.CI,
  },
});
