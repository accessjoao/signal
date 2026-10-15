# UI Context — SIGNAL

**Status:** Current design direction, October 2026  
**Purpose:** Source of truth for the Frontend Agent and future UI work. Supersedes the previous light/editorial UI context.

## 1. Product and design intent

SIGNAL is a fictional enterprise technology brand offering a professional equipment catalog across **Communication Devices**, **Video & Monitoring**, and **Network & Infrastructure**. It is a product-discovery and partner-access experience, **not** an e-commerce checkout.

The visual direction is **dark, precise, technical, and premium**: a near-black marketing homepage, a slightly lighter graphite catalog, restrained lime-green accents, crisp typography, subtle technical motifs, and strong product hierarchy. The experience should feel like a coherent technology brand rather than a generic SaaS dashboard, consumer electronics store, or admin template.

**Core principle:** High-impact technical brand presentation with fast, accessible, secure product discovery.

## 2. Current visual system

| Token | Hex | Primary usage |
| --- | --- | --- |
| `canvas-dark` | `#0B0D0F` | Homepage/background |
| `hero-dark` | `#171A1D` | Hero, prominent dark sections |
| `surface-dark` | `#202427` | Alternate sections |
| `catalog-canvas` | `#292D30` | Catalog and standalone product pages |
| `surface-raised` | `#383D40` | Catalog cards, panels, skeletons |
| `text-primary` | `#F3F4F2` | Main text on dark backgrounds |
| `text-secondary` | `#B9BEC0` | Secondary text and metadata |
| `accent-lime` | `#D9F36A` | Primary CTAs, selected states, orbiting spheres |

Use `white/10`-style subtle borders and subdued surfaces to define hierarchy. Lime is an accent, not a general background color. Preserve contrast and visible focus states. Prefer shared Tailwind tokens or CSS variables as the design stabilizes; avoid multiplying slightly different hex values.

The legacy cream/white-first palette (`#F8F7F4`, `#FFFFFF`) is **not** the default design direction. An isolated component may still use a light treatment if intentionally designed, but new pages should follow the graphite system.

## 3. Typography and brand identity

- Current implementation uses **Geist** through `next/font` (do not silently replace it with Manrope/Inter).
- Large, tightly tracked, semibold headings; restrained uppercase tracking for section labels and metadata.
- Hero headline: **“Connection is everything.”** with lime emphasis on “everything.”
- Body copy is concise, readable, and comfortably spaced; prioritize information hierarchy over decoration.
- Header wordmark: **SIGNAL** with lime accent. The compact brand mark/favicon is a dark `S` inside a lime circle on a charcoal rounded-square background.
- Do not introduce additional decorative font families or inconsistent branding.

## 4. Global layout and navigation

- Shared `SiteHeader` appears across pages; individual routes must **not duplicate the main site header**.
- Navigation supports Home, Products, and partner/login or authenticated/logout state as appropriate.
- On mobile, use compact **“Partner”** labeling instead of the longer “Partner access” label where horizontal space is limited. Ensure no horizontal overflow.
- Keep content within consistent max-width containers (`max-w-6xl`/`max-w-7xl` as appropriate), with responsive padding and intentional section spacing.
- Responsive layouts are composed for mobile, not simply scaled-down desktop views.

## 5. Homepage

The homepage is the expressive brand entry point, using a near-black backdrop and charcoal sections.

### Hero
- Headline: **Connection is everything.**
- Eyebrow: **Engineered for what matters**.
- Supporting text describes professional communications, monitoring, and infrastructure technology.
- Primary lime CTA: **Explore the catalog** → `/catalog`.
- Secondary outlined CTA: **Discover solutions** → `#solutions`.
- Small credibility/stat labels include **03 technology categories** and **24/7 mission-ready mindset**.
- The hero is a responsive two-column layout on desktop and stacks on mobile.

### Hero visual: orbital system
- **Only concentric circular orbits, three moving lime spheres, and a stationary central sphere.**
- Do not reintroduce the former tilted device/card, waveform, network-status badge, or system-status panel.
- Outer orbit: clockwise, approximately 28s; middle: counterclockwise, approximately 19s; inner: clockwise, approximately 12s.
- Keep thin, subdued rings and restrained lime glow; the animation should feel like orbital/network motion, **not a loading spinner**.
- Implement with lightweight CSS animations, not a heavy 3D dependency.
- Respect `prefers-reduced-motion: reduce` by stopping orbital animation.
- The orbital artwork is decorative and should use `aria-hidden="true"`.

### Other homepage content
Maintain clear pathways to the three product categories, curated public featured products, professional applications/solutions, and partner access. Use variation in section composition, but keep the dark technical visual language consistent. Do not add unrelated marketing widgets.

## 6. Catalog page (`/catalog`)

The catalog uses a **graphite** background and elevated graphite product cards. It should be denser and more functional than the homepage while clearly belonging to the same brand.

- Intro heading and concise supporting copy, without an oversized hero that delays product discovery.
- Search input, category filter, Apply/Clear Filters actions.
- Custom Radix category select; ensure “All categories” genuinely resets the filter (normalize `all` to an empty category or equivalent in the route/adapter).
- **Price First / Specs First** toggle works client-side without a full page reload and changes the information hierarchy meaningfully.
- Responsive grid: approximately three columns desktop, two tablet, one mobile.
- Product cards prioritize category, name, summary/specs, **server-selected display price**, and a clear detail link.
- Maintain strong hover/focus affordances, accessible empty states, and restrained motion.
- Product images are currently optional; designed category-specific placeholders are preferable to broken-image UI. Do not fabricate product photographs.

