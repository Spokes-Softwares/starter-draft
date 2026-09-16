import { expect, test } from "@playwright/test";

test("login page loads", async ({ page }) => {
  await page.goto("/auth/login");
  await expect(page).toHaveURL(/\/auth\/login/);
});
