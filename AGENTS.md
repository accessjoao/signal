# SIGNAL — AI Development Instructions

## Assessment Requirements

`context/assessment-requirements.md` contains the original Motorola Solutions technical assessment.

Treat this document as the authoritative source for required functionality and submission deliverables.

The six project context files describe SIGNAL's implementation decisions, architecture, coding standards, and visual identity.

If a project decision conflicts with an explicit assessment requirement, the assessment takes precedence. Report the conflict before making changes.

All specialized agents must consult the assessment requirements when planning, implementing, or reviewing relevant functionality.

## Project

SIGNAL is an enterprise marketing website with integrated product catalog functionality, built using Next.js, TypeScript, and Tailwind CSS.

Development follows a Markdown-driven multi-agent workflow.

## Before Starting Any Task

1. Read `context/ai-workflow-rules.md`.
2. Read `context/architecture-context.md`.
3. Read `context/project-overview.md`.
4. Read `context/progress-tracker.md`, when available.
5. Read additional context files relevant to the task.
6. Inspect the existing implementation before making changes.

Do not begin implementation without understanding the task's scope and architectural constraints.

## Agent Coordination

The primary coordination instructions are located in:

`agents/orchestrator.md`

Specialized agent definitions:

- `agents/backend-agent.md` — Data access, authentication, server rendering.
- `agents/frontend-agent.md` — UI components, layouts, interactions.
- `agents/review-agent.md` — Testing, security, accessibility, verification.

Use the orchestrator to divide work into bounded tasks and assign the appropriate agent responsibilities.

If independent agent execution is unavailable, follow the corresponding agent instructions in explicitly separated phases.

Do not claim independent agent execution unless it actually occurred.

## Architectural Rules

- Use Next.js App Router, TypeScript, and Tailwind CSS.
- Prefer React Server Components.
- Keep authentication and authorization on the server.
- Never expose restricted products or authenticated pricing to public users.
- Access product content through the CMS adapter.
- Keep presentation independent of data retrieval.
- Avoid unnecessary dependencies and abstractions.

`context/architecture-context.md` is the authoritative source for architectural decisions.

## Implementation Rules

- Implement one bounded task at a time.
- Follow the relevant agent instructions.
- Do not introduce unrequested features.
- Do not modify unrelated code.
- Request approval for architectural or scope changes.
- Validate changes before reporting completion.
- Provide the handoff required by `context/ai-workflow-rules.md`.

## Progress Tracking

The orchestrator owns routine updates to:

`context/progress-tracker.md`

Update progress after meaningful task completions, blockers, or phase transitions.

Do not rewrite stable context documents unless an approved decision changes.

## Definition of Done

A task is complete when:

- Its acceptance criteria are satisfied.
- Applicable verification has passed.
- Architectural invariants remain intact.
- Outstanding issues are documented.
- A concise handoff is provided.

## Guiding Principle

Build the simplest reliable solution that satisfies the requirements.

Prioritize architectural consistency, maintainability, accessibility, and verifiable AI-assisted development over unnecessary complexity.