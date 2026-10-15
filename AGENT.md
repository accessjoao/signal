# SIGNAL — AI-Assisted Development Report

**Motorola Solutions | Full Stack Web Developer Technical Assessment**

## 1. Executive Summary

SIGNAL is a full-stack product catalog built with Next.js, TypeScript, Tailwind CSS, and a mocked CMS data source. The application demonstrates server-managed authentication, role-based product visibility and pricing, server-rendered content, and an interactive, responsive product browsing experience.

The project was developed using a **Markdown-driven, multi-agent development framework**, with specialized roles for orchestration, backend engineering, frontend engineering, and independent review.

My responsibility was to define the architecture, establish technical constraints, direct and evaluate AI-assisted implementation, resolve integration issues, and verify the resulting application against the assessment requirements.

Rather than relying on a single prompt to generate the application, I organized development around bounded responsibilities, shared context, explicit acceptance criteria, and iterative verification.

**The central engineering principle was that AI agents could accelerate implementation, but architectural decisions, security requirements, integration, and final acceptance remained under my control.**

### Delivered capabilities

- Simulated authentication using server-issued, signed session cookies.

- Protected routes and server-side authorization.

- Public and authenticated product sets with role-specific pricing.

- Server-side product filtering and sanitized data contracts.

- Responsive catalog with search, category filters, and layout switching.

- State-controlled product-detail drawer and standalone direct URLs.

- Accessible interaction patterns, loading feedback, and responsive layouts.

- Automated unit, integration-oriented, and browser security tests.

- Markdown-based agent instructions, shared context, and development tracking.

The implementation prioritizes security boundaries, maintainability, and a coherent user experience without adding infrastructure beyond the assessment's scope.

---

## 2. My Role: Architecture, Direction, and Integration

I approached the assignment as an engineering lead coordinating AI-assisted development rather than as a passive consumer of generated code.

My contributions included:

**System architecture**

Defined the separation between server-side business rules, CMS data access, session management, and client-side presentation. Established the rule that authentication, product visibility, and price selection must be resolved on the server.

**Agent orchestration**

Structured the development process around specialized Markdown-defined roles, bounded tasks, shared contracts, and verification requirements. Used independent agent execution where supported and direct AI-assisted implementation where more appropriate.

**Technical decision-making**

Selected a mocked CMS adapter, stateless signed sessions, and server-rendered product data. Initially used intercepted routes for the product drawer, then replaced them with simpler React state after first-click reliability issues.

**Implementation and integration**

Applied and refined implementation changes, integrated work across application layers, and resolved framework, testing, navigation, and UI issues encountered during development.

**Quality assurance**

Used automated checks and browser testing to validate functionality, identify regressions, and confirm security-sensitive behavior. Treated generated output as code requiring review rather than as automatically correct.

**Product experience**

Directed the visual design toward a cohesive graphite-and-lime interface, with consistent responsive layouts, clear product hierarchy, interactive details, and deliberate navigation behavior.

The final application reflects a combination of specialized agent execution, AI-guided development, and developer-directed integration and verification.

---

## 3. Multi-Agent Architecture

The development system is defined through Markdown instructions rather than a custom orchestration service.


| Agent | Primary responsibility | Key constraints |
|---|---|---|
| **Orchestrator** | Task decomposition, sequencing, shared context, handoffs, and acceptance criteria | Maintains scope and coordinates dependencies |
| **Backend Agent** | Product modeling, CMS adapter, authentication, authorization, server rendering, and business-rule tests | Owns security-sensitive decisions and sanitized data contracts |
| **Frontend Agent** | Catalog presentation, responsive UI, filters, product drawer, and interaction design | Consumes approved product contracts without making authorization decisions |
| **Review Agent** | Independent requirements review, security inspection, regression analysis, and verification | Reports findings with evidence and actionable recommendations |


### Instruction hierarchy

The system uses:

- `AGENTS.md` — shared project instructions and development rules.

- `agents/orchestrator.md` — coordination and handoff responsibilities.

- `agents/backend-agent.md` — backend ownership and security constraints.

- `agents/frontend-agent.md` — UI responsibilities and data boundaries.

- `agents/review-agent.md` — independent verification expectations.

- `context/` — requirements, architecture, standards, design direction, workflow, and progress tracking.

The assessment requirements take precedence over implementation preferences.

This hierarchy reduces ambiguity, prevents agents from redefining shared interfaces independently, and makes the development process easier to inspect.

### Task execution and handoffs

