# Nash — Design System

Reference for the Nash product surface. Source of truth is the Figma file `D8otVY8ZvWYoZGShPoYxHl`; this document mirrors it in a form engineers can read without opening Figma.

---

## 1. Colour

Tokens are named `Semantic/<Theme>/<Element>/<Role>`. Never use raw hex in components — always the token.

### Base

| Role | Dark | Light |
|---|---|---|
| Background App | `#08090B` | `#FFFFFF` |
| Background Sunken | `#0D0F12` | `#F9F9FA` |
| Background Surface | `#131517` | `#F6F6F7` |
| Background Elevated | `#181A1E` | `#ECEDEF` |
| Border Subtle | `#2E3036` | `#E7E8EA` |
| Border Strong | `#3E4148` | `#D2D5DA` |
| Text Primary | `#E4E5E8` | `#0F1115` |
| Text Secondary | `#A2A5AB` | `#4A4E57` |
| Text Tertiary | `#8B8E95` | `#6B7078` |
| Text Disabled | `#686B72` | `#9BA0A8` |

**Accent is `#635BFF` in both themes.** `Text On Accent` is `#FFFFFF` in both — including the knob of an active toggle, which must not follow the theme.

### Status

| Role | Dark bg / text | Light bg / text |
|---|---|---|
| Success | `#0E2118` / `#34D399` | `#E9F8F1` / `#047252` |
| Warning | `#2C2011` / `#E4A44C` | `#FDF4E3` / `#A96A08` |
| Error | `#2D1520` / `#E85D75` | `#FDE8EC` / `#C4344E` |

### Rules

- **Light mode is cool white, not warm.** The legacy `Light/Grey/N` ramp reads beige — do not use it.
- **Elevation inverts.** In dark, floating surfaces go *lighter* (`Background Elevated`). In light, they go to `Background App` — white sits above the grey page.
- No opacity-based colour. Every value is a solid hex.
- Accent is reserved for primary actions. It is not a brand wash.

---

## 2. Typography

**Poppins** throughout — Light, Regular, Medium, SemiBold.

| Use | Size | Weight | Line height |
|---|---|---|---|
| Page title | 24 | SemiBold | 132% |
| Section heading | 16 | Medium | — |
| Card title | 13.5–14.5 | Medium | — |
| Body / message | 13.5–14 | Regular | 162–168% |
| Card body | 12.5 | Regular | 160% |
| Meta, timestamps | 11–11.5 | Regular | — |
| Section label | 11 | Medium | — |

Body copy sits at 160%+ line height. Anything tighter reads cramped at these sizes.

---

## 3. Spacing

### Page shell

```
Desktop     1440 × 900 · sidebar 280 · content padding 40 / 60 / 40 / 60
Mobile      390 × 844  · content padding 0 16 · top bar 6 / 16 / 12 / 16
Rail        320 wide, flush to the window edge, 1px left hairline
            padding 22 / 20 / 17 / 20 · content gutter to rail: 32
```

### Sidebar

```
Container      280 × 854 · padding 14 12 12 12 · vertical · gap 2
Brand row      44 · padding 0 8
Org switcher   36 · radius 9 · padding 0 11 · gap 9
Search field   36 · radius 9 · padding 0 11 · gap 9
Nav item       34 · radius 8 · padding 0 9 · gap 11
Section header 32 · padding 0 9 · label 11 Medium
Folder row     34 · radius 8 · padding 0 9 · gap 11
Nested chat    30 · radius 8 · padding 0 9 0 31 · gap 8
Date marker    30 · padding 0 9 · label 11 Medium
Chat row       32 · radius 8 · padding 0 9 · gap 8
User footer    48 · radius 9 · padding 0 9 · gap 10
```

**Space above a date marker is 16px.** The 2px container gap applies between chat rows only — using it above a marker is what makes date groups run together. It does not apply to the first group in the list.

### Cards

