# AGENTS.md

## Cursor Cloud specific instructions

This is a single-package frontend web app: a 3D interactive battery visualization
dashboard built with React 18, Three.js (`@react-three/fiber` + `@react-three/drei`),
Tailwind CSS, and Vite. There is no backend, database, or external service — all
battery data is simulated client-side, so running the Vite dev server is enough to
exercise the whole product.

- Package manager: npm (`package-lock.json` is the source of truth). A `yarn.lock`
  also exists but npm is used for setup here.
- Commands (see `package.json`): `npm run dev` (Vite dev server on port 5173),
  `npm run build`, `npm run lint`, `npm run preview`.
- No automated test suite exists; verify changes manually in the browser at
  `http://localhost:5173/` (confirm the 3D battery renders, drag rotates the view,
  and the stats panel values update every second).
- Non-obvious gotcha: the repo's initial commit was missing the Vite entry files
  `index.html` (repo root) and `src/index.css` (imported by `src/main.tsx`). These
  are required for both `npm run dev` and `npm run build`; without them Vite fails
  with "Could not resolve entry module index.html". They have been added.
