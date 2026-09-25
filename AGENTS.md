# AGENTS.md – Mattevägen

Math game for children aged 6–8, built 1:1 from the design handoff (`design_handoff_mattevagen/`).
Stack: React 19 + TypeScript + Vite, CSS Modules, Zustand (persisted to localStorage), vite-plugin-pwa.

## Commands
- `npm run dev` – dev server (port 5173)
- `npm run build` – `tsc -b` + Vite build + service worker
- `npm run lint` – oxlint

Demo switches (from the prototype's props): `?start=ny|halvvags|klart`, `?layout=auto|mobil|desktop`, `?support=auto|pa|av`.

## Code structure: Atomic Design
Follows https://atomicdesign.bradfrost.com/chapter-2/. Imports only go downwards (page → template → organism → molecule → atom).

| Level | Folder | Rule |
|---|---|---|
| Atoms | `src/components/atoms` | Smallest indivisible UI parts (ChunkyButton, Chip, Figur, Tree, Cloud …). Pure props, no store. |
| Molecules | `src/components/molecules` | Small groups of atoms with one job (NumberPad, AnswerEquation, StepProgress, MapNode …). Pure props, no store. |
| Organisms | `src/components/organisms` | Self-contained sections (boards, LevelScene, WorldMap, BottomNav, AdultReport …). May read the game store. |
| Templates | `src/components/templates` | Layout skeletons with slots, no content (GameStage, MapTemplate, LevelTemplate, ColumnTemplate). |
| Pages | `src/pages` | One per screen (`map`, `level`, `reward`, `avatar`, `words`). Put real content into templates. |

Other folders: `data/` (levels copied verbatim from the prototype's `LV`, `ITEMS`, `REWARD`, `NODES`, `SHAPES`, `BIRDS`), `store/` (Zustand game state + step engine), `lib/` (pure helpers: layout scaling, curve, motion), `hooks/`, `styles/` (tokens, keyframes).

## Rules
- Design fidelity is 1:1 with the prototype. The oklch values are the source of truth (`styles/tokens.css`, `styles/colors.ts`).
- Static styles go in CSS Modules; only values that depend on state or layout go in inline `style`.
- Level content lives in `data/levels.ts`, never in components.
- Core principles: no lives, no failure, never multiple choice, and help counts are **never shown to the child** (adult view only).
- Game logic belongs in `store/gameStore.ts`. Level timers go through `store/timers.ts` so they are cleared when a level is left.
- Animations: CSS keyframes for ambient loops, Web Animations (`lib/motion.ts`) for one-shot effects. `prefers-reduced-motion` must keep working.
