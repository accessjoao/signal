import { expect, test } from "@playwright/test";

test.describe("Catalog product drawer", () => {
  test("opens product details without leaving the catalog", async ({
    page,
  }) => {
    await page.goto("/catalog");

    const productAction = page
      .getByRole("button", { name: "View product" })
      .first();

    const catalogUrl = page.url();

    await productAction.click();

    const drawer = page.getByRole("dialog", {
      name: "Product details",
    });

    await expect(drawer).toBeVisible();
    await expect(page).toHaveURL(catalogUrl);
    await expect(drawer.getByRole("heading", { name: "Relay R1 Handheld" })).toBeVisible();

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
      .getByRole("button", { name: "View product" })
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
      .getByRole("button", { name: "View product" })
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
      .getByRole("button", { name: "View product" })
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
  
  test("opens the drawer on the first click after navigation", async ({
    page,
  }) => {
    // Navigate without waiting for all page resources to load.
    await page.goto("/catalog", {
      waitUntil: "domcontentloaded",
    });

    // Click immediately when the product button becomes available.
    const productAction = page
      .getByRole("button", { name: "View product" })
      .first();

    await productAction.click();

    // The first click should open the state-controlled drawer without navigation.
    const drawer = page.getByRole("dialog", {
      name: "Product details",
    });

    await expect(drawer).toBeVisible();
    await expect(page).toHaveURL(/\/catalog\/?$/);
    await expect(drawer).toBeInViewport();

    // The catalog must remain mounted behind the drawer.
    await expect(
      page.getByRole("heading", {
        name: "Technology that moves you forward.",
      }),
    ).toBeVisible();
  });

  test("restores focus and supports reopening after backdrop dismissal", async ({ page }) => {
    await page.goto("/catalog");
    const action = page.getByRole("button", { name: "View product" }).first();
    await action.click();
    const drawer = page.getByRole("dialog", { name: "Product details" });
    await expect(drawer).toBeVisible();
    const close = drawer.getByRole("button", { name: "Close product details" });
    await expect(close).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(close).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(close).toBeFocused();
    // Focus moved outside by another script must return to the modal.
    await action.focus();
    await expect(close).toBeFocused();
    await page.getByRole("button", { name: "Close product details" }).first().click({ position: { x: 5, y: 5 } });
    await expect(drawer).toHaveCount(0);
    await expect(action).toBeFocused();
    await action.click();
    await expect(drawer).toBeVisible();
    await expect(page).toHaveURL(/\/catalog\/?$/);
  });

  test("opens and closes with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/catalog");
    const action = page.getByRole("button", { name: "View product" }).first();
    await action.click();
    const drawer = page.getByRole("dialog", { name: "Product details" });
    await expect(drawer).toBeVisible();
    await expect(drawer).toHaveCSS("transition-property", "none");
    await page.keyboard.press("Escape");
    await expect(drawer).toHaveCount(0);
    await expect(action).toBeFocused();
    await expect(page).toHaveURL(/\/catalog\/?$/);
  });

});