```
Card           radius 13 · padding 16 16 14 16 · gap 12
Description    fixed 2 lines (40px at 12.5/160%), truncate with ellipsis
Grid           3 columns desktop at 1040 content width, 14px gutter
List row       radius 10 · padding 12 · no container, no dividers
```

Card height must not vary with copy length. The description box is fixed; longer text truncates.

---

## 4. Components

### Buttons

| Kind | Fill | Text |
|---|---|---|
| Primary | `Accent` | `Text On Accent` |
| Secondary | `Background Elevated` | `Text Primary` |
| Ghost | none | `Text Tertiary` |
| Danger | `Error Text` | `Background App` |

Radius 9–10, padding `10 15`, label 12.5 Medium.

**No outlined buttons.** A secondary button is a filled surface. The only bordered controls left in the system are tabs and category chips, whose unselected state is border-only.

### Toggle

`46 × 28` mobile, `30 × 18` desktop. Knob 22 / 14, always white. Track is `Accent` when on, `Border Strong` when off.

### Status

- **Connected** — coloured dot before the name, nothing else. The dot carries it.
- **Needs auth / Error / Auto-paused / Access revoked** — dot *and* the word in colour at the head of the meta line, no fill.
- **Paused** — muted dot and muted word. A state you chose, not a problem.
- **Not connected** — no dot; the category sits where status would.

Colour on every card means colour is meaningless. Only spend it where there is something to do.

### Toasts

Bottom-right of the **content area** (not the window), 24px in, 430–460 wide desktop / full-width minus 16 on mobile. Never more than one at a time; the bulk-action bar uses the same slot.

### Empty vs error

They never share a layout.

- **Empty** is instructional — explains the gesture that fills it, offers the next action.
- **Error** states that data is safe and offers Retry.

---

## 5. Behaviour

### Sidebar collapse

Three levels. **CHATS is the parent of FOLDERS** — they are not independent.

1. **CHATS header** — collapses the whole section: FOLDERS header, every folder, all date markers, all loose chats.
2. **FOLDERS header** — collapses all folders at once whatever their individual state. Date markers and loose chats remain, since they are not inside a folder.
3. **Each folder row** — collapses only its own nested chats. No effect on siblings.

Reopening FOLDERS restores each folder's previous state rather than resetting it. Collapse state persists per user across sessions.

### Chat row

- **Rest** — title only, no trailing icon.
- **Hover** — row fills, `⋯` fades in. Nothing else appears.
- **Pinned** — pin shows at rest, because it is a data state and not a hover state.

Pinning lives inside the `⋯` menu.

### Destructive actions

- **Single item** — act immediately, undo in the toast. No confirm dialog.
- **Many items, or a container** — confirm first, and state the count.

Disconnecting a connector explains what survives: past chats keep what was already returned.

### Connectors

- Writes always ask, every time. There is no "always allow".
- After 5 consecutive failures a connector auto-pauses and says so, rather than slowing every message.
- If a server's manifest changes, **new tools arrive switched off**. A server cannot grant itself more reach.
- Expired auth mid-chat reconnects and replays the call — the user does not retype anything.

---

## 6. Motion

| Move | Duration | Easing |
|---|---|---|
| Page / view change | 400–550ms | `cubic-bezier(.16,1,.3,1)` |
| Modal in | 150–180ms | same |
| Rail slide | 320ms | same |
| Hover | 120–180ms | same |
| Press | 90ms | `cubic-bezier(.65,0,.35,1)` |
| Toggle | 280ms | `cubic-bezier(.16,1,.3,1)` |

Looping: spinner 1.1s linear, skeleton shimmer 1.5s ease-in-out ping-pong.

**No spring or overshoot curves.** Everything decelerates into place.

---

## 7. Known gaps

- No current-generation Settings page. The admin model-filtering view has nowhere to live yet.
- Tabs and category chips still use a border-only unselected state, the last outlined controls in the system.
- The `Sidebar` component still shows a pin on every chat row, which contradicts §5.
