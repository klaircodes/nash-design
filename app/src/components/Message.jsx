import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from './Icon.jsx';
import { ease, dur } from '../lib/motion.js';

const ACTIONS = [
  { icon:'copy',     label:'Copy' },
  { icon:'thumbUp',  label:'Good response' },
  { icon:'thumbDown',label:'Bad response' },
  { icon:'bookmark', label:'Bookmark' },
  { icon:'share',    label:'Share' },
];

const MY_ACTIONS = [
  { icon:'copy',  label:'Copy' },
  { icon:'share', label:'Share' },
  { icon:'edit',  label:'Edit' },
];

const CLAMP_LINES = 7;

/* Only what you sent collapses — a reply is always shown in full. The cut-off
   is measured from the real line height so it lands on line 7 at any font size,
   and short messages never grow a toggle they don't need. */
/* `**bold**` and `\`code\`` are the only inline markers the canned threads use */
function inline(str) {
  return str.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean).map((piece, i) => {
    if (piece.startsWith('**')) return <b key={i}>{piece.slice(2, -2)}</b>;
    if (piece.startsWith('`'))  return <code key={i}>{piece.slice(1, -1)}</code>;
    return <span key={i}>{piece}</span>;
  });
}

function Blocks({ blocks }) {
  return blocks.map((b, i) => {
    if (b.t === 'h2')    return <h2 key={i} className="bh2">{b.v}</h2>;
    if (b.t === 'h3')    return <h3 key={i} className="bh3">{b.v}</h3>;
    if (b.t === 'quote') return <blockquote key={i} className="bq">{inline(b.v)}</blockquote>;
    if (b.t === 'ul')    return (
      <ul key={i} className="bul">{b.v.map((li, j) => <li key={j}>{inline(li)}</li>)}</ul>
    );
    if (b.t === 'ol')    return (
      <ol key={i} className="bol">
        {b.v.map(([lead, rest], j) => (
          <li key={j}><b>{lead}</b> — {inline(rest)}</li>
        ))}
      </ol>
    );
    return <p key={i} className="bp">{inline(b.v)}</p>;
  });
}

export default function Message({ role, text, blocks, model, mobile }) {
  const clampable = role === 'user' && !blocks;
  const [open, setOpen]   = useState(false);
  const [long, setLong]   = useState(false);
  const [maxH, setMaxH]   = useState(0);
  const [hover, setHover] = useState(false);
  const body = useRef(null);

  useLayoutEffect(() => {
    if (!clampable) return;
    const el = body.current;
    if (!el) return;
    const check = () => {
      const lh = parseFloat(getComputedStyle(el).lineHeight) || 23;
      const cap = lh * CLAMP_LINES;
      setMaxH(cap);
      setLong(el.scrollHeight > cap + 4);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text, clampable]);

  return (
    <motion.div className={`msg ${role}`}
      onHoverStart={() => setHover(true)} onHoverEnd={() => setHover(false)}
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease }}>
      <div className="bubble">
        {role === 'bot' && model && <div className="who">{model}</div>}

        <motion.div ref={body}
          className={`mtext ${clampable && long && !open ? 'clamped' : ''}`}
          animate={{ maxHeight: !clampable || open || !long ? 6000 : maxH }}
          transition={{ duration: dur.move, ease }}>
          {blocks ? <Blocks blocks={blocks} /> : text}
        </motion.div>

        <AnimatePresence initial={false}>
          {clampable && long && (
            <motion.button className="showall" onClick={() => setOpen(v => !v)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: dur.hover, ease }}>
              {open ? 'Show less' : 'Show more'}
              <motion.span className="cv"
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: dur.swap, ease }}>
                <Icon name="chevD" size={15} />
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* actions live under the reply and surface on hover */}
        {role === 'bot' && (
          <motion.div className="acts"
            /* touch has no hover, so on a phone they simply stay put */
            animate={{ opacity: hover || mobile ? 1 : 0 }}
            style={{ pointerEvents: hover || mobile ? 'auto' : 'none' }}
            transition={{ duration: dur.hover, ease }}>
            {ACTIONS.map(a => (
              <motion.button key={a.icon} className="act" title={a.label} aria-label={a.label}
                whileHover={{ color:'var(--t1)', backgroundColor:'var(--surface)' }}
                whileTap={{ scale: 0.9 }} transition={{ duration: dur.hover, ease }}>
                <Icon name={a.icon} size={15} />
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      {/* copy / share / edit sit under the bubble, not inside it */}
      {role === 'user' && (
        <motion.div className="acts mine"
          animate={{ opacity: hover || mobile ? 1 : 0 }}
          style={{ pointerEvents: hover || mobile ? 'auto' : 'none' }}
          transition={{ duration: dur.hover, ease }}>
          {MY_ACTIONS.map(a => (
            <motion.button key={a.icon} className="act" title={a.label} aria-label={a.label}
              whileHover={{ color:'var(--t1)', backgroundColor:'var(--surface)' }}
              whileTap={{ scale: 0.9 }} transition={{ duration: dur.hover, ease }}>
              <Icon name={a.icon} size={15} />
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
