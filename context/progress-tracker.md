# SIGNAL — Progress Tracker

**Updated:** 2026-10-14  
**Current phase:** Gate A closeout → Task 5, server catalog integration  
**Source of truth:** `context/assessment-requirements.md` (Motorola requirements). The six context documents and root `AGENTS.md` define implementation and agent workflow.

## Status at a glance

| Workstream | Status | Evidence / next action |
|---|---|---|
| Foundation and tooling | Complete | Next.js 16.4.0, React 19.3.0, TypeScript, Tailwind 4; ESLint 9 with matching `eslint-config-next@16.4.0`. Latest lint run passed. |
| Product model and mock CMS (Task 2) | Complete | 12 fictional products, 3 categories, 8 public + 4 restricted; 28 unit tests previously passed. |
| Server authentication (Task 3) | Complete | Signed, expiring session cookie; server-side credential validation; login/logout Server Actions; protected partner route; 12 unit tests previously passed. |
| Login and partner UI (Task 4) | Complete | Accessible login form, error feedback, authenticated redirect, partner page and sign-out. |
| Gate A: authentication review | Browser checks passed; final closeout pending | **9/9 Playwright tests passed**. Latest ESLint run passed. Re-run TypeScript, Vitest and production build after dependency/config changes before marking gate closed. |
| Server catalog + SSR privacy (Task 5 / Gate B) | Not started | Highest-priority next implementation and security review. |
| Catalog UI and interactions (Task 6 / Gate C) | Not started | Cards, detail page, filtering, search, layouts, fallbacks. |
| Marketing homepage + integration (Tasks 7–8 / Gate D) | Not started | Responsive design, accessibility, regression testing. |
| Deployment + documentation (Task 9 / Gate E) | Not started | Vercel, README, `AGENT.md`, verified links and submission details. |

## Mandatory assessment checklist

- [x] Next.js App Router, TypeScript, Tailwind CSS and permitted mock JSON CMS.
- [x] Markdown-defined specialized agents in `agents/` (Orchestrator, Backend, Frontend, Review).
- [x] Full-stack simulated login accepts any non-empty username and password.
- [x] Server-issued, signed, expiring session cookie; protected route and logout.
- [x] Raw products have `priceLoggedOut` and `priceAuthenticated`.
- [x] Server-only product visibility and authorized-price projection implemented and unit-tested.
- [ ] Actual catalog renders Set A publicly and A+B when authenticated.
- [ ] Initial server-rendered HTML contains only authorized products and correct role-specific prices.
- [ ] Public HTML, serialized RSC responses, navigation/prefetch payloads and client bundles do not expose restricted products or prices.
- [ ] Price First / Specs First card layouts switch without full-page reload.
- [ ] Category filtering, text search and explicit Clear Filters control.
- [ ] Missing-image, empty-results and invalid/inaccessible-slug fallbacks.
- [ ] Responsive, accessible homepage, catalog, detail, login and partner experiences.
- [ ] Full app and Markdown agent prompts in one accessible repository.
- [ ] README with reproducible setup, test commands and real deployment URL.
- [ ] `AGENT.md` describing roles, prompts, context handoffs, SSR enforcement, trade-offs, actual manual fixes, AI struggles and two-more-weeks improvements.
- [ ] Verified live deployment and submission details (repository, URL, demo credentials).

## Established architecture and contracts

**Routes:** `/`, `/catalog`, `/catalog/[slug]`, `/login`, `/partner`. The catalog routes are planned, not yet implemented.

**Product access:** Set A is public; Set B is authenticated-only. Authenticated users see A+B. Raw `CmsProduct` records retain both prices and visibility, **server-side only**. The frontend-safe `Product` exposes a single authorized `displayPrice` (USD integer cents). The adapter is `getProducts(access, filters?)`, `getProductBySlug(slug, access)`, `getCategories()`. The `access` argument must come from a validated server session, never a client-controlled role. Apply authorization and price projection before filtering, rendering or serialization.

**Mock content:** 12 fictional products across Communication Devices, Video & Monitoring, and Network & Infrastructure. Missing optional images/specifications are normalized; malformed records are omitted; unknown or restricted slugs return `null`. All current product images are intentionally `null` until asset work.

**Authentication:** HMAC-SHA256 signed tokens, seven-day expiry, `SESSION_SECRET` of at least 32 characters, HttpOnly cookie, SameSite=Lax, Path=/ and Secure in production. Passwords are not persisted. Login and logout use Server Actions; `/partner` checks the session on the server. `/login` redirects authenticated users to `/partner`.

**UI direction:** SIGNAL premium enterprise aesthetic: warm off-white, dark ink, lime accents, editorial typography and responsive layouts. Avoid client-side role/pricing selection. Use server-rendered role content and a narrowly scoped Client Component for layout toggling.

## Completed work and evidence

### Task 1a — Foundation/tooling repair (2026-10-13)

A specialized Frontend agent corrected the original `eslint-config-next@14.2.35` mismatch with Next.js 16 / ESLint 9. An independent Review agent verified lint, types, build and configuration behavior. This was an actual bounded agent handoff, not just a prompt definition.

**Later local regression (2026-10-14):** The installed package again showed `eslint-config-next@14.2.35`, producing module-resolution and non-iterable-import errors. Guided manual repair installed `eslint-config-next@16.4.0` and restored the Next.js 16 flat-config imports. The user confirmed `npm.cmd ls` showed compatible versions and `npm.cmd run lint` passed. Preserve this recurrence as a real troubleshooting episode in `AGENT.md`; do not imply the initial fix remained intact throughout.

### Task 2 — Product data and CMS adapter (2026-10-14)