Tasks were designed around a repeatable workflow:

1\. Establish the relevant requirements, existing implementation, and constraints.

2\. Define a bounded objective, owned files, dependencies, and acceptance criteria.

3\. Implement the change within the assigned responsibility.

4\. Run applicable verification checks.

5\. Return a structured handoff documenting changes, decisions, test results, and outstanding issues.

6\. Review the result, address defects, and update project context.

For example, the product-data phase required the Backend Agent to preserve both CMS price fields while exposing only one authorized display price to frontend components.

This contract allowed the UI to remain independent of pricing and authorization logic.

The workflow also established a clear escalation point: changes affecting security boundaries or shared architecture required developer review rather than unilateral agent decisions.

---

## 4. How the Agent System Was Used

The project includes documented examples of independent agent execution alongside phases completed through developer-directed AI assistance.

### Foundation and tooling

An independently invoked Frontend Agent addressed an initial Next.js and ESLint configuration mismatch. A separate Review Agent verified the correction.

A later configuration regression was identified and corrected manually.

**Engineering lesson:** Tool-generated configuration changes still require compatibility checks against the actual framework version.

### Product modeling and CMS integration

The Backend Agent was assigned the product schema, mocked CMS adapter, role-based filtering, safe data projection, and corresponding tests.

An independent Review Agent inspected the implementation and reran verification. The recovered phase records successful lint, TypeScript, build, and 28 product tests.

The important architectural result was a stable contract between raw CMS content and the data permitted to reach the browser.

### Authentication and authorization

Authentication was implemented through a developer-applied, AI-guided workflow rather than a separately executed Backend Agent.

I maintained the requirement that access decisions derive from a validated server session, not a client-provided role.

The implementation uses signed cookies, protected routes, and server-side access resolution. Authentication behavior is covered by unit and browser tests.

### Catalog, interaction, and visual implementation

Later implementation phases included the catalog experience, product details, intercepted drawer, navigation improvements, and visual refinement.

These phases combined AI assistance with developer-directed implementation and corrections. Available records do not establish independent agent execution for every individual change, so no such attribution is claimed.

### Documentation and final review

Codex inspected the repository and prepared documentation, with a separately invoked Review Agent assigned to examine requirements and implementation evidence.

A subsequent assessment audit verified lint, TypeScript, 40 Vitest tests, and a production build, while identifying a search-input synchronization issue.

That issue was subsequently corrected through a developer-applied change and verified with passing lint, TypeScript, and Playwright checks.

**The objective was not maximum autonomy. It was reliable delivery through the appropriate combination of agent specialization, developer oversight, and verification.**

---

## 5. Architecture and Security Decisions

### Server-side authorization

The application distinguishes public and authenticated access using server-validated session state.

Protected content is not secured merely by hiding UI elements. The server determines which products and prices may be returned before rendering or serialization.

The catalog and product-detail routes use server-side access resolution, and the state-controlled drawer consumes the authorized catalog contract while standalone details independently enforce product authorization.

### Signed session cookies

The simulated login accepts nonempty credentials as specified by the assessment.

The server issues a signed session token containing a random identifier and expiration time rather than credentials.

Security measures include:

- HMAC-SHA256 token signing.

- Timing-safe signature comparison.

- Token expiration validation.

- HttpOnly session cookies.

- SameSite cookie protection.

- Secure cookies in production.

- Server-side protected-route checks.

This is intentionally simulated authentication, not a production identity system. It demonstrates session integrity and authorization boundaries without introducing an account database or external identity provider.

### Safe CMS data projection

The mocked CMS retains the assessment-required fields:

- `priceLoggedOut`

- `priceAuthenticated`

The server-side adapter selects the appropriate price and returns a sanitized product representation containing a single `displayPrice`.

Restricted products are excluded before the data reaches client components.

The adapter also controls which product fields and specifications are exposed.

This design minimizes the risk of leaking alternate prices or authenticated-only product information through HTML or React Server Components payloads.

### Server rendering and interactive clients

Next.js Server Components handle product retrieval, visibility, and pricing.

Client Components handle presentation-only interactions such as layout switching, filter submission, and drawer behavior.

This division preserves the benefits of server-rendered content while keeping the browsing experience interactive.

### Consistent authorization across routes

Product details open through catalog React state without navigation, or through a standalone URL on direct navigation.

Both paths use the same server-side product access rules.

This prevents an alternative navigation path from bypassing product visibility restrictions.

---

## 6. Product Experience and Frontend Engineering

