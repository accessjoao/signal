# Progress Tracker — SIGNAL

## Current Status

**Reviewed:** 2026-10-14

**Phase:** 3 — Sessions and access boundary.

**Status:** Task 3 implementation complete. Authentication unit tests, TypeScript, ESLint, and production build pass. Browser authentication flow and independent Review Agent verification remain pending.

**Active implementation:** Task 3 backend complete. Task 4 — Login and partner presentation — is next.

`assessment-requirements.md` is authoritative for Motorola requirements. The six core context files define SIGNAL implementation choices; root `AGENTS.md` explicitly establishes assessment precedence. This plan preserves those choices and does not change architecture.

## Completed and Existing State

- [x] Product concept, architecture, code standards, UI direction, workflow rules, and four Markdown agent roles exist.
- [x] Assessment source is present; root instructions require every specialized agent to consult it.
- [x] Next.js App Router scaffold initialized with TypeScript strict mode and Tailwind CSS.
- [x] Repository inspection and mandatory-requirement mapping completed.
- [x] Task 1a: ESLint repair; lint, TypeScript and production build pass with independent Review Agent verification.
- [x] Foundation phase complete per user confirmation for task 2; prior agent verification evidence remains recorded below (no additional foundation checks claimed).
- [x] Task 2: product model, mock CMS, server-only authorization/projection and 28 unit tests independently verified.
- [x] Task 3: HMAC-signed, expiring sessions, server-side credential validation, login/logout Server Actions, and protected `/partner` route.
- [x] Authentication unit tests: 12 passing; full suite: 40 passing.
- [x] Task 3 implementation verification: TypeScript, ESLint, and production build pass.
- [ ] Task 3 independent Review Agent verification and full browser authentication flow.
- [ ] Remaining application requirements implemented and independently verified.

Existing application: `app/page.tsx` renders a SIGNAL heading; `app/layout.tsx` retains starter metadata and Geist fonts; `app/globals.css` retains starter styling. `public/` contains starter SVGs. Product types, a 12-product seed, server-only CMS adapter and business rules, and 28 unit tests now exist. No catalog/login/partner routes, session logic or domain components exist. README is the starter document; `AGENT.md` is absent.

`package.json` declares Next.js 16.4.0, React 19.3.0, Tailwind 4, TypeScript 5, ESLint 9, and `eslint-config-next` 16.4.0 (aligned with Next.js in task 1a). Task 2 adds `server-only` 0.0.1, Vitest 4.1.11 and a `test` script with minimal Node configuration. Playwright is not configured. Actual verification evidence is recorded below.

## Requirement-to-Implementation Checklist

Unchecked rows are pending implementation or evidence, even when instructions already cover them. Phase references below identify delivery and review ownership.

