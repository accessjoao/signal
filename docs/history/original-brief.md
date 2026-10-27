# Full Stack Web Developer — Technical Assessment

**Motorola Solutions Web Development Team**

## Overview

Your objective is to build a full-stack Next.js catalog application using a **Multi-Agent Development System**.

Rather than testing your ability to manually type React boilerplate, we are evaluating your ability to architect LLM pipelines, manage complex agentic state, and enforce strict coding requirements through Markdown-driven agent instructions.

You will define a "team" of specialized AI agents via Markdown files and use them to generate the codebase.

---

## Part 1: The Target Output (The App Spec)

This is the specification your agent system must be prompted to build.

### Target Stack

- Next.js
- Contentful (or mocked CMS JSON)
- TypeScript
- Tailwind CSS

### Core Application Requirements

#### 1. Simulated Authentication

A full-stack login flow.

- No real database validation needed (accept any non-empty input).
- The app must securely set a session/cookie on the server.
- Use the session to protect routes.

#### 2. Role-Based Content & Pricing

- Two product card sets:
  - **Set A:** Public.
  - **Set B:** Authenticated only.
- Each product has:
  - `priceLoggedOut`
  - `priceAuthenticated`

#### 3. Rendering

Pricing and role-based content must be **server-side rendered (SSR/SSG) in the initial HTML**, not client-only.

#### 4. Display Mapping

- Support two or more layout options (e.g., "Price First", "Specs First").
- The user can switch layouts via a UI control without a page reload.

#### 5. Filtering

Support:

- Category filtering.
- Text search.
- A "Clear Filters" button.

#### 6. Error Handling

Provide graceful fallbacks for:

- Missing product images.
- Empty search results.
- Invalid slugs.

---

## Part 2: The Core Task (The Markdown Agent System)

This is the methodology you must use to build the app.

Design a multi-agent system using Markdown instruction files (e.g., system prompts, persona definitions, or chained instructions) that direct an AI assistant (such as GitHub Copilot, Cursor, or ChatGPT) to build the functional application specified in Part 1.

### Requirements & Constraints

#### 1. Prompt-Driven Architecture

Design your AI team entirely through Markdown files.

You have total architectural autonomy over:

- How many agents you create (e.g., a "Frontend Architecture Agent", a "State Management Agent", etc.).
- How they hand off context to each other.
- How they divide the labor.

#### 2. Agentic Best Practices

Do not use a single monolithic "write the whole app" prompt.

Break the problem down into specialized roles and discrete steps via your Markdown instructions.

#### 3. Output Structure

Organize your agent definitions cleanly in a dedicated directory (e.g., `/agents/` or `/prompts/` in your repository) so we can review your prompting strategy and system boundaries.

### Note on Contentful

While the app needs to integrate with Contentful, your agents can be instructed to mock the Contentful data fetch layer with a hardcoded JSON seed file to keep the generation scope realistic.

---

## Deliverables

### 1. Repository

A single repository containing:

- Your Next.js application codebase.
- Your `/agents/` directory with the Markdown prompt files.

### 2. README.md

Include:

- Setup instructions to run the Next.js app locally.
- Deployment URL of the generated app (Vercel/Netlify).

### 3. AGENT.md

#### Architecture Explanation

Walk us through your multi-agent architecture.

- Why did you define the specific agents/prompts that you did?
- How did you manage context and handoffs between the different prompts?

#### Prompting Strategy

How did you enforce the specific architectural requirements (like SSR vs. client-side rendering) through your Markdown instructions?

#### Trade-offs & Manual Intervention

- What manual fixes (if any) were required after the AI ran to get the app to compile and deploy?
- Discuss where the AI struggled.
- Explain what you'd improve if given two more weeks.

---

## Submission

Include in the email body:

**Repo:** [url]

**Live App:** [url]

**Demo Login:** [credentials if needed]

---

## Questions

Email the Motorola Solutions Web Development Team within 24 hours of receiving the assignment if you have questions.