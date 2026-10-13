# UI Context — SIGNAL

## 1. Design Direction

SIGNAL is a fictional enterprise technology brand specializing in professional communication, video monitoring, and network infrastructure equipment.

The website follows a modern editorial design approach, combining bold typography, generous whitespace, distinctive section compositions, and premium product presentation.

### Visual Characteristics

- Oversized, confident typography.
- Minimal, carefully spaced navigation.
- Strong contrast between light and dark sections.
- Asymmetric image-and-text compositions.
- Large, visually distinct content sections.
- Purposeful use of photography.
- Restrained colors and decorative elements.
- Clear, intentional calls to action.
- A cohesive visual narrative throughout the website.

The homepage should feel like a contemporary enterprise marketing experience, while the catalog should provide efficient, intuitive product discovery.

Avoid generic SaaS dashboards, conventional e-commerce templates, repetitive card layouts, and unnecessary visual complexity.

**Core principle: Editorial presentation with practical product discovery.**

The homepage should be visually expressive. The catalog should be efficient and functional. Both must feel like parts of the same brand.

---

## 2. Brand Personality

SIGNAL communicates reliability, precision, innovation, and technical expertise.

The visual identity should feel:

- Premium, not luxurious.
- Technical, not intimidating.
- Bold, not cluttered.
- Contemporary, not trendy.
- Professional, not generic.

Avoid the visual conventions of traditional electronics stores, including promotional banners, excessive badges, crowded cards, and shopping-cart interfaces.

SIGNAL is a product catalog and partner platform, not an online checkout experience.

---

## 3. Color System

Use a predominantly light visual system with high-contrast typography and carefully selected accent colors.

### Core Palette

| Token | Value | Usage |
|---|---|---|
| Canvas | `#F8F7F4` | Main page background |
| Surface | `#FFFFFF` | Product surfaces and forms |
| Ink | `#171717` | Primary text and dark sections |
| Secondary Text | `#666666` | Supporting copy |
| Accent | `#D9F36A` | Select CTAs and highlights |
| Border | `#E6E5E1` | Dividers and subtle boundaries |
| Muted Surface | `#F0EFEA` | Alternate section backgrounds |

### Color Rules

- Light backgrounds should dominate.
- Dark sections should create deliberate contrast.
- Use the accent color sparingly.
- Avoid gradients unless they serve a specific visual purpose.
- Avoid colorful category cards.
- Use consistent semantic design tokens.
- Ensure text and controls meet accessibility contrast requirements.

The accent is a SIGNAL brand choice, not a requirement to match the reference website exactly.

---

## 4. Typography

Typography is the strongest element of SIGNAL's visual identity.

### Font Direction

Use a contemporary sans-serif with distinctive editorial character.

Recommended starting point:

- Headings: **Manrope**
- Body: **Inter**

Load fonts through `next/font`.

Do not add multiple decorative font families.

### Heading Style

- Large and confident.
- Bold or semibold.
- Tight letter spacing.
- Relatively compact line height.
- Intentional line breaks where appropriate.
- Strong contrast against the background.

### Suggested Responsive Scale

| Element | Desktop | Mobile |
|---|---|---|
| Hero headline | 72–104px | 42–56px |
| Major section heading | 48–72px | 32–44px |
| Product detail title | 44–64px | 32–42px |
| Card title | 20–26px | 18–22px |
| Body text | 16–18px | 15–16px |

These are guidelines, not fixed values. Use responsive CSS and `clamp()` where helpful.

Avoid excessive uppercase headings. Reserve uppercase for short labels, section identifiers, and metadata.

---

## 5. Layout Principles

SIGNAL should feel carefully art-directed.

### Container

- Maximum content width around 1360–1440px.
- Generous horizontal padding.
- Consistent alignment across sections.
- Occasional full-width visual sections.
- Avoid placing every section inside a visible card.

### Composition

Use a combination of:

- Asymmetric two-column layouts.
- Large typography paired with imagery.
- Full-width image sections.
- Alternating text and image placement.
- Large numbered category sections.
- Minimal dividers.
- Carefully controlled negative space.

Do not repeat the same centered-heading-plus-three-cards pattern throughout the homepage.

### Spacing

Desktop sections should generally have 96–144px of vertical spacing.

Mobile sections should generally have 56–80px.

Use a consistent spacing scale rather than arbitrary values throughout the codebase.

---

## 6. Navigation

Navigation should be simple, premium, and unobtrusive.

### Desktop

Include:

- SIGNAL wordmark.
- Products.
- Solutions or category navigation.
- Partner Access or authenticated account state.

Use generous horizontal spacing and understated interactions.

The navigation may use a light or dark treatment depending on the hero composition, but readability must be maintained.

### Mobile

- Compact SIGNAL wordmark.
- Accessible navigation toggle.
- Clear access to the catalog.
- Clear login or logout action.
- No horizontal overflow.

Navigation must remain keyboard accessible.

