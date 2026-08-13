import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from './Icon.jsx';
import { ease, dur } from '../lib/motion.js';
import copyText from '../lib/copy.js';

const ACTIONS = [
  { icon:'copy',      label:'Copy' },
  { icon:'thumbUp',   label:'Good response' },
  { icon:'thumbDown', label:'Bad response' },
  { icon:'fork',      label:'Fork conversation' },
  { icon:'bookmark',  label:'Bookmark' },
  { icon:'share',     label:'Share' },
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

function CodeBlock({ lang, v, onNotify }) {
  const copy = async () => onNotify?.(await copyText(v) ? 'Code copied' : 'Could not copy');
  return (
    <div className="codeblock">
      {lang && (
        <div className="cbhead">
          <span className="lang">{lang}</span>
          <button title="Copy" aria-label="Copy code" onClick={copy}><Icon name="copy" size={15} /></button>
          <button title="Download" aria-label="Download code"><Icon name="download" size={15} /></button>
        </div>
      )}
      <pre><code>{v}</code></pre>
    </div>
  );
}

function FileCard({ name, meta }) {
  return (
    <div className="filecard">
      <b>{name}</b>
      <small>{meta}</small>
    </div>
  );
}

/* a titled document the reply produced — collapsible, with its own actions */
function DocBlock({ title, v, onNotify }) {
  const [open, setOpen] = useState(true);
  const copy = async () =>
    onNotify?.(await copyText(v.join('\n\n')) ? 'Copied' : 'Could not copy');
  return (
    <div className="doc">
      <div className="dochead">
        <span className="t">{title}</span>
        <button title="Edit" aria-label="Edit"><Icon name="edit" size={15} /></button>
        <button title="Copy" aria-label="Copy" onClick={copy}><Icon name="copy" size={15} /></button>
        <button title="Download" aria-label="Download"><Icon name="download" size={15} /></button>
        <motion.button onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Collapse' : 'Expand'}
          animate={{ rotate: open ? 0 : -90 }} transition={{ duration: dur.swap, ease }}>
          <Icon name="chevD" size={15} />
        </motion.button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div className="docbody" key="b"
            initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }}
            exit={{ height:0, opacity:0 }} transition={{ duration: dur.move, ease }}
            style={{ overflow:'hidden' }}>
            <div className="docin">
              {v.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* no real asset — the frontend never loads one, so this is the frame it would
   arrive in, holding its aspect ratio at any width */
function ImageBlock({ ratio = '3 / 2' }) {
  return <div className="imgblock" style={{ aspectRatio: ratio }} />;
}

function Table({ head, rows }) {
  return (
    <div className="tablewrap">
      <table className="btable">
        <thead><tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* a file the reply produced, offered for download */
function ResultFile({ name, meta }) {
  return (
    <div className="resultfile">
      <span className="ic"><Icon name="code" size={15} /></span>
      <div className="t"><b>{name}</b><small>{meta}</small></div>
      <motion.button className="dl"
        whileHover={{ backgroundColor:'var(--border)', color:'var(--t1)' }}
        whileTap={{ scale: 0.97 }} transition={{ duration: dur.hover, ease }}>
        Download
      </motion.button>
    </div>
  );
}

function ErrorBlock({ v }) {
  return (
    <div className="errblock">
      <Icon name="alert" size={17} />
      <p>{v}</p>
    </div>
  );
}

function Blocks({ blocks, onNotify }) {
  return blocks.map((b, i) => {
    if (b.t === 'code')  return <CodeBlock key={i} lang={b.lang} v={b.v} onNotify={onNotify} />;
    if (b.t === 'file')  return <FileCard key={i} name={b.name} meta={b.meta} />;
    if (b.t === 'img')   return <ImageBlock key={i} ratio={b.ratio} />;
    if (b.t === 'table') return <Table key={i} head={b.head} rows={b.rows} />;
    if (b.t === 'dl')    return <ResultFile key={i} name={b.name} meta={b.meta} />;
    if (b.t === 'error') return <ErrorBlock key={i} v={b.v} />;
    if (b.t === 'doc')   return <DocBlock key={i} title={b.title} v={b.v} onNotify={onNotify} />;
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

export default function Message({ role, text, blocks, model, mobile, failed, pending,
                                  onNotify, onFork }) {
  const [vote, setVote]   = useState(null);   // 'up' | 'down' | null
  const [saved, setSaved] = useState(false);
  /* what a reader would actually want on the clipboard */
  const plain = () => text || (blocks || []).map(b =>
    Array.isArray(b.v) ? b.v.flat(2).join('\n') : (b.v || b.title || b.name || '')).join('\n\n');
  const copyMsg   = async () => onNotify?.(await copyText(plain()) ? 'Copied' : 'Could not copy');
  const shareMsg  = async () =>
    onNotify?.(await copyText(`https://nash.chat/s/${Math.abs(plain().length * 7919).toString(36)}`)
      ? 'Link copied' : 'Could not copy', 'share');
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

  if (pending) return (
    <motion.div className="msg bot"
      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease }}>
      <div className="thinking">{pending}…</div>
    </motion.div>
  );

  return (
    <motion.div className={`msg ${role}`}
      onHoverStart={() => setHover(true)} onHoverEnd={() => setHover(false)}
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease }}>
      <div className="bubble">
        {role === 'bot' && model && (
          <div className="who">{model}{failed && <span className="fail"> · Failed</span>}</div>
        )}

        <motion.div ref={body}
          className={`mtext ${clampable && long && !open ? 'clamped' : ''}`}
          animate={{ maxHeight: !clampable || open || !long ? 6000 : maxH }}
          transition={{ duration: dur.move, ease }}>
          {blocks ? <Blocks blocks={blocks} onNotify={onNotify} /> : text}
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
        {role === 'bot' && !failed && (
          <motion.div className="acts"
            /* touch has no hover, so on a phone they simply stay put */
            animate={{ opacity: hover || mobile ? 1 : 0 }}
            style={{ pointerEvents: hover || mobile ? 'auto' : 'none' }}
            transition={{ duration: dur.hover, ease }}>
            {ACTIONS.map(a => (
              <motion.button key={a.icon} title={a.label} aria-label={a.label}
                className={`act ${
                  (a.icon === 'thumbUp'   && vote === 'up')   ||
                  (a.icon === 'thumbDown' && vote === 'down') ||
                  (a.icon === 'bookmark'  && saved) ? 'on' : ''}`}
                onClick={() => {
                  if (a.icon === 'copy')      return copyMsg();
                  if (a.icon === 'share')     return shareMsg();
                  if (a.icon === 'thumbUp')   {
                    const next = vote === 'up' ? null : 'up';
                    setVote(next);
                    return onNotify?.(next ? 'Thanks — marked helpful' : 'Rating removed', 'thumbUp');
                  }
                  if (a.icon === 'thumbDown') {
                    const next = vote === 'down' ? null : 'down';
                    setVote(next);
                    return onNotify?.(next ? 'Thanks — marked unhelpful' : 'Rating removed', 'thumbDown');
                  }
                  if (a.icon === 'bookmark')  {
                    setSaved(v => !v);
                    return onNotify?.(saved ? 'Bookmark removed' : 'Bookmarked', 'bookmark');
                  }
                  if (a.icon === 'fork')      return onFork?.();
                }}
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
              onClick={a.icon === 'copy' ? copyMsg : a.icon === 'share' ? shareMsg : undefined}
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
