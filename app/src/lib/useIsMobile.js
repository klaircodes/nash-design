import { useState, useEffect } from 'react';

export const MOBILE = '(max-width: 720px)';

/* One source of truth for the breakpoint, so the shell, the drawer and the
   flyouts all agree on when we're in the mobile layout. */
export default function useIsMobile() {
  const [is, setIs] = useState(() => window.matchMedia(MOBILE).matches);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE);
    const on = e => setIs(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return is;
}
