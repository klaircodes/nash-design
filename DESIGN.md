# Nash — design reference

The record of what exists today, taken from the shipped code rather than from
intent. Everything here is measured; where the app contradicts itself, §10 says
so instead of pretending otherwise.

Dark is the default. Light is a full theme, switched in Settings.

---

## 1. Colour

Tokens live in `app/src/styles/tokens.css`. **Components never hardcode a hex.**

### Surfaces — dark → light

| Token | Dark | Light | Used for |
|---|---|---|---|
| `--app` | `#08090B` | `#FFFFFF` | page behind everything |
| `--sunken` | `#0D0F12` | `#F9F9FA` | sidebar, code block body |
| `--surface` | `#131517` | `#F6F6F7` | search field, org row, filter pills, message bubble, cards |
| `--elevated` | `#181A1E` | `#ECEDEF` | dialogs, menus, round buttons, tool pills, attachment cards |
| `--hover` | `#1E2024` | `#F0F1F2` | any row under the pointer; active nav item |
| `--border` | `#2E3036` | `#E7E8EA` | hairlines, inset outlines |
| `--border-strong` | `#3E4148` | `#D2D5DA` | reserved for emphasis |

The stack reads **app → sunken → surface → elevated**. A card only ever sits one
step above what's behind it. Two neighbouring elements never share a step — when
the model picker's search field moved onto its card, it had to go up to
`--elevated` or it would have disappeared.

### Text

| Token | Dark | Light | Used for |
|---|---|---|---|
| `--t1` | `#E4E5E8` | `#0F1115` | headings, message body, active labels |
| `--t2` | `#A2A5AB` | `#4A4E57` | nav labels, chat titles, secondary body |
| `--t3` | `#8B8E95` | `#6B7078` | icons at rest, meta lines, section headers |
| `--t4` | `#686B72` | `#9BA0A8` | placeholders, version string, disclaimer |

### Accent and status

| Token | Dark | Light | Rule |
|---|---|---|---|
| `--accent` | `#635BFF` | `#635BFF` | **one** per screen. Send button, selected pill, tick, quote rule, Show-more link |
| `--ok` / `--ok-bg` | `#34D399` / `#0E2118` | `#047252` / `#E9F8F1` | connected, succeeded |
| `--warn` / `--warn-bg` | `#E4A44C` / `#2C2011` | `#A96A08` / `#FDF4E3` | needs attention |
| `--err` / `--err-bg` | `#E85D75` / `#2D1520` | `#C4344E` / `#FDE8EC` | failed |

Never tint a surface with opacity to fake a new one — use the next token up.

### Status treatment

Dot alone when the state is fine. Dot **plus a coloured word** when it needs
action. Never a filled pill.

---

## 2. Type

Poppins, weights 300/400/500/600. One family, no exceptions.

| Size | Weight | Used for |
|---|---|---|
| 30px | 600 | auth hero, greeting (desktop) |
| 22px | 600 | picker title (mobile) |
| 20px | 600 | greeting (mobile) |
| 17px | 600 | dialog title, reply `h2` |
| 16px | 600 | panel title, section headline |
| 14.5px | 400 | message body, list items, blockquote |
| 14px | 500/600 | document title, reply `h3`, primary button |
| 13.5px | 400/600 | menu rows, attachment name, table cells |
| 13px | 400/500 | tool pills, model pill, Show more |
| 12.5px | 400/500 | nav items, chat titles, filter pills, search |
| 12px | 400 | meta lines, language label |
| 11px | 500 | section headers — uppercase, `.06em` tracking |
| 10.5px | 400/500 | New tag, version, disclaimer |

Headings tighten: `letter-spacing: -.2px` at 16–17px, `-.3px` at 20–24px,
`-.5px` at 30px. Body never tracks.

Line height: **1.62** for message prose, **1.45–1.6** for UI text, **1.7** for
code.

---

## 3. Shape

| Token | Value | Used for |
|---|---|---|
| `--r-card` | 13px | cards |
| `--r-ctl` | 10px | controls |
| `--r-sm` | 8px | nav rows, small buttons |

In practice: **18px** message bubble · **16px** dialog · **14px** menu · **12–13px**
card, code block, table, document · **10px** search field, dropdown · **9px**
org row, primary button · **8px** nav row, sort row · **7px** icon button ·
**50%** round buttons and avatar · **17px** (pill = half of 34px height).

Pills are always fully round: radius = half the height.

---

## 4. Controls

### Buttons