| Done | Mandatory assessment requirement | Architecture / agent coverage and current gap | Planned implementation / proof |
|---|---|---|---|
| [x] | Next.js, TypeScript, Tailwind, Contentful or mock JSON | Stack and typed local mock CMS exist and pass verification. | 1 foundation, 2 CMS; lint/types/build and adapter tests. |
| [ ] | Full-stack simulated login accepting any non-empty input | Architecture and Backend specify non-empty username/password and server validation. No implementation. | 3 actions/session, 4 form; gate A verifies valid and empty inputs server-side. |
| [ ] | Secure server-issued session/cookie | Backend specifies signed, expiring cookie, server secret, HttpOnly, SameSite and production Secure. No implementation. | 3; gate A verifies issuance, tampering, expiry, malformed cookies and logout. |
| [ ] | Use session to protect routes | Architecture assigns `/partner`; Backend owns server guard. Route absent. | 3–4; gate A direct requests with/without valid session. |
| [ ] | Set A public; Set B authenticated only | Visibility field and Backend rules cover both; authenticated users see A plus B. Seed and authorization rules verified; cards pending. | 2, 5–6; gate B compares actual public/authenticated responses. |
| [x] | Each product has `priceLoggedOut` and `priceAuthenticated` | Both fields verified in all 12 raw records; frontend contract exposes only displayPrice. | 2 model/seed tests; UI receives only one authorized display price. |
| [ ] | Prices and role-based content in initial HTML (SSR/SSG) | Architecture, Backend, Frontend and Review explicitly require SSR. No product rendering yet. | 5; gate B HTTP HTML assertions before hydration for both roles. |
| [ ] | At least two layouts; control switches without reload | Frontend specifies Price First / Specs First with small Client Component. Missing. | 6; gate C confirms distinct emphasis, unchanged products/prices and no document reload. |
| [ ] | Category filtering | Backend filtering verified; Frontend URL controls pending. | 2 logic, 5 route query parsing, 6 controls; gate C combined/direct-link tests. |
| [ ] | Text search | Backend case-insensitive matching verified; Frontend control pending. | 2, 5–6; gate C searches authorized results only. |
| [ ] | Clear Filters button | Agent instructions require reset; exact button presentation must be retained. Missing. | 6; gate C resets search/category and role-appropriate results. |
| [ ] | Missing-image fallback | Architecture/Frontend/Review cover fallback. No component or assets. | 6; gate C covers absent image and failed image load. |
| [ ] | Empty-results fallback | Architecture/Frontend/Review cover helpful reset state. Missing. | 6; gate C zero-match query with recovery. |
| [ ] | Invalid-slug fallback | Architecture/code standards prescribe `notFound()`; also for inaccessible products. Missing. | 5–6; gates B/C direct unknown and restricted-slug requests. |
| [x] | Markdown-defined specialized team in dedicated directory | `agents/` has Orchestrator, Backend, Frontend and Review definitions, ownership and handoff instructions. | Existing structural requirement satisfied. |
| [ ] | Use that team to generate the app through discrete steps, not a monolithic prompt | Orchestrator/workflow specify bounded tasks and evidence. Definitions alone do not demonstrate execution. | Execute sequential assignments below after approval; retain actual task/handoff evidence for `AGENT.md`. |
| [ ] | Single repository containing app and agent prompts | Both structures exist, but app is incomplete and submission repository URL/access unverified. | 9 delivery audit verifies contents and reviewer access. |
| [ ] | README local setup instructions | Starter dev instructions exist; installation, environment/session secret and actual verification steps incomplete. | 9 reproducible setup documentation and review. |
| [ ] | README deployment URL (Vercel/Netlify) | Vercel selected in architecture; agent delivery instructions are general and README has no live URL. | 9 deploy and add actual tested URL. |
| [ ] | AGENT.md: architecture and why these agents/prompts | Orchestrator/Review cover report broadly; file absent. | 9 explain responsibilities and rationale using actual work. |
| [ ] | AGENT.md: context/handoff management and enforcement of SSR requirements | Workflow provides contract and invariants; no execution report. | 9 concrete prompts, context transfer and review evidence. |
| [ ] | AGENT.md: trade-offs, manual fixes needed to compile/deploy, AI struggles, two-more-weeks improvements | Instructions cover these broadly, but exact two-week framing and compile/deploy account need explicit acceptance criteria. | 9 factual account; state none only where supported; distinguish human decisions from AI fixes. |
| [ ] | Submission email body: Repo, Live App, Demo Login if needed | Not explicitly enumerated in core architecture/agent delivery checklists. | 9 prepare exact fields, tested links and non-empty demo example; user handles sending unless separately authorized. |

Additional SIGNAL/user checkpoints: logout, no private data or partner prices in public payloads, accessible controls, responsive layouts, marketing homepage, 10–12 fictional products across three categories, and malformed-data handling. These strengthen the implementation; do not misrepresent the expanded marketing design or named test tools as Motorola-mandated features.

## Coverage Findings and Scope Decisions

