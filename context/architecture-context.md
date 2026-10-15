# Architecture Context — SIGNAL

## 1. Architecture Overview

SIGNAL is an enterprise marketing website with integrated product catalog functionality.

The application uses Next.js App Router, TypeScript, Tailwind CSS, and a headless CMS-style data access layer.

The architecture prioritizes server rendering, secure role-based content delivery, reusable components, and maintainability.

**Guiding principle:** Choose the simplest implementation that satisfies the requirements. Avoid speculative abstractions, dependencies, and features.

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Content | Local JSON through a typed CMS adapter |
| Authentication | Server-managed signed session cookie |
| Hosting | Vercel |
| Testing | Vitest (unit), Playwright (E2E) |

Use React Server Components by default.

Client Components should only be introduced when browser-side interactivity is necessary.

## 3. Application Routes

| Route | Responsibility |
|---|---|
| `/` | Marketing homepage and featured products |
| `/catalog` | Searchable and filterable product catalog |
| `/catalog/[slug]` | Individual product details |
| `/login` | Simulated authentication |
| `/partner` | Protected partner landing page |

Authentication and logout actions are handled on the server.

Do not introduce additional routes without a clear requirement.

## 4. Product Data Model

Products are stored in local JSON and accessed through a typed data layer.

Each product contains:

- `id`
- `slug`
- `name`
- `description`
- `category`
- `image`
- `specifications`
- `priceLoggedOut`
- `priceAuthenticated`
- `visibility` (`public` or `authenticated`)

Prices use a consistent currency and representation.

Product visibility and pricing must be resolved on the server before data reaches the client.

## 5. CMS Boundary

Product components must not import the JSON seed directly.

All product retrieval goes through a dedicated CMS adapter.

The adapter is responsible for:

- Retrieving products.
- Finding products by slug.
- Returning normalized product data.
- Handling missing or invalid content.

The initial adapter uses local JSON. A future CMS integration should be possible without rewriting presentation components.

Do not build a generic CMS framework.

## 6. Authentication and Authorization

Authentication is simulated. Any non-empty username and password are accepted.

A successful login creates a signed session cookie on the server.

Session cookies must use:

- `HttpOnly`
- `Secure` in production
- `SameSite=Lax`
- An appropriate expiration

Session validation happens on the server.

The `/partner` route requires a valid session.

Authenticated-only products must not be exposed to unauthenticated users through rendered HTML, serialized props, or public data endpoints.

Client-side authentication checks must never be the sole protection mechanism.

## 7. Rendering Strategy

Server rendering is the default.

The server determines:

- Current authentication state.
- Visible products.
- Appropriate pricing.
- Product detail access.

The initial HTML must contain the correct visible product content and prices.

Client Components may manage:

- Product layout switching.
- Interactive controls.
- Local presentation state.

Client Components must not independently determine authorization or privileged pricing.

## 8. Filtering and Layouts

The catalog supports category filtering, text search, and clearing filters.

Search and category filters use URL search parameters, allowing direct navigation and shareable filtered results.

The application supports two product card layouts:

- Price First
- Specs First

Switching layouts must not reload the page.

Layout switching changes presentation only, not product visibility or pricing.

Catalog product details open in React state without changing the URL. Selection resolves an ID from the current server-authorized product list, which contains only displayPrice. The reusable drawer calls onClose after its CSS exit animation. Direct `/catalog/[slug]` URLs retain standalone rendering and server authorization. No parallel/intercepted drawer routes are used.

## 9. Component Boundaries

**Server Components**
- Read sessions.
- Retrieve catalog data.
- Resolve role-based content.
- Render initial product information.

**Client Components**
- Manage interactive layout controls.
- Handle browser-side UI interactions.
- Receive only data the current visitor is authorized to view.

**Data Layer**
- Owns product retrieval and normalization.
- Remains independent of React components.

**Authentication Layer**
- Owns session creation, validation, and destruction.
- Does not depend on client-side state.

## 10. Error Handling

The application must handle:

- Missing product images with a fallback.
- Empty search results with a helpful message.
- Invalid product slugs with a 404 page.
- Unauthenticated access to protected routes.
- Missing or malformed product data without crashing the entire application.

## 11. Architectural Invariants

The following rules must never be violated:

1. Authorization and role-based pricing are resolved on the server.
2. Unauthenticated users never receive authenticated-only product data.
3. Server Components are preferred unless interactivity requires a Client Component.
4. UI components never access the CMS seed directly.
5. Authentication does not rely solely on client-side state.
6. Layout switching never changes authorization or pricing.
7. Product content and presentation remain separated.
8. New dependencies and abstractions require a concrete justification.
9. The application must remain compatible with a standard Vercel deployment.
10. Architectural changes must be documented before implementation.

## 12. Scope Control

Do not introduce:

- A database.
- OAuth or external authentication providers.
- Shopping cart or checkout functionality.
- Global state management libraries without a demonstrated need.
- Custom orchestration infrastructure.
- Unnecessary API routes.
- Complex animations or component frameworks.

Prefer straightforward Next.js and React patterns.

## 13. Architecture Changes

If an implementation requires changing an architectural decision:

1. Identify the conflict.
2. Explain the proposed change and trade-off.
3. Request approval before changing an invariant.
4. Update this document after approval.
5. Record the decision in the progress tracker.