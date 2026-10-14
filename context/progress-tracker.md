# SIGNAL — Progress Tracker



**Updated:** 2026-10-14  

**Current phase:** Task 6 UI redesign implemented → Task 7 accessibility and regression verification pending  

**Source of truth:** `context/assessment-requirements.md` (Motorola assessment); agent instructions in root `AGENTS.md`, `agents/`, and `context/`.



## Status at a glance



| Workstream | Status | Evidence / next action |

|---|---|---|

| Foundation and tooling | Complete | Next.js 16.4.0, React 19.3.0, TypeScript, Tailwind 4, ESLint 9 and matching `eslint-config-next@16.4.0`. |

| Mock CMS and product model | Complete | 12 fictional products in three categories: 8 public, 4 authenticated-only. 28 product unit tests previously passed. |

| Authentication and partner access | Complete | Signed expiring session cookie, server-side credential validation, login/logout Server Actions, protected `/partner`. 12 auth unit tests previously passed. |

| Catalog, filtering and product details | Complete | Server-rendered authorized products/prices; search, category filters, Clear Filters; Price First / Specs First; standalone product details and fallback states. |

| Intercepted product drawer | Complete | Parallel/intercepted routes, animated drawer, Escape/close button, focus handling, scroll lock, filter-preserving return. |

| SSR authorization and security review | Complete for current implementation; final release verification pending | Public: 8 products; authenticated: 12. Restricted data excluded from tested public HTML and captured RSC navigation; tampered cookie rejected. |

| Automated tests | Latest reported runs passed | **27/27 Playwright** in full-suite run; **40 Vitest** from earlier runs. Combined **67 tests**, but latest Vitest rerun not yet reported. |

| Homepage and responsive polish (Task 6) | Implemented; final verification pending | Dark graphite redesign across homepage, catalog, product details/drawer, login and partner; responsive header; CSS orbital animation; custom SIGNAL favicon. |

| Accessibility and UX review (Task 7) | Pending | Recheck keyboard/screen-reader behavior, mobile widths, orbital reduced motion, drawer focus handling, loading/empty states and category reset. |

| Final QA and documentation (Task 8) | Pending | Rerun lint, TypeScript, Vitest, Playwright and production build; finalize README and agent write-up. |

| Deployment and submission (Task 9) | Pending | Verify GitHub repository, Vercel URL, environment variables, production auth and SSR behavior. |



## Motorola assessment checklist



- [x] Next.js App Router, TypeScript, Tailwind CSS and permitted mock JSON CMS.

- [x] Specialized Markdown agent definitions (Orchestrator, Backend, Frontend, Review) and context handoffs.

- [x] Simulated login accepts any non-empty username and password.

- [x] Server-issued signed, expiring HttpOnly session cookie; protected route and logout.

- [x] Raw CMS records contain `priceLoggedOut`, `priceAuthenticated`, and visibility.

- [x] Server projects a single authorized `displayPrice` and filters restricted products before serialization.

- [x] Public catalog displays Set A (8 products); authenticated catalog displays Sets A+B (12 products).

- [x] Tested initial HTML responses for unauthorized product and raw pricing leakage.

- [x] Captured and tested at least one public RSC client-navigation response for restricted content leakage.

- [x] Price First / Specs First toggle without full-page reload.

- [x] Category filtering, search and explicit Clear Filters.

- [x] Missing-image placeholder, empty-results UI and inaccessible/invalid-slug not-found UI.

- [x] Intercepted product drawer and standalone direct-link detail page.

- [ ] Complete responsive and accessibility review across homepage, catalog, drawer, login and partner pages.

- [x] Implement redesigned marketing homepage and shared graphite UI (final visual QA pending).

- [ ] Finalize `README.md` with reproducible setup, test instructions and real deployment URL.

- [ ] Finalize required agent documentation (`AGENT.md` if specified by assessment), including real handoffs, SSR enforcement, manual fixes, AI limitations, tradeoffs and two-week improvement plan.

- [ ] Run final full checks and verify deployed production behavior.

- [ ] Confirm repository visibility, live URL and submission details.



## Architecture and contracts



