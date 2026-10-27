# SIGNAL — Project Requirements

SIGNAL is an independent full-stack product catalog platform for a fictional enterprise technology brand. This document defines current functionality and engineering requirements; architectural details live in `architecture-context.md` and product intent in `project-overview.md`.

## Application

- Use Next.js App Router, React, TypeScript, and Tailwind CSS.
- Retrieve products through a server-only CMS adapter supporting Contentful and deterministic local JSON. Keep presentation independent of the source.
- Provide simulated login accepting nonempty username and password inputs, signed server-issued session cookies, logout, and a protected partner route. This does not verify real identities or create accounts.
- Support exactly two access levels: `public` and `authenticated`. Apply product visibility and pricing on the server.
- Preserve raw `priceLoggedOut` and `priceAuthenticated` fields in the CMS contract, expressed as USD integer cents. Expose only the authorized `displayPrice` to presentation components.
- Never include restricted products or alternate authenticated prices in public HTML, client props, or RSC responses.
- Render authorized catalog and standalone product details, including prices, on the server.
- Support text search, category filtering, clearing filters, and ascending/descending price sorting through URL parameters.
- Support Price First and Specs First layouts without a full page reload.
- Open catalog details in an interactive React-state drawer; retain independently authorized standalone `/catalog/[slug]` pages.
- Handle missing images, empty results, and invalid or inaccessible slugs gracefully.
- Preserve the responsive graphite/lime visual system, shared navigation, keyboard interactions, and reduced-motion support.

## Engineering workflow

- Maintain specialized Markdown instructions for orchestration, backend, frontend, and review responsibilities.
- Use bounded tasks, shared context, explicit ownership, and structured handoffs. Distinguish independently executed agents from developer-directed AI assistance.
- Preserve Vitest business-rule tests and Playwright browser/security tests. Run applicable lint, TypeScript, and automated checks, reporting actual results and limitations.
- Keep `README.md` useful for setup, environment configuration, testing, architecture, and the live demo.
- Maintain `AGENT.md` as an accurate development report and `context/progress-tracker.md` as current status.
- Retain historical provenance in `docs/history/` and Git history; archived instructions do not govern current work.

## Scope

Real identity verification, account management, checkout, payments, and a custom agent orchestration service are outside current scope. Future work must not be described as implemented functionality. Changes to architecture or product scope require explicit approval.
