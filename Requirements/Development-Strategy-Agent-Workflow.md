# GamiDoc Development Strategy for Agents

## Summary
Define a repeatable, enforceable workflow for every page so any agent can deliver consistent results: analyze prototype, produce page requirements, wait for approval, implement on sub-branch, test, then commit/push.

## Core Principle
This strategy is mandatory input for any agent working on page planning or implementation.

## Mandatory Pre-Work (Architecture First)
1. Agent must read **all documents** in `Requirements/Architecture/` before starting analysis or implementation.
2. Agent must treat all files in that folder as authoritative architecture constraints.
3. Agent must re-scan the folder on every new task (future-proof against added/updated docs).
4. If architecture documents conflict, agent must stop and request clarification before implementation.

## Standard Workflow (Always)
1. Receive page prototype from user.
2. Analyze prototype + all current architecture docs.
3. Create page-specific requirements document.
4. User reviews requirements document.
5. Agent waits for explicit "OK to implement".
6. Agent confirms current branch is not `main` (create/switch branch only if needed).
7. Agent implements page and tests.
8. Agent runs tests.
9. If tests pass: commit and push to remote.

## Branching Rules
1. Never work directly on `main`.
2. Agent may work on the current branch as long as it is not `main`.
3. If currently on `main`, agent must create/switch to a non-main branch before implementation.

## Per-Page Requirements Storage
- Folder: `Requirements/Page-Requirements/`
- One file per page: `Requirements/Page-Requirements/<page-slug>.md`
- Prototype images referenced from `Requirements/Prototypes/` (embedded in page doc).

## Minimum Required Content for Each Page Requirements Document
1. Prototype image (embedded + source path).
2. Graphical/component analysis.
- Identify which UI parts of the page map to already available reusable components (from previously developed pages).
- Identify which required components do not exist yet and must be created.
- Classify missing components as either shared (`components/ui`) or feature-specific (`modules/*/components`).
3. Complete event list and actions per event.
- Include: page open, click, input, submit, keyboard, navigation, modal open/close, error/retry.
- For each event: trigger, precondition, action, expected result, error behavior.
4. API requirements for that page.
- Minimum: endpoint, method, input, output, error output.
- Note: FE makes real API calls; backend returns mocked data (lite backend).
- Input/output details are finalized during each page analysis.
5. Test list for page validation.
- Unit tests, integration tests, e2e scenarios, accessibility checks.

## Architecture Compliance Rules During Page Work
1. Prototype is strict visual source of truth for that page.
2. Reusability must follow `Styling System: Tokens + Base + Components`.
3. No raw UI in pages: use shared UI + feature components.
4. Keep auth-related controls from prototypes (can be non-functional placeholders).
5. FE must call configured API endpoints (no page-level hardcoded local JSON data source).

## API/Public Interface Policy
Per page, define a "mini-contract":
- `endpoint`
- `method`
- `request` (params/query/body/headers as needed)
- `response_success`
- `response_error`
- `notes` (mocked response served by lite backend)

These contracts are added during per-page analysis and refined over time.

## Test and Release Gate
Before commit/push:
1. Run required tests for changed scope.
2. Fix failures and re-run until green.
3. Commit only after passing tests.
4. Push feature branch to remote.

## Acceptance Criteria for Strategy Usage
1. Every page has a requirements doc in `Requirements/Page-Requirements/`.
2. Every page doc includes image, graphical/component analysis, events/actions, API mini-contracts, and tests.
3. No implementation starts before explicit user approval.
4. No work is done on `main`.
5. FE uses real API calls to configured endpoints.
6. Tests are run and pass before commit/push.

## Assumptions and Defaults
1. Frontend stack and architecture are governed by docs in `Requirements/Architecture/`.
2. Lite backend exists (or will exist) to return mocked API responses.
3. API I/O details are progressively defined page-by-page.
4. This process remains valid as architecture docs evolve, because the agent always reads the full architecture folder.