- No direct conflict found between the approved architecture and Motorola's mandatory functionality. Local JSON is expressly permitted; live Contentful, database, OAuth, and CMS administration are unnecessary.
- Motorola's SSR/SSG wording allows server rendering. Use request-aware server rendering for session-dependent content; a shared static response cannot establish per-user authorization.
- Root `AGENTS.md` supplies assessment precedence, although individual required-context lists and the workflow sources-of-truth list do not name the new assessment file. Every assignment must explicitly include it; no other Markdown edits are authorized in this task.
- Clarify in implementation contracts: Set A = public, Set B = authenticated-only, partners see A+B; raw models hold two prices, presentation contracts contain one authorized price. Price representation/currency, session lifetime and query parameter names need small documented decisions.
- Existing `cacheComponents`, `partialPrefetching`, experimental feedback and custom Tailwind loader settings require foundation/runtime review. Do not assume they are defects or silently replace them; demonstrate compatibility and safe session-dependent rendering.
- Keep the approved five routes (`/`, `/catalog`, `/catalog/[slug]`, `/login`, `/partner`). Do not add related-product features, additional marketing routes, dashboards, commerce, state libraries, or orchestration infrastructure.
- The assessment's questions-within-24-hours note is conditional guidance, not an app feature. Receipt time is unknown; no email is requested or authorized.

## Sequential Implementation Plan - Task 2 Complete

All assignments require root instructions, the assessment, workflow rules, architecture, progress tracker, relevant code, and the responsible agent definition. Backend also reads code standards/project overview; Frontend reads those plus UI context; Review reads all six core documents. Complete one bounded task and its handoff before starting dependent work. Listed review gates are blocking for Critical/High findings.

| Phase/task | Owner | Objective and deliverables | Dependency and acceptance / handoff |
|---|---|---|---|
| 1a - Repair foundation (complete) | Frontend | Narrowly assigned tooling repair: diagnose ESLint config/package mismatch and make the smallest justified correction after approval; inspect framework/Tailwind configuration. No app features. | User approval. Handoff exact config changes and lint/type/build results; do not reinitialize the app or broadly upgrade packages. |
| 1b - Foundation gate (complete per user confirmation) | Review | Independently check lint, types, production build/start and styled root response; inspect caching/runtime configuration. | 1a. Reproducible baseline required; route environment/tooling fixes back to responsible agent. |
| 2 — Product data contract | Backend | Typed local JSON seed (10–12 products, three categories, A/B, two prices), simple CMS adapter, authorized presentation contract, search/category/slug logic; minimal Vitest setup and focused tests when implementation is authorized. | 1b. Unique IDs/slugs, consistent price representation, malformed-content behavior, no seed imports in UI. Handoff functions/types, filter semantics and safe sample data. |
| 3 — Sessions and access boundary | Backend | Server-only signed/expiring sessions, environment secret contract, login/logout actions, server guard for `/partner`. No credential storage. | 2. Unit tests for non-empty/empty input, signatures, expiry and malformed sessions; handoff action/error shapes and protected route entry point. |
| 4 — Login and partner presentation | Frontend | Small accessible login form and partner view wired to Backend actions/guard; logout and validation feedback. | 3. Complete browser flow without client-only auth; handoff routes, controls and reproducible journeys. |
| Gate A — Authentication | Review | Minimal Playwright setup and direct HTTP/browser tests of sessions and protected access. | 4. All gate A checks below pass before server catalog integration. |
| 5 — Server catalog integration | Backend | Wire `/catalog` and `/catalog/[slug]` server entry points to validated session, CMS adapter and URL filters; establish authorized featured-product retrieval for homepage. Minimal semantic rendering only; private/invalid slugs use not-found. | Gate A + data contract. Initial HTML contains correct role-specific content/price; handoff server/presentation boundaries, query contract and test fixtures. |
| Gate B — SSR and visibility | Review | Independently inspect actual HTML, serialized/RSC responses and caching for public/partner sessions. | 5. All gate B checks below pass before interactive presentation. |
| 6a — Catalog and detail presentation | Frontend | Shared visual tokens and necessary components; catalog cards, detail specifications, image fallback, empty and not-found views. | Gate B. Preserve server boundaries and initial content; validate mobile/desktop and keyboard basics. |
| 6b — Catalog controls | Frontend | URL-backed search/category controls, explicit Clear Filters button, Price First / Specs First toggle. | 6a. Mode changes without document reload or authorization changes; handoff behavior and edge cases. |
| Gate C — Catalog interactions | Review | Test filters, layouts, navigation, fallbacks and responsive/accessible controls; rerun affected SSR checks. | 6b. Gate C passes; Backend receives logic defects, Frontend receives presentation defects. |
| 7 — Marketing and shared navigation | Frontend | Finish SIGNAL homepage, header/footer, category links, authorized featured products, partner CTA, metadata and appropriately licensed local imagery. | Gate C. Follow existing UI context with bounded sections; responsive navigation; no restricted marketing payloads. |
| 8 — Final integration | Review | Full requirement audit, security/SSR regression, accessibility and responsive inspection; lint/types/unit/E2E/build checks. | 7. Gates A–D pass; no unresolved Critical/High issues; report other limitations and focused fixes for owners, then retest. |
| 9a — Deployment preparation and release | Backend | Explicit delivery assignment: document environment/build/start requirements, configure server secret in approved Vercel project and deploy verified app. | 8 and deployment access/authorization. Handoff real URL and production behavior; no secrets committed. |
| 9b — Documentation and submission gate | Review | Explicit documentation assignment: complete/verify README and assemble `AGENT.md` from Orchestrator-maintained evidence; verify deployment and prepare submission fields. | 9a. Gate E passes; Orchestrator validates execution history and final readiness before user submission. |

