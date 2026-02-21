# GamiDoc Frontend Architecture Plan (Phase: Architecture Only)

## Summary
Define a frontend architecture that is scalable for 30+ pages, while delaying page-by-page implementation planning.
This plan standardizes stack, app structure, interface contracts, quality gates, and documentation artifacts under `Requirements/Architecture` for future execution.

## Locked Architectural Decisions
1. **Frontend stack**: `React + Vite + JavaScript`.
2. **Styling strategy**: `Custom CSS + reusable components` (no UI framework dependency).
3. **Routing**: `React Router` with scalable route groups.
4. **State management**: `useState + useContext` only (no Redux/Zustand in initial phase).
5. **Pre-backend data**: use a lite backend with real API endpoints; APIs return mocked data while frontend performs real HTTP calls.
6. **Testing target**: high level (`unit + integration + e2e` architecture included).
7. **Accessibility baseline**: WCAG 2.1 AA.
8. **Language strategy**: English first, but architecture must be multilingual-ready.
9. **Deployment stance**: local-first development; hosting-agnostic architecture.
10. **Auth in frontend-only phase**: keep login/logout-related buttons/actions when present in prototypes, but they can be non-functional placeholders for now.
11. **Prototype usage**: each provided prototype is the strict visual source of truth for its page and should be implemented to match the image exactly; implementation must still follow `## Styling System: Tokens + Base + Components` for reusability.
12. **Information architecture**: domain-based route groups for 30+ page scalability.
13. **Current planning scope**: architecture only; page-level planning deferred.

## Target Frontend Structure
Under `Codes/` (for future implementation), standardize:
- `app/` app bootstrap, router setup, providers
- `modules/` domain-based feature modules (`projects`, `design`, `evaluation`, `resources`, `shared`)
- `components/` shared reusable UI components
- `styles/` global tokens, base styles, utility classes
- `content/` static copy and i18n-ready dictionaries
- `api/` endpoint configuration and route constants
- `contexts/` app-level React contexts
- `services/` API client abstraction and domain service layers (real HTTP calls)
- `tests/` unit/integration/e2e test suites
- `utils/` pure helper functions

## Styling System: Tokens + Base + Components
To enforce visual and behavioral coherence across 30+ pages, standardize styling as follows:

1. **Design tokens in `styles/tokens.css`**
- Define CSS variables for:
  - colors (brand, semantic, text, surface, border, status)
  - typography scale (font families, sizes, line heights, font weights)
  - spacing scale (`4px`-based or equivalent)
  - radii scale
  - shadows
  - z-index layers

2. **Base styles in `styles/base.css`**
- Define baseline element behavior for:
  - `body` defaults (font, text color, background, antialiasing)
  - headings (`h1`-`h6`) and paragraph rhythm
  - links and interactive defaults
  - keyboard focus style (`:focus-visible`) with accessible contrast
  - default spacing conventions for sections and content blocks

3. **Optional utility rules in `styles/utilities.css`**
- Include only stable cross-page helpers such as:
  - layout container (`.container`)
  - 12-column grid helpers
  - spacing helpers if needed
  - `visually-hidden` accessibility helper

4. **Shared UI components in `components/ui`**
- Required foundational set:
  - `Button`
  - `Card`
  - `Container` / `Grid`
  - `SectionHeader`
  - `Input`
  - `Select`
  - `Badge` / `Tag`
  - `Modal` / `Drawer`

5. **Feature components in `modules/*/components`**
- Domain-specific components must stay in their module.
- Example: `modules/evaluation/components/InstrumentCard`.

6. **No raw UI in pages rule**
- Pages must not create new button/card/input visual systems.
- Pages compose from shared UI components and module feature components only.

## Public Interfaces / Types to Define Early
Create stable JS typedef/JSDoc contracts (or `.d.ts` later) for backend alignment:
1. `Project`
- `id`, `name`, `description`, `status`, `createdAt`, `updatedAt`
2. `WorkflowType`
- `new_system | existing_system`
3. `DesignArtifact`
- selected game elements, context, rationale, version metadata
4. `EvaluationPlan`
- method list, metrics, collection schedule
5. `ResourceItem`
- `id`, `category`, `title`, `summary`, `sourceUrl`, `tags`
6. `SharedDesign`
- `id`, `author`, `abstract`, `methodsUsed`, `reviewStatus`

Service interface contracts:
- `ProjectService` (`list/get/create/update`)
- `DesignService` (`getContext/saveContext/getElements/saveElements`)
- `EvaluationService` (`getMethods/savePlan/getMetrics`)
- `ResourceService` (`list/search/filter`)
- `SharedDesignService` (`list/get`)

All services must support:
- real HTTP calls to configured lite-backend endpoints
- centralized endpoint configuration (no hardcoded URLs in components)
- request/response contracts to be defined per page/module during detailed page analysis

## Non-Functional Architecture Rules
1. **Accessibility**
- semantic HTML landmarks, keyboard navigation, visible focus states, contrast-compliant tokens.
2. **Responsiveness**
- mobile-first CSS with defined breakpoints (`sm/md/lg/xl`).
3. **Performance**
- route-based code splitting, optimized asset loading, avoid oversized shared bundles.
4. **Maintainability**
- domain boundaries enforced; no cross-module imports except via shared interfaces/components.
5. **Content management**
- UI copy externalized from components for future multilingual support.

## Testing Strategy (Architecture-Level)
Unit tests:
- shared components behavior
- utility functions
- module-level pure logic

Integration tests:
- route transitions and layout rendering
- context/provider interactions
- API-call driven page data flow against lite backend mocked responses

E2E tests:
- primary navigation flows between domain groups
- basic accessibility smoke checks (keyboard + major landmarks)
- content rendering for English baseline

Acceptance scenarios to pass before implementation phase sign-off:
1. Any new page can be added under an existing domain without router refactor.
2. Frontend calls real configured API endpoints; no page/component uses hardcoded local mock JSON as the data source.
3. Shared component library supports consistent styling and accessibility states.
4. i18n structure can add second language without component restructuring.
5. Changing a token updates all pages without markup edits.
6. Changing a shared component updates structure/behavior everywhere that component is used.

## Documentation Deliverables (to store in `Requirements/Architecture`)
1. `01-Architecture-Overview.md`
2. `02-ADR-Index.md`
3. `ADR-001-Frontend-Stack.md`
4. `ADR-002-Routing-and-IA.md`
5. `ADR-003-State-and-Data-Strategy.md`
6. `ADR-004-Styling-System.md`
7. `ADR-005-Testing-Strategy.md`
8. `ADR-006-Accessibility-and-i18n-Readiness.md`
9. `03-Interface-Contracts.md`
10. `04-Module-Boundaries.md`

ADR rule:
- each ADR must include context, decision, alternatives considered, consequences.

## Assumptions and Defaults
1. Backend/database are unavailable during this phase.
2. A lite backend exists (or will be introduced) to serve mocked API responses for frontend integration.
3. Frontend architecture must remain implementation-ready but not implemented yet.
4. Auth flows are intentionally out of scope for now, but auth-related UI controls shown in prototypes should be preserved as non-functional placeholders.
5. Prototype images are strict visual constraints for the corresponding pages and must be reproduced exactly while using the shared styling/component architecture.
6. English is initial language; structure must support future multilingual expansion.
7. Detailed page-by-page planning is intentionally deferred to a later phase, including final API input/output contracts per page.