| Class | Size | Fill | Notes |
|---|---|---|---|
| `.primary` | h40 (h44 mobile) | `--accent`, `#111214` in light | disabled → `opacity .42` |
| `.sso` | h40 (h44 mobile) | `--surface`, outlined in light | full width |
| `.round` | 34×34 (30 mobile) | `--elevated` | circular; `.accent` variant = send |
| `.round.sm` | 34×34 (30 mobile) | `--elevated` | composer tool icons |
| `.iconbtn` | 32×32 (30 mobile) | none | dialog close, back |
| `.act` | 28×28 | none → `--surface` on hover | message actions |
| `.pinbtn` | 28×28 | none → `--surface` on hover | pin, in rows |
| `.pin` (chat row) | 26×26 | none → `--surface` on hover | negative margin, hugs row edge |
| `.addfolder` | 22×22 | none | header `+` |

Every icon button has a hit box **at least 8px larger than its glyph**, applied
as padding with a negative margin so the target grows without moving the layout.

### Pills

| Class | Height | Radius | Fill | Selected |
|---|---|---|---|---|
| `.pill` | 34 | 17 | `--elevated` | — |
| `.fpill` | ~31 (7px pad) | 16 | `--surface` | `--accent` + white |
| `.ddbtn` | 34 | 10 | `--surface` | label in `--t1` |
| `.modelpick` | auto | 8 | none | truncates at 190px (150 mobile) |
| `.newtag` | auto | 6 | `accent @ 18%` | text in `--accent` |

### Rows

| Class | Height | Radius |
|---|---|---|
| `.navitem` | 34 | 8 |
| `.chatrow` | 32 | 8 |
| `.folderrow` | 34 | 8 |
| `.sechead` | 32 | — |
| `.orgrow` | ~50 | 10 |
| `.sortrow` | ~38 | 8 |
| `.mrow` (model) | auto, 11px pad | 10 |
| `.userrow` | 48 | 9 |

Nested chats indent to **31px**, matching the folder icon's text offset.

---

## 5. Inputs and search

| Class | Height | Fill | Notes |
|---|---|---|---|
| `.searchfield` (sidebar) | 36 | `--surface` | live filter, × to clear, Esc clears |
| `.msearch` (picker) | 42 | `--surface` (`--elevated` on a card) | autofocus, × to clear |
| `.inp` (auth) | 39 (44 mobile) | translucent white / `#F6F6F7` | focus ring = inset 1px accent @75% |
| `.crow textarea` | auto | none | grows to **168px** (132 mobile), then scrolls |

Search covers **titles and message bodies** — paragraphs, list items, table
cells, code, document titles, attachment names. Empty groups and folders drop
out while filtering; folders auto-expand so a match inside one is visible.

Composer: **Enter sends, Shift+Enter breaks the line.** The input owns the top
line; controls sit on the row beneath it at every width.

---

## 6. Overlays

| Class | Width | Radius | Fill | Dismiss |
|---|---|---|---|---|
| `.mpanel` (model picker) | 472, max `100vw-48` | 16 | `--elevated` | scrim click, ×, Esc |
| `.mpanel.inline` (mobile) | full, **52vh fixed** | 0 | transparent, list on a card | × |
| `.orgmenu` | 272 (206 compact) | 14 | `--elevated` | outside click, Esc, scroll |
| `.sortmenu` | 172 | 12 | `--elevated` | outside click, Esc |
| `.scrim` | full | — | `rgba(0,0,0,.6)` / `rgba(16,18,24,.42)` | — |
| `.drawerscrim` (mobile) | full | — | **opaque `--app`** | tap |

No overlay carries a border in dark; the shadow does the work. Light adds
`inset 0 0 0 1px var(--border)` because the shadow alone is too weak on white.

Panel heights are **fixed, never content-derived** — three results and thirty
open to the same box.

Flyouts measure their trigger and draw `position: fixed`, because the sidebar
clips its own overflow for the collapse animation. When there's no room beside
the panel they drop below the trigger instead.

---

## 7. Message blocks

One renderer, ten block types:

| Type | Renders as |
|---|---|
| `p` | paragraph, 14.5/1.62 |
| `h2` / `h3` | 17px / 14.5px, weight 600 |
| `ul` / `ol` | disc / decimal, 20px indent, bold lead-ins |
| `quote` | 2px `--accent` left rule, 14px inset |
| `code` | `--sunken` card, language label, copy + download |
| `table` | inset hairline frame, header rule, row rules, scrolls sideways |
| `doc` | titled card, edit/copy/download/collapse, hairline under the header |
| `file` | attachment chip — name + `TYPE · SIZE` |
| `dl` | result file — icon tile, name, meta, Download button |
| `img` | frame holding its aspect ratio, capped at 420px in replies |
| `error` | `--err` text on `--err-bg` with a 28%-alpha inset outline |

Inline: `` `code` `` chips and `**bold**`.

**Sent messages** clamp at **7 lines** — measured from real `lineHeight`, so it
lands on line 7 at any font size — and fade out rather than slicing a line.
Short messages get no toggle. **Replies are never clamped.**

Actions: replies get copy / 👍 / 👎 / bookmark / share; sent messages get copy /
share / edit, under the bubble rather than inside it. Hover-revealed on desktop,
**permanently visible on mobile** — touch has no hover. A failed reply shows
`Model · Failed` and drops its feedback row.

