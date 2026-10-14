import { expect, test } from "@playwright/test";

test.describe("Catalog product drawer", () => {
  test("opens product details without leaving the catalog", async ({
    page,
  }) => {
    await page.goto("/catalog");

    const productLink = page
      .getByRole("link", { name: "View product" })
      .first();

    const productUrl = await productLink.getAttribute("href");

    expect(productUrl).toMatch(/^\/catalog\/.+/);

    await productLink.click();

    const drawer = page.getByRole("dialog", {
      name: "Product details",
    });

    await expect(drawer).toBeVisible();
    await expect(page).toHaveURL(productUrl!);

    // The catalog remains mounted behind the drawer.
    await expect(
      page.getByRole("heading", {
        name: "Technology that moves you forward.",
      }),
    ).toBeVisible();
  });

  test("closes the drawer with the close button", async ({ page }) => {
    await page.goto("/catalog");

    await page
      .getByRole("link", { name: "View product" })
      .first()
      .click();

    const drawer = page.getByRole("dialog", {
      name: "Product details",
    });

    await expect(drawer).toBeVisible();

    await drawer
      .getByRole("button", { name: "Close product details" })
      .click();

    await expect(drawer).not.toBeVisible();
    await expect(page).toHaveURL(/\/catalog\/?$/);
  });

  test("closes the drawer with Escape", async ({ page }) => {
    await page.goto("/catalog");

    await page
      .getByRole("link", { name: "View product" })
      .first()
      .click();

    const drawer = page.getByRole("dialog", {
      name: "Product details",
    });

    await expect(drawer).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(drawer).not.toBeVisible();
    await expect(page).toHaveURL(/\/catalog\/?$/);
  });

  test("preserves catalog filters when closing the drawer", async ({
    page,
  }) => {
    await page.goto("/catalog?search=relay");

    await expect(
      page.getByRole("searchbox", { name: "Search products" }),
    ).toHaveValue("relay");

    await page
      .getByRole("link", { name: "View product" })
      .first()
      .click();

    const drawer = page.getByRole("dialog", {
      name: "Product details",
    });

    await expect(drawer).toBeVisible();

    await drawer
      .getByRole("button", { name: "Close product details" })
      .click();

    await expect(drawer).not.toBeVisible();

    await expect(page).toHaveURL(/\/catalog\?search=relay/);

    await expect(
      page.getByRole("searchbox", { name: "Search products" }),
    ).toHaveValue("relay");
  });

  test("shows a standalone page on direct navigation", async ({
    page,
  }) => {
    await page.goto("/catalog/relay-r1-handheld");

    await expect(
      page.getByRole("heading", {
        name: "Relay R1 Handheld",
        level: 1,
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("dialog", { name: "Product details" }),
    ).toHaveCount(0);
  });

  test("shows a not-found page for an invalid product slug", async ({
    page,
  }) => {
    await page.goto("/catalog/this-product-does-not-exist");

    await expect(
      page.getByText("This page could not be found."),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Relay R1 Handheld" }),
    ).toHaveCount(0);
  });
});
