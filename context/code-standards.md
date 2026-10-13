# Code Standards — SIGNAL

## 1. Purpose

This document defines coding conventions and implementation standards for SIGNAL.

All implementation agents must follow these standards to maintain consistency, readability, and predictable behavior.

**Principle: Write straightforward, maintainable code. Avoid unnecessary abstraction.**

## 2. TypeScript

- Use TypeScript for all application code.
- Enable strict type checking.
- Prefer explicit domain types and interfaces.
- Avoid `any`; use `unknown` when necessary.
- Define shared types in a dedicated location.
- Use type inference when the type is already clear.
- Avoid excessive generics and complicated utility types.
- Validate untrusted input at server boundaries.

## 3. Naming Conventions

| Element | Convention | Example |
|---|---|---|
| React components | PascalCase | `ProductCard.tsx` |
| Component directories | kebab-case | `product-card/` |
| Utilities and services | kebab-case | `product-repository.ts` |
| Variables and functions | camelCase | `getProducts()` |
| Types and interfaces | PascalCase | `Product`, `Session` |
| Constants | UPPER_SNAKE_CASE | `SESSION_COOKIE_NAME` |
| Route segments | kebab-case | `/catalog/[slug]` |
| CSS variables | kebab-case | `--color-primary` |

Prefer descriptive names over abbreviations.

## 4. Project Organization

Use a feature-oriented structure where practical.

Suggested directories:

- `app/` — Routes, layouts, and server entry points.
- `components/` — Reusable UI components.
- `lib/` — Domain logic, authentication, and data access.
- `data/` — Mock CMS content.
- `types/` — Shared TypeScript types.
- `public/` — Static assets.
- `tests/` — Automated tests.

Keep related implementation files close together when appropriate.

Do not create directories or abstraction layers before they are needed.

## 5. React Components

- Prefer functional components.
- Use Server Components by default.
- Add `"use client"` only when required.
- Keep components focused on one responsibility.
- Prefer composition over large configurable components.
- Avoid unnecessary prop drilling and global state.
- Use semantic HTML.
- Keep business logic outside presentation components.

Do not create a reusable component for a one-off element unless there is a clear benefit.

## 6. Next.js Conventions

- Use App Router conventions.
- Use server-side data access for catalog content.
- Use Server Actions or Route Handlers only when appropriate.
- Keep secrets and session logic in server-only modules.
- Use `next/link` for internal navigation.
- Use `next/image` where appropriate.
- Use `notFound()` for invalid or inaccessible product slugs.
- Use Next.js metadata APIs for page titles and descriptions.

Avoid creating API routes solely to fetch data already available to Server Components.

## 7. Data Access

- Access product content through the CMS adapter.
- Keep data retrieval independent of UI components.
- Use typed return values.
- Handle missing or invalid content predictably.
- Avoid exposing internal data models unnecessarily.
- Keep transformations small and understandable.

Do not import mock JSON directly into presentation components.

## 8. Authentication and Security

- Validate sessions on the server.
- Treat cookies and user input as untrusted.
- Do not expose secrets in client bundles.
- Never use client-side state as the source of authorization.
- Avoid logging credentials, session tokens, or secrets.
- Apply authorization before returning restricted content.
- Use environment variables for secrets.

Security-sensitive logic should remain isolated and testable.

## 9. Styling

- Use Tailwind CSS for application styling.
- Follow design tokens defined in `ui-context.md`.
- Prefer reusable patterns over repeated arbitrary values.
- Keep responsive behavior intentional.
- Avoid unnecessary custom CSS.
- Do not introduce a UI component library without approval.
- Use motion sparingly and respect reduced-motion preferences.

Do not hardcode unrelated colors or spacing values across components.

## 10. Accessibility

- Use semantic HTML elements.
- Provide accessible names for interactive controls.
- Associate labels with form fields.
- Ensure keyboard accessibility.
- Maintain visible focus indicators.
- Use meaningful alternative text for informative images.
- Avoid unnecessary ARIA attributes.
- Maintain adequate text contrast.
- Ensure interactions do not depend exclusively on hover.

Accessibility is part of implementation quality, not a final visual enhancement.

## 11. Error Handling

- Handle expected errors close to their source.
- Provide meaningful user-facing fallbacks.
- Avoid exposing internal error details.
- Do not silently swallow unexpected errors.
- Prefer explicit error handling over broad catch blocks.
- Use framework-native error and not-found handling where appropriate.

## 12. Testing

Use Vitest for unit tests and Playwright for critical end-to-end flows.

### Unit Tests

Prioritize:

- Product filtering and search logic.
- Role-based product visibility.
- Pricing selection.
- CMS adapter behavior.
- Session validation.

### End-to-End Tests

Prioritize:

- Login and logout.
- Protected route access.
- Server-rendered public and authenticated content.
- Search and category filtering.
- Layout switching.
- Invalid product slugs and empty states.

### Test Conventions

- Use descriptive test names.
- Test observable behavior rather than implementation details.
- Keep fixtures small and deterministic.
- Avoid unnecessary mocking.
- Do not add tests solely to increase coverage.
- Keep tests independent of execution order.

## 13. Validation

Before completing a meaningful implementation task, run applicable checks:

- TypeScript validation.
- ESLint.
- Relevant unit tests.
- Relevant end-to-end tests.
- Production build when appropriate.

The Review Agent independently verifies critical requirements.

Report actual results in the agent handoff.

## 14. Dependencies

Prefer built-in framework and platform capabilities.

Before adding a dependency:

1. Identify the problem it solves.
2. Check whether existing tools already address it.
3. Evaluate maintenance and complexity costs.
4. Request approval when the dependency materially affects the architecture.

Avoid dependencies introduced only for convenience when a simple implementation is sufficient.

## 15. Comments and Documentation

- Write code that is understandable without excessive comments.
- Comment non-obvious decisions and important constraints.
- Avoid comments that merely restate the code.
- Keep public interfaces and important domain behavior clear.
- Update documentation when behavior or architecture changes.

## 16. Code Quality

- Keep functions focused.
- Prefer early returns over deeply nested conditions.
- Avoid unnecessary state.
- Remove unused code and imports.
- Do not leave debugging statements in production code.
- Avoid premature optimization.
- Refactor when complexity is demonstrated, not anticipated.

## 17. Completion Standard

Code is ready for handoff when:

- It meets the task's acceptance criteria.
- It follows established architecture and conventions.
- Relevant validation has passed.
- No known security or authorization invariant is violated.
- Outstanding issues are documented.

**Consistency, correctness, and clarity take priority over cleverness.**