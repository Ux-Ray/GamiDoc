# ADR-004: Styling System

## Context
The frontend is expected to scale to 30+ pages developed over time. Without a strict styling architecture, the project risks style duplication, inconsistent UI behavior, and page-level divergence. The team also needs a beginner-friendly approach using custom CSS with reusable components, while keeping migration flexibility for future backend integration.

## Decision
Adopt a layered styling system: **Tokens + Base + Components**.

1. **Design tokens in `styles/tokens.css`**
- Store CSS variables for:
  - colors
  - typography scale
  - spacing scale
  - radii
  - shadows
  - z-index

2. **Base styles in `styles/base.css`**
- Define global defaults for:
  - `body`
  - headings
  - links
  - focus-visible states
  - default spacing conventions

3. **Optional utility rules in `styles/utilities.css`**
- Keep only stable cross-page helpers:
  - `.container`
  - 12-column grid helpers
  - `visually-hidden`
  - minimal shared layout helpers

4. **Shared UI components in `components/ui`**
- Required core component set:
  - `Button`
  - `Card`
  - `Container` / `Grid`
  - `SectionHeader`
  - `Input`
  - `Select`
  - `Badge` / `Tag`
  - `Modal` / `Drawer`

5. **Feature components in `modules/*/components`**
- Feature/domain components remain local to the module.
- Example: `modules/evaluation/components/InstrumentCard`.

6. **No raw UI in pages**
- Pages must not define new button/card/input style systems.
- Pages compose from shared UI plus feature components.

## Alternatives Considered
1. **Page-local CSS without shared component constraints**
- Rejected due to high duplication and drift across many pages.

2. **Utility framework-first approach (e.g., Tailwind-based)**
- Rejected for current phase to keep onboarding simpler with pure CSS fundamentals.

3. **Heavy UI library-first approach**
- Rejected to avoid design lock-in and preserve full control over visual language.

## Consequences
### Positive
1. Strong visual coherence across current and future pages.
2. Faster future development through reusable components.
3. Lower refactor cost when brand tokens or spacing scales change.
4. Clear boundary between shared UI and feature-specific UI.

### Tradeoffs
1. Upfront effort is required to define and maintain tokens/components.
2. Team discipline is required to enforce the no-raw-UI-in-pages rule.

## Acceptance Criteria
1. Changing a token updates all pages without markup edits.
2. Changing a shared component updates structure/behavior everywhere that component is used.