**Routes:** `/`, `/catalog`, `/catalog/[slug]`, `/login`, `/partner`; catalog uses a parallel `@drawer` slot and intercepted `(.)[slug]` route.



**Product authorization:** Set A is public; Set B requires a validated server session. Raw `CmsProduct` records and both CMS prices remain server-only. Client-facing `Product` contains a single price, `displayPrice` (USD integer cents). Adapter functions: `getProducts(access, filters?)`, `getProductBySlug(slug, access)`, `getCategories()`. Never derive `access` from client input.



**Mock CMS:** 12 products across Communication Devices, Video & Monitoring, and Network & Infrastructure. All product images are currently `null`; placeholders are intentional until asset work. Invalid or inaccessible slugs yield no product details.



**Authentication:** HMAC-SHA256 signed token; seven-day expiration; `SESSION_SECRET` at least 32 characters; HttpOnly, SameSite=Lax, Path=/; Secure in production. Login/logout use Server Actions. `/partner` validates access server-side; authenticated `/login` redirects to `/partner`.



**Rendering:** Next.js 16 request-time `connection()` and Suspense boundaries are used where session-dependent rendering requires them. Catalog product visibility and pricing are resolved before passing sanitized records into Client Components. Streaming not-found routes can display a 404 UI with an HTTP 200 response; this is a known tradeoff, not equivalent to a 404 HTTP status.



**UI:** SIGNAL visual system: warm off-white `#F8F7F4`, dark ink `#171717`, lime `#D9F36A`, editorial typography. Motion handles drawer transitions. Client state is limited to presentation (layout toggle, drawer behavior), never role/pricing decisions.



## Completed work and evidence



### Task 1 — Foundation and agent workflow (2026-10-13 to 2026-10-14)



Created specialized Markdown agent definitions and shared context. An independent Frontend agent corrected an ESLint/Next.js dependency mismatch, followed by Review agent verification. A later local regression reintroduced `eslint-config-next@14.2.35`; manual repair restored `eslint-config-next@16.4.0` and Next.js 16 flat ESLint config. Record both episodes accurately in final agent documentation.



### Task 2 — CMS model and adapter (2026-10-14)



Implemented `types/product.ts`, `data/products.json`, `lib/products/product-rules.ts`, `lib/cms/products.ts`, `tests/products.test.ts`, and `vitest.config.mts`. Backend agent work and independent Review agent inspection were reported. **28/28 product unit tests** previously passed.



### Task 3 — Server authentication (2026-10-14)



Implemented `lib/auth/session-token.ts`, `lib/auth/session.ts`, `lib/auth/auth.ts`, `app/actions/auth.ts`, `app/partner/page.tsx`, `tests/auth.test.ts`, and `tests/mocks/server-only.ts`. ChatGPT-guided, user-applied file-by-file implementation; do not claim this was an independent Codex run. Resolved Vitest `server-only` alias and Next.js 16 session-sensitive rendering issues. **12/12 auth unit tests** previously passed.



### Task 4 — Login and partner UI (2026-10-14)



Built `app/login/page.tsx`, `app/login/login-form.tsx`, and protected partner presentation. Browser testing covered valid login, logout, protected-route redirects, cookie attributes, invalid input and tampered cookies. During final regression, the empty-credentials test was repaired: the original test passed an unattached button to `requestSubmit()`, then encountered a Next.js cookies invariant; the final test uses a normal click with native form validation bypassed and targets `#login-error` to avoid Next.js's additional `role="alert"` route announcer.



### Task 5 — Catalog, product drawer and SSR security (2026-10-14)



**Status: Complete for current requirements.**



- Server-rendered `/catalog` with authorized pricing and visibility, search/category filtering, Clear Filters, and empty/loading states.

- Client-only Price First / Specs First presentation toggle.

- Standalone `/catalog/[slug]` detail page and intercepted `@drawer/(.)[slug]` modal route.

- Motion-powered slide-in/out drawer, backdrop, Escape and close button, focus management, scroll locking and return to filtered catalog.

- Restricted-product checks using **Core R4 Industrial Router** (`core-r4-industrial-router`): authenticated-only; public CMS price $1,199.00; authorized partner price $999.00.

- Public HTML checked for restricted names/slugs/prices and raw CMS pricing fields.

