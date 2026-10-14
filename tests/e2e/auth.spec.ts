import { expect, test } from "@playwright/test";

test.describe("SIGNAL authentication", () => {
    test("redirects unauthenticated visitors to login", async ({
        page,
    }) => {
        await page.goto("/partner");

        await expect(page).toHaveURL(/\/login$/);
        await expect(
            page.getByRole("heading", { name: "Welcome back." }),
        ).toBeVisible();
    });

    test("accepts non-empty credentials", async ({ page }) => {
        await page.goto("/login");

        await page.getByLabel("Username").fill("partner");
        await page.getByLabel("Password").fill("demo123");
        await page.getByRole("button", { name: "Sign in" }).click();

        await expect(page).toHaveURL(/\/partner$/);
        await expect(
            page.getByRole("main").getByRole("button", {
                name: "Sign out",
            }),
        ).toBeVisible();
    });

    test("rejects empty credentials", async ({ page }) => {
        await page.goto("/login");

        await page.getByRole("button", { name: "Sign in" }).click();

        await expect(page).toHaveURL(/\/login$/);

        const cookies = await page.context().cookies();

        expect(
            cookies.some((cookie) => cookie.name === "signal_session"),
        ).toBe(false);
    });

    test("preserves the session after refresh", async ({ page }) => {
        await page.goto("/login");

        await page.getByLabel("Username").fill("partner");
        await page.getByLabel("Password").fill("demo123");
        await page.getByRole("button", { name: "Sign in" }).click();

        await expect(page).toHaveURL(/\/partner$/);

        await page.reload();

        await expect(page).toHaveURL(/\/partner$/);
        await expect(
            page.getByText("Session active"),
        ).toBeVisible();
    });

    test("redirects authenticated visitors away from login", async ({
        page,
    }) => {
        await page.goto("/login");

        await page.getByLabel("Username").fill("partner");
        await page.getByLabel("Password").fill("demo123");
        await page.getByRole("button", { name: "Sign in" }).click();

        await expect(page).toHaveURL(/\/partner$/);

        await page.goto("/login");

        await expect(page).toHaveURL(/\/partner$/);
    });

    test("logs out and blocks subsequent protected access", async ({
        page,
    }) => {
        await page.goto("/login");

        await page.getByLabel("Username").fill("partner");
        await page.getByLabel("Password").fill("demo123");
        await page.getByRole("button", { name: "Sign in" }).click();

        await expect(page).toHaveURL(/\/partner$/);

        await page
            .getByRole("main")
            .getByRole("button", { name: "Sign out" })
            .click();

        await expect(page).toHaveURL(/\/login$/);

        const cookies = await page.context().cookies();

        expect(
            cookies.some((cookie) => cookie.name === "signal_session"),
        ).toBe(false);

        await page.goto("/partner");

        await expect(page).toHaveURL(/\/login$/);
    });

    test("rejects a tampered session cookie", async ({ page }) => {
        await page.goto("/login");

        await page.getByLabel("Username").fill("partner");
        await page.getByLabel("Password").fill("demo123");
        await page.getByRole("button", { name: "Sign in" }).click();

        await expect(page).toHaveURL(/\/partner$/);

        await page.context().addCookies([
            {
                name: "signal_session",
                value: "tampered.invalid-session",
                url: "http://127.0.0.1:3000",
            },
        ]);

        await page.goto("/partner");

        await expect(page).toHaveURL(/\/login$/);
    });

    test("sets secure session cookie attributes", async ({ page }) => {
        await page.goto("/login");

        await page.getByLabel("Username").fill("partner");
        await page.getByLabel("Password").fill("demo123");
        await page.getByRole("button", { name: "Sign in" }).click();

        await expect(page).toHaveURL(/\/partner$/);

        const cookies = await page.context().cookies();
        const sessionCookie = cookies.find(
            (cookie) => cookie.name === "signal_session",
        );

        expect(sessionCookie).toBeDefined();
        expect(sessionCookie?.httpOnly).toBe(true);
        expect(sessionCookie?.sameSite).toBe("Lax");
        expect(sessionCookie?.path).toBe("/");

        // Secure is enabled in production, not local HTTP development.
        expect(sessionCookie?.secure).toBe(false);
    });



    test("rejects empty credentials on the server", async ({ page }) => {
        await page.goto("/login");

        // Submit the empty form normally.
        // The form uses noValidate so the Server Action handles validation.
        await page.getByRole("button", { name: "Sign in" }).click();

        // The Server Action should return a validation error.
        await expect(page.locator("#login-error")).toHaveText(
            "Please enter a username and password.",
        );

        // Invalid credentials must not create an authenticated session.
        await expect(page).toHaveURL(/\/login$/);

        const cookies = await page.context().cookies();

        expect(
            cookies.find((cookie) => cookie.name === "signal_session"),
        ).toBeUndefined();
    });
});
