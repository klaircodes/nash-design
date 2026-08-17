# Nash — design rules

The rulebook. Every value here is taken from the shipped code, and every rule is
one the app already follows somewhere. When a new screen is built, it inherits
from this document rather than inventing its own answer.

Two things to know before reading:

- **Dark is the default.** Light is a complete theme, switched in Settings.
- **§14 is the drift list** — where the app currently breaks its own rules. Fix
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

### Spacing

**Everything sits on a 4px scale.** `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40`. A gap
of 9, 15 or 30 is a bug, not a variant.

| Gap | Between |
|---|---|
| **4** | a label and the value directly under it |
| **8** | icon and its text; items in a row |
| **12** | rows in a list; blocks in a message |
| **16** | a card's padding; groups within a card |
| **20–24** | sections of a page |
| **32–40** | major regions |

**Inside a card**, the rhythm is fixed and the same in every card:

```
┌─ padding 16 ─────────────────────────┐
│  icon 8 title                    ⋯   │
│            ↕ 12                      │
│  description                         │
│            ↕ 12                      │
│  derived row — 8 saved · Updated 2d  │
└──────────────────────────────────────┘
```

Three rules make it hold:

1. **The gap belongs to the container, not the content.** Set one `gap` on the
   card's auto-layout; never add margins to individual children. Uneven gaps in
   a card are almost always a child carrying its own margin on top of the gap.
2. **Empty content collapses.** A card with no description is *shorter* — it does
   not hold an empty slot open. A gap that stays when the thing it separates is
   gone reads as broken alignment. (And per §10.13 a description is generated on
   creation, so "No description yet" should not be reachable at all.)
3. **A derived row is never padded away from the card's edge differently to the
   rest.** It is one more child at the same 12px gap, not a footer pinned to the
   bottom — otherwise short cards stretch to give it somewhere to sit.

**Cards in a grid are sized by content, not stretched to match.** If two cards
in a row must be the same height, the shorter one is padded by the grid, never
by inventing space inside it.

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
| Collapse / expand | `height: auto` on `liquid` — **see below** |
| Panel open | opacity + 10px rise, `liquid` |
| View swap | opacity + 14px slide, direction follows the drill |
| Sidebar collapse | width + content translate, `liquidWide` |
| Travelling control | shared `layoutId` — one element moves |
| Thinking | 1.6s linear gradient sweep through the text |
| Skeleton | 1.3s sweep across `--elevated` bars |

### Collapse and expand

**Nothing opens or closes instantly.** Every disclosure in the app animates its
height, on `liquid`, with the chevron or mark rotating over `dur.swap`. This
covers, without exception:

| What | Opens |
|---|---|
| Sidebar sections — Chats, Folders | `height: auto`, chevron rotates |
| A folder's chats | `height: auto`, chevron rotates |
| Composer tools / Add to Chat | `height: auto`, `+` morphs to `−` |
| Model picker panel | `height: auto` into a fixed 52vh frame |
| Document block in a reply | `height: auto`, chevron rotates −90° |
| New-folder draft row | `height: 0 → 34` |
| Show more on a long message | `maxHeight` to the measured 7-line cap |
| Sidebar collapse | width + content translate on `liquidWide` |
| Menus and flyouts | opacity + 6px rise, `dur.swap` |

**Rules for all of them:**

1. **Animate to `auto`, not to a guessed pixel height.** Motion measures the
   content; a hardcoded height is wrong the moment the content changes.
2. **The parent that animates height needs `overflow: hidden`.** Without it the
   content spills during the transition.
3. **Height and opacity get different timings** — `{ height: liquid, opacity:
   { duration: 0.2, ease } }`. Opacity finishing first stops the content
   ghosting through the closing edge.
4. **The affordance moves with it.** A chevron rotates 180°, a `+` morphs to a
   `−`, a document's chevron turns −90°. The control never swaps for a second
   icon.
5. **Closing is animated too.** Both directions run through `AnimatePresence`
   with a real `exit` — an element that fades in and then vanishes on close is
   half-built.