Every send shows a shimmering word — *Thinking, Brewing, Discombobulating,
Percolating, Marinating…* — for ~1.5s before the reply.

---

## 8. Motion

`app/src/lib/motion.js` is the only vocabulary.

```js
ease       = [0.16, 1, 0.3, 1]      // decelerate; no overshoot, ever
easeInOut  = [0.65, 0, 0.35, 1]
dur        = { press:.09, hover:.16, swap:.26, move:.38, page:.42 }
liquid     = spring 260 / 32 / 0.9      // composer, panels, sections
liquidWide = spring 210 / 30 / 0.95     // sidebar width, travelling controls
```

| Interaction | Treatment |
|---|---|
| Hover | colour only, `dur.hover` |
| Press | `scale .86–.99`, `dur.press` |
| Row reveal | opacity only — **the slot is always reserved** so text never reflows |
| Accordion | `height: auto` on `liquid` |
| Panel open | opacity + 10px rise, `liquid` |
| View swap | opacity + 14px slide, direction follows the drill |
| Sidebar collapse | width + content translate, `liquidWide` |
| Travelling control | shared `layoutId` — one element moves, nothing appears |
| Thinking | 1.6s linear gradient sweep through the text |

`prefers-reduced-motion` flattens everything to 0.001ms and stills the shimmer.

---

## 9. Behaviour rules

1. **Nothing appears from nowhere.** A control that moves keeps its identity via
   `layoutId`.
2. **Reserve the slot.** Hover-revealed icons hold their space at `opacity 0`.
3. **One panel at a time.** Opening the model picker closes Add to Chat, and
   the reverse.
4. **Fixed heights for panels.** Content scrolls inside; the frame never resizes.
5. **Touch shows everything.** No hover means no hidden affordances on mobile.
6. **Spacing is constant across states.** Collapsing the sidebar must not shrink
   or reflow its contents.
7. **Search is real.** If a field says "Search messages", it searches messages.
8. **Drag highlights on enter**, holds until the drag ends, and uses the hover
   treatment — never an accent outline.

---

## 10. Known drift — fix before extending

Found while auditing the shipped CSS. These are the places the app currently
argues with itself.

**Hardcoded colour in `auth.css`.** `#f6f6f7` ×12, `#0f1115` ×8, `#a8abb1` ×5,
`#635bff` ×3, `#0a0c10` ×2, plus `rgba(255,255,255,.04)` fills. The auth screen
predates the token file and never got migrated. It should read `--t1`, `--t2`,
`--accent`, `--surface`.

**`--danger` doesn't exist.** The error block uses `var(--danger, #e5647d)`, so
it's silently running on the fallback. It should be `--err` / `--err-bg`.

**Radius sprawl.** Nineteen distinct values against three tokens. 6, 7, 9, 11,
14, 16, 17, 18 are all in use with no rule behind them.

**Control heights.** 26, 28, 30, 32, 34, 36, 38, 39, 40, 42, 44, 46, 48, 50, 52.
There's no scale — each was chosen locally.

**Type scale.** Seventeen sizes between 10.5 and 30px. 12.5 (×23), 13.5 (×10)
and 14 (×9) carry most of the weight; the rest are one-offs.

Proposal, when you want to spend the time: collapse controls onto a
**28 / 34 / 40 / 48** ladder, radii onto **8 / 12 / 16 / round**, and type onto
**11 / 12.5 / 14 / 16 / 20 / 30**. Then migrate auth onto tokens and add
`--danger` as an alias of `--err`.

---

## 11. Icons

One stroke family, 1.5px, 24-unit grid, `currentColor`. 38 in the set:

`mail lock eye eyeoff check google panel user search plus bookmark users dots
dotsH chevD chevL chevR x menu funnel sort building books memory folder pin
alert code download edit copy thumbUp thumbDown share gear mic send clip image
temp servers wave`

Sizes: **13–15px** in rows and buttons, **16–17px** in nav and dialog headers,
**19–21px** in the top bar and tiles.

Two rules learned the hard way: the pin is **filled when pinned, outline when
not** — hovering it hollows out to preview the unpin. And overflow menus are
horizontal (`dotsH`) everywhere except the sidebar's "More" nav item, which
keeps the vertical `dots`.

---

## 12. Layout

**Desktop.** Sidebar 280px (126 collapsed) · thread and composer capped at 768px
and centred · top bar 56px.

**Mobile** (`max-width: 720px`). Sidebar becomes a drawer at
`calc(100vw - 76px)` — a constant 76px strip stays visible, holding only the
collapse mark, 16px off the panel edge. Top bar 52px. Composer gutter 12px,
content 24px. Model picker becomes a 52vh panel above the composer.

The breakpoint has one source of truth: `useIsMobile()`.
