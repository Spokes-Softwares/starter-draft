import { defineConfig } from "@playwright/test";
import { authProject, authWebServer } from "./apps/auth/playwright.config";
import { hubsProject, hubsWebServer } from "./apps/hubs/playwright.config";
import {
  operationsProject,
  operationsWebServer,
} from "./apps/operations/playwright.config";
import {
  tenantProject,
  tenantWebServer,
} from "./apps/tenant/playwright.config";

/**
 * Root Playwright config: one project per app for UI mode.
 * Run: `pnpm test:e2e:ui` then filter by project (auth | tenant | hubs | operations).
 */
export default defineConfig({
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
  },
  projects: [authProject, tenantProject, hubsProject, operationsProject],
  webServer: [
    authWebServer,
    tenantWebServer,
    hubsWebServer,
    operationsWebServer,
  ],
});