Avoid unnecessary mega menus or complicated navigation systems.

---

## 7. Homepage

The homepage is SIGNAL's primary marketing experience.

It should communicate the brand's value before directing visitors into the catalog.

### Section 1 — Hero

Create an impactful, editorial hero.

Suggested headline direction:

**Technology that keeps the world connected.**

Supporting message:

Professional communication, monitoring, and infrastructure solutions designed for environments where reliability matters.

Include:

- Oversized headline.
- Short supporting paragraph.
- Primary CTA: Explore Products.
- Secondary CTA: Partner Access.
- Strong product or industrial imagery.

The hero should feel visually substantial without becoming cluttered.

Avoid generic dashboard illustrations.

### Section 2 — Product Categories

Introduce SIGNAL's three main categories:

1. Communication Devices.
2. Video & Monitoring.
3. Network & Infrastructure.

Use large, distinct editorial sections rather than three identical small cards.

Each category section may include:

- Large category number.
- Category name.
- Concise description.
- Product or contextual imagery.
- Link to the filtered catalog.

Alternate image placement or composition between categories to create visual rhythm.

### Section 3 — Featured Products

Highlight a small selection of products.

Use a clean product showcase with:

- Large imagery.
- Clear product names.
- Category labels.
- Role-appropriate pricing.
- Product detail links.

Product presentation should feel curated rather than promotional.

### Section 4 — Technology in Practice

Include one concise section explaining how SIGNAL's technology supports demanding professional environments.

Possible applications:

- Field operations.
- Facility monitoring.
- Critical infrastructure.

This is a marketing section, not a requirement to build additional product features.

### Section 5 — Partner Access

Introduce the authenticated experience.

Explain that partners can access additional equipment and dedicated pricing.

Include a clear login CTA.

Do not expose authenticated-only products or pricing in public server-rendered content.

### Section 6 — Footer

Use a confident, minimal footer with:

- SIGNAL branding.
- Product categories.
- Navigation links.
- Short brand statement.

Avoid unnecessary newsletter forms, social feeds, or unrelated content.

---

## 8. Catalog Page

The catalog should maintain the brand's editorial identity while prioritizing usability.

The design must support the assessment's required interactions.

### Catalog Introduction

Use:

- Large page heading.
- Short introductory copy.
- Clear separation between introduction and filtering controls.

Avoid an oversized hero that pushes the actual products too far below the fold.

### Filtering and Search

Required controls:

- Search input.
- Category filtering.
- Clear Filters action.
- Price First / Specs First layout toggle.

Use a compact, well-aligned control area.

Desktop may use a horizontal filter toolbar or a restrained sidebar.

Mobile controls should stack or collapse without hiding essential functionality.

### Product Grid

- Desktop: generally three columns.
- Tablet: two columns.
- Mobile: one column.

Use generous image areas, restrained borders, and consistent spacing.

Avoid heavy drop shadows, colorful backgrounds, and excessive labels.

### Product Cards

Include:

- Product image.
- Category.
- Product name.
- Brief description or specifications.
- Correct role-based price.
- Link to details.

The card should prioritize product information over decorative UI.

### Layout Modes

**Price First**

- Price receives stronger visual prominence.
- Specifications remain available.
- Suitable for users comparing costs.

**Specs First**

- Specifications appear before or more prominently than pricing.
- Price remains visible.
- Suitable for users comparing technical capabilities.

The two modes should feel meaningfully different, not simply change a heading.

Switching modes must happen without a full page reload.

The underlying product data and authorization rules must remain unchanged.

---

## 9. Product Detail Page

Product detail pages should feel like premium technical product presentations.

### Suggested Structure

- Breadcrumb navigation.
- Large product title.
- Category and concise introduction.
- Prominent product image.
- Role-appropriate price.
- Clear specifications section.
- Optional related products.

Use a strong two-column desktop composition where appropriate.

On mobile, stack the content logically.

### Specifications

Specifications should be easy to scan.

Use:

- Simple definition lists.
- Clean rows.
- Subtle dividers.
- Clear labels and values.

Avoid unnecessary charts, tabs, or complex accordions.

### Missing Data

- Missing image: designed fallback.
- Invalid slug: clear not-found experience.
- Missing optional specifications: graceful omission.

Do not expose private product information to unauthenticated users.

---

## 10. Login and Partner Experience

Authentication screens should follow the same visual language.

### Login Page

Use:

- Minimal layout.
- Clear heading.
- Short explanation.
- Labeled username and password fields.
- Primary sign-in button.
- Concise error feedback.

Avoid unnecessary registration, password recovery, and account-management features.

The assessment uses simulated authentication.

### Partner Page

The authenticated experience should feel like a natural extension of SIGNAL.

Show:

- Clear authenticated state.
- Partner-specific content.
- Access to partner-only products.
- Correct authenticated pricing.
- Logout action.

Avoid introducing a separate dashboard design system.

