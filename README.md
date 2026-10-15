# SIGNAL

**A full-stack enterprise technology catalog built with Next.js and a Markdown-driven multi-agent development workflow.**

SIGNAL is a fictional enterprise technology platform developed for the [Motorola Solutions Full Stack Web Developer Technical Assessment](context/assessment-requirements.md).

The project demonstrates how specialized AI development agents can be coordinated through Markdown instructions, shared context, explicit responsibilities, and independent review to deliver a secure, maintainable full-stack application.

Beyond the finished catalog, the assessment focuses on **AI-assisted engineering orchestration, architectural decision-making, server-side authorization, and verification**.

**Developer:** [Joao Felipe Silveira](https://github.com/accessjoao)


## Live Demo

**Production:** https://signal-seven-omega.vercel.app/

**Deployment:** Vercel

**Production verification:** Completed successfully.

All 11 production verification checks passed, including:

- HTTPS availability
- Authentication and secure session cookies
- Server-side product authorization and role-based pricing
- Public and authenticated session isolation
- Catalog search and category filtering
- Product drawer and direct product URLs
- Logout and protected route enforcement

**Development report:** [AGENT.md](AGENT.md)

---

## Features

### Authentication and authorization

- Simulated authentication accepting any nonempty username and password.

- Server-issued, HMAC-SHA256-signed session cookies.

- HttpOnly, SameSite, and production Secure-cookie protection.

- Protected partner route with server-side access checks.

- Login, logout, and session persistence across refreshes.

- Server-controlled product visibility and pricing.

### Product catalog

- 12 fictional enterprise technology products across three categories.

- Eight publicly available products (Set A).

- Four additional authenticated-only products (Set B).

- Public and authenticated prices selected on the server.

- Search by product name or description.

- Category filtering and combined queries.

- Shareable, URL-based filter state.

- Price First / Specs First layout switching without a page reload.

- Product details presented through a state-controlled drawer or standalone page.

- Loading, empty-results, missing-image, and not-found states.

### User experience

- Responsive graphite-and-lime design system.

- Marketing homepage with animated CSS orbital illustration.

- Accessible form controls and interaction feedback.

- Smooth App Router navigation with scroll preservation.

- Browser Back/Forward synchronization for catalog filters.

- Keyboard-accessible product drawer with Escape dismissal.

- Reduced-motion support for animations.

- Shared navigation and footer.

---


## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.4.0, App Router |
| UI | React 19.3.0, TypeScript |
| Styling | Tailwind CSS 4 |
| Content | Mocked CMS JSON with server-only adapter |
| Authentication | Next.js Server Actions, Node.js crypto, signed cookies |
| UI components | Radix Select, Lucide React |
| Animation | CSS transitions and keyframes |
| Unit testing | Vitest |
| End-to-end testing | Playwright, Chromium |
| Deployment | Vercel |

The project uses Next.js Server Components for data retrieval, authentication-dependent rendering, and product authorization. Client Components are limited to interactive presentation behavior.


---

## Getting Started

### Prerequisites

- Node.js 22

- npm

- Git

### 1. Clone the repository

```bash

git clone https://github.com/accessjoao/signal.git

cd signal

```

The repository URL above assumes the project will be published as `accessjoao/signal`. Update it if the final repository name differs.

### 2. Install dependencies

```bash

npm ci

```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env

SESSION_SECRET=replace-with-your-own-random-secret-at-least-32-characters

```

`SESSION_SECRET` is required for signing and validating session tokens.

Use a cryptographically random value of at least 32 characters. Keep it server-side and use different values for local development and deployment.

For example, generate a secret with Node.js:

```bash

node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"

```

No database, CMS API key, or external authentication provider is required.

### 4. Start the development server

```bash

npm run dev

```

Open [http://localhost:3000](http://localhost:3000).

### 5. Test the application

Use any nonempty username and password to sign in.

The login is intentionally simulated for this assessment; no real account is created or validated.

After signing in, the application displays additional partner-only products and authenticated pricing.

### Production build

```bash

npm run build

npm run start

```

On Windows PowerShell, use `npm.cmd` or `npx.cmd` if execution policy blocks the corresponding PowerShell script launchers.

---


## Application Routes

| Route | Description | Access |
|---|---|---|
| `/` | Marketing homepage and featured products | Public |
| `/catalog` | Searchable product catalog with role-based pricing | Public / authenticated |
| `/catalog/[slug]` | Standalone product details for direct URLs | Based on product visibility |
| `/login` | Simulated authentication | Public |
| `/partner` | Partner landing page | Authenticated only |

The homepage deliberately displays public featured-product pricing, even for authenticated visitors.

The catalog and product-detail routes resolve visibility and pricing using the current server-validated session.

---

## Architecture

SIGNAL separates data access, business rules, authentication, and presentation.

```text

app/

  actions/

    auth.ts                 Authentication Server Actions

  catalog/

    [slug]/                 Standalone product details

  login/                    Login page

  partner/                  Protected partner page

  page.tsx                  Homepage

  layout.tsx                Shared application layout

components/

  catalog/                  Catalog UI, filters, cards, drawer

  layout/                   Shared navigation and footer

lib/

  auth/                     Credentials, signed sessions, cookies

  cms/                      Server-only product adapter

  products/                 Visibility, pricing, filtering

types/                      Frontend-safe product contracts

data/products.json          Mock CMS content

tests/

  e2e/                      Playwright browser tests

agents/                     Specialized AI agent instructions

context/                    Requirements, architecture, workflow, history

AGENTS.md                   Root AI development instructions

AGENT.md                    AI-assisted development report

README.md                   Project documentation

```

### Data flow

```text

Request

   |

   v

Next.js Server Component

   |

   v

Server-validated session

   |

   v

Access level: public / authenticated

   |

   v

Server-only CMS adapter

   |

   +-- Filter unauthorized products

   |

   +-- Select authorized price

   |

   +-- Project approved fields

   |

   v

Sanitized Product data

   |

   v

Server-rendered catalog

   |

   v

Client presentation and interactions

```

The frontend never needs access to raw CMS pricing fields or client-controlled authorization decisions.

---

## Authentication and Security

### Simulated login

The application accepts any username and password containing non-whitespace characters, as specified by the assessment.

Successful authentication creates a signed session cookie and redirects the visitor to `/partner`.

The session token contains a random identifier and expiration timestamp, not the submitted credentials.

### Session protection

The session implementation uses:

- HMAC-SHA256 signatures.

- Timing-safe signature verification.

- Expiration validation.

- HttpOnly cookies.

- SameSite=Lax.

- Secure cookies in production.

- Server-side access checks.

The `signal_session` cookie has a seven-day expiration.

The session is stateless. Logout removes the browser cookie, but does not centrally revoke a previously copied valid token.

This is appropriate for the assessment's simulated authentication requirement, not a substitute for a production identity provider.

### Role-based content and pricing

The mocked CMS contains two product sets and two price fields per product.


| Visitor | Visible products | Price selected |
|---|---|---|
| Public | Set A — 8 products | `priceLoggedOut` |
| Authenticated | Sets A + B — 12 products | `priceAuthenticated` |


Both raw price fields remain in the CMS model.

Before returning product data, the server selects the appropriate price and projects an approved frontend contract containing a single `displayPrice`.

The frontend does not receive `priceLoggedOut`, `priceAuthenticated`, or restricted products through the intended public rendering paths.

The drawer consumes only the catalog's server-authorized products and single display price. Standalone product-detail pages independently enforce server-side authorization.

### Server-side rendering

Next.js Server Components handle session-aware data retrieval and rendering.

The application uses request-time rendering mechanisms and Suspense boundaries where required by the current framework configuration.

Client-side layout and filtering controls do not determine authorization or pricing.

---

## Catalog Interactions

### Search and category filters

Filters use shareable URL parameters.

Examples:

```text

/catalog?search=relay

/catalog?category=Communication%20Devices

/catalog?category=Communication%20Devices&search=relay

```

Search matches product names and descriptions case-insensitively.

Category filtering supports exact category labels, and the route normalizes `category=all` to the unfiltered state.

The filter form navigates using Next.js App Router:

```tsx

router.push(url, { scroll: false });

```

This preserves scroll position and avoids a full document reload.

React transitions provide pending feedback while the server resolves the filtered catalog.

The filter form is keyed to the applied URL values so browser Back/Forward navigation keeps the search input and category selection aligned with the displayed results.

### Price First / Specs First

The catalog provides two product-card presentations.

Switching layouts updates local React state without reloading the page or requesting a different price.

The authorized `displayPrice` remains unchanged.

### Product detail drawer

Selecting View product opens a React-state-controlled drawer without navigation. The URL, filters, and catalog layout stay unchanged. Closing clears the selection after the CSS exit animation. Direct `/catalog/[slug]` URLs still render standalone details; drawer state is not encoded in browser history.

The drawer supports dismissal through its close control, backdrop, and Escape key, along with focus handling and body scroll locking.

Opening a product URL directly, or refreshing that URL, renders a standalone product-detail page.

Both experiences use the same sanitized product contract and server-side authorization rules.

---

## Multi-Agent Development Workflow

The assessment required the application to be developed through specialized AI agents defined in Markdown.

SIGNAL implements this structure through four roles:


| Agent | Responsibility |
|---|---|
| **Orchestrator** | Task planning, context selection, delegation, handoffs, and acceptance |
| **Backend Agent** | CMS data, product contracts, authentication, authorization, and server-side business rules |
| **Frontend Agent** | Responsive UI, catalog interactions, product details, and accessibility |
| **Review Agent** | Independent verification, security inspection, testing, and regression analysis |


### Shared context

`AGENTS.md` defines project-wide instructions.

The `agents/` directory defines specialized responsibilities and boundaries.

The `context/` directory contains assessment requirements, architecture decisions, coding standards, design direction, workflow rules, and progress tracking.

### Development approach

The workflow emphasizes:

1\. Reading the relevant requirements and shared context.

2\. Defining bounded tasks and explicit acceptance criteria.

3\. Assigning responsibilities to specialized agents.

4\. Reviewing implementation against shared contracts.

5\. Running automated verification.

6\. Recording decisions, defects, and handoffs.

Independent agent execution was used in documented phases. Other phases involved developer-directed AI assistance and manual integration.

For a detailed account of the workflow, agent contributions, technical challenges, developer interventions, and proposed improvements, see **[AGENT.md](**&#x41;GENT.m&#x64;**)**.

---

## Testing

SIGNAL includes automated tests covering product business rules, authentication, authorization, rendering, and browser interactions.

### Static analysis and unit tests

```bash

npm run lint

npx tsc --noEmit

npx vitest run

```

The unit test suite contains **40 tests**, covering product logic and authentication.

Product tests verify visibility, pricing, filtering, data projection, lookup, and invalid data handling.

Authentication tests verify input validation, token integrity, malformed sessions, and expiration.

### End-to-end tests

Install Playwright Chromium:

```bash

npx playwright install chromium

```

Run the browser suite:

```bash

npx playwright test

```

The Playwright suite covers authentication, protected routes, session behavior, product visibility, server-rendered data, React Server Components responses, and product navigation.

Security-oriented browser tests inspect actual server responses rather than relying exclusively on visible UI state.

### Latest local verification

The developer confirmed that lint, TypeScript checks, and the full Playwright suite pass following the state-controlled drawer refactor and accessibility improvements. Vitest and production-build results below are from the most recently documented audit.


| Check | Result |
|---|---|
| ESLint | Passed |
| TypeScript | Passed |
| Vitest | 40 tests passed |
| Next.js production build | Passed |
| Playwright | Passed after final drawer refactor |

The Vitest and production-build results come from the most recent documented Codex audit. The developer subsequently confirmed passing Playwright, lint, and TypeScript checks after the drawer refactor and accessibility cleanup.

These are local results, not claims of production verification.

### Testing limitations

Playwright currently runs against a development server using Chromium.

The suite does not establish comprehensive cross-browser compatibility, WCAG conformance, or production CDN/cache isolation.

One catalog cookie-tampering test uses `localhost` while the configured Playwright base URL uses `127.0.0.1`, which limits what that individual test proves. A separate protected-route tampering test uses the configured host.

---

## Deployment

SIGNAL is designed for deployment on Vercel.

### Vercel configuration

1\. Import the GitHub repository into Vercel.

2\. Select the Next.js framework preset.

3\. Configure `SESSION_SECRET` in the environment variables.

4\. Use the standard Next.js build process.

5\. Deploy.

Recommended build command:

```bash

npm run build

```

The application requires the Node.js runtime because session signing uses `node:crypto`.

### Production verification checklist

After deployment, verify:

- [x] Homepage and catalog load over HTTPS.

- [x] Login accepts nonempty demo credentials.

- [x] Session cookies have the Secure and HttpOnly attributes.

- [x] `/partner` redirects unauthenticated visitors.

- [x] Authenticated visitors see all 12 products.

- [x] Public visitors see only the eight public products.

- [x] Public responses do not expose authenticated-only prices.

- [x] Search and category filters work correctly.

- [x] Product drawer and direct detail URLs work.

- [x] Logout removes partner access.

- [x] Public requests remain correctly authorized after authenticated traffic.

The verified production URL: https://signal-seven-omega.vercel.app/

---

## Design and Implementation Tradeoffs

**Mocked CMS:** The local JSON adapter provides deterministic content and testing without external dependencies. It can be replaced with Contentful while preserving the existing frontend-safe contract.

**Simulated authentication:** Signed stateless sessions demonstrate server-managed access without requiring user accounts or a database. Real authentication, rate limiting, and session revocation are outside the assessment scope.

**Server-selected pricing:** Keeping pricing decisions on the server simplifies frontend responsibilities and protects raw CMS fields from unintended serialization.

**Drawer state:** Opening details requires an interactive catalog and does not create a shareable URL or browser-history entry. Direct product URLs remain available.

**Placeholder imagery:** Category-specific icon treatments provide consistent presentation without relying on external assets. A dedicated failed-network-image recovery path is not yet implemented.

**Streaming behavior:** Next.js streaming can render not-found UI after response headers have been sent, meaning some invalid routes may return HTTP 200 rather than HTTP 404.

**Scope control:** Commerce, registration, databases, live CMS editing, and custom orchestration infrastructure were intentionally excluded.

---

## Future Improvements

With additional development time, priorities would include:

- Production authentication and cache-isolation testing.

- Continuous integration for lint, types, unit tests, and browser tests.

- Expanded keyboard, screen-reader, and cross-browser validation.

- Stronger production RSC and prefetch security coverage.

- Improved image loading and fallback behavior.

- Consolidated design tokens and component documentation.

- Performance measurement and targeted optimization.

- Optional integration with a live Contentful space.

See [AGENT.md](AGENT.md) for the detailed two-week improvement plan.

---

## Developer

**Joao Felipe Silveira**

Full-Stack Developer

[GitHub — accessjoao](https://github.com/accessjoao)

SIGNAL is a fictional concept project created for the Motorola Solutions Full Stack Web Developer Technical Assessment. It is not an official Motorola Solutions product.