## Task 3 Outcome and Verification

**Task:** Implement the server-side authentication foundation for SIGNAL, following the Backend Agent's existing architecture and security requirements.

**Execution:** After Task 2, implementation continued through a guided, file-by-file workflow in ChatGPT rather than a separate Codex agent execution. The user created the files, ran verification commands locally, and reported the results. This distinction must be preserved in the final `AGENT.md`.

**Files created:**
- `lib/auth/session-token.ts`
- `lib/auth/session.ts`
- `lib/auth/auth.ts`
- `app/actions/auth.ts`
- `app/partner/page.tsx`
- `tests/auth.test.ts`
- `tests/mocks/server-only.ts`
- `.env.local` (local, Git-ignored)

**Files modified:**
- `vitest.config.mts`

**Architecture and decisions:**
- Simulated authentication accepts any non-empty username and password.
- Sessions use HMAC-SHA256 signed tokens with a seven-day expiration.
- Session cookies use HttpOnly, SameSite=Lax, Path=/, and Secure in production.
- `SESSION_SECRET` is supplied through environment configuration, with a minimum length of 32 characters.
- Token generation and verification are separated from Next.js cookie operations for isolated unit testing.
- Authentication is determined server-side; no password is stored in the session.
- `/partner` verifies the session before rendering and redirects unauthenticated visitors to `/login`.
- Login and logout are implemented as Next.js Server Actions.

**Implementation issues and corrections:**
1. Next.js 16 Cache Components reported request-dependent cookie access during `/partner` prerendering. Adding `export const instant = false` to the protected route resolved the observed development-server error.
2. Vitest initially failed because the `server-only` package intentionally throws outside Next.js's server environment. A test-only module alias and empty mock resolved the import issue without changing production protection.
3. Session-token logic was extracted into a dedicated module to improve testability and malformed-token handling.

**Verification reported by user:**

| Check | Result |
|---|---|
| `npx.cmd tsc --noEmit` | Passed |
| `npm run lint` | Passed |
| `npm run build` | Passed |
| `npx.cmd vitest run` | Passed: 40 tests (28 product, 12 authentication) |
| Unauthenticated `/partner` request | HTTP 307 redirect to `/login` |
| Production build route output | `/partner` dynamically rendered |

**Outstanding issues:**
- `/login` currently returns 404 because its page has not been implemented.
- Successful browser login, cookie issuance, authenticated partner access, logout, and subsequent access denial are not yet verified.
- Cookie security attributes and session isolation require integration testing.
- Independent Review Agent verification has not yet occurred.
- SSR product visibility and pricing isolation remain pending.

