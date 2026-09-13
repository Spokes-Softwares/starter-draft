import { defineConfig, devices, type Project } from "@playwright/test";

export const authBaseURL = "http://localhost:3010";

/** Project for the root Playwright config (testDir relative to repo root). */
export const authProject = {
  name: "auth",
  testDir: "apps/auth/e2e",
  use: {
    ...devices["Desktop Chrome"],
    baseURL: authBaseURL,
  },
} satisfies Project;

export const authWebServer = {
  command: "pnpm --filter auth dev",
  url: authBaseURL,
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
    baseURL: authBaseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "auth", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm dev",
    url: authBaseURL,
    reuseExistingServer: !process.env.CI,
  },
});
