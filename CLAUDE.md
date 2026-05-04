@AGENTS.md

# find-100-ducks

FPS web game where the player searches and shoots 100 rubber ducks hidden across 3 low-poly 3D rooms. Random spawn each match. Two players take turns and compare times on a shared scoreboard.

Deploy target: Vercel.

## Stack (mandatory — do not propose alternatives)

- Next.js 16 App Router + React 19 + TypeScript strict
- Three.js + `@react-three/fiber` + `@react-three/drei` + `@react-three/rapier`
- Zustand (client state). TanStack Query enters in Stage 5 once a backend exists.
- Tailwind + shadcn/ui — only for HUD/menus 2D, never inside `<Canvas>`
- Prisma + Neon (Postgres) in Stage 5 (not now)
- Zod for dual validation when backend exists
- pnpm package manager

## Hard rules

- Real TS strict. Zero `any`. Zero `as unknown as X`. Explicit types on public exports and props.
- Files > 150 lines: extract before writing more.
- `'use client'` only in components touching Three.js, browser APIs, or client hooks. Pages stay server components when possible.
- Errors, loading and edge cases always handled.
- Defensive defaults: dispose geometries/materials, cleanup listeners, cancel rAF on unmount.
- YAGNI. Maintainability > cleverness.
- Conventional commits in English (`feat:`, `fix:`, `chore:`, `refactor:`).

## R3F anti-patterns to always avoid

- No inline geometries/materials in render (allocate per frame). Use `useMemo` or move to module scope.
- No `useState` for keyboard input inside `useFrame`. Use refs.
- No subscribing to the full Zustand store in heavy components. Use selectors with shallow comparison.
- No HTML 2D inside `<Canvas>`. HUD goes outside; use `<Html>` from drei only if strictly necessary.

## Communication conventions

- Spanish (Chile), direct, no preambles or "great question".
- Code, types, variables, commits: English.
- When options exist, recommend ONE with brief justification.
- Real evidence: command outputs, diffs, files. No "should work now" without verifying.
- Honesty about uncertainty before fabricated evidence.

## Roadmap

- ✅ Stage 0 — Bootstrap + setup
- ✅ Stage 1 — FPS camera + WASD + wall collisions
- Stage 2 — Load `.glb` models + build Room 1 + spawn-point pool
- Stage 3 — Random spawn of 100 ducks (Fisher-Yates from pool)
- Stage 4 — Shooting (raycast) + HUD (counter, timer, crosshair) + win screen
- Stage 5 — Rooms 2 and 3 + Prisma + Neon + scoreboard API
- Stage 6 — Polish (audio, menu, settings) + Vercel deploy

## Folder structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx               # menu
│   └── play/
│       └── page.tsx           # game route
├── game/
│   ├── components/            # GameCanvas, Player, TestRoom (Stage 1)
│   ├── hooks/                 # useKeyboard, etc.
│   ├── rooms/                 # empty in Stage 1
│   └── types/
│       └── index.ts
└── store/
    └── gameStore.ts
```
