# SIGNAL

**A full-stack product catalog platform built with Next.js, React, TypeScript, Tailwind CSS, and Contentful.**

SIGNAL is an independent portfolio project for a fictional enterprise technology brand. It combines a responsive marketing website with server-rendered product discovery, public and partner pricing, and a documented AI-assisted development workflow.

[Live demo](https://signal-seven-omega.vercel.app/) | [Architecture](ARCHITECTURE.md) | [Development report](AGENT.md)

<img width="1268" height="770" alt="SIGNAL product catalog interface" src="https://github.com/user-attachments/assets/61b885dd-fe95-4999-8c06-9a18691aa431" />

## Key features

- **Server-side authentication and authorization:** simulated login, signed HttpOnly session cookies, logout, and a protected partner page.
- **Role-based visibility and pricing:** two access levels, `public` and `authenticated`. The mock catalog contains eight public products and four additional authenticated-only products; the server selects visible products and pricing.
- **Interchangeable CMS sources:** Contentful Delivery API integration and a local JSON adapter for deterministic development and tests.
- **Server-rendered catalog and product pages:** client components receive only authorized product data and one display price.
- **Product discovery:** text search, category filtering, Clear Filters, and ascending/descending price sorting with URL-based state.
- **Interactive presentation:** Price First / Specs First layouts, a product drawer, standalone product URLs, and image fallbacks.
- **Responsive UI:** graphite-and-lime styling, Geist typography, keyboard interactions, and reduced-motion support.
- **Automated verification:** Vitest unit tests and Playwright browser tests, including public HTML and React Server Component response checks.

Authentication is intentionally simulated: any nonempty username and password are accepted. There is no real identity verification, user database, account management, or centralized session revocation. This demonstrates server-managed sessions and access boundaries; it is not a production identity system.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 App Router, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4, Geist, CSS animations |
| UI | Radix Select, Lucide React |
| Content | Contentful Delivery API or local JSON through a server-only adapter |
| Sessions | Next.js Server Actions, Node.js crypto, signed cookies |
| Testing | Vitest, Playwright (Chromium), ESLint, TypeScript |
| Hosting | Vercel |

## Architecture overview

Server Components resolve the visitor's session and request products through `lib/cms/products.ts`. The selected source supplies raw content; shared rules normalize it, restrict visibility, choose the authorized price, and apply filters and sorting before rendering.

The raw CMS contract contains both prices in USD integer cents. Presentation receives a sanitized product with only `displayPrice`. Client state controls filters, layouts, and drawer interactions; it does not decide product access or pricing. The drawer uses already-authorized catalog data without changing the URL, while direct product pages independently enforce access rules.

| Location | Responsibility |
|---|---|
| `app/` | Homepage, catalog, product details, login, partner page, server actions |
| `components/` | Shared navigation, catalog controls, product visuals, and drawer |
| `lib/auth/` | Signed session creation, validation, and access resolution |
| `lib/cms/` | Contentful integration and source selection |
| `lib/products/` | Normalization, visibility, pricing, search, filtering, and sorting |
| `data/products.json` | Local product fixture |
| `tests/` | Unit and browser verification |
| `agents/`, `context/` | Development responsibilities and shared project knowledge |

Routes: `/`, `/catalog`, `/catalog/[slug]`, `/login`, and protected `/partner`.

See [ARCHITECTURE.md](ARCHITECTURE.md) for data-flow diagrams and technical decisions.

## AI-assisted development

SIGNAL uses a Markdown-driven multi-agent workflow with an orchestrator and specialized backend, frontend, and review roles. Shared requirements, architectural constraints, coding standards, and UI guidance provide context for bounded tasks. Handoffs record changes, decisions, verification, and remaining issues.

The workflow combines independently invoked agents where recorded with developer-directed AI assistance. Human oversight governs architecture, scope, integration, and acceptance; Markdown roles alone are not evidence of independent execution. [AGENT.md](AGENT.md) documents actual contributions, corrections, and trade-offs. [AGENTS.md](AGENTS.md) defines current engineering instructions.

## Local setup

Use Node.js 22 and npm.

```bash
git clone https://github.com/accessjoao/signal.git
cd signal
npm ci
```

Create `.env.local` at the repository root:

```env
SESSION_SECRET=replace-with-a-random-secret-at-least-32-characters
CMS_SOURCE=mock

# Required only for CMS_SOURCE=contentful
# CONTENTFUL_SPACE_ID=your_space_id
# CONTENTFUL_DELIVERY_TOKEN=your_delivery_api_token
# CONTENTFUL_ENVIRONMENT=master
```

Generate a secret with:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

| Variable | Purpose |
|---|---|
| `SESSION_SECRET` | Session signing and verification; at least 32 characters. Use a separate random secret per environment. |
| `CMS_SOURCE` | `mock` (default) or `contentful`. Contentful failures do not automatically fall back to mock data. |
| `CONTENTFUL_SPACE_ID` | Required for Contentful reads and imports. |
| `CONTENTFUL_DELIVERY_TOKEN` | Server-side Delivery API token; required for Contentful reads. |
| `CONTENTFUL_ENVIRONMENT` | Contentful environment ID; defaults to `master`. |
| `CONTENTFUL_MANAGEMENT_TOKEN` | Optional, local import script only; not needed by the running application. |

Keep `.env.local` and tokens out of version control. Mock mode needs no Contentful credentials.

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000). Use any nonempty username and password at `/login` to explore the authenticated experience.

