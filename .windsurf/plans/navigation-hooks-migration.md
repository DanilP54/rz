# Navigation Hook Migration Plan

This plan migrates the Navigation component from Reatom state to idiomatic React hooks while preserving existing UX.

## Current State Snapshot
- `Navigation` relies on a locally-created Reatom model (`reatomNavigatinModel`) for `selectedSegmentLayout`, hint visibility/mode, and disclosure state.
- Hint persistence is duplicated: Reatom stores hints locally, while `useHintsStorage` already wraps `useLocalStorage`.
- Panels sorting and rendering happen within `Navigation`, alongside toast side effects.

## Target Hook Responsibilities
1. **`useSelectedSegmentLayout` (Next.js built-in)**
   - Replace the Reatom `selectedSegmentLayout` atom with Next.js router data.
   - Normalize the value to `Segment | null` for downstream hook consumers.

2. **`useDisclosure`**
   - Manage expanded panel state (`Segment | null`).
   - Expose `{ expanded, toggle, collapse }` for use in `DisclosurePanel` and `SelectedPanel` interactions.

3. **`useHint`**
   - Accept `{ selectedSegment, layout }` parameters from `useSelectedSegmentLayout`.
   - Read/write `seenHints` via `useHintsStorage` (localStorage-backed) and compute `{ isVisible, displayMode, text }`.
   - Emit toast notifications only when entering overlay mode with unseen hints.

## Migration Steps
1. **Author Hooks**
   - Create `useDisclosure` and `useHint` in `src/modules/rz/navigation/hooks/` with focused unit logic and tests where practical.
   - Reuse `useHintsStorage`, adding helpers if needed for intro-vs-segment keys.

2. **Refactor `Navigation` Component**
   - Remove Reatom imports/usages; wire in the new hooks and `useSelectedSegmentLayout`.
   - Keep existing panel sorting; ensure props (`isExpanded`, `onToggle`) align with new hook outputs.
   - Trigger `IntroHintDisplay` and toast flows through `useHint` results.

3. **Clean Up & Verification**
   - Delete unused Reatom utilities and ensure no stray state remains.
   - Run/extend tests covering hint visibility persistence and disclosure toggling.
   - Manual sanity check in the app to confirm hints/toasts render as before.
