# Project Overview — SIGNAL

## 1. Product Vision

SIGNAL is a fictional enterprise technology website that combines a modern marketing experience with a professional equipment catalog.

The platform helps organizations explore communication and safety technology, compare product specifications, and discover equipment relevant to their operational needs.

The experience serves both public visitors and authenticated business partners, with tailored product visibility and pricing.

SIGNAL is designed as a technical assessment demonstrating modern web development, thoughtful product design, and structured AI-assisted engineering.

## 2. Product Goals

- Create a polished, responsive enterprise marketing experience.
- Make product discovery simple and intuitive.
- Support public and partner-specific product experiences.
- Present technical product information clearly.
- Demonstrate reusable, CMS-driven content presentation.
- Maintain a focused scope without unnecessary functionality.

## 3. Target Users

### Public Visitors

Organizations or professionals exploring available equipment and solutions.

They should be able to:

- Explore the marketing homepage.
- Browse publicly available products.
- Search and filter the catalog.
- View product details and public pricing.
- Switch between product display layouts.
- Access the partner login.

### Authenticated Partners

Business partners who require access to additional products and pricing.

They should be able to:

- Access all public functionality.
- Browse partner-exclusive products.
- View authenticated pricing.
- Access the protected partner page.
- Log out.

## 4. Primary User Flows

### Public Product Discovery

1. Visitor arrives on the homepage.
2. Visitor explores featured products or categories.
3. Visitor opens the catalog.
4. Visitor searches or filters products.
5. Visitor switches between Price First and Specs First layouts.
6. Visitor opens a product detail page.

### Partner Experience

1. Visitor selects Partner Access.
2. Visitor enters non-empty login credentials.
3. Visitor is authenticated.
4. Visitor returns to the catalog or opens the partner page.
5. Additional products and partner pricing become available.
6. Visitor can log out and return to the public experience.

## 5. Pages and Features

### Homepage

The homepage establishes SIGNAL's enterprise identity and guides visitors toward product discovery.

Content includes:

- Primary navigation.
- Hero section with a clear value proposition.
- Featured product collection.
- Product category highlights.
- Partner access call-to-action.
- Footer.

The homepage should feel like a professional technology marketing website, not an e-commerce storefront.

### Product Catalog

The catalog is the primary functional experience.

Features include:

- Responsive product cards.
- Public and partner-only product sets.
- Category filtering.
- Text search.
- Clear Filters action.
- Price First and Specs First display layouts.
- Navigation to product details.
- Empty search results state.

### Product Detail Pages

Each product detail page includes:

- Product name and category.
- Product image.
- Description.
- Key technical specifications.
- Pricing appropriate to the visitor.
- Clear navigation back to the catalog.

Invalid or inaccessible products must display an appropriate not-found experience.

### Partner Login

The login page includes:

- Username and password fields.
- Basic form validation.
- Clear success and error feedback.
- A simple explanation of partner access.

Authentication is simulated for demonstration purposes.

### Partner Page

A protected page confirming authenticated access.

It should provide a clear path to partner-available products without duplicating the entire catalog.

## 6. Content Strategy

The initial catalog should contain approximately 10–12 fictional products across three categories:

- Communication Devices
- Video & Monitoring
- Network & Infrastructure

Products should include realistic descriptions, technical specifications, and pricing.

Some products are publicly visible, while others are available only to authenticated partners.

Content should be written in a professional, concise, enterprise-oriented tone.

## 7. Design Direction

SIGNAL should communicate reliability, clarity, and technical sophistication.

The visual experience should be:

- Modern and minimal.
- Professional without feeling generic.
- Spacious and editorial.
- Consistent across marketing and catalog pages.
- Accessible and responsive.
- Subtle in its use of motion.

Detailed colors, typography, spacing, and component styling belong in `ui-context.md`.

## 8. Success Criteria

The application is successful when:

- Public visitors can discover and filter products.
- Authenticated partners receive the correct additional content and pricing.
- Product information is available in the initial server-rendered response.
- Both catalog layouts work without a full page reload.
- Missing images, empty results, and invalid slugs are handled gracefully.
- The experience works across desktop and mobile devices.
- The application can be deployed and demonstrated reliably.
- The repository clearly documents the AI-agent workflow used to build it.

## 9. Out of Scope

SIGNAL is not a complete commerce or customer management platform.

The following are excluded:

- Shopping cart and checkout.
- Payment processing.
- User registration and account management.
- Order tracking.
- Inventory management.
- Customer dashboards.
- Real-time messaging.
- Database-backed authentication.
- Full CMS administration.

Additional functionality should only be introduced when it directly improves an assessment requirement or resolves a demonstrated usability issue.

## 10. Product Decision Principles

When requirements are ambiguous:

1. Prioritize the assessment's explicit requirements.
2. Favor a clear and usable experience over feature quantity.
3. Maintain consistency with the established product identity.
4. Avoid features that introduce unnecessary dependencies.
5. Document meaningful assumptions.
6. Escalate decisions that materially affect product scope.

The objective is not to build the largest application possible.

The objective is to deliver a focused, polished product supported by a disciplined AI-assisted development process.