For a production build:

```bash
npm run build
npm run start
```

On Windows PowerShell, use `npm.cmd` and `npx.cmd` if execution policy blocks the PowerShell launchers.

## Contentful setup

Set `CMS_SOURCE=contentful` and configure the Delivery API credentials. The adapter reads published entries from a `product` content type, handles pagination and linked image assets, and uses a 60-second cache revalidation interval.

| Contentful field | Representation |
|---|---|
| `name`, `slug` | Short text; unique lowercase hyphenated slug |
| `description` | Long text |
| `category` | `Communication Devices`, `Video & Monitoring`, or `Network & Infrastructure` |
| `accessLevel` | `public` or `authenticated` |
| `publicPrice`, `authenticatedPrice` | Nonnegative integer prices in USD cents |
| `specifications` | JSON array of `{ "label": "...", "value": "..." }` |
| `image` | Optional linked image asset |

Contentful images use Next.js Image with the configured `images.ctfassets.net` host. Missing media uses shared category-specific placeholders.

After creating the content model, the optional seed script imports and publishes the local products using the `en-US` locale:

```bash
node scripts/import-contentful.mjs
```

The script requires `CONTENTFUL_MANAGEMENT_TOKEN` in the local environment. It updates existing entries by ID and can overwrite editorial changes; it is a controlled import operation, not routine synchronization. Do not configure the management token in the deployed application.

## Testing

Run static analysis and unit tests:

```bash
npm run lint
npx tsc --noEmit
npm test
```

Vitest covers product normalization, visibility, pricing, safe projection, filtering, and session handling. Browser tests cover login/logout, protected routes, catalog interactions, drawer behavior, and restricted-data exclusion from server responses.

Use `CMS_SOURCE=mock` and a configured `SESSION_SECRET` for the baseline browser suite. Stop any existing development server to ensure Playwright starts the intended configuration:

```bash
npx playwright install chromium
npx playwright test
```

Playwright starts a local Next.js server at `http://127.0.0.1:3000`. Live Contentful behavior requires separate checks with valid credentials; baseline tests do not establish live API reliability. Current results and outstanding checks are recorded in [the progress tracker](context/progress-tracker.md).

## Deployment

The deployed demo is [signal-seven-omega.vercel.app](https://signal-seven-omega.vercel.app/), hosted on Vercel. Configure `SESSION_SECRET` and the chosen CMS environment variables before deploying. Contentful mode needs the space ID and Delivery API token; mock mode does not.

The recorded production smoke checks cover the original mock-backed deployment. Contentful-backed production verification remains outstanding in the development record; this documentation update does not claim a new deployment check.

## Scope and future work

SIGNAL has no checkout, payments, or real account management. Future priorities include Contentful adapter tests and failure recovery, editor-friendly specifications, broader accessibility/browser verification, and a separately scoped real identity integration. These are potential improvements, not current features.

## Developer

[Joao Felipe Silveira](https://github.com/accessjoao) - full-stack development, architecture, and AI-assisted engineering.
