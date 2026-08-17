/* ============================================================
   One motion vocabulary, used everywhere. No spring overshoot —
   everything decelerates into place.
   ============================================================ */
export const ease = [0.16, 1, 0.3, 1];
export const easeInOut = [0.65, 0, 0.35, 1];

export const dur = {
  press: 0.09,
  hover: 0.16,
  swap:  0.26,
  move:  0.38,
  page:  0.42,
};

/* a soft, liquid expand — used by the composer and sidebar sections */
export const liquid = { type: 'spring', stiffness: 260, damping: 32, mass: 0.9 };

/* slightly softer, for larger moves like the sidebar width */
export const liquidWide = { type: 'spring', stiffness: 210, damping: 30, mass: 0.95 };

export const fadeUp = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: 4 },
  transition: { duration: dur.swap, ease },
};

/* ---------- popups ----------
   Three shapes, and nothing declares its own. A menu drops from the control
   that opened it; a dialog rises into the middle; a scrim only fades. All of
   them animate closed as well as open. */

/* menus, dropdowns, flyouts — fall 6px from their trigger */
export const popMenu = {
  initial: { opacity: 0, y: -6, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit:    { opacity: 0, y: -6, scale: 0.98 },
  transition: { duration: 0.18, ease },
};

/* a flyout beside a panel arrives from the edge it opened against */
export const popSide = {
  initial: { opacity: 0, x: -10, scale: 0.98 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit:    { opacity: 0, x: -8, scale: 0.98 },
  transition: liquid,
};

/* dialogs, sheets and panels — rise into place on the spring */
export const popDialog = {
  initial: { opacity: 0, y: 10, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit:    { opacity: 0, y: 8, scale: 0.99 },
  transition: liquid,
};

/* the scrim behind them never moves */
export const popScrim = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
  transition: { duration: 0.18, ease },
};

export const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
  transition: { duration: 0.18, ease },
};
