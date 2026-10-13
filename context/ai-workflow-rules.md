# AI Workflow Rules — SIGNAL

## 1. Purpose

This document defines how AI agents must operate throughout the SIGNAL development process.

The objective is to produce maintainable, reliable code through controlled AI-assisted development.

Agents are responsible for executing well-defined tasks, respecting architectural constraints, validating their work, and communicating decisions clearly.

**Core principle: AI accelerates implementation. Human judgment governs architecture, scope, and quality.**

## 2. Context-First Development

Before beginning a task, an agent must:

1. Read its assigned agent instructions.
2. Read the relevant project context files.
3. Review the current task and applicable progress-tracker entries.
4. Inspect existing code related to the task.
5. Identify constraints, dependencies, and acceptance criteria.

Do not begin implementation until the task and its boundaries are understood.

Agents should read only the context necessary for their responsibilities unless explicitly instructed otherwise.

### Sources of Truth

- `project-overview.md` — Product requirements and scope.
- `architecture-context.md` — Architecture and technical invariants.
- `code-standards.md` — Coding conventions and implementation standards.
- `ui-context.md` — Visual design and UI conventions.
- `progress-tracker.md` — Current development status.
- `ai-workflow-rules.md` — Agent behavior and workflow rules.

Agent instructions define responsibilities but must not override shared project constraints.

## 3. Handling Ambiguous Requirements

The assessment intentionally leaves some implementation decisions open.

Agents must exercise reasonable judgment without introducing unnecessary complexity.

When a requirement is ambiguous:

1. Check existing project context for an established decision.
2. Prefer the simplest solution consistent with the assessment.
3. Make a reasonable assumption when the decision is low-risk and reversible.
4. Record meaningful assumptions in the task handoff.
5. Request human approval when the decision affects architecture, security, dependencies, or product scope.

Do not repeatedly interrupt development for minor implementation details.

Do not invent requirements to justify additional features.

## 4. Scope Control

Implement only what is required for the current task.

Avoid:

- Unrequested features.
- Premature abstractions.
- Unnecessary dependencies.
- Large refactors unrelated to the task.
- Complex state management for simple interactions.
- Additional infrastructure without demonstrated need.
- Rewriting working code without a clear benefit.

Prefer established framework capabilities over custom implementations.

**A smaller, complete implementation is preferable to a larger, partially working one.**

## 5. Task Execution

Each task must have:

- A clear objective.
- Defined ownership.
- Relevant context.
- Expected deliverables.
- Acceptance criteria.

Agents should complete one bounded task at a time.

### Before Implementation

- Inspect relevant existing files.
- Identify the smallest reasonable change.
- Check for conflicts with architectural invariants.
- Communicate any blocking decisions.

### During Implementation

- Follow established architecture and coding standards.
- Keep changes within the assigned scope.
- Reuse existing patterns where appropriate.
- Avoid modifying unrelated files.
- Do not silently change architectural decisions.

### After Implementation

- Review changed files.
- Run applicable validation.
- Identify remaining issues.
- Produce a structured handoff.

Do not report a task as complete when its acceptance criteria have not been satisfied.

## 6. Agent Responsibilities and Boundaries

Agents must operate within their assigned responsibilities.

An agent may inspect files outside its ownership when necessary to understand dependencies.

However, it must not modify files owned by another agent without explicit authorization from the orchestrator.

If a task requires changes across multiple ownership boundaries:

1. Identify the required changes.
2. Report the dependency.
3. Request coordination through the orchestrator.
4. Continue only within the approved scope.

Do not duplicate functionality owned by another agent.

## 7. Architectural Invariants

Agents must respect all invariants defined in `architecture-context.md`.

In particular:

- Authorization and role-based pricing remain server-controlled.
- Restricted product information must not leak to public users.
- Server Components are the default.
- CMS data access remains separate from presentation.
- Authentication must not rely exclusively on client-side state.
- Client-side layout changes must not alter authorization decisions.

If a task conflicts with an invariant, stop the conflicting implementation and escalate the issue.