- Authenticated HTML and UI checked for all 12 products and partner pricing.

- Forged `signal_session` cookie tested and rejected.

- Public RSC navigation payload inspected for restricted product data. A prior event-listener approach intermittently captured zero responses; replaced with `page.waitForResponse()` registered before client navigation.

- **Latest full Playwright run: 27/27 passed.** Previous unit runs: **40 Vitest passed** (28 product + 12 auth). Latest combined known passing count: **67**, pending a fresh Vitest rerun.



### Task 6 — Homepage and responsive UI redesign (2026-10-14)

**Status: Implemented; regression and responsive/accessibility sign-off pending.**

- Replaced the original light/editorial visual direction with a consistent near-black and graphite identity, lime-green accents, Geist typography, and restrained enterprise-tech styling.
- Refined shared navigation, including a compact mobile **Partner** label; implemented custom SIGNAL `app/icon.svg` favicon (lime circle with dark S). Default Next.js favicon/assets should be removed only when unused.
- Redesigned homepage hero with **“Connection is everything.”** messaging and a CSS-only orbital illustration: three concentric rings, rotating lime spheres (28s outer, 19s reversed middle, 12s inner), stationary center, and reduced-motion fallback.
- Restyled catalog filters, category dropdown, product cards, Price First / Specs First control, product details, intercepted drawer, standalone product page, login and partner pages to match the new visual direction.
- Retained server-side session, authorization and price selection; visual components continue consuming sanitized product data.
- Observed intermittent client-side intercepted-route 404s during development while direct product reloads worked; restarting the Next.js development server restored the drawer. Root cause not confirmed; monitor during final QA.
- Updated design instructions planned for `context/ui-context.md`, root `AGENTS.md` and `agents/frontend-agent.md`; confirm edits are saved in the repository before marking documentation alignment complete.
- **No post-redesign lint, typecheck, unit test, E2E or production build results have been provided.** Earlier 40 Vitest and 27 Playwright passes predate these changes.

## Known risks and release checks



- **SSR privacy:** Continue to ensure raw CMS records, restricted products, and both raw price fields never reach public client props, HTML, metadata, RSC payloads or prefetched data. Existing tests are strong but not exhaustive for all routes/prefetch cases.

- **Cross-session caching:** Add/verify sequential public and authenticated requests in isolated contexts, especially under production caching behavior.

- **Streaming status:** Invalid/inaccessible product slugs show not-found UI but can return HTTP 200 due to Suspense streaming. Reassess if the evaluation requires a genuine HTTP 404.

- **Product imagery:** All CMS image values are currently `null`; decide whether to add licensed images or retain designed placeholders.

- **Auth environment:** Keep `.env.local` and secrets out of Git. Verify Secure cookie in HTTPS production.

- **Agent transparency:** Distinguish actual independent agent runs from ChatGPT-guided manual implementation in the final report.

- **Production readiness:** Latest complete Playwright run passed. Final lint, TypeScript, Vitest, build, deployment, and live security checks are not yet confirmed in this tracker.



## Next action — Task 7 verification and release checkpoint

1. Confirm the updated `context/ui-context.md`, `AGENTS.md` and `agents/frontend-agent.md` have been saved, and verify all references use the correct paths.
2. Test category filtering, especially “All categories” after a specific selection; check search, Clear Filters and layout toggle.
3. Review homepage, catalog, product drawer, standalone product detail, login and partner pages at mobile, tablet and desktop widths; check keyboard focus, accessibility and reduced-motion behavior.
4. Run `npm run lint`, `npx.cmd tsc --noEmit`, `npx.cmd vitest run`, `npx.cmd playwright test`, and `npm run build`; record actual results and fix regressions.
5. Inspect `git status`, ensure secrets and generated artifacts are excluded, then commit and push the current branch after checks pass.
6. Complete `README.md` and final `AGENT.md` with truthful agent execution history, manual fixes, tradeoffs, limitations and two-week improvement plan; verify deployment and production authorization.

## Tracker maintenance rule

Update this tracker after each meaningful milestone. Keep current status at the top; record observed evidence rather than assumptions; preserve real agent/human handoffs and unresolved tradeoffs. Motorola's assessment requirements remain authoritative.