**Recommended next step:** Task 4 — implement the login interface, connect the existing Server Actions, add logout controls, and complete Gate A authentication verification before catalog integration.

### Handoffs and Evidence

Every task returns **Task, Changes, Decisions, Verification, Outstanding Issues, Recommended Next Step**. Backend adds contracts/action shapes; Frontend identifies consumed contracts and components; Review supplies severity, reproduction evidence and unverified checks. Orchestrator accepts handoffs, updates this tracker and routes focused fixes before dependent work continues.

During approved execution, preserve concise actual task prompts, agent identity/role, context supplied, decisions, verification and manual interventions for the eventual `AGENT.md`. The planning audit invoked no independent agents. Task 1a subsequently ran independent Frontend and Review agents; task 2 resumed with independent Backend and Review execution as recorded below. Later assignments remain proposals. No additional orchestration software is needed.

## Verification Checkpoints

- **Gate A — Authentication/protected routes:** Accept any non-empty username/password; reject missing/empty values on server even when browser validation is bypassed. Inspect server-issued cookie signature, expiration, HttpOnly, SameSite=Lax, Secure in production and environment secret handling. Reject missing, modified, malformed and expired sessions. Direct `/partner` requests redirect public users to login; valid sessions render it. Logout clears access, including subsequent navigation/refresh. Never store/log passwords or put credentials in cookies.
- **Gate B — SSR/product visibility:** For public and authenticated requests inspect raw initial HTML, not only hydrated DOM. Public sees A/public prices; partner sees A+B/authenticated prices. Inspect HTML and serialized/RSC navigation/prefetch payloads for restricted IDs, slugs, descriptions, specifications and partner prices. Cover catalog, detail and later homepage featured content; inspect metadata and any data endpoints if introduced. Public requests for restricted slugs disclose no product details and get the not-found experience. Test separate sessions and public requests after partner traffic to detect cache leakage. Verify data/secret modules and raw JSON do not enter client bundles.
- **Gate C — Interactions/fallbacks:** Test case-insensitive search, category filtering, combined filters, shareable URL reloads/history and Clear Filters for both roles. Clear Filters resets both query controls and restores only authorized results. Toggle both layouts by keyboard and pointer; prove meaningful visual ordering/emphasis changes without document reload and without changing products/prices. Check product-detail navigation, empty query results with recovery, absent/failed images and unknown/restricted slugs. Exercise malformed query/content handling without exposing internals.
- **Gate D — Accessibility/responsiveness/integration:** Inspect all five routes at approximately 375px, 768px and 1440px. Check overflow, reading order, images, grids, usable navigation/filters and touch targets. Manually verify keyboard paths, focus, labels, headings, accessible selected/error states, alt text, contrast and reduced motion; automated checks support but do not prove WCAG compliance. Run lint, strict types, relevant Vitest and Playwright tests, production build/start; record actual results and limitations.
- **Gate E — Delivery:** Verify README installation, environment setup, dev/build/start/test commands and live deployment URL. Verify `AGENT.md` addresses role rationale, context/handoffs, enforcement prompts (especially SSR), trade-offs, actual manual compile/deploy fixes, AI struggles and two-more-weeks improvements. Smoke-test deployed login/logout, Secure cookies, protected route, role pricing, direct links and public isolation. Confirm one accessible repository with app and `/agents/`. Prepare `Repo:`, `Live App:`, `Demo Login:` fields; note any non-empty credentials work and provide a harmless tested example. Do not send submission email without explicit authorization.

## Task 1a Outcome and Verification - 2026-10-13

**Task:** User approved the plan and explicitly delegated only the ESLint repair, requested lint/type/build checks and independent review, and prohibited starting product data or authentication.

