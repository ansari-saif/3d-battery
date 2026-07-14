# AGENTS.md

## Cursor Cloud specific instructions

This is a single, frontend-only Vite + React 18 + TypeScript app (a WebGL 3D battery visualizer using `three` / `@react-three/fiber` / `@react-three/drei`). There is no backend, database, or test suite.

### Services

| Service | Command | Notes |
| --- | --- | --- |
| Frontend dev server | `npm run dev` | Vite dev server on port `5173` (see `package.json`). This is the whole product. |

### Standard commands (defined in `package.json`)

- Lint: `npm run lint`
- Build: `npm run build` (production build to `dist/`)
- Preview built bundle: `npm run preview` (run after `npm run build`)

### Non-obvious notes

- Use **npm** (the update script relies on `package-lock.json`). A `yarn.lock` is also committed, but npm is the source of truth here.
- The Vite entry files `index.html` (repo root) and `src/index.css` (Tailwind directives) are required for `dev`/`build` to work — `src/main.tsx` imports `./index.css` and Vite needs `index.html` as its entry. If either is missing, both `npm run dev` and `npm run build` fail.
- The app requires a WebGL-capable browser to render the 3D scene; battery stats are simulated in-browser (no external data source).
- `npm run build` prints a chunk-size (>500 kB) warning — this is expected and not an error.