I treated the application as both a technical assessment and a usable product demonstration.

### Visual direction

SIGNAL uses a distinctive graphite-and-lime design system with consistent typography, spacing, cards, and interaction states.

The homepage introduces the product concept through a branded hero, while the catalog prioritizes discoverability and product comparison.

### Catalog interaction

The catalog supports:

- Search by product name or description.

- Category filtering.

- Combined search and category queries.

- Price First and Specs First layouts.

- Responsive product cards.

- Clear loading and pending states.

- Browser-history-aware navigation.

Filters are submitted through Next.js App Router navigation using `router.push()` with `scroll: false`, avoiding unnecessary page jumps.

A subsequent browser review identified that Back/Forward navigation could restore the URL and results without updating the search input.

I addressed this by tying the form's state lifecycle to the applied search and category values. The updated implementation synchronizes the visible controls with browser navigation while retaining server-side filtering.

### Product details

The state-controlled drawer provides a focused product view without changing the catalog URL.

Direct URLs render a standalone product page.

The implementation includes keyboard dismissal, focus considerations, history-aware navigation, and invalid-product handling.

### Responsive implementation

The shared layout and footer support mobile, tablet, and desktop viewports.

The footer includes project attribution and identifies SIGNAL as a Motorola Solutions technical assessment concept.

---

## 7. Testing and Quality Assurance

Verification was incorporated throughout development rather than deferred until the end.

### Automated coverage


| Test layer | Coverage |
|---|---|
| **Product unit tests** | Product data integrity, role visibility, price selection, sanitized fields, filtering, lookup, and malformed data |
| **Authentication unit tests** | Credential validation, signed sessions, tampered tokens, expiration, and malformed inputs |
| **Authentication browser tests** | Login, logout, protected routes, session persistence, and cookie behavior |
| **Catalog security browser tests** | Public/authenticated HTML, restricted content exclusion, sanitized pricing, and captured RSC responses |
| **Catalog interaction tests** | Navigation, filtering, layouts, and user-facing behavior |
| **Product drawer tests** | Opening without navigation, first-click regression, dismissal, focus/reopening, reduced motion, direct links, and invalid products |


### Latest verification

The developer subsequently confirmed that lint, TypeScript checks, and the complete Playwright suite pass following the state-controlled drawer refactor and accessibility cleanup. The previously recorded Vitest and production-build results are listed separately below.

The final audit reported:

- **ESLint:** Passed.

- **TypeScript:** Passed.

- **Vitest:** 40 tests passed.

- **Production build:** Passed.

An earlier audit reported an intermittent intercepted-route drawer failure. The implementation was subsequently replaced with a state-controlled drawer, and the developer confirmed passing Playwright tests, including repeated first-click regression checks.

The developer also confirmed that lint, TypeScript, and Playwright checks passed after the later drawer and focus-management changes. Exact updated test counts were not supplied for this documentation revision.

These results describe local verification. Production deployment and HTTPS smoke testing remain separate acceptance steps.

### Testing security-sensitive output

A particular priority was validating what the server actually sends to the browser.

Tests inspect rendered content and captured React Server Components responses for restricted product information and raw pricing fields.

During development, an RSC test exposed a response-capture timing issue in Playwright.

The test was corrected to register its response listener before navigation, identify the expected RSC request, and begin reading the response body immediately.

The original security assertions were preserved.

This distinction matters: a test failure caused by its capture mechanism should be investigated and corrected without weakening the underlying security requirement.

---

## 8. Challenges, Corrections, and Engineering Judgment

Several implementation challenges required decisions beyond initial code generation.


| Challenge | Resolution and lesson |
|---|---|
| **Framework/tooling compatibility** | Corrected an ESLint configuration mismatch with the installed Next.js version. Verified configuration rather than assuming generated dependencies were compatible. |
| **Server-only module testing** | Introduced test-specific handling for server-only imports while preserving production boundaries. |
| **Request-time session rendering** | Used Next.js request-time rendering mechanisms and Suspense where required for session-dependent content. |
| **Client-side versus server-side pricing** | Kept price selection in the server adapter and exposed only the authorized display price to the UI. |
| **Category sentinel handling** | Normalized the `all` category at the route boundary so the CMS adapter receives the intended unfiltered request. |
| **Filter navigation experience** | Replaced disruptive form navigation with App Router transitions, pending feedback, and scroll preservation. |
| **Browser Back/Forward synchronization** | Corrected stale search-field state by synchronizing the filter form with applied URL values. |
| **RSC security test reliability** | Adjusted response capture timing without removing or weakening assertions. |
| **Shared footer overflow** | Moved the full-width divider outside the constrained content container to avoid horizontal overflow. |
| **Intercepted-route development behavior** | Investigated intermittent first-click navigation failures; replaced intercepted routing with a state-controlled drawer, retaining standalone product URLs. The exact underlying hydration/navigation trigger was not conclusively proven. |