**Execution:** Orchestrator assigned `/root/frontend_lint` to follow the Frontend Markdown role and diagnose/fix the smallest tooling issue. After its handoff, `/root/review_lint` independently inspected the changes and reran verification using the Review role. Both received assessment/context instructions and bounded scope. Orchestrator owns this tracker update.

**Root cause:** The scaffold imports modern flat-config arrays from `eslint-config-next`, but installed 14.2.35 supplies legacy CommonJS configuration, lacks the expected TypeScript entry point/export map, and supports ESLint 7/8 rather than installed ESLint 9.39.5. Adding a `.js` suffix alone would not resolve the format and compatibility mismatch.

**Fix / files:** Frontend changed only `package.json` and `package-lock.json`, aligning the existing `eslint-config-next` devDependency to exact `16.4.0`, matching Next.js. `eslint.config.mjs` and application files remain unchanged. No new direct dependencies or direct-package downgrades. Installation added 51, removed 30 and changed three transitive package entries; Review found changed lock nodes limited to development tooling. The transitive `lru-cache` replacement from 10.4.3 to 5.1.1 follows removal of the old glob chain and introduction of Babel's `^5.1.1` requirement through React Hooks tooling, rather than a downgrade workaround. Next.js and ESLint versions did not change.

| Command/check | Frontend result | Independent Review result |
|---|---|---|
| `npm run lint` before fix | PowerShell blocked `npm.ps1`; used equivalent Windows `.cmd` launcher without changing execution policy. | Reviewed reported limitation. |
| `npm.cmd run lint` before fix | Failed, exit 1: `ERR_MODULE_NOT_FOUND` for `eslint-config-next/core-web-vitals`. | Confirmed original package/config mismatch through inspection. |
| Registry query / targeted install | Sandbox EACCES; approved escalated query/install succeeded. No install scripts executed. | Manifest, lock root and installed direct versions match. |
| `npm.cmd run lint` after fix | Passed, exit 0. | Passed, exit 0. |
| `npx.cmd tsc --noEmit` | Passed, exit 0. | Passed, exit 0. |
| `npm.cmd run build` | Initial sandbox run failed fetching existing Geist/Geist Mono fonts. Approved network-enabled rerun passed, exit 0. | Passed, exit 0 without escalation; existing font/build cache may have avoided downloads. |
| Production build output | Compilation, TypeScript, prerendering `/` and `/_not-found` completed. | Same scaffold routes verified in build output. |
| Lint rule activation | Configuration unchanged; no rules disabled. | ESLint API confirms 113 active TSX rules; in-memory probe triggers no-explicit-any error and image/alt/unused warnings. No test files created. |
| Package tree / diff | Compatible ESLint tree; diff check passed; no generated tracked changes. | Lock changes confined to development tooling; no actionable defects. |

**Review outcome:** ESLint repair passes independent review. No application feature, security-flow, browser, or full foundation sign-off is claimed. Production startup/styled root response and broader runtime/caching review remain pending. Existing Google font downloads require network on a cold build.

**Decisions / intervention:** User directed the bounded repair. Frontend made the AI-generated package alignment; approved escalations enabled registry access and font downloads. Review made no code changes. This record supplies factual handoff evidence for the later `AGENT.md`; no human-authored code fix is claimed.

## Task 2 Outcome and Verification - 2026-10-14

**Task / execution:** User requested resumption of interrupted product data work with the explicit authorization boundary clarification. Orchestrator read root instructions, assessment, all six core context files and Backend/Review roles. `/root/backend_products_resume` inspected the recovered implementation and completed verification without additional code edits. Then `/root/review_products` independently inspected implementation and reran all four checks; it made no edits. No new install or escalation was needed in this resumed run. Prior interrupted execution results are not inferred.

**Files:** Created during this phase: `types/product.ts`, `data/products.json`, `lib/products/product-rules.ts`, `lib/cms/products.ts`, `tests/products.test.ts`, `vitest.config.mts`. Modified: `package.json`, `package-lock.json`, and this Orchestrator-owned tracker. No application pages, authentication or endpoints were added.