The Backend agent completed/recovered the product implementation and an independent Review agent inspected it. Files include `types/product.ts`, `data/products.json`, `lib/products/product-rules.ts`, `lib/cms/products.ts`, `tests/products.test.ts` and `vitest.config.mts`. Earlier reported verification: **28/28 product tests**, lint, types and production build passed. No catalog page or client product component was built in this task.

### Task 3 — Server authentication (2026-10-14)

Implemented in a **ChatGPT-guided, user-applied file-by-file workflow**, not a new independent Codex agent run. Files: `lib/auth/session-token.ts`, `lib/auth/session.ts`, `lib/auth/auth.ts`, `app/actions/auth.ts`, `app/partner/page.tsx`, `tests/auth.test.ts`, `tests/mocks/server-only.ts`, and a test-only alias in `vitest.config.mts`. Local `.env.local` holds the ignored secret. Earlier reported verification: **12/12 auth unit tests**, 40 total unit tests, lint, types and build passed.

**Issues resolved:** Vitest required an alias for Next.js's `server-only` sentinel. Next.js 16 Cache Components and session-dependent rendering required request-time `connection()` in the login/partner routes; `/partner` also uses `export const instant = false`. Record both as actual implementation corrections, not speculative risks.

### Task 4 — Login and partner presentation (2026-10-14)

Implemented `app/login/page.tsx`, `app/login/login-form.tsx` and the styled protected `app/partner/page.tsx`. The user manually confirmed unauthenticated `/partner` redirects to `/login`, login works and authenticated `/partner` loads. Playwright then exercised the full login/logout flow.

### Gate A — Browser authentication review (2026-10-14)

Created `playwright.config.ts` and `e2e/auth.spec.ts`; user ran **9 Playwright tests, all passed**:

1. Unauthenticated `/partner` redirects to login.
2. Non-empty credentials authenticate.
3. Empty browser form does not create a session.
4. Session survives refresh.
5. Authenticated visitor is redirected away from login.
6. Logout clears the cookie and prevents protected access.
7. Tampered session cookie is rejected.
8. Cookie is HttpOnly, SameSite=Lax, Path=/ and not Secure on local HTTP.
9. Empty credentials are rejected by the server when browser validation is bypassed.

**Known warning:** Test 9 sets `novalidate` before React hydration finishes and logs a development hydration mismatch, although the test passes. This is an outstanding test-harness warning, not a demonstrated auth failure. Avoid treating the browser run as warning-free. Production Secure-cookie behavior has not yet been verified on deployment.

**Gate A closeout checklist:**

- [x] 9/9 Playwright browser tests passing.
- [x] Latest ESLint run passing with matched Next.js configuration.
- [ ] Confirm latest `npx.cmd tsc --noEmit` after the dependency fix.
- [ ] Confirm latest `npx.cmd vitest run` (expect 40 tests).
- [ ] Confirm latest `npm.cmd run build` after the dependency fix.
- [ ] Optionally remove the development hydration warning from test 9 without weakening server-validation coverage.
- [ ] Update this section with results and commit the checkpoint.

## Remaining plan and review gates

| Stage | Implementation | Blocking review |
|---|---|---|
| **Task 5** | Server-render `/catalog` and `/catalog/[slug]` using session-derived access, URL filters, authorized product adapter and not-found handling. | **Gate B:** inspect raw HTML and serialized/RSC responses for public/authenticated users, private slugs, role prices and cross-session cache leakage. |
| **Task 6** | Catalog/detail cards, fallback media, empty state, category/search/Clear Filters and Price First / Specs First toggle. | **Gate C:** search/filter combinations, URL persistence, no-reload toggle, authorized results, keyboard behavior and edge cases. Recheck Gate B. |
| **Task 7** | Marketing homepage, navigation/footer, metadata, authorized featured content, imagery and responsive polish. | Review public payloads and usability. |
| **Task 8** | Final integration, responsive/accessibility checks, complete lint/type/unit/E2E/build and production start. | **Gate D:** all routes at mobile/tablet/desktop, keyboard/focus/labels/contrast and regression checks. |
| **Task 9** | Vercel deployment, production secret, README, `AGENT.md`, verified repo/live links and submission details. | **Gate E:** production login/logout, Secure cookie, protected route, role prices, public isolation, docs and reproducible setup. |

## Risks and decisions to revisit

- **Highest priority — SSR privacy:** Never pass raw CMS records, both prices or partner-only content to Client Components, public metadata or serialized responses. Verify initial HTML **and** RSC/prefetch payloads, not only the hydrated page.
- **Session-sensitive caching:** Prevent personalized HTML/data from leaking between authenticated and unauthenticated requests; test sequential requests in separate browser contexts.
- **Assets:** All mock images currently fall back to `null`; select properly licensed media and ensure partner-only content is not exposed through public assets.
- **Environment:** Do not commit `.env.local` or a production secret. Confirm production Secure-cookie behavior after deployment.
- **Execution integrity:** The original independent Frontend/Review and Backend/Review handoffs occurred in Tasks 1a and 2. Tasks 3–4 and Playwright setup were guided in ChatGPT and executed by the user. The final `AGENT.md` must report this distinction accurately.
- **Release dependencies:** GitHub repository accessibility, Vercel access, actual deployed URL and production behavior remain unverified.

## Next action

**Close Gate A:** run `npx.cmd tsc --noEmit`, `npx.cmd vitest run`, and `npm.cmd run build`; record results above, inspect `git status` for secrets/generated files, then commit. **After that, start Task 5** with the server catalog entry point and its privacy boundary.

## Tracker maintenance rule

Update this file after each meaningful task or review gate. Keep current status at the top, retain concise evidence and actual agent/human handoffs, distinguish completed checks from pending ones, and avoid duplicating the full history in multiple sections. Motorola's assessment remains authoritative.