These corrections demonstrate an important part of my development approach: **evaluate generated code against observable behavior, isolate the underlying cause, and apply focused changes without compromising architecture or test coverage.**

---

## 9. Architectural Tradeoffs

### Mocked CMS instead of Contentful integration

The assessment permits a mocked CMS JSON source.

I chose a small adapter over a live CMS integration to keep the application deterministic, independently testable, and focused on the required business logic.

The adapter creates a clear integration point for Contentful or another provider in a future iteration.

### Simulated authentication instead of user infrastructure

A signed, stateless session satisfies the specified login behavior without introducing account storage.

The tradeoff is that the implementation does not provide real identity verification, centralized session revocation, or account-management capabilities.

Those would be necessary considerations for a production authentication system.

### Server-owned business logic

Resolving pricing and visibility on the server increases confidence that restricted information is not exposed through client-side logic.

It also creates a clear responsibility boundary between backend and frontend work.

### State-controlled drawer

At the developer's request, catalog React state replaced intercepted routes after immediate-click failures reached standalone pages. An independently executed Frontend Agent changed the components and removed the parallel routes; the orchestrator updated tests and documentation, with an independent source review that found no blocking refactor issue. Codex did not run checks during this refactor, as requested; the developer subsequently ran the checks locally and confirmed they passed.

The drawer reuses already-authorized catalog data and CSS animations. It no longer changes the URL or history; standalone product URLs remain available. Interactions require hydration, and the first-click regression remains for local verification.

### Purposeful scope control

I intentionally avoided unrelated features such as shopping carts, payments, user registration, databases, and custom agent infrastructure.

This kept engineering effort focused on the assessment's core requirements and made the resulting implementation easier to evaluate.

---

## 10. What I Would Improve With Two Additional Weeks

### Week 1 — Contentful Integration

My first priority would be replacing the mocked JSON with a real Contentful integration.

I would:

- Create a Contentful space and define a Product content model.
- Move the existing 12 products into Contentful.
- Update the CMS adapter to fetch products from Contentful.
- Use Contentful's media library to manage product images.
- Keep product visibility and pricing decisions on the server.

This would allow product information, pricing, and images to be managed without changing the application code.

### Week 2 — Authentication and User Experience

The second week would focus on making the application more suitable for real users.

I would:

- Replace simulated login with real user authentication.
- Introduce customer and partner accounts with different access permissions.
- Add secure password handling and proper session management.
- Improve loading and error states when Contentful data is unavailable.
- Refine mobile responsiveness and product drawer interactions.
- Expand automated tests for Contentful integration and authentication.

These improvements would make SIGNAL more practical as a real product catalog while building on the existing Next.js architecture.

---

## 11. Key Takeaways

This assessment reinforced three principles that shape how I use AI in software development.

**1. Architecture must precede generation.**

Clear data contracts, ownership boundaries, and security constraints make AI-generated implementations more reliable and easier to integrate.

**2. Effective orchestration requires judgment, not just delegation.**

Specialized agents are valuable when their tasks are bounded, their context is explicit, and their output is independently verifiable. Direct developer intervention remains essential when requirements change or integration issues arise.

**3. Verification is part of implementation.**

A visually complete application is not necessarily a correct application. Testing server-rendered output, session behavior, navigation, and data exposure revealed issues that could not be established through visual inspection alone.

### Final reflection

SIGNAL demonstrates my ability to combine full-stack engineering with structured AI-assisted development.

I defined the architecture, established agent responsibilities, maintained the security boundaries, guided implementation, resolved defects, and validated the application through automated testing.

The resulting system is intentionally scoped, technically cohesive, and supported by documented development decisions.

**For me, the value of a multi-agent workflow is not how much code can be generated autonomously. It is how effectively specialized AI capabilities can be directed, integrated, and verified to deliver reliable software.**

---

**Project: SIGNAL — Motorola Solutions Full Stack Web Developer Technical Assessment**

**Developer: Joao Felipe Silveira**

**GitHub: https://github.com/accessjoao**
