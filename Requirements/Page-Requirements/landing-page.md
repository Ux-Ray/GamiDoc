# Landing Page Requirements

## Page Metadata
- Page name: `Landing Page`
- Page slug: `landing-page`
- Prototype source: `Requirements/Prototypes/landing page.png`
- Architecture references:
  - `Requirements/Architecture/01-Frontend-Architecture-Plan.md`
  - `Requirements/Architecture/ADR-004-Styling-System.md`

## 1) Prototype Image
![Landing Page Prototype](../Prototypes/landing%20page.png)

## Goal of the Page
Provide the public entry point to GamiDoc, explain value proposition, and route users to the first key destinations:
- start a new project flow,
- browse resources,
- view shared/reviewed designs,
- access auth controls (visible placeholders allowed).

## UI Structure Breakdown (from prototype)
1. Top navigation bar
- Brand: `GamiDoc`
- Auth actions: `Log In`, `Sign Up`

2. Hero section
- Title: `Welcome To GamiDoc!`
- Subtitle lines
- Primary CTA: `+ Start a New project`

3. Three feature cards row
- Card 1: Design/evaluate system + `More details`
- Card 2: Browse frameworks/methods + `Browse resources`
- Card 3: View reviewed design + `View shared designs`

4. Mid-page illustration/banner block

5. Problem statement section
- Heading + explanatory paragraph
- Bullet list under `GamiDoc addresses these issues`

6. Footer
- About, Resources, Research & Publications, Privacy policy columns
- Copyright line

## 2) Graphical/Component Analysis

### 2.1 Already Available Reusable Components (from previous pages)
- None yet (this is the first page to be developed).

### 2.2 Components Required by this Page That Do Not Exist Yet

Shared components to create in `components/ui`:
1. `Button`
- Variants needed now: `primary`, `secondary`, `ghost`, `nav-small`

2. `Card`
- Feature/info card with icon slot, title, body text, CTA area

3. `Container`
- Max-width centered layout wrapper

4. `Grid`
- 3-column responsive layout for feature cards

5. `SectionHeader`
- Reusable section title + subtitle composition

6. `TopNav`
- Brand area + right actions container (uses `Button`)

7. `FooterColumns`
- Multi-column footer with heading + link lists

8. `IllustrationBlock`
- Reusable image frame block with responsive behavior

Feature-specific components to create under `modules/public/components`:
1. `LandingHero`
2. `LandingFeatureCards`
3. `LandingProblemStatement`
4. `LandingFooter`

### 2.3 Reuse/Consistency Rules Applied
- No raw UI styles directly in page file.
- All spacing, typography, colors, radius, shadows must come from tokens/base/components rules.
- Page composes shared + feature components only.

## 3) Event List and Action Matrix

| Event ID | Trigger | Preconditions | Action | Expected Result | Error/Fallback |
|---|---|---|---|---|---|
| LP-E01 | Page open (`/`) | None | Call `GET /api/v1/auth/session` and `GET /api/v1/pages/landing` | Page content renders according to prototype, auth buttons visible | If one API fails, show non-blocking inline error and keep static shell visible |
| LP-E02 | Click `Log In` | Header rendered | Navigate to `/auth/login` placeholder route | Login placeholder page opens (or placeholder modal) | If route missing, show toast: `Login page not available yet` |
| LP-E03 | Click `Sign Up` | Header rendered | Navigate to `/auth/signup` placeholder route | Sign-up placeholder page opens (or placeholder modal) | If route missing, show toast: `Sign up page not available yet` |
| LP-E04 | Click `+ Start a New project` | Hero rendered | Navigate to first workflow entry page (`/choose-path`) | User reaches workflow selection page | If route missing, show toast and stay on page |
| LP-E05 | Click `More details` (Card 1) | Card 1 rendered | Navigate to `/choose-path` (design/evaluate entry) | User reaches relevant details/start flow page | If route missing, show toast and stay on page |
| LP-E06 | Click `Browse resources` (Card 2) | Card 2 rendered | Navigate to `/resources` | Resources page opens | If route missing, show toast and stay on page |
| LP-E07 | Click `View shared designs` (Card 3) | Card 3 rendered | Navigate to `/shared-designs` | Shared designs page opens | If route missing, show toast and stay on page |
| LP-E08 | Click footer link (`Documentation`, `Related`, etc.) | Footer rendered | Navigate to mapped route from API-provided link config | Target page opens | Broken link => show 404 page |
| LP-E09 | Keyboard navigation (Tab/Shift+Tab/Enter/Space) | Focusable controls present | Move focus in logical order and activate controls | Full keyboard operability (WCAG baseline) | If custom control fails focus, block release until fixed |
| LP-E10 | API content loading state | Initial fetch in progress | Show skeleton/placeholder blocks in hero/cards/footer | No layout jump, usable perceived performance | If timeout, show retry action |
| LP-E11 | Click `Retry` after load error | Previous load error shown | Re-run `GET /api/v1/pages/landing` | Content loads if backend available | Keep error message and allow another retry |

