import { expect, test } from "@playwright/test";

test("unauthenticated visit redirects to auth", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/auth\/login/);
});