## 7. Product details: drawer and standalone page

There are two intentionally distinct presentations of the same product:

**Catalog interaction:** A button selects a server-authorized product in React state without navigation and renders it inside a right-side animated drawer, with an overlay, close action, Escape support, focus handling, scroll lock, and reduced-motion support.

**Direct URL or refresh (`/catalog/[slug]`):** A full standalone product page with dark hero, breadcrumbs, category/product heading, generous product detail content, and a link back to the catalog. It must not duplicate the shared global header.

Both use the shared `ProductDetails` component and the same **server-authorized product object**. A visual change to `ProductDetails` must be checked in **both** contexts; avoid styling that only works in the drawer.

- Specifications use clear labels, values, and subtle dividers.
- Prices are visible in the correct role-specific form only.
- Missing image gets a designed fallback; invalid/inaccessible slug uses `notFound()`.
- Preserve direct URL navigation, refresh, and browser back behavior.

## 8. Login and partner experience

- Login uses the same dark graphite brand language, with clear labels, concise feedback, and a strong lime action.
- Simulated authentication accepts nonempty credentials; do not imply real identity verification.
- Partner page uses the same design system, not a separate dashboard theme.
- Authenticated users can discover additional products and see authorized partner prices.
- Show clear session state and logout access; avoid registration, password recovery, checkout, or complex account management.

## 9. Interaction and motion

- Prefer CSS transitions for hover/focus/selected states.
- The drawer uses CSS transitions with a visible resting state; do not add an animation dependency without need.
- The homepage orbital animation is a **deliberate exception** to the general preference against continuous decorative motion.
- Avoid parallax, heavy scroll reveals, and animations that delay essential content.
- Honor reduced-motion preferences for both the orbital visual and drawer interactions.
- Maintain visible keyboard focus, semantic buttons/links, accessible labels, and sufficient touch targets.

## 10. Technical boundaries and security

The UI must not undermine the assessment's full-stack requirements:

1. Next.js App Router, TypeScript, Tailwind CSS, mocked CMS JSON or Contentful adapter.
2. Server-signed, HttpOnly session cookie; protected partner route.
3. Public **Set A** and authenticated-only **Set B**.
4. Each raw product can contain `priceLoggedOut` and `priceAuthenticated`, but **only server-selected `displayPrice` and authorized product data** reach client components.
5. Never serialize partner-only products, restricted prices, or raw CMS objects into unauthenticated HTML/RSC payloads.
6. Keep Server Components as the default; use Client Components only for actual interaction.
7. Request-time authentication and authorization remain in server code, including catalog data supplied to the drawer and standalone product routes.
8. Preserve category/search behavior, layout toggle, not-found handling, and missing-image fallbacks.

Do not add shopping cart, checkout, payments, reviews, wishlists, user registration, or unrelated analytics.

## 11. Responsive and accessibility requirements

- **Mobile first:** no overflow, legible hero, appropriately sized orbital artwork, compact navigation, stacked filters/cards, usable drawer.
- **Tablet:** adjust hero columns and catalog grid without crowding.
- **Desktop:** preserve confident typography, balanced negative space, and efficient catalog density.
- Follow WCAG 2.2 AA principles where practical: semantic headings, proper labels, keyboard-operable controls, logical focus, contrast, alt text for real imagery, and reduced-motion support.
- Test at common mobile and desktop widths; verify keyboard navigation and both product-detail entry paths.

## 12. Frontend Agent instructions

Before implementing a UI task:

1. Read this UI context and the repository's `AGENTS.md` and relevant agent instructions.
2. Inspect existing components and tokens; prefer consistency over reinvention.
3. Preserve server-side product filtering, pricing, authentication, and safe serialized props.
4. Make scoped changes, with one coherent feature or component at a time.
5. Check mobile layout and keyboard accessibility.
6. Verify the catalog drawer **and** standalone product page if shared product UI changes.
7. Run relevant tests and production build when practical; report what actually ran and any limitations.
8. Do not claim an agent generated or verified code if the work was manually authored or checks were not run.

## 13. Design acceptance checklist

- [ ] Matches dark/graphite SIGNAL palette and Geist typography.
- [ ] Uses the current SIGNAL header and favicon identity.
- [ ] Mobile layout has no horizontal overflow.
- [ ] Hero orbit visual contains no legacy device/status cards.
- [ ] Orbital and drawer motion respect reduced-motion preferences.
- [ ] Catalog search, category reset, and layout toggle work.
- [ ] Public users cannot access restricted products or pricing.
- [ ] Product drawer and standalone route both render correctly.
- [ ] Empty, missing-image, and invalid-slug states are intentional.
- [ ] Navigation, focus, labels, and contrast are accessible.
- [ ] UI changes stay within the assessment scope.

**Final design principle:** SIGNAL should feel like a confident, dark enterprise technology brand with a secure, intuitive equipment catalog—not a generic dashboard or online store.