Do not bypass an invariant to make a feature work.

## 8. Verification and Quality Gates

Agents must verify their work using the checks relevant to the task.

Possible checks include:

- TypeScript validation.
- ESLint.
- Automated tests.
- Production build.
- Route and authentication behavior.
- Responsive UI review.
- Accessibility checks.

The review agent is responsible for independent verification at designated milestones.

### Verification Rules

- Never claim a check passed unless it was executed.
- Report failed checks accurately.
- Distinguish verified behavior from assumptions.
- Do not hide warnings or unresolved issues.
- Do not mark incomplete functionality as finished.

When validation cannot be performed, explain why.

### Testing Strategy

- Use Vitest for isolated business logic and data-layer tests.
- Use Playwright for critical user journeys and SSR verification.
- Prioritize authentication, authorization, pricing, and content visibility.
- Test new business logic when introduced.
- Avoid tests that merely duplicate implementation details.
- Run relevant tests before completing an agent handoff.
- The Review Agent independently validates critical requirements.
- Do not report passing tests unless they were executed successfully.

## 9. Error Handling and Recovery

When implementation fails:

1. Identify the actual error.
2. Investigate its likely cause.
3. Apply the smallest reasonable fix.
4. Rerun the relevant validation.
5. Report the result.

Avoid repeatedly applying speculative fixes.

Do not rewrite entire components or subsystems when a localized correction is sufficient.

If the same issue persists after two reasonable attempts, report the blocker and request guidance before making broader changes.

## 10. Context Management

Context documents are shared project knowledge, not temporary agent scratchpads.

### Stable Context

The following files should change only when their underlying decisions change:

- `project-overview.md`
- `architecture-context.md`
- `code-standards.md`
- `ui-context.md`
- `ai-workflow-rules.md`

Agents must not rewrite these documents simply to reflect implementation progress.

### Dynamic Context

`progress-tracker.md` records:

- Current development phase.
- Completed tasks.
- Active work.
- Blockers.
- Important decisions.
- Verification status.
- Next steps.

The orchestrator owns routine updates to the progress tracker.

Specialized agents provide handoff information but should not independently rewrite shared progress state.

## 11. Agent Handoff Contract

At the end of each task, the responsible agent must provide a concise handoff using the following structure.

### Task
What was requested.

### Changes
Files created or modified, with a short explanation.

### Decisions
Important assumptions or implementation decisions.

### Verification
Checks performed and their actual results.

### Outstanding Issues
Known limitations, blockers, or incomplete work.

### Recommended Next Step
The next logical task or dependency.

Handoffs should be concise and factual.

Do not include lengthy reasoning transcripts or unnecessary implementation narration.

## 12. Human Approval

Human approval is required before:

- Changing an architectural invariant.
- Adding a major dependency or external service.
- Introducing a database or authentication provider.
- Expanding the agreed product scope.
- Replacing an established implementation pattern.
- Making destructive changes to existing work.

Approval is not required for routine implementation choices that remain within the established architecture.

## 13. Manual Intervention and Transparency

The development process must distinguish between:

- AI-generated implementation.
- Human-directed architectural decisions.
- Human-authored changes.
- Manual fixes following AI-generated code.
- Automated verification.

Meaningful interventions should be recorded for the final `AGENT.md` assessment documentation.

Do not invent agent activity, test results, or manual interventions.

The final report must accurately reflect the development process.

## 14. Completion Criteria

A task is complete only when:

1. Its requested functionality is implemented.
2. Its acceptance criteria are satisfied.
3. Applicable validation has passed.
4. No known architectural invariant is violated.
5. Outstanding issues are documented.
6. A handoff has been provided.

The orchestrator determines whether the project is ready to advance to the next phase.

## 15. Working Philosophy

Build deliberately.

Keep implementations understandable.

Prefer explicit code over unnecessary abstraction.

Use AI to accelerate engineering work without surrendering architectural control.

Prioritize correctness, accessibility, maintainability, and clear communication.

**The goal is not to maximize generated code. The goal is to demonstrate a reliable, repeatable development process.**