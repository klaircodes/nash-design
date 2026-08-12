import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ease, dur, liquid } from '../lib/motion.js';

/* Long messages collapse to a fixed number of lines with a Show all toggle.
   Whether it *needs* the toggle is measured after layout rather than guessed
   from character count — the same text wraps differently on a phone. */
export default function Message({ role, text }) {
  const [open, setOpen] = useState(false);
  const [long, setLong] = useState(false);
  const body = useRef(null);

  useLayoutEffect(() => {
    const el = body.current;
    if (!el) return;
    const check = () => setLong(el.scrollHeight - el.clientHeight > 4);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text]);

  return (
    <motion.div className={`msg ${role}`}
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease }}>
      <div className="bubble">
        <motion.div ref={body} className={`mtext ${open ? 'all' : ''}`}
          animate={{ maxHeight: open ? 4000 : 132 }}
          transition={{ duration: dur.move, ease }}>
          {text}
        </motion.div>

        <AnimatePresence initial={false}>
          {(long || open) && (
            <motion.button className="showall" onClick={() => setOpen(v => !v)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: dur.hover, ease }}>
              {open ? 'Show less' : 'Show all'}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
