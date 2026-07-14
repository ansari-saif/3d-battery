# AGENTS.md

## Cursor Cloud specific instructions

This is a client-only **Vite + React + TypeScript** single-page app (a 3D battery visualization). There is no backend, database, or environment variables — the only runtime service is the Vite dev server, and all battery data is simulated client-side in `src/App.tsx`.

- Package manager: **npm** (`package-lock.json`). A `yarn.lock` is also present but npm is the default used here.
- Dev server: `npm run dev` (Vite, serves on `http://localhost:5173`). Requires WebGL in the browser to render the Three.js scene.
- Lint: `npm run lint` (ESLint). Build: `npm run build` (outputs to `dist/`). Preview built app: `npm run preview`.
- Note: `index.html` (root) and `src/index.css` are required by Vite / `src/main.tsx`; the app will not build or run without them.
