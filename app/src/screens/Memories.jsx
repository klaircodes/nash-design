import { useState, useMemo, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from '../components/Icon.jsx';
import { ease, dur, liquid, liquidWide, popMenu, popDialog, popScrim } from '../lib/motion.js';
import { MEMORIES, MEM_SCOPES, MEM_SCOPE_LABEL, MEM_SCOPE_TARGET,
         scopeOptions, fmtMemDate } from '../lib/data.js';
import copyText from '../lib/copy.js';
import Toast from '../components/Toast.jsx';
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

/* which folder / persona / chat the memory is scoped to */
function TargetPicker({ kind, value, onPick }) {
  const [open, setOpen] = useState(false);
  const options = scopeOptions(kind);
  const noun = kind === 'folder' ? 'folder' : kind === 'persona' ? 'persona' : 'chat';

  return (
    <div className="ddwrap target">
      <button className={`targetbtn ${open ? 'on' : ''} ${value ? '' : 'empty'}`}
        onClick={() => setOpen(v => !v)}>
        <Icon name={kind === 'folder' ? 'folder' : kind === 'persona' ? 'users' : 'temp'} size={15} />
        <span>{value || `Choose a ${noun}…`}</span>
        <motion.span style={{ display:'flex' }}
          animate={{ rotate: open ? 180 : 0 }} transition={{ duration: dur.swap, ease }}>
          <Icon name="chevD" size={14} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div className="targetmenu"
            {...popMenu}>
            {options.map(o => (
              <button key={o} className="sortrow"
                onClick={() => { onPick(o); setOpen(false); }}>
                <span>{o}</span>
                {value === o && <span className="tick"><Icon name="check" size={14} /></span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Add and Edit are the same sheet — one is prefilled. */
function MemoryDialog({ open, draft, onSave, onClose }) {
  const [text, setText]     = useState('');
  const [scope, setScope]   = useState('Global');
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (!open) return;
    setText(draft?.text || '');
    setScope(draft?.scope || 'Global');
    setTarget(draft?.target || null);
  }, [open, draft]);

  useEffect(() => {
    if (!open) return;
    const key = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [open, onClose]);

  if (!open) return null;
  const kind  = MEM_SCOPE_TARGET[scope];
  /* a scoped memory is not finished until you say what it is scoped to */
  const ready = text.trim().length > 0 && (!kind || Boolean(target));

  return (
    <motion.div className="scrim" onClick={onClose}
      {...popScrim}>
      <motion.div className="memdialog" onClick={e => e.stopPropagation()}
        {...popDialog}>
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

          <label className="fl">Applies to</label>
          <div className="filters">
            {MEM_SCOPES.map(s => (
              <motion.button key={s} className={`fpill ${scope === s ? 'on' : ''}`}
                onClick={() => { setScope(s); setTarget(null); }} whileTap={{ scale: 0.97 }}
                transition={{ duration: dur.hover, ease }}>
                {MEM_SCOPE_LABEL[s]}
              </motion.button>
            ))}
          </div>

          {kind
            ? <TargetPicker kind={kind} value={target} onPick={setTarget} />
            : <p className="scopenote">Nash will recall this in every chat.</p>}
        </div>

        <div className="memfoot">
          <button className="ghost" onClick={onClose}>Cancel</button>
          <motion.button className="primary sm" disabled={!ready}
            onClick={() => ready && onSave({ text: text.trim(), scope,
                                             target: target || 'All chats' })}
            whileTap={ready ? { scale: 0.98 } : {}}>
            {draft ? 'Save changes' : 'Add memory'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Row({ m, mobile, onEdit, onDelete, onCopy }) {
  const [hover, setHover] = useState(false);
  const show = hover || mobile;

  return (
    <motion.div className="memrow" key={m.id}
      onHoverStart={() => setHover(true)} onHoverEnd={() => setHover(false)}>
      <p className="memtext">{m.text}</p>

      <div className="memmeta">
        <span>{m.tokens} tokens</span>
        <i>·</i>
        <span>{mobile ? fmtMemDate(m.date).replace(/,.*/, '') : fmtMemDate(m.date)}</span>
        <i>·</i>
        <span className={`scope ${m.scope.toLowerCase()}`}>
          {MEM_SCOPE_LABEL[m.scope]}{m.target && m.scope !== 'Global' ? ` · ${m.target}` : ''}
        </span>
        <i>·</i>
        <span className="from">From: {m.from}</span>

        <div className="memacts">
          {[
            { icon:'edit',  label:'Edit',   run:() => onEdit(m) },
            { icon:'trash', label:'Delete', run:() => onDelete(m), danger:true },
            { icon:'copy',  label:'Copy',   run:() => onCopy(m) },
          ].map(a => (
            <motion.button key={a.icon} aria-label={a.label} onClick={a.run}
              animate={{ opacity: show ? 1 : 0 }}
              style={{ pointerEvents: show ? 'auto' : 'none' }}
              whileHover={{ color: a.danger ? 'var(--err)' : 'var(--t1)',
                            backgroundColor:'var(--elevated)' }}
              whileTap={{ scale: 0.9 }} transition={{ duration: dur.hover, ease }}>
              <Icon name={a.icon} size={15} />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Memories({ mobile, drawer, onMenu, use, onUse }) {
  const [list, setList]     = useState(MEMORIES);
  const [query, setQuery]   = useState('');
  const [filter, setFilter] = useState('All');
  const [page, setPage]     = useState(1);
  const [dialog, setDialog] = useState(null);   // null | {} | memory
  const [undo, setUndo]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [hideOff, setHideOff] = useState(false);
  const [note, setNote]       = useState(null);

  /* only opening the page fetches. Filtering and paging are local, so they
     switch instantly rather than pretending to load. */
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 560);
    return () => clearTimeout(t);
  }, []);

  /* Page size follows the viewport: fit as many rows as there is room for, and
     if the whole list fits there is nothing to page through. */
  const host = useRef(null);
  const listTop = useRef(null);
  const toastRef = useRef(null);
  const [perPage, setPerPage] = useState(4);

  useLayoutEffect(() => {
    const el = host.current;
    if (!el || mobile) return;
    /* `.page` is the offset parent, so offsetTop is a layout position and does
       not drift with scroll — measuring off getBoundingClientRect would grow
       the estimate every time the list was scrolled. */
    const measure = () => {
      const anchor = listTop.current;
      if (!anchor) return;
      /* on a phone the reminder lies across the full width, so the list gives
         up a row for it and takes it back when the toast goes. Driven off the
         intended state, not the DOM — an exiting toast still has height. */
      const toast = mobile && !use && !hideOff ? 68 : 0;
      const room = el.clientHeight - anchor.offsetTop - 76 - (toast ? toast + 12 : 0);
      const row = anchor.querySelector('.memrow')?.offsetHeight || 92;
      setPerPage(Math.max(1, Math.floor(room / (row + 12))));
    };
    measure();
    const raf = requestAnimationFrame(measure);
    const settle = setTimeout(measure, 420);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (listTop.current) ro.observe(listTop.current);
    return () => { cancelAnimationFrame(raf); clearTimeout(settle); ro.disconnect(); };
  }, [use, filter, query, loading, hideOff, mobile]);

  const q = query.trim().toLowerCase();
  const shown = useMemo(() => list.filter(m =>
    (filter === 'All' || m.scope === filter) &&
    (!q || m.text.toLowerCase().includes(q) || m.from.toLowerCase().includes(q))
  ), [list, filter, q]);

  /* a phone scrolls; only the desktop pages, where the list has a fixed frame */
  const paged = !mobile;
  const pages = paged ? Math.max(1, Math.ceil(shown.length / perPage)) : 1;
  /* deleting the last row on the last page must not strand you on an empty one */
  useEffect(() => { if (page > pages) setPage(pages); }, [pages, page]);
  useEffect(() => { setPage(1); }, [q, filter]);

  const slice = paged ? shown.slice((page - 1) * perPage, page * perPage) : shown;

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

  /* the reminder comes back every time you open the page while it is off */
  useEffect(() => { setHideOff(false); }, [use]);

  const remove = m => {
    setList(l => l.filter(x => x.id !== m.id));
    setUndo(m);
  };
  useEffect(() => {
    if (!note) return;
    const t = setTimeout(() => setNote(null), 2400);
    return () => clearTimeout(t);
  }, [note]);
  useEffect(() => {
    if (!undo) return;
    const t = setTimeout(() => setUndo(null), 5000);
    return () => clearTimeout(t);
  }, [undo]);

  const clearAll = () => { setQuery(''); setFilter('All'); };
  const copyMemory = async m =>
    setNote(await copyText(m.text) ? 'Memory copied' : 'Could not copy');

  return (
    <div className="main">
      {mobile && (
        <div className="topbar pagebar">
          {!drawer && (
            <motion.button className="menu" layoutId="sbtoggle" onClick={onMenu}
              aria-label="Open sidebar" whileTap={{ scale: 0.9 }} transition={liquidWide}>
              <Icon name="panel" size={19} />
            </motion.button>
          )}
          <span className="wordmark">Memories</span>
          <motion.button className="round accent" onClick={() => setDialog({})}
            aria-label="Add memory" whileTap={{ scale: 0.94 }}
            transition={{ duration: dur.press, ease }}>
            <Icon name="plus" size={17} />
          </motion.button>
        </div>
      )}

      <div className={`page ${mobile && !use && !hideOff ? 'toastroom' : ''}`} ref={host}>
       <div className="pagein">
        <div className="pagehead deskonly">
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
          <Toggle on={use} onChange={onUse} label="Use memory" />
        </div>

        <div className="filters memfilters">
          {FILTERS.map(f => {
            const n = f === 'All' ? list.length : list.filter(m => m.scope === f).length;
            return (
              <motion.button key={f} className={`fpill ${filter === f ? 'on' : ''}`}
                onClick={() => setFilter(f)} whileTap={{ scale: 0.97 }}
                transition={{ duration: dur.hover, ease }}>
                {f === 'All' ? 'All' : MEM_SCOPE_LABEL[f]}<span className="n">{n}</span>
              </motion.button>
            );
          })}
        </div>

        <div className={`memlist ${use ? '' : 'muted'}`} ref={listTop}>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div className="memrow skel" key={`s${i}`} aria-hidden="true">
                  <div className="sk-meta">
                    <i style={{ width: 62 }} /><i style={{ width: 74 }} /><i style={{ width: 48 }} />
                  </div>
                  <i className="sk-line" style={{ width: '92%' }} />
                  <i className="sk-line" style={{ width: '58%' }} />
                </div>
              ))
            : slice.map(m => (
                <Row key={m.id} m={m} mobile={mobile}
                  onEdit={setDialog} onDelete={remove} onCopy={copyMemory} />
              ))}

          {!loading && shown.length === 0 && (
            <div className="memempty">
              <span className="ic">
                <Icon name={list.length === 0 ? 'memory' : 'search'} size={20} />
              </span>
              {list.length === 0 ? (<>
                <b>No memories yet</b>
                <p>Nash saves useful details from your chats so it can recall them later.
                   Add one manually to get started.</p>
                <motion.button className="primary sm" onClick={() => setDialog({})}
                  whileTap={{ scale: 0.98 }} transition={{ duration: dur.press, ease }}>
                  <Icon name="plus" size={15} /> Add memory
                </motion.button>
              </>) : (<>
                <b>Nothing matches{q ? ` “${query.trim()}”` : ''}</b>
                <p>{filter !== 'All'
                  ? <>The <b>{filter}</b> filter is narrowing this down. Try a broader scope
                      or a shorter search.</>
                  : 'Try a shorter search.'}</p>
                <button className="ghost outlined" onClick={clearAll}>Clear search and filters</button>
              </>)}
            </div>
          )}
        </div>

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
      </div>

      <div className="toasts">
        <AnimatePresence initial={false}>
          {!use && !hideOff && (
            <Toast key="off" icon="memoff" tone="warn" onClose={() => setHideOff(true)}>
              Memory is off — these are kept, but Nash will not use them in replies.
            </Toast>
          )}

          {note && (
            <Toast key="note" onClose={() => setNote(null)}>{note}</Toast>
          )}

          {undo && (
            <Toast key="undo" icon="trash" onClose={() => setUndo(null)}
              action={{ label:'Undo', onClick:() => { setList(l => [undo, ...l]); setUndo(null); } }}>
              Memory deleted
            </Toast>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {dialog && (
          <MemoryDialog open draft={dialog.id ? dialog : null}
            onSave={save} onClose={() => setDialog(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
