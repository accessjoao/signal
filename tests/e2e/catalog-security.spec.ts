import { expect, test } from "@playwright/test";

const restrictedProduct = {
    name: "Core R4 Industrial Router",
    slug: "core-r4-industrial-router",
    publicPrice: "$1,199.00",
    partnerPrice: "$999.00",
};

const publicProduct = {
    name: "Relay R1 Handheld",
    slug: "relay-r1-handheld",
};

test.describe("Catalog SSR security", () => {
    test("public catalog excludes restricted products", async ({
        request,
    }) => {
        const response = await request.get("/catalog");

        expect(response.ok()).toBeTruthy();

        const html = await response.text();

        // Restricted product information must not be sent to visitors.
        expect(html).not.toContain(restrictedProduct.name);
        expect(html).not.toContain(restrictedProduct.slug);

        // Neither price of the restricted product should be exposed.
        expect(html).not.toContain(restrictedProduct.publicPrice);
        expect(html).not.toContain(restrictedProduct.partnerPrice);

        // Raw CMS pricing fields must never be serialized.
        expect(html).not.toContain("priceLoggedOut");
        expect(html).not.toContain("priceAuthenticated");
    });

    test("public catalog includes authorized products", async ({
        request,
    }) => {
        const response = await request.get("/catalog");
        const html = await response.text();

        expect(response.ok()).toBeTruthy();
        expect(html).toContain(publicProduct.name);
    });

    test("public product detail excludes raw pricing fields", async ({
        request,
    }) => {
        const response = await request.get(
            `/catalog/${publicProduct.slug}`,
        );

        expect(response.ok()).toBeTruthy();

        const html = await response.text();

        expect(html).toContain(publicProduct.name);
        expect(html).not.toContain("priceLoggedOut");
        expect(html).not.toContain("priceAuthenticated");
    });

    test("restricted product URL does not expose private content", async ({
        request,
    }) => {
        const response = await request.get(
            `/catalog/${restrictedProduct.slug}`,
        );

        const html = await response.text();

        // Streaming routes may return 200 with a not-found UI.
        // Security is enforced by withholding restricted product data.
        expect(html).not.toContain(restrictedProduct.name);
        expect(html).not.toContain(restrictedProduct.partnerPrice);
        expect(html).not.toContain("priceAuthenticated");
    });

    test("restricted product is absent from public browser UI", async ({
        page,
    }) => {
        await page.goto("/catalog");

        await expect(
            page.getByText(restrictedProduct.name),
        ).toHaveCount(0);

        await expect(
            page.getByRole("link", {
                name: "View product",
            }),
        ).toHaveCount(8);
    });

    test("invalid product slugs do not expose product data", async ({
        request,
    }) => {
        const response = await request.get(
            "/catalog/this-product-does-not-exist",
        );

        const html = await response.text();

        expect(html).not.toContain("priceAuthenticated");
        expect(html).not.toContain("priceLoggedOut");
        expect(html).not.toContain(restrictedProduct.name);
    });


    test.describe("Authenticated catalog SSR security", () => {
        test.beforeEach(async ({ page }) => {
            // Authenticate using the actual application login flow.
            await page.goto("/login");

            await page.getByLabel("Username").fill("test-partner");
            await page.getByLabel("Password").fill("test-password");

            await page.getByRole("button", { name: /sign in|log in/i }).click();

            await expect(page).toHaveURL(/\/partner|\/catalog/);
        });

        test("authenticated catalog displays all 12 products", async ({
            page,
        }) => {
            await page.goto("/catalog");

            await expect(
                page.getByRole("link", { name: "View product" }),
            ).toHaveCount(12);

            await expect(
                page.getByText("Core R4 Industrial Router"),
            ).toBeVisible();
        });

        test("restricted product displays partner pricing", async ({
            page,
        }) => {
            await page.goto("/catalog/core-r4-industrial-router");

            await expect(
                page.getByRole("heading", {
                    name: "Core R4 Industrial Router",
                    level: 1,
                }),
            ).toBeVisible();

            await expect(
                page.getByText("$999.00"),
            ).toBeVisible();

            await expect(
                page.getByText("$1,199.00"),
            ).toHaveCount(0);
        });

        test("authenticated HTML contains no raw CMS pricing fields", async ({
            page,
        }) => {
            // The browser context carries the authenticated session cookie.
            const response = await page.request.get(
                "/catalog/core-r4-industrial-router",
            );

            expect(response.ok()).toBeTruthy();

            const html = await response.text();

            expect(html).toContain("Core R4 Industrial Router");
            expect(html).toContain("$999.00");
            expect(html).not.toContain("$1,199.00");
            expect(html).not.toContain("priceLoggedOut");
            expect(html).not.toContain("priceAuthenticated");
        });

        test("authenticated catalog HTML includes restricted products", async ({
            page,
        }) => {
            const response = await page.request.get("/catalog");

            expect(response.ok()).toBeTruthy();

            const html = await response.text();

            expect(html).toContain("Core R4 Industrial Router");
            expect(html).not.toContain("priceLoggedOut");
            expect(html).not.toContain("priceAuthenticated");
        });
    });
});

test.describe("Catalog session and RSC security", () => {
    test("tampered session cannot access restricted products", async ({
        page,
    }) => {
        await page.context().addCookies([
            {
                name: "signal_session",
                value: "forged.invalid.signature",
                url: "http://localhost:3000",
                httpOnly: true,
                sameSite: "Lax",
            },
        ]);

        await page.goto("/catalog");

        // The server must reject the forged cookie.
        await expect(
            page.getByRole("link", { name: "View product" }),
        ).toHaveCount(8);

        await expect(
            page.getByText("Core R4 Industrial Router"),
        ).toHaveCount(0);

        // Direct navigation must not reveal restricted content.
        await page.goto("/catalog/core-r4-industrial-router");

        await expect(
            page.getByRole("heading", {
                name: "Core R4 Industrial Router",
            }),
        ).toHaveCount(0);
    });


    test("public RSC payload excludes restricted products", async ({
        page,
    }) => {
        await page.goto("/catalog");

        await expect(
            page.getByRole("link", { name: "View product" }),
        ).toHaveCount(8);

        // Register before navigation to avoid missing the response.
        const rscResponsePromise = page.waitForResponse(
            (response) => {
                const contentType =
                    response.headers()["content-type"] ?? "";

                return (
                    response.url().includes("/catalog/") &&
                    contentType.includes("text/x-component")
                );
            },
            { timeout: 15000 },
        );

        // Client-side navigation opens the intercepted product drawer.
        await page
            .getByRole("link", { name: "View product" })
            .first()
            .click();

        await expect(page.getByRole("dialog")).toBeVisible();

        // This test must capture a real RSC response.
        const rscResponse = await rscResponsePromise;
        const payload = await rscResponse.text();

        expect(payload).not.toContain("Core R4 Industrial Router");
        expect(payload).not.toContain("core-r4-industrial-router");
        expect(payload).not.toContain("priceAuthenticated");
        expect(payload).not.toContain("priceLoggedOut");
    });
});
