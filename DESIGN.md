# Nash — design rules

The rulebook. Every value here is taken from the shipped code, and every rule is
one the app already follows somewhere. When a new screen is built, it inherits
from this document rather than inventing its own answer.

Two things to know before reading:

- **Dark is the default.** Light is a complete theme, switched in Settings.
- **§13 is the drift list** — where the app currently breaks its own rules. Fix
  those before adding to them.

---

## 1. Colour

`app/src/styles/tokens.css`. **Nothing outside that file writes a hex.**

### Surfaces

| Token | Dark | Light | Used for |
|---|---|---|---|
| `--app` | `#08090B` | `#FFFFFF` | the page behind everything |
| `--sunken` | `#0D0F12` | `#F9F9FA` | sidebar, code block body |
| `--surface` | `#131517` | `#F6F6F7` | search fields, message bubbles, cards, list rows |
| `--elevated` | `#181A1E` | `#ECEDEF` | dialogs, menus, toasts, round buttons, tool pills |
| `--hover` | `#1E2024` | `#F0F1F2` | any row under the pointer; active nav item |
| `--border` | `#2E3036` | `#E7E8EA` | hairlines and inset outlines |
| `--border-strong` | `#3E4148` | `#D2D5DA` | reserved for emphasis |

The ladder is **app → sunken → surface → elevated**. Three rules govern it:

1. **One step at a time.** A card sits exactly one level above what's behind it.
2. **Never two neighbours on the same step.** When the model picker's search
   field moved onto a `--surface` card it had to rise to `--elevated`, or it
   would have disappeared into the card.
3. **Never fake a surface with opacity.** Use the next token up.

### Text

| Token | Dark | Light | Used for |
|---|---|---|---|
| `--t1` | `#E4E5E8` | `#0F1115` | headings, message body, active labels |
| `--t2` | `#A2A5AB` | `#4A4E57` | nav labels, chat titles, secondary body |
| `--t3` | `#8B8E95` | `#6B7078` | icons at rest, meta lines, section headers |
| `--t4` | `#686B72` | `#9BA0A8` | placeholders, counts, disclaimers |

### Accent and status

| Token | Value | Rule |
|---|---|---|
| `--accent` | `#635BFF` | **one per screen.** Send button, selected pill, tick, quote rule, link-styled action |
| `--ok` / `--ok-bg` | `#34D399` / `#0E2118` | connected, succeeded |
| `--warn` / `--warn-bg` | `#E4A44C` / `#2C2011` | needs attention, degraded |
| `--err` / `--err-bg` | `#E85D75` / `#2D1520` | failed, destructive |

**Status treatment.** A dot alone when the state is fine. A dot **plus a coloured
word** when it needs action. Never a filled pill.

**Destructive treatment.** Red is for the action, not the container: a Delete row
takes `--err` text and `--err-bg` only on hover. Nothing is red at rest except a
failure that already happened.

---

## 2. Type

**Poppins.** 300 / 400 / 500 / 600. One family, no exceptions.

### The ramp

| Size | Weight | Used for |
|---|---|---|
| **30** | 600 | auth hero, page title, greeting (desktop) |
| **22** | 600 | page title (mobile) |
| **20** | 600 | greeting (mobile) |
| **17** | 600 | dialog title |
| **16** | 600 | panel title, reply `h2`, section headline |
| **14** | 500 / 600 | document title, primary button, row emphasis |
| **13.5** | 400 | message body, list items, blockquote, menu rows, table cells |
| **13** | 400 / 500 | tool pills, model pill, pager, toast |
| **12.5** | 400 / 500 | nav items, chat titles, filter pills, search, form labels |
| **12** | 400 | meta lines, language labels |
| **11** | 500 | section headers — **uppercase, `.06em` tracking** |
| **10.5** | 400 / 500 | New tag, version string, disclaimer |

**12.5 and 13.5 carry most of the app.** If you're unsure which size to use, it
is one of those two.

### Tracking and leading

- `-.5px` at 30 · `-.3px` at 20–24 · `-.2px` at 16–17 · none below
- **1.62** message prose · **1.45–1.6** UI text · **1.7** code
- Body never tracks. Only headings tighten.

---

## 3. Shape

| Token | Value |
|---|---|
| `--r-card` | 13px |
| `--r-ctl` | 10px |
| `--r-sm` | 8px |

Where each lands in practice:

| Radius | Applies to |
|---|---|
| **18** | message bubble |
| **16** | dialog, sheet |
| **14** | menu, list card |
| **13** | card, table, code block, document, toast |
| **12** | small menu, notice |
| **10** | search field, dropdown, primary button, textarea |
| **9** | org row, list row, pager button |
| **8** | nav row, menu row, small button |
| **7** | icon button |
| **50%** | round buttons, avatar |

