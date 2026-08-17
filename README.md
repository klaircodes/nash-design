# Nash — design

Design system reference and an interactive prototype for **Nash**.

| Path | What it is |
|---|---|
| `DESIGN.md` | The design system — tokens, spacing, components, behaviour, motion |
| `app/` | React + Vite + Motion prototype |

## Running

```bash
cd app
npm install
npm run dev
```

Then open the printed URL (default `http://localhost:5173`).

## Stack

- **React 19** — component state, no global mutation
- **Motion** (`motion/react`) — every transition, including enter and exit
- **Vite 8** — dev server and build
- Plain CSS with custom properties for tokens; no utility framework

## Structure

```
src/
  App.jsx              routing between auth and the app shell
  lib/motion.js        one motion vocabulary — durations, easing, variants
  styles/tokens.css    colour tokens for both themes
  styles/base.css      resets and reduced-motion
  components/          shared primitives
  screens/             one file per screen
```

## Progress

- [x] Auth — log in and sign up, 1:1 with Figma
- [ ] App shell and sidebar
- [ ] Chat — empty, filled, streaming
- [ ] Connectors, Bookmarks, Memories, Library

## Design rules

`DESIGN.md` lives at `~/Documents/Nash/DESIGN.md` — that copy is the single
source of truth. Read it before changing anything visual, and write new
decisions into it there. Do not create a copy in this repo.
