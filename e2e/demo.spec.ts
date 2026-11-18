import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Qui êtes-vous ?" })).toBeVisible();
  });

  await test.step("Je choisis un persona", async () => {
    await page.getByRole("button", { name: /Camille/ }).click();
  });

  await test.step("Je vois la suggestion de parcours", async () => {
    await expect(page.getByRole("heading", { name: "Suggestion de parcours" })).toBeVisible();
    await expect(page.getByText("BURN TO BE ALIVE")).toBeVisible();
  });
});
