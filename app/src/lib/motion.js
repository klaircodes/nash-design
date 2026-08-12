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

export const fadeUp = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: 4 },
  transition: { duration: dur.swap, ease },
};

export const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
  transition: { duration: 0.18, ease },
};
