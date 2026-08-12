import { useState, useMemo, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from '../components/Icon.jsx';
import { ease, dur, liquid, liquidWide } from '../lib/motion.js';
import { MEMORIES, MEM_SCOPES, fmtMemDate } from '../lib/data.js';
import '../styles/memories.css';

const FILTERS = ['All', ...MEM_SCOPES];

function Toggle({ on, onChange, label }) {
  return (
    <button className={`toggle ${on ? 'on' : ''}`} onClick={() => onChange(!on)}
      role="switch" aria-checked={on} aria-label={label}>
      <motion.span className="knob" layout transition={liquid} />
    </button>
  );
}

/* Add and Edit are the same sheet — one is prefilled. */
function MemoryDialog({ open, draft, onSave, onClose }) {
  const [text, setText]   = useState('');
  const [scope, setScope] = useState('Global');

  useEffect(() => {
    if (!open) return;
    setText(draft?.text || '');
    setScope(draft?.scope || 'Global');
  }, [open, draft]);

  useEffect(() => {
    if (!open) return;
    const key = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [open, onClose]);

  if (!open) return null;
  const ready = text.trim().length > 0;

  return (
    <motion.div className="scrim" onClick={onClose}
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      transition={{ duration:0.18, ease }}>
      <motion.div className="memdialog" onClick={e => e.stopPropagation()}
        initial={{ opacity:0, y:10, scale:.99 }} animate={{ opacity:1, y:0, scale:1 }}
        exit={{ opacity:0, y:8, scale:.99 }} transition={liquid}>
        <div className="mhead">
          <div className="tt"><h3>{draft ? 'Edit memory' : 'Add memory'}</h3></div>
          <motion.button className="iconbtn" onClick={onClose} aria-label="Close"
            whileHover={{ backgroundColor:'var(--hover)', color:'var(--t1)' }}>
            <Icon name="x" size={16} />
          </motion.button>
        </div>

        <div className="memform">
          <label className="fl">Memory</label>
          <textarea autoFocus rows={4} value={text} placeholder="What should Nash remember?"
            onChange={e => setText(e.target.value)} />
          <div className="counter">{text.trim().length} characters</div>

          <label className="fl">Scope</label>
          <div className="filters">
            {MEM_SCOPES.map(s => (
              <motion.button key={s} className={`fpill ${scope === s ? 'on' : ''}`}
                onClick={() => setScope(s)} whileTap={{ scale: 0.97 }}
                transition={{ duration: dur.hover, ease }}>
                {s}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="memfoot">
          <button className="ghost" onClick={onClose}>Cancel</button>
          <motion.button className="primary sm" disabled={!ready}
            onClick={() => ready && onSave({ text: text.trim(), scope })}
            whileTap={ready ? { scale: 0.98 } : {}}>
            {draft ? 'Save changes' : 'Add memory'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Row({ m, mobile, onEdit, onDelete }) {
  const [hover, setHover] = useState(false);
  const [menu, setMenu]   = useState(false);
  const show = hover || mobile || menu;

  return (
    <motion.div className="memrow"
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => { setHover(false); setMenu(false); }}
      layout
      initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, scale:.98 }}
      transition={{ layout: liquid, duration: dur.swap, ease }}>
      <div className="memmeta">
        <span>{m.tokens} tokens</span>
        <i>·</i>
        <span>{fmtMemDate(m.date)}</span>
        <i>·</i>
        <span className={`scope ${m.scope.toLowerCase()}`}>{m.scope}</span>
        <i>·</i>
        <span className="from">From: {m.from}</span>

        <div className="memacts">
          <motion.button aria-label="Edit" onClick={() => onEdit(m)}
            animate={{ opacity: show ? 1 : 0 }}
            style={{ pointerEvents: show ? 'auto' : 'none' }}
            whileHover={{ color:'var(--t1)', backgroundColor:'var(--surface)' }}
            whileTap={{ scale: 0.9 }} transition={{ duration: dur.hover, ease }}>
            <Icon name="edit" size={15} />
          </motion.button>
          <motion.button aria-label="Delete" onClick={() => onDelete(m)}
            animate={{ opacity: show ? 1 : 0 }}
            style={{ pointerEvents: show ? 'auto' : 'none' }}
            whileHover={{ color:'var(--err)', backgroundColor:'var(--surface)' }}
            whileTap={{ scale: 0.9 }} transition={{ duration: dur.hover, ease }}>
            <Icon name="trash" size={15} />
          </motion.button>
          <div className="more">
            <motion.button aria-label="More" onClick={() => setMenu(v => !v)}
              animate={{ opacity: show ? 1 : 0 }}
              style={{ pointerEvents: show ? 'auto' : 'none' }}
              whileHover={{ color:'var(--t1)', backgroundColor:'var(--surface)' }}
              whileTap={{ scale: 0.9 }} transition={{ duration: dur.hover, ease }}>
              <Icon name="dotsH" size={15} />
            </motion.button>
            <AnimatePresence>
              {menu && (
                <motion.div className="sortmenu memmenu"
                  initial={{ opacity:0, y:-6, scale:.98 }} animate={{ opacity:1, y:0, scale:1 }}
                  exit={{ opacity:0, y:-6, scale:.98 }} transition={{ duration:0.18, ease }}>
                  <button className="sortrow" onClick={() => { setMenu(false); onEdit(m); }}>
                    <Icon name="edit" size={14} /> Edit
                  </button>
                  <button className="sortrow" onClick={() => setMenu(false)}>
                    <Icon name="copy" size={14} /> Copy text
                  </button>
                  <button className="sortrow" onClick={() => setMenu(false)}>
                    <Icon name="temp" size={14} /> Open source chat
                  </button>
                  <button className="sortrow danger"
                    onClick={() => { setMenu(false); onDelete(m); }}>
                    <Icon name="trash" size={14} /> Delete
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p className="memtext">{m.text}</p>
    </motion.div>
  );
}

export default function Memories({ mobile, drawer, onMenu }) {
  const [list, setList]     = useState(MEMORIES);
  const [use, setUse]       = useState(true);
  const [query, setQuery]   = useState('');
  const [filter, setFilter] = useState('All');
  const [page, setPage]     = useState(1);
  const [dialog, setDialog] = useState(null);   // null | {} | memory
  const [undo, setUndo]     = useState(null);

  /* Page size follows the viewport: fit as many rows as there is room for, and
     if the whole list fits there is nothing to page through. */
  const host = useRef(null);
  const listTop = useRef(null);
  const [perPage, setPerPage] = useState(4);

  useLayoutEffect(() => {
    const el = host.current;
    if (!el) return;
    const measure = () => {
      const anchor = listTop.current;
      if (!anchor) return;
      const room = el.clientHeight - (anchor.offsetTop - el.scrollTop) - 84;
      const row = anchor.querySelector('.memrow')?.offsetHeight || 92;
      setPerPage(Math.max(1, Math.floor(room / (row + 12))));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [use, filter, query]);

  const q = query.trim().toLowerCase();
  const shown = useMemo(() => list.filter(m =>
    (filter === 'All' || m.scope === filter) &&
    (!q || m.text.toLowerCase().includes(q) || m.from.toLowerCase().includes(q))
  ), [list, filter, q]);

  const pages = Math.max(1, Math.ceil(shown.length / perPage));
  /* deleting the last row on the last page must not strand you on an empty one */
  useEffect(() => { if (page > pages) setPage(pages); }, [pages, page]);
  useEffect(() => { setPage(1); }, [q, filter]);

  const slice = shown.slice((page - 1) * perPage, page * perPage);

  const save = data => {
    if (dialog && dialog.id) {
      setList(l => l.map(m => (m.id === dialog.id ? { ...m, ...data } : m)));
    } else {
      setList(l => [{
        id: `m${Date.now()}`, tokens: Math.max(6, Math.round(data.text.length / 5)),
        date: new Date().toISOString().slice(0, 10), from: 'Added manually', ...data,
      }, ...l]);
      setPage(1);
    }
    setDialog(null);
  };

  const remove = m => {
    setList(l => l.filter(x => x.id !== m.id));
    setUndo(m);
  };
  useEffect(() => {
    if (!undo) return;
    const t = setTimeout(() => setUndo(null), 5000);
    return () => clearTimeout(t);
  }, [undo]);

  const clearAll = () => { setQuery(''); setFilter('All'); };

  return (
    <div className="main">
      {mobile && (
        <div className="topbar">
          {!drawer && (
            <motion.button className="menu" layoutId="sbtoggle" onClick={onMenu}
              aria-label="Open sidebar" whileTap={{ scale: 0.9 }} transition={liquidWide}>
              <Icon name="panel" size={19} />
            </motion.button>
          )}
          <button className="more"><Icon name="dotsH" size={18} /></button>
        </div>
      )}

      <div className="page" ref={host}>
        <div className="pagehead">
          <div className="pt">
            <h1>Memories</h1>
            <p>Manage what Nash remembers across chats.</p>
          </div>
          <motion.button className="primary sm" onClick={() => setDialog({})}
            whileTap={{ scale: 0.98 }} transition={{ duration: dur.press, ease }}>
            <Icon name="plus" size={15} /> Add memory
          </motion.button>
        </div>

        <div className="searchrow">
          <div className="msearch">
            <Icon name="search" size={15} />
            <input value={query} placeholder="Search memories..."
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Escape' && setQuery('')} />
            {query && (
              <button className="clear" onClick={() => setQuery('')} aria-label="Clear search">
                <Icon name="x" size={14} />
              </button>
            )}
          </div>
          <motion.button className="iconbtn boxed" aria-label="Export memories"
            whileHover={{ backgroundColor:'var(--hover)', color:'var(--t1)' }}
            whileTap={{ scale: 0.95 }} transition={{ duration: dur.hover, ease }}>
            <Icon name="share" size={16} />
          </motion.button>
        </div>

        <div className="userow">
          <div className="ut">
            <b>Use memory</b>
            <small>Allow Nash to use saved memories in future responses.</small>
          </div>
          <Toggle on={use} onChange={setUse} label="Use memory" />
        </div>

        <div className="filters memfilters">
          {FILTERS.map(f => {
            const n = f === 'All' ? list.length : list.filter(m => m.scope === f).length;
            return (
              <motion.button key={f} className={`fpill ${filter === f ? 'on' : ''}`}
                onClick={() => setFilter(f)} whileTap={{ scale: 0.97 }}
                transition={{ duration: dur.hover, ease }}>
                {f}<span className="n">{n}</span>
              </motion.button>
            );
          })}
        </div>

        {/* the list stays readable when memory is off, but says it is inert */}
        <AnimatePresence initial={false}>
          {!use && (
            <motion.div className="notice" key="off"
              initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }}
              exit={{ height:0, opacity:0 }} transition={{ duration: dur.swap, ease }}>
              <Icon name="alert" size={15} />
              <p>Memory is off. These are kept, but Nash will not use them in replies.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className={`memlist ${use ? '' : 'muted'}`} ref={listTop}
          layout transition={liquid}>
          <AnimatePresence mode="popLayout" initial={false}>
            {slice.map(m => (
              <Row key={m.id} m={m} mobile={mobile}
                onEdit={setDialog} onDelete={remove} />
            ))}
          </AnimatePresence>

          {shown.length === 0 && (
            <div className="memempty">
              {list.length === 0 ? (<>
                <b>No memories yet</b>
                <p>Nash saves things worth remembering as you chat, or you can add one yourself.</p>
                <button onClick={() => setDialog({})}>Add your first memory</button>
              </>) : (<>
                <b>Nothing matches{q ? ` “${query.trim()}”` : ''}</b>
                <p>{filter !== 'All'
                  ? <>The <b>{filter}</b> filter is narrowing this down.</>
                  : 'Try a shorter search.'}</p>
                <button onClick={clearAll}>Clear search and filters</button>
              </>)}
            </div>
          )}
        </motion.div>

        {pages > 1 && (
          <div className="pager">
            <button className="pg" disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}>
              <Icon name="chevL" size={14} /> Prev
            </button>
            <span className="count">{page} / {pages}</span>
            <button className="pg" disabled={page === pages}
              onClick={() => setPage(p => Math.min(pages, p + 1))}>
              Next <Icon name="chevR" size={14} />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {undo && (
          <motion.div className="toast"
            initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:8 }} transition={liquid}>
            <span>Memory deleted</span>
            <button onClick={() => { setList(l => [undo, ...l]); setUndo(null); }}>Undo</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {dialog && (
          <MemoryDialog open draft={dialog.id ? dialog : null}
            onSave={save} onClose={() => setDialog(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