6. **Fixed frames animate their content, not themselves.** A panel with a set
   height expands into that frame; the frame itself never resizes around what's
   inside it.
7. **No overshoot.** `liquid` is damped to settle, not to bounce. Nothing about
   opening a folder should spring past its resting height.

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
4. **The composer is closed unless you opened it.** It rests as the single input
   row. Sending, starting a new chat, opening a chat from the sidebar, and
   opening the model picker all return it to that row. Nothing else may open it —
   a composer found open on arrival is a bug.
5. **Touch shows everything.** No hover means no hidden affordances — actions are
   permanently visible on mobile, and rows drop what they can't afford to show.
6. **Spacing is constant across states.** Collapsing the sidebar must not shrink
   or reflow its contents.
7. **Drag highlights on enter**, holds until the drag ends, and uses the hover
   treatment — never an accent outline. Clear it with one global `dragend`.
8. **Controls are not drag handles.** A row's buttons disarm the row's own
   `draggable` while the pointer is over them.
8. **Facts aren't draggable.** A chat can be dragged into a folder, but not into
   a different date group — the date records when it happened.
10. **Destructive is recoverable.** Delete removes immediately and offers Undo,
   rather than asking first.
11. **Empty states name the cause.** "Nothing matches X" says which filter is
    narrowing it and offers to clear search *and* filters in one action.
12. **Copy actually copies.** `navigator.clipboard` with a `textarea` fallback —
    a plain `http://localhost` preview is not always a secure context.
13. **Descriptions are written for you.** Anywhere a description is optional —
    bookmark folders first — it is generated on creation rather than left blank,
    because a field nobody fills is worse than a line nobody asked for. From that
    moment it is a normal editable value: no confirmation, no regeneration, no
    special treatment. Counts and dates stay out of it and live on their own
    derived row, where they cannot go stale.
14. **Pagination only when it's needed.** Page size is measured from the
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

## 13. Placement

Where things sit is fixed. These are not suggestions — an element that moves
between screens reads as a different element.

### Anchored to the viewport

| Element | Placement |
|---|---|
| **Toasts** | **bottom right, 24px from both edges**, stacking upward, 10px gap, `z-index 90`. Mobile: full width at a 16px inset, 16px from the bottom. Never centred, never top, never inline. |
| **Scrim** | `inset: 0`, `z-index 60` |
| **Drawer scrim** | `inset: 0`, `z-index 79`, opaque `--app` |
| **Drawer** | `top:0 bottom:0 left:0`, `z-index 80` |
| **Drawer collapse mark** | `left: var(--drawerw) + 16px`, `top: 14px` — a constant 16px off the panel's edge at any width |

### The chat column

| Element | Placement |
|---|---|
| **Composer** | **always the last thing in the column**, full width of a 768px centred column, `0 24px 28px`. Never floating, never overlapping the thread. Mobile: full width, `12px 12px 14px`. |
| **Thread** | same 768px centred column, `8px 24px 20px`. Scrolls; the composer does not move with it. |
| **Top bar** | 56px, first in the column. Mobile keeps 56 with a **14px inset above it**. |
| **Greeting** | centred in the space between top bar and composer |
| **Disclaimer** | **always** directly under the composer — 9px gap, centred, 10.5px `--t4`. Present on every breakpoint and every state; it is chrome, not a mobile extra. The wording is fixed: *"Nash can make mistakes. Please double-check responses."* |

The order is invariant: **top bar → content → panel (if open) → composer**. A
panel opens *between* the content and the composer and pushes nothing off screen.

### Flyouts from the sidebar

All measured from the **panel's** right edge, never the trigger's — the trigger
is inset, so `trigger.right` lands back on top of the sidebar.

| Menu | Width | Placement |
|---|---|---|
| **Org switcher** | 272 | `left: panel.right + 12`, `top: trigger.top - 4` |
| **More** | 206 | `left: panel.right + 12`, `top: trigger.top - 4` |
| **Chat row menu** | 206 | `left: panel.right + 10`, `top: trigger.top - 8` |
| **Move to Folder submenu** | 184 | `left: 198` off its parent, `top: -6` |