**Contracts / decisions:** Raw server-only `CmsProduct` retains all ten required fields, including both prices and visibility. Shared frontend-safe `Product` contains id, slug, name, description, category, image, specifications and only `displayPrice`. Adapter exports `getProducts(access, filters?) -> Promise<Product[]>`, `getProductBySlug(slug, access) -> Promise<Product | null>` and `getCategories() -> ProductCategory[]`. Explicit access is trusted server input and must later derive from a server-validated session, never a request role or client state. Raw retrieval and role-aware mapping import `server-only`; test-only mocking does not change production configuration.

The seed contains 12 fictional products, four per required category, eight public and four restricted. Prices are USD integer cents. Authorization and allowlist projection precede search/filtering; nested specification objects are copied and extra fields removed. Search trims input and matches name/description case-insensitively; categories match exact labels after trimming, blank means all and unknown means no matches. Unknown and inaccessible slugs both return null. Invalid required CMS records are omitted; duplicate identities retain the first valid record; missing optional media/specifications normalize to null/empty. Local JSON and two small server modules keep replacement straightforward without a generic CMS framework.

| Command | Backend result | Independent Review result |
|---|---|---|
| `npm.cmd run lint` | Passed, exit 0 | Passed, exit 0 |
| `npx.cmd tsc --noEmit` | Passed, exit 0 | Passed, exit 0 |
| `npm.cmd run build` | Passed, exit 0 | Passed, exit 0 |
| `npm.cmd test` | Passed, 28/28 | Passed, 28/28 |

**Review:** Pass; no actionable defects. Verified complete/unique seed, both visibility levels and correct prices, no raw price fields in presentation contracts, authorization before filters, slug behavior, mutation isolation, malformed data handling and meaningful tests. No assessment conflict identified. Backend also ran `git diff --check` successfully (line-ending warnings only).

**Limitations / handoff:** Image fields intentionally remain null until later asset and fallback presentation work. Builds contain only existing `/` and `/_not-found`; they do not verify future catalog SSR/RSC privacy, session validation, personalized caching or client-import rejection in an integration build. Those checks remain assigned to later gates. Task 2 is complete; authentication awaits user approval.

## Open Decisions, Risks and Blockers

1. **Approval gate:** Task 2 complete and reviewed. Authentication and frontend implementation are not authorized.
2. **Foundation status:** User confirms foundation verification complete. Prior lint/types/build evidence is retained; cold builds may need Google Fonts network access.
3. **Privacy/SSR risk:** Passing raw products (both prices), client-only selection, personalized shared caches, prefetch/navigation payloads or public metadata can defeat access controls. Apply authorization and price projection before serialization; test responses at gate B and after UI integration.
4. **Session details:** Backend must record a justified lifetime and signed-payload contract, use an environment secret with no insecure production fallback, and define consistent post-login/logout navigation. No database/auth provider is needed.
5. **Data/UI contract:** USD integer cents, single displayPrice, trimmed name/description search and empty results for unknown categories are established. URL parameter keys remain a route-integration decision.
6. **Content/asset gap:** Only starter assets exist. Frontend must choose appropriately licensed local images and fallback behavior; never put restricted seed data in `public/`. Assess direct asset exposure when choosing partner-only imagery.
7. **Delivery dependencies:** Repository submission URL/access, Vercel project access and production secret provisioning are not verified. Resolve at delivery preparation; they do not block local catalog work after approval.
8. **Execution evidence:** Independent Frontend/Review handoffs exist for task 1a; resumed Backend/Review handoffs exist for task 2. Preserve this evidence for the final AGENT.md; do not infer unavailable interrupted-run verification.

## Next Recommended Task

After explicit user approval, delegate task 3 to Backend: server-validated signed sessions and connect their derived access level to the existing product retrieval functions. Do not begin authentication or frontend work before that approval.

## Update Rules

The Orchestrator owns routine updates after meaningful completions, blockers or phase transitions. Record actual evidence, preserve architectural decisions, keep implementation and review status distinct, and do not mark unmet requirements complete.