**Pills are always fully round** — radius equals half the height. A 34px pill is
17px; anything else is not a pill.

---

## 4. Buttons

| Class | Size | Fill | Notes |
|---|---|---|---|
| `.primary` | h40 (h44 mobile) | `--accent` | disabled → `opacity .42`, `cursor:default` |
| `.primary.sm` | h40, 18px pad | `--accent` | page-level actions; full width on mobile |
| `.ghost` | h40, 16px pad | none → `--hover` | the cancel beside a primary |
| `.ghost.outlined` | h40 | `inset 1px --border` | secondary action in an empty state |
| `.sso` | h40 (h44 mobile) | `--surface`, outlined in light | full width |
| `.round` | 34 (30 mobile) | `--elevated` | circular; `.accent` variant is send |
| `.iconbtn` | 32 (30 mobile) | none | dialog close, back |
| `.iconbtn.boxed` | 42 | `--surface` | a lone icon action beside a field |
| `.act` | 28 | none → `--surface` | message and row actions |
| `.pin` | 26 | none → `--surface` | chat row pin |
| `.addfolder` / `.chevbtn` | 22 / 14 | none | section header controls |

**Every icon button has a hit box at least 8px larger than its glyph**, added as
size and pulled back with negative margin so the target grows without moving the
layout. A 15px glyph gets a 26–28px box.

**One primary per view.** If a screen appears to need two, one of them is a
`.ghost`.

**Disabled means unreachable, not hidden.** `opacity .42` and `cursor:default` —
never remove the control.

---

## 5. Pills

| Class | Height | Radius | Rest | Selected |
|---|---|---|---|---|
| `.fpill` | ~31 (7px pad) | 16 | `--surface` / `--t2` | `--accent` / white |
| `.pill` | 34 | 17 | `--elevated` / `--t2` | — |
| `.ddbtn` | 34 | 10 | `--surface` / `--t3` | value in `--t1` |
| `.modelpick` | auto | 8 | none | truncates at 190 (150 mobile) |
| `.newtag` | auto | 6 | `accent @ 18%` | text in `--accent` |
| `.scope` | auto | 7 | tinted by scope | — |

**A filter pill carries its count** in `--t4`, and in `rgba(255,255,255,.72)`
when selected. The count is on every pill including the active one — a count
that disappears when you select it reads as a bug.

**A pill strip that overflows scrolls**, masked at the trailing edge:
`linear-gradient(90deg, #000 0, #000 calc(100% - 20px), transparent)`. It never
wraps in a list header. It **does** wrap inside a dialog.

---

## 6. Inputs

| Class | Height | Fill | Notes |
|---|---|---|---|
| `.searchfield` | 36 | `--surface` | sidebar; live filter, × to clear, Esc clears |
| `.msearch` | 42 | `--surface` (`--elevated` on a card) | autofocus, × to clear |
| `.inp` | 39 (44 mobile) | translucent | focus ring `inset 1px accent @75%` |
| `.targetbtn` | 40 | `--surface` | a picker that opens a menu |
| `.memform textarea` | min 96 | `--surface` | resize vertical (none on mobile) |
| `.crow textarea` | auto | none | grows to **168** (132 mobile), then scrolls |

**Search searches what the placeholder says.** "Search messages" searches message
bodies — paragraphs, list items, table cells, code, document titles, attachment
names — not just titles. Anything less is a lie in the UI.

**Search behaviour:** empty groups and folders drop out; collapsed folders
auto-expand so a match inside one is visible; Escape and × both clear.

**Composer:** **Enter sends, Shift+Enter breaks the line.** The input owns the
top line and the controls sit on the row beneath it at every width, so tall text
pushes the controls down instead of stranding them mid-box.

**A form's primary stays disabled until the form is valid**, and validation
shows on the field, not on submit. A scoped memory isn't valid until it names
what it's scoped to.

---

## 7. Overlays

| Class | Width | Radius | Fill | Dismiss |
|---|---|---|---|---|
| `.mpanel` | 472, max `100vw-48` | 16 | `--elevated` | scrim, ×, Esc |
| `.mpanel.inline` | full, **52vh fixed** | 0 | transparent; list on a card | × |
| `.memdialog` | 520, max `100vw-40` | 16 | `--elevated` | scrim, ×, Esc |
| `.orgmenu` | 272 (206 compact) | 14 | `--elevated` | outside click, Esc, scroll |
| `.rowmenu` | 206 | 12 | `--elevated` | outside click, Esc |
| `.sortmenu` / `.targetmenu` | 172 / fills field | 12 | `--elevated` | outside click, Esc |
| `.scrim` | full | — | `rgba(0,0,0,.6)` / `rgba(16,18,24,.42)` | click |
| `.drawerscrim` | full | — | **opaque `--app`** | tap |

