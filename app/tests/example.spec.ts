import { test } from "@playwright/test";

test("Addition Cases", async ({ page }) => {
  await page.goto("https://presently.sameer.digital");
  await page.screenshot({ path: "./screenshot.png", fullPage: true });
});