---

## 11. Buttons and Controls

### Buttons

Prefer clean rectangular buttons with moderate corner radii.

Primary actions should have strong contrast.

Secondary actions may use:

- Outlined buttons.
- Underlined text links.
- Arrow icons.

Avoid oversized pill buttons everywhere.

### Inputs

- Clear visible labels.
- Comfortable touch targets.
- Subtle borders.
- Strong focus indicators.
- Consistent height and spacing.

### Interactive States

All interactive components need appropriate:

- Hover states.
- Focus states.
- Active or selected states.
- Disabled states where relevant.
- Error feedback.

Do not rely on color alone to indicate state.

---

## 12. Imagery

Photography and product imagery should be treated as important design elements.

### Preferred Imagery

- Professional equipment.
- Industrial and technical environments.
- Communication technology in use.
- Clean, consistent product photography.
- Architectural or environmental compositions that reinforce the brand.

### Image Treatment

- Use large images when they contribute to storytelling.
- Maintain deliberate aspect ratios.
- Avoid random stock-photo collections.
- Keep backgrounds and lighting reasonably consistent.
- Use `object-fit: contain` for equipment product images when appropriate.
- Use `object-fit: cover` for editorial photography where appropriate.

### Assets

- Prefer local assets in `public/`.
- Use optimized formats and reasonable file sizes.
- Use `next/image` when appropriate.
- Provide meaningful alt text.
- Use only assets with appropriate usage rights.

Do not copy imagery from the reference website.

---

## 13. Motion

Motion should be subtle and purposeful.

Allowed examples:

- Smooth hover transitions.
- Slight image scaling on product hover.
- Underline transitions.
- Modest changes between layout modes.
- Lightweight section reveals only when they do not interfere with content.

Avoid:

- Excessive scroll animations.
- Parallax-heavy layouts.
- Continuous decorative motion.
- Large animation dependencies without justification.
- Delaying important content for visual effects.

Respect `prefers-reduced-motion`.

Prefer CSS transitions unless a more complex interaction genuinely requires JavaScript.

---

## 14. Responsive Design

Design mobile-first.

### Mobile

- Large but readable headlines.
- Single-column product grids.
- Stacked editorial sections.
- Appropriate image cropping.
- Clear navigation.
- Comfortable touch targets.
- No horizontal overflow.

### Tablet

- Balanced two-column layouts.
- Adjusted typography.
- Reduced section spacing.
- Catalog filters remain usable.

### Desktop

- More expressive compositions.
- Generous whitespace.
- Strong image and text relationships.
- Three-column product grid where appropriate.

Responsive layouts should be intentionally composed, not merely scaled-down desktop versions.

---

## 15. Accessibility

Accessibility is a requirement, not a visual enhancement.

Follow WCAG 2.2 AA principles where practical.

Requirements include:

- Semantic HTML.
- Logical heading hierarchy.
- Accessible navigation.
- Visible keyboard focus.
- Proper input labels.
- Adequate contrast.
- Meaningful image alt text.
- Keyboard-operable filtering and layout controls.
- Reduced-motion support.
- Clear empty and error states.

Do not sacrifice usability to reproduce a visual reference.

---

## 16. Implementation Guidelines

The Frontend Agent should:

1. Read this document before implementing UI components.
2. Use shared design tokens for colors, typography, and spacing.
3. Build reusable components where reuse is meaningful.
4. Use Tailwind CSS without excessive one-off styling.
5. Keep Server Components as the default.
6. Add Client Components only where interaction requires them.
7. Keep presentation separate from authentication and pricing logic.
8. Preserve responsive behavior and accessibility.
9. Avoid unnecessary component abstractions.
10. Validate the result in the browser at desktop and mobile widths.

Do not introduce a UI component library solely to accelerate implementation.

Do not add animation libraries without a specific need.

---

## 17. Scope Control

Visual ambition must not expand the assessment's functional scope.

Do not add:

- Shopping cart.
- Checkout.
- Payment processing.
- Customer reviews.
- Wishlist.
- User registration.
- Complex account management.
- Analytics dashboards.
- Unnecessary interactive marketing features.

Prioritize the required catalog, authentication, role-based pricing, and layout functionality.

A polished implementation of the specified features is more valuable than a larger unfinished application.

---

## 18. Design Quality Checklist

Before a UI task is considered complete, verify:

- Does the page feel consistent with SIGNAL's visual identity?
- Is the typography strong and deliberate?
- Is the layout more distinctive than a generic component template?
- Are sections varied without becoming inconsistent?
- Are images relevant and appropriately sized?
- Is product information easy to understand?
- Are the required controls accessible?
- Does the layout work on mobile?
- Are hover and focus states present?
- Does the page remain performant?
- Does the implementation respect the application's scope?

## Final Design Principle

**SIGNAL should look like a modern enterprise technology brand that happens to offer a powerful product catalog—not an online store dressed up as a corporate website.**