**No overlay carries a border in dark** — the shadow does the work. **Light adds
`inset 0 0 0 1px var(--border)`**, because the shadow alone is too weak on white.
Every elevated surface needs both rules.

**Panel heights are fixed, never content-derived.** Three results and thirty open
to the same box; the list scrolls inside it. A panel that resizes around its
content moves everything below it.

**Flyouts are measured and drawn `position: fixed`.** The sidebar clips its own
overflow for the collapse animation, so an absolutely-positioned menu is cut off
at the panel edge. Measure the trigger, then:

- **Beside the panel** when there's room — `panel.right + 10`, never
  `trigger.right`, which is inset and lands back on top of the panel.
- **Below the trigger** when there isn't.
- **Above the trigger** when the menu would run off the bottom.

**Dialogs centre on mobile** — never a bottom sheet stuck to the edge — with a
16px side inset and `max-height: calc(100vh - 48px)`, scrolling inside.

### Layers

`0–2` page content · `20–30` in-panel menus · `60` scrim · `61` menus over a
scrim · `79` drawer scrim · `80` drawer · `90` toasts. **Toasts are always on
top** — a notification behind a scrim is a bug.

---

## 8. Notifications

**One component: `Toast.jsx`.** Nothing renders its own variant.

```
[ glyph ]  message text                    [ Action ]  [ × ]
```

| Property | Value |
|---|---|
| Position | **fixed, bottom right, 24px from both edges** (16px inset, full width on mobile) |
| Stack | column, 10px gap, newest below; `pointer-events` only on the toasts |
| Size | min-height 56, padding `14px 18px`, radius 13, max-width `min(520px, 100vw - 48px)` |
| Fill | `--elevated` + `--shadow`; light adds the inset border |
| Type | 13.5 / 1.45 |
| Glyph | 17px, `--t3`; `--warn` or `--err` when the toast is one of those |
| Action | optional, `--accent`, right of the message |
| Dismiss | × at 28px, always present |

**Rules.**

1. **Every confirmation is a toast.** No inline banners for transient state — an
   inline notice pushes the layout around; a toast doesn't.
2. **A status that persists, persists.** Memory being off isn't a notification
   you dismiss once — it returns whenever you open the page while it's still off.
   Dismissal is for this visit only.
3. **Destructive actions carry an Undo** for 5 seconds.
4. **Use a stable React key.** A key that changes per message stacks a new toast
   on every still-exiting one.
5. **On mobile, a full-width toast covers content** — give the scrolling region
   extra bottom padding while it's up, and take it back when it goes. Drive that
   off state, not off the element's height: an exiting toast still has height.

---

## 9. Motion

`app/src/lib/motion.js` is the only vocabulary. Nothing declares its own curve.

```js
ease       = [0.16, 1, 0.3, 1]      // decelerate; no overshoot, ever
easeInOut  = [0.65, 0, 0.35, 1]
dur        = { press:.09, hover:.16, swap:.26, move:.38, page:.42 }
liquid     = spring 260 / 32 / 0.9      // composer, panels, sections, toasts
liquidWide = spring 210 / 30 / 0.95     // sidebar width, travelling controls
```

| Interaction | Treatment |
|---|---|
| Hover | colour only, `dur.hover` |
| Press | `scale .86–.99`, `dur.press` |
| Row reveal | **opacity only — the slot is always reserved** |
| Accordion | `height: auto` on `liquid` |
| Panel open | opacity + 10px rise, `liquid` |
| View swap | opacity + 14px slide, direction follows the drill |
| Sidebar collapse | width + content translate, `liquidWide` |
| Travelling control | shared `layoutId` — one element moves |
| Thinking | 1.6s linear gradient sweep through the text |
| Skeleton | 1.3s sweep across `--elevated` bars |

**No bouncy easing.** Everything decelerates into place.

**`prefers-reduced-motion`** flattens transitions to 0.001ms and stills every
shimmer.

**Do not animate a list on filter or page change.** `layout` plus
`AnimatePresence` makes rows reflow and drags the pager around. Content swaps in
place.

**Loading is for fetching, not for filtering.** A skeleton appears when a page
opens. Filtering, searching and paging are local — they switch instantly.

---

## 10. Behaviour

1. **Nothing appears from nowhere.** A control that moves keeps its identity via
   `layoutId`.
2. **Reserve the slot.** Hover-revealed icons hold their space at `opacity 0`, so
   text never reflows and truncation never shifts mid-hover.
3. **One panel at a time.** Opening the model picker closes Add to Chat, and the
   reverse.
4. **Touch shows everything.** No hover means no hidden affordances — actions are
   permanently visible on mobile, and rows drop what they can't afford to show.
5. **Spacing is constant across states.** Collapsing the sidebar must not shrink
   or reflow its contents.
