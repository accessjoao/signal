# SIGNAL

**A full-stack enterprise technology catalog built with Next.js and a Markdown-driven multi-agent development workflow.**

SIGNAL is a fictional enterprise technology platform developed for the [Motorola Solutions Full Stack Web Developer Technical Assessment](context/assessment-requirements.md).

The project demonstrates how specialized AI development agents can be coordinated through Markdown instructions, shared context, explicit responsibilities, and independent review to deliver a secure, maintainable full-stack application.

Beyond the finished catalog, the assessment focuses on **AI-assisted engineering orchestration, architectural decision-making, server-side authorization, and verification**.

**Developer:** [Joao Felipe Silveira](https://github.com/accessjoao)

<img width="1268" height="770" alt="Signal-app" src="https://github.com/user-attachments/assets/61b885dd-fe95-4999-8c06-9a18691aa431" />


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

## Application Architecture

SIGNAL is built with Next.js App Router, TypeScript, and Tailwind CSS.

The application separates server-side logic from frontend interactions:

- **Server Components:** Fetch products, check authentication, and select the correct pricing.
- **CMS Adapter:** Reads product data from mocked JSON and prepares it for the frontend. It can later be connected to Contentful.
- **Authentication:** Uses signed session cookies to protect partner routes and restricted products.
- **Client Components:** Handle search controls, display layouts, and the product drawer.
- **Testing:** Uses Vitest for unit tests and Playwright for browser testing.

Product visibility and pricing are determined on the server before data is sent to the frontend.

For details about the multi-agent development architecture, prompting strategy, and agent responsibilities, see [AGENT.md](AGENT.md).

---


## Authentication and Security

### Simulated Login

As required by the assessment, the application accepts any non-empty username and password.

After login, the server creates a signed session cookie and redirects the user to `/partner`.

### Session Security

The application uses:

- Signed session cookies to prevent tampering.
- HttpOnly cookies to prevent JavaScript access.
- Secure cookies in production over HTTPS.
- Seven-day session expiration.
- Server-side checks to protect routes and restricted products.

Logging out removes the session cookie.

This authentication system was designed for the assessment. A production application would use real user accounts, secure credential validation, and proper session management.

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

### Static Analysis and Unit Tests

```bash
npm run lint
npx tsc --noEmit
npx vitest run
```

The unit test suite contains **40 tests**, covering product logic and authentication.

Product tests verify visibility, pricing, filtering, data projection, lookup, and invalid data handling.

Authentication tests verify input validation, token integrity, malformed sessions, and expiration.

### End-to-End Tests

Install Playwright Chromium:

```bash
npx playwright install chromium
```

**Important:** Before running Playwright, make sure the local Next.js development server is stopped. If `npm run dev` is running in another terminal, press `Ctrl + C` to stop it.

Playwright starts its own web server using the configuration in `playwright.config.ts`. Leaving the development server running may cause port conflicts or interfere with test execution.

Run the browser suite:

```bash
npx playwright test
```

The Playwright suite covers authentication, protected routes, session behavior, product visibility, server-rendered data, React Server Components responses, and product navigation.

Security-oriented browser tests inspect actual server responses rather than relying exclusively on visible UI state.

---

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

**Mocked CMS:** Used local JSON instead of Contentful to keep development and testing simple. The existing adapter can be updated to fetch data from Contentful later.

**Simulated authentication:** Used signed session cookies instead of building a full authentication system with user accounts and a database.

**Server-side pricing:** Product visibility and pricing are handled on the server to prevent restricted information from reaching public users.

**Product drawer:** Product details open in a drawer without changing the URL. Direct product links still work as standalone pages.

**Product images:** Used category-specific icons and placeholders instead of real product images.

**Error handling:** Invalid products display a not-found page, although Next.js streaming may sometimes return an HTTP 200 status.

**Project scope:** Focused on the assessment requirements rather than adding unnecessary features such as shopping carts, databases, or user registration.

---


## Future Improvements

With additional development time, I would focus on:

- **Contentful integration:** Replace the mocked JSON with a real Contentful space to manage products and categories.
- **Content management:** Create a Product content model so product details, specifications, pricing, and visibility can be updated without changing the code.
- **Product images:** Use Contentful's media library to upload and manage real product images.
- **Real authentication:** Replace the simulated login with a proper authentication system that supports registered users, secure password handling, and account management.
- **User roles:** Introduce real customer and partner accounts with appropriate access permissions and pricing.
- **Testing:** Expand automated tests to cover Contentful integration, real authentication, and different user roles.
- **User experience:** Continue improving mobile responsiveness, accessibility, and loading states.

See [AGENT.md](AGENT.md) for the detailed two-week improvement plan.

---

## Developer

**Joao Felipe Silveira**

Full-Stack Developer

[GitHub — accessjoao](https://github.com/accessjoao)

SIGNAL is a fictional concept project created for the Motorola Solutions Full Stack Web Developer Technical Assessment. It is not an official Motorola Solutions product.