**Vertical rule.** A flyout opens **level with its trigger**, not centred on the
panel and not anchored to the top — the row you clicked stays where your eye
already is. It is then clamped to `viewport - height - 16` so it can never run
off the bottom, and only if it still does not fit does it flip above the trigger.

**Horizontal fallback.** When `panel.right + width` would exceed the viewport —
a phone, where the drawer owns most of the screen — the menu drops below the
trigger instead: `top: trigger.bottom + 8`, `left: trigger.left`. It animates
down rather than sideways in that case, so the direction matches the placement.

**All are `position: fixed`**, because the sidebar clips its own overflow for the
collapse animation. An absolutely-positioned menu is cut off at the panel edge.

**Dismissal is the same for all of them:** outside click, Escape, or the sidebar
scrolling — a fixed menu cannot track a trigger that has scrolled away.

### Menus inside a panel

| Menu | Placement |
|---|---|
| **Sort** | `top: 38` under the filter bar, `right: 18` (0 in a search row, 12 on mobile) |
| **Target picker** | `left: 0; right: 0` — fills its field — `top: 46`, `max-height: 212` then scrolls |
| **Submenu** | `left: 198` off its parent menu, `top: -6` |

### Panels and dialogs

| Element | Size and placement |
|---|---|
| **Model picker (desktop)** | 472 wide, `min(620px, 82vh)` tall, centred over the scrim |
| **Model picker (mobile)** | full width, **52vh, fixed**, sitting directly above the composer |
| **Memory dialog** | 520 wide, centred. Mobile: centred with a 16px side inset, `max-height: calc(100vh - 48px)` |
| **Add to Chat** | above the composer, inside the composer's gutter |

**A panel height never derives from its content.** Three results and thirty open
to the same box.

### The sidebar

| | |
|---|---|
| Width | **280** expanded · **126** collapsed |
| Mobile drawer | `calc(100vw - 76px)` — a constant 76px strip stays visible |
| Brand row | fixed at the top, never scrolls |
| Footer — user row and version | **pinned to the bottom at all times** |
| Everything between | one scrolling region |

### Page chrome

| | Desktop | Mobile |
|---|---|---|
| Page padding | `34px 40px 60px` | `6px 16px 44px` |
| Page header | top left; primary action top right | stacked, action full width |
| Search row | directly under the header | same |
| Filters | directly under search | scrolling strip |
| Pagination | bottom left of the list | none — the list scrolls |

### Containers and loose items

A page that has both — Bookmarks first, but the same holds anywhere — lists them
in one order:

```
Folders · 3          ← containers, as cards
  [ … ]  [ … ]  [ … ]

Unsorted · 4         ← only what is not in a folder
  [ … ]
  [ … ]
```

**Folders first, unsorted beneath.** The unsorted section holds **only items that
are not in a folder** — a bookmark already filed appears inside its folder and
nowhere else. An item listed in both places makes the count meaningless and makes
filing feel like it did nothing.

Its heading is **"Unsorted"**, not "Responses" or "All" — the word has to say why
those items are there rather than describing what they are.

**The two sections are laid out differently, on purpose.** Folders are cards in
a grid, each sized to its content (~400 wide). Unsorted bookmarks are
**full-width rows spanning the whole content column** — they sit outside the
folder grid entirely, never indented under it, never constrained to a card's
width. The change in shape is what tells you one group is containers and the
other is items; two identical stacks would read as one list with a label in the
middle.

A row carries a **folder chip only when it is filed** — which means a row in the
Unsorted section never has one. A chip on an unsorted item is a contradiction:
it says the thing is in a folder while sitting in the list of things that are not.

**Either section disappears when it is empty** — neither gets a placeholder.

- No folders yet → **no Folders heading at all**, just the bookmarks, unlabelled.
  A lone "Unsorted" heading over the only list on the page is a distinction with
  nothing to distinguish from. The heading returns the moment a first folder
  exists.
- Nothing unfiled → no Unsorted section; the folders above are already the answer.
- Neither → the page-level empty state, not two empty sections.

---

## 14. Drift — fix before extending

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

## 15. Adding a screen

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