6. **Drag highlights on enter**, holds until the drag ends, and uses the hover
   treatment — never an accent outline. Clear it with one global `dragend`.
7. **Controls are not drag handles.** A row's buttons disarm the row's own
   `draggable` while the pointer is over them.
8. **Facts aren't draggable.** A chat can be dragged into a folder, but not into
   a different date group — the date records when it happened.
9. **Destructive is recoverable.** Delete removes immediately and offers Undo,
   rather than asking first.
10. **Empty states name the cause.** "Nothing matches X" says which filter is
    narrowing it and offers to clear search *and* filters in one action.
11. **Copy actually copies.** `navigator.clipboard` with a `textarea` fallback —
    a plain `http://localhost` preview is not always a secure context.
12. **Pagination only when it's needed.** Page size is measured from the
    viewport; if everything fits there is no pager at all. Mobile scrolls instead.

---

## 11. Icons

**One stroke family** — 1.5px, 24-unit grid, `currentColor`, no fills except
where state demands it. 48 in the set:

`mail lock eye eyeoff check google panel user search plus bookmark users dots
dotsH chevD chevL chevR x menu funnel sort building books memory memoff folder
moveto archive duplicate pin alert code download edit copy trash thumbUp
thumbDown share fork gear mic send clip image temp servers wave`

| Context | Size |
|---|---|
| Row and button glyphs | 13–15 |
| Nav, dialog headers, toasts | 16–17 |
| Top bar, tiles | 19–21 |

**State is carried by fill, not by a second glyph.** A pin is filled when pinned
and outline when not; hovering a filled one hollows it to preview the unpin. The
same goes for 👍 / 👎 / bookmark. A slashed or rotated variant was tried and
rejected — one shape, two fills.

**Overflow menus are horizontal (`dotsH`)** everywhere except the sidebar's
"More" nav item, which keeps the vertical `dots`.

---

## 12. Layout

**Desktop.** Sidebar 280 (126 collapsed) · thread and composer capped at 768 and
centred · top bar 56 · page padding `34px 40px 60px`.

**Mobile** (`max-width: 720px`, one source of truth: `useIsMobile()`).

| | |
|---|---|
| Top bar | 56 tall with a **14px inset above it**, so the collapse mark clears the screen edge |
| Content gap | 6–16px below the bar — the room goes *above* the bar, not below |
| Drawer | `calc(100vw - 76px)` — a constant 76px strip stays visible |
| Drawer corners | `0 16px 0 16px` |
| Collapse mark | 16px off the drawer's edge, level with `nash:` |
| Gutters | 12–16px; message content 24px |
| Model picker | 52vh panel above the composer |

**The drawer's own width is CSS, not animation.** Animate `x` as a percentage so
the width can track the viewport.

---

## 13. Drift — fix before extending

Measured against the shipped CSS. These are places the app contradicts this
document.

**Hardcoded colour in `auth.css`.** `#f6f6f7` ×12, `#0f1115` ×8, `#a8abb1` ×5,
`#635bff` ×3, `#0a0c10` ×2, plus `rgba(255,255,255,.04)` fills. Auth predates the
token file and was never migrated. It should read `--t1`, `--t2`, `--accent`,
`--surface`.

**Radius sprawl.** Sixteen distinct values against three tokens — 3, 4, 5, 6, 7,
9, 11, 17, 18 all appear with no rule behind them.

**Control heights.** 22, 26, 28, 30, 32, 34, 40, 42, 44, 46, 56. There is no
ladder; each was chosen locally.

**Type scale.** Seventeen sizes between 10.5 and 30. 12.5 (×29) and 13.5 (×22)
carry the app; several others appear once.

**Proposed consolidation** — worth one focused pass:

- Controls → **28 / 34 / 40 / 48**
- Radii → **8 / 12 / 16 / round**
- Type → **11 / 12.5 / 13.5 / 16 / 20 / 30**
- Migrate `auth.css` onto tokens

---

## 14. Adding a screen

The order that has worked, and the checks that catch what eyes miss:

1. **Flow first.** Map entry points, happy path, create/edit, and every edge case
   on the Ideations page before drawing a screen. Edge cases are where the rules
   above get exercised.
2. **Structure, then state.** Page header → search → filters → list → pagination.
   Every screen so far shares that spine.
3. **Empty, loading, error, and "too many" are not extras.** Build them with the
   happy path, not after it.
4. **Desktop and mobile together.** Every change lands on both; a mobile pass
   done later always finds hover-dependent affordances that don't work.
5. **Measure the result.** Font sizes, gaps and positions get verified by reading
   them back from the rendered page, not by looking. Several bugs in this app —
   a 5px chevron offset, a compressed top bar, a list that shrank instead of
   scrolling — were invisible and only showed up in measurements.