## 4) API Requirements (Mini-Contracts)

### API-1: Get auth session state
- Endpoint: `GET /api/v1/auth/session`
- Purpose: Determine guest/authenticated state for header actions.
- Request input:
  - Headers: optional auth token/cookie (if present)
- Response output (success 200):
```json
{
  "isAuthenticated": false,
  "user": null,
  "allowedActions": ["login", "signup"]
}
```
- Response output (error):
```json
{
  "error": {
    "code": "SESSION_UNAVAILABLE",
    "message": "Unable to determine auth session"
  }
}
```
- Notes: served by lite backend with mocked data.

### API-2: Get landing page content model
- Endpoint: `GET /api/v1/pages/landing`
- Purpose: Provide render data for hero, cards, problem statement, and footer links.
- Request input:
  - Query (optional): `lang=en`
- Response output (success 200):
```json
{
  "hero": {
    "title": "Welcome To GamiDoc!",
    "subtitle": [
      "a tool for Designing and evaluating gamification methodologically easy",
      "Manage your projects, explore evaluation methods, and access shares"
    ],
    "primaryCta": { "label": "+ Start a New project", "target": "/choose-path" }
  },
  "featureCards": [
    { "id": "design-evaluate", "title": "Design or evaluate a gamified system", "description": "...", "cta": { "label": "More details", "target": "/choose-path" } },
    { "id": "resources", "title": "Brows frameworks & methods", "description": "...", "cta": { "label": "Browse resources", "target": "/resources" } },
    { "id": "shared-designs", "title": "View reviewed design", "description": "...", "cta": { "label": "View shared designs", "target": "/shared-designs" } }
  ],
  "problemStatement": {
    "title": "Designing and evaluating gamification is methodologically hard",
    "body": "...",
    "bullets": ["..."]
  },
  "footer": {
    "columns": [
      { "title": "About Gamidoc", "links": [{ "label": "About", "target": "/about" }] }
    ],
    "copyright": "© GamiDoc"
  }
}
```
- Response output (error):
```json
{
  "error": {
    "code": "LANDING_CONTENT_UNAVAILABLE",
    "message": "Landing page content is temporarily unavailable"
  }
}
```
- Notes: served by lite backend with mocked data.

### API-3: Optional analytics event logging
- Endpoint: `POST /api/v1/analytics/events`
- Purpose: Log key CTA click events (non-blocking).
- Request input:
```json
{
  "eventName": "landing_cta_click",
  "page": "landing",
  "target": "/choose-path",
  "timestamp": "2026-02-21T00:00:00Z"
}
```
- Response output (success 202):
```json
{ "accepted": true }
```
- Response output (error):
```json
{ "accepted": false }
```
- Notes: failures must not block navigation.

## 5) Tests to Implement

### Unit tests
1. `Button` renders variants used on landing page.
2. `Card` renders icon/title/body/CTA slots correctly.
3. `TopNav` shows brand and auth controls from session state.
4. `LandingHero` renders API content and CTA target.
5. `FooterColumns` renders grouped links.

### Integration tests
1. Landing route fetches session + content APIs and renders page sections.
2. Error on content API shows error state + retry action.
3. Retry triggers refetch and recovers UI on success.
4. CTA clicks navigate to configured targets.
5. Keyboard navigation order across header, hero CTA, cards, and footer links.

### E2E tests
1. Open `/` and verify visual structure matches prototype sections.
2. Click `Start a New project` -> `/choose-path`.
3. Click card CTAs -> expected routes (`/choose-path`, `/resources`, `/shared-designs`).
4. Footer links navigate to expected pages or 404 fallback.
5. Accessibility smoke: visible focus indicator, semantic landmarks, keyboard activation.

## Open Items for Review
1. Confirm final route names for auth placeholder pages (`/auth/login`, `/auth/signup`).
2. Confirm if analytics API (API-3) is required in first implementation increment.
3. Confirm exact target route for `More details` CTA (`/choose-path` vs dedicated details page).

## Status
- This is a requirements/specification document only.
- Implementation must start only after explicit user approval.
