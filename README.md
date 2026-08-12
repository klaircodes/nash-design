# Nash — design

Design system reference and a working prototype for **Nash**, an AI chat product.

## Contents

| Path | What it is |
|---|---|
| `DESIGN.md` | The design system — tokens, spacing, components, behaviour, motion |
| `app/` | Interactive prototype. No build step, no dependencies |

## Running the prototype

```bash
open app/index.html
```

That's it — it's plain HTML, CSS and JavaScript.

## What works

Real state, not a click-through:

- **Connectors** — search, filter tabs, grid/list toggle
- **Connect flow** — consent → connecting (spinner + progress) → connected, with a toast
- **Detail rail** — permissions and per-tool switches that actually toggle
- **Pause / resume / disconnect** — with confirmation on destructive actions and undo in the toast
- **Chat** — connector picker with live toggles, inline tool-call results
- **Sidebar** — three-level collapse (Chats → Folders → each folder), date grouping
- **Theme** — dark and light, switchable

Press `Esc` to close any modal, popover or rail.
