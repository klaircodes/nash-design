import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from './Icon.jsx';
import { ease, dur, liquid, liquidWide, popMenu, popSide } from '../lib/motion.js';
import copyText from '../lib/copy.js';
import { GROUP_ORDER, ORGS, WORKSPACES, CONVERSATIONS } from '../lib/data.js';

/* a chat matches on its title or on anything said inside it */
const haystack = title => {
  const said = (CONVERSATIONS[title] || []).flatMap(m => [
    m.text || '',
    ...(m.blocks || []).flatMap(b => [
      b.title || '', b.name || '', b.meta || '', b.lang || '',
      typeof b.v === 'string' ? b.v : '',
      Array.isArray(b.v) ? b.v.flat(2).join(' ') : '',
      ...(b.head || []), ...(b.rows || []).flat(),
    ]),
  ]);
  return `${title} ${said.join(' ')}`.toLowerCase();
};

/* Every collapse in the app uses this — height springs to the
   content's own size and eases closed the same way. */
function Collapse({ open, children }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div key="c"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ height: liquid, opacity: { duration: 0.18, ease } }}
          style={{ overflow: 'hidden' }}
        >
          <div className="collapsein">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Chevron({ open }) {
  return (
    <motion.span className="chev" animate={{ rotate: open ? 0 : -90 }}
      transition={{ duration: dur.move, ease }} style={{ display:'flex' }}>
      <Icon name="chevD" size={14} />
    </motion.span>
  );
}

const ROWMENU = [
  { key:'share',     icon:'share',     label:'Share' },
  { key:'rename',    icon:'edit',      label:'Rename' },
  { key:'duplicate', icon:'duplicate', label:'Duplicate' },
  { key:'move',      icon:'moveto',    label:'Move to Folder', more:true },
  { key:'pin',       icon:'pin',       label:'Pin' },
  { key:'archive',   icon:'archive',   label:'Archive' },
  { key:'delete',    icon:'trash',     label:'Delete', danger:true },
];

function ChatRow({ title, pinned, nested, mobile, onPin, onOpen, active,
                  onDragStart, onDropHere, over, folders = [], onAction }) {
  const [hover, setHover]     = useState(false);
  const [menu, setMenu]       = useState(null);   // null | {top,left}
  const [sub, setSub]         = useState(false);
  const [editing, setEditing] = useState(false);
  const [onActs, setOnActs]   = useState(false);
  const [draft, setDraft]     = useState(title);
  const dotsRef = useRef(null);

  /* the sidebar clips its own overflow, so the menu is measured and drawn fixed,
     clear of the panel's right edge rather than on top of the chat list */
  const openMenu = e => {
    e.stopPropagation();
    const r = dotsRef.current?.getBoundingClientRect();
    if (!r) return;
    const panel = dotsRef.current.closest('.sidebar')?.getBoundingClientRect();
    const H = 300;
    setMenu({
      left: (panel?.right ?? r.right) + 10,
      top: Math.min(r.top - 8, window.innerHeight - H - 16),
    });
    setSub(false);
  };

  useEffect(() => {
    if (!menu) return;
    const key = e => e.key === 'Escape' && setMenu(null);
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [menu]);

  const run = (key, arg) => {
    setMenu(null);
    if (key === 'rename') { setDraft(title); setEditing(true); return; }
    if (key === 'pin') { onPin?.(); return; }
    onAction?.(key, arg);
  };

  const commit = () => {
    setEditing(false);
    const next = draft.trim();
    if (next && next !== title) onAction?.('rename', next);
  };

  /* generous 26px target — the glyph alone was fiddly to hit */
  const PinBtn = () => (
    <motion.button className={`pin ${pinned ? 'on' : ''}`}
      onClick={e => { e.stopPropagation(); onPin?.(); }}
      aria-label={pinned ? 'Unpin chat' : 'Pin chat'}
      animate={{ opacity: pinned || hover ? 1 : 0 }}
      style={{ pointerEvents: pinned || hover ? 'auto' : 'none' }}
      whileTap={{ scale: 0.86 }}
      transition={{ duration: dur.hover, ease }}>
      <Icon name="pin" size={15} />
    </motion.button>
  );

  return (
    <motion.div className={`chatrow ${nested ? 'nested' : ''} ${active ? 'active' : ''} ${over ? 'over' : ''}`}
      onClick={editing ? undefined : onOpen}
      /* dragstart fires on the draggable row, not on the child under the cursor,
         so the only way to exempt the controls is to disarm the row itself */
      draggable={Boolean(onDragStart) && !editing && !onActs} onDragStart={onDragStart}
      onDragOver={onDropHere ? (e => { e.preventDefault(); onDropHere.mark(); }) : undefined}
      onDrop={onDropHere ? (e => { e.preventDefault(); onDropHere.drop(); }) : undefined}
      onHoverStart={() => setHover(true)} onHoverEnd={() => setHover(false)}
      animate={{ backgroundColor: active || hover || over || menu ? 'var(--hover)' : 'rgba(0,0,0,0)',
                 color: active || hover || over || menu ? 'var(--t1)' : 'var(--t2)' }}
      transition={{ duration: dur.hover, ease }}
    >
      {editing ? (
        <input className="rename" autoFocus value={draft}
          onClick={e => e.stopPropagation()}
          onChange={e => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={e => {
            if (e.key === 'Enter') commit();
            if (e.key === 'Escape') setEditing(false);
          }} />
      ) : (
        <span className="title">{title}</span>
      )}

      {/* Touch has no hover, so nothing can be revealed on demand — showing an
          overflow menu and an empty pin on every row just adds noise. On a phone
          only genuinely pinned rows carry a mark, and it only unpins. */}
      <div className="rowacts"
        onMouseEnter={() => setOnActs(true)}
        onMouseLeave={() => setOnActs(false)}>
        {!mobile && (
          <motion.button ref={dotsRef} className="dots" onClick={openMenu}
            aria-label="Chat options"
            animate={{ opacity: hover || menu ? 1 : 0 }}
            style={{ pointerEvents: hover || menu ? 'auto' : 'none' }}
            transition={{ duration: dur.hover, ease }}>
            <Icon name="dotsH" size={15} />
          </motion.button>
        )}
        {(!mobile || pinned) && <PinBtn />}
      </div>

      <AnimatePresence>
        {menu && (<>
          <div className="orgveil" onClick={e => { e.stopPropagation(); setMenu(null); }} />
          <motion.div className="rowmenu" style={{ top: menu.top, left: menu.left }}
            onClick={e => e.stopPropagation()}
            {...popMenu}>
            {ROWMENU.map(m => (
              <div key={m.key} className="rmwrap"
                onMouseEnter={() => setSub(m.key === 'move')}>
                <button className={`rmrow ${m.danger ? 'danger' : ''}`}
                  onClick={() => (m.more ? setSub(v => !v) : run(m.key))}>
                  <Icon name={m.icon} size={15} />
                  <span>{m.key === 'pin' && pinned ? 'Unpin' : m.label}</span>
                  {m.more && <Icon name="chevR" size={14} />}
                </button>

                <AnimatePresence>
                  {m.more && sub && (
                    <motion.div className="rowmenu submenu"
                      {...popSide}>
                      {folders.length === 0 && <div className="rmempty">No folders yet</div>}
                      {folders.map(f => (
                        <button key={f.key} className="rmrow"
                          onClick={() => run('move', f.key)}>
                          <Icon name="folder" size={15} /><span>{f.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </>)}
      </AnimatePresence>
    </motion.div>
  );
}

/* The sidebar clips its own overflow for the collapse animation, so flyouts are
   measured against the trigger and drawn fixed, clear of the panel's right edge. */
function useFlyout(collapsed) {
  const [open, setOpen] = useState(false);
  const [at, setAt]     = useState({ top: 0, left: 0, drop: false });
  const ref = useRef(null);

  const toggle = () => {
    const r = ref.current?.getBoundingClientRect();
    const panel = ref.current?.closest('.sidebar')?.getBoundingClientRect();
    if (r) {
      /* beside the panel on desktop; below the trigger when the drawer already
         owns most of the screen */
      const beside = (panel?.right ?? r.right) + 12;
      setAt(beside + 280 > window.innerWidth
        ? { top: r.bottom + 8, left: r.left, drop: true }
        : { top: r.top - 4, left: beside, drop: false });
    }
    setOpen(v => !v);
  };

  useEffect(() => { if (collapsed) setOpen(false); }, [collapsed]);
  useEffect(() => {
    if (!open) return;
    const key = e => e.key === 'Escape' && setOpen(false);
    const scrolled = () => setOpen(false);
    const host = ref.current?.closest('.sb-scroll');
    window.addEventListener('keydown', key);
    host?.addEventListener('scroll', scrolled);
    return () => {
      window.removeEventListener('keydown', key);
      host?.removeEventListener('scroll', scrolled);
    };
  }, [open]);

  return { open, setOpen, at, ref, toggle };
}

const MORE = [
  { icon:'books',   label:'Library',      view:'library' },
  { icon:'memory',  label:'Memories',     view:'memories' },
  { icon:'clip',    label:'MCP Settings', view:'mcp' },
];

function MoreMenu({ collapsed, mobile, view, onNav }) {
  const { open, setOpen, at, ref, toggle } = useFlyout(collapsed);

  /* a flyout needs somewhere to fly to; on a phone the drawer owns the screen,
     so the destinations are listed outright instead */
  if (mobile) return (
    <>
      {MORE.map(m => (
        <motion.button key={m.label} className={`navitem ${view === m.view ? 'active' : ''}`}
          onClick={() => onNav?.(m.view)}
          whileHover={{ backgroundColor:'var(--hover)', color:'var(--t1)' }}
          whileTap={{ scale: 0.99 }} transition={{ duration: dur.hover, ease }}>
          <Icon name={m.icon} size={16} /><span>{m.label}</span>
        </motion.button>
      ))}
    </>
  );

  return (
    <>
      <motion.button ref={ref} className={`navitem ${open ? 'on' : ''}`} onClick={toggle}
        whileHover={{ backgroundColor:'var(--hover)', color:'var(--t1)' }}
        whileTap={{ scale: 0.99 }} transition={{ duration: dur.hover, ease }}>
        <Icon name="dotsH" size={16} /><span>More</span>
      </motion.button>

      <AnimatePresence>
        {open && (<>
          <div className="orgveil" onClick={() => setOpen(false)} />
          <motion.div className="orgmenu compact" style={{ top: at.top, left: at.left }}
            {...(at.drop ? popMenu : popSide)}>
            {MORE.map(m => (
              <motion.button key={m.label} className="orgrow"
                onClick={() => { setOpen(false); onNav?.(m.view); }}
                whileHover={{ backgroundColor:'var(--hover)' }} transition={{ duration: dur.hover, ease }}>
                <Icon name={m.icon} size={16} />
                <div className="ot"><b>{m.label}</b></div>
                {view === m.view && <span className="tick"><Icon name="check" size={15} /></span>}
              </motion.button>
            ))}
          </motion.div>
        </>)}
      </AnimatePresence>
    </>
  );
}

function OrgSwitcher({ collapsed, org, onPick }) {
  const { open, setOpen, at, ref, toggle } = useFlyout(collapsed);

  return (
    <>
      <motion.button ref={ref} className={`org ${open ? 'open' : ''}`} onClick={toggle}
        whileHover={{ backgroundColor:'var(--hover)', color:'var(--t1)' }}
        transition={{ duration: dur.hover, ease }}>
        <Icon name={org === 'Personal' ? 'user' : 'building'} size={15} />
        <span style={{ flex:1, textAlign:'left' }}>{org}</span>
        <motion.span style={{ display:'flex' }}
          animate={{ rotate: open ? 180 : 0 }} transition={{ duration: dur.swap, ease }}>
          <Icon name="chevD" size={14} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (<>
          <div className="orgveil" onClick={() => setOpen(false)} />
          <motion.div className="orgmenu" style={{ top: at.top, left: at.left }}
            {...(at.drop ? popMenu : popSide)}>
            <motion.button className="orgrow"
              onClick={() => { onPick('Personal'); setOpen(false); }}
              whileHover={{ backgroundColor:'var(--hover)' }} transition={{ duration: dur.hover, ease }}>
              <Icon name="user" size={16} />
              <div className="ot"><b>Personal</b></div>
              {org === 'Personal' && <span className="tick"><Icon name="check" size={15} /></span>}
            </motion.button>
            {ORGS.map(o => (
              <motion.button key={o.name} className="orgrow"
                onClick={() => { if (o.signedIn) onPick(o.name); setOpen(false); }}
                whileHover={{ backgroundColor:'var(--hover)' }} transition={{ duration: dur.hover, ease }}>
                <Icon name="building" size={16} />
                <div className="ot">
                  <b>{o.name}</b>
                  {!o.signedIn && <small>Sign in to this organization</small>}
                </div>
                {org === o.name && <span className="tick"><Icon name="check" size={15} /></span>}
              </motion.button>
            ))}
          </motion.div>
        </>)}
      </AnimatePresence>
    </>
  );
}

const NAV = [
  { icon:'plus',     label:'New Chat' },
  { icon:'bookmark', label:'Bookmarks' },
  { icon:'users',    label:'Persona Marketplace' },
];

export default function Sidebar({ user, onNewChat, collapsed, onToggle, mobile, drawer,
                                 openChat, onOpenChat, view, onNav, onNotify,
                                 extraChats = [] }) {
  const [chatsOpen, setChatsOpen] = useState(true);
  const [foldersOpen, setFoldersOpen] = useState(true);
  const [open, setOpen] = useState({ work:true, research:false, personal:false });

  /* pin state is live: loose chats move between the Pinned group and their date
     group, while a folder's chats pin to the top of that folder and stay in it */
  const [org, setOrg] = useState('Personal');
  const load = key => {
    const ws = WORKSPACES[key] || WORKSPACES.Personal;
    return {
      chats: ws.chats.map((c, i) => ({ ...c, id:`${key}-c${i}` })),
      folders: ws.folders.map(f => ({
        ...f,
        chats: f.chats.map((title, i) => ({ title, pinned:false, id:`${key}-${f.key}${i}` })),
      })),
    };
  };
  const [chats, setChats]     = useState(() => load('Personal').chats);
  const [folders, setFolders] = useState(() => load('Personal').folders);

  /* the workspace swaps the content; every interaction stays exactly as it was */
  const switchOrg = key => {
    if (key === org) return;
    const next = load(key);
    setOrg(key);
    setChats(next.chats);
    setFolders(next.folders);
    setQuery('');
    onOpenChat?.(null);
  };

  const [drag, setDrag]     = useState(null);   // the chat being dragged
  const [over, setOver]     = useState(null);   // folder it is hovering
  const [adding, setAdding] = useState(false);
  const [query, setQuery]   = useState('');

  /* one global listener clears the highlight however the drag ends */
  useEffect(() => {
    const end = () => { setOver(null); setDrag(null); };
    window.addEventListener('dragend', end);
    window.addEventListener('drop', end);
    return () => {
      window.removeEventListener('dragend', end);
      window.removeEventListener('drop', end);
    };
  }, []);
  const [draft, setDraft]   = useState('');

  /* pull a chat out of wherever it currently lives */
  const detach = () => {
    if (drag.from === 'loose') setChats(list => list.filter(c => c.id !== drag.id));
    else setFolders(list => list.map(f => (f.key !== drag.from ? f : {
      ...f, chats: f.chats.filter(c => c.id !== drag.id),
    })));
  };

  /* dropping onto a folder header files the chat in that folder */
  const moveToFolder = key => {
    if (!drag || drag.kind !== 'chat' || drag.from === key) return;
    if (drag.from === 'loose') setChats(list => list.filter(c => c.id !== drag.id));
    setFolders(list => list.map(f => {
      let rows = f.chats;
      if (f.key === drag.from) rows = rows.filter(c => c.id !== drag.id);
      if (f.key === key && !rows.some(c => c.id === drag.id))
        rows = [...rows, { id: drag.id, title: drag.title, pinned: false }];
      return { ...f, chats: rows };
    }));
    setDrag(null);
    setOver(null);
    setOpen(o => ({ ...o, [key]: true }));
  };

  /* dropping onto another folder puts the dragged folder in its place */
  const reorderFolder = key => {
    if (!drag || drag.kind !== 'folder' || drag.key === key) return;
    setFolders(list => {
      const from = list.findIndex(f => f.key === drag.key);
      const to   = list.findIndex(f => f.key === key);
      if (from < 0 || to < 0) return list;
      const next = [...list];
      next.splice(to, 0, next.splice(from, 1)[0]);
      return next;
    });
    setDrag(null);
    setOver(null);
  };

  /* Reordering only happens inside a folder. Date groups are a record of when
     a chat happened, so a chat can leave one for a folder but never be dragged
     into a different date. */
  const dropOnChat = (target, where) => {
    if (!drag || drag.kind !== 'chat' || drag.id === target.id) return;
    if (where === 'loose') { setDrag(null); setOver(null); return; }
    detach();
    const moving = { id: drag.id, title: drag.title, pinned: false };
    {
      setFolders(list => list.map(f => {
        if (f.key !== where) return f;
        const rest = f.chats.filter(c => c.id !== drag.id);
        const at = rest.findIndex(c => c.id === target.id);
        rest.splice(at < 0 ? rest.length : at, 0, moving);
        return { ...f, chats: rest };
      }));
      setOpen(o => ({ ...o, [where]: true }));
    }
    setDrag(null);
    setOver(null);
  };

  const addFolder = () => {
    const label = draft.trim();
    if (!label) { setAdding(false); setDraft(''); return; }
    const key = `f${Date.now()}`;
    setFolders(list => [{ key, label, chats: [] }, ...list]);
    setOpen(o => ({ ...o, [key]: true }));
    setDraft('');
    setAdding(false);
  };

  /* one handler for every row action, whether the chat is loose or in a folder */
  const rowAction = (id, from) => (key, arg) => {
    const forked = extraChats.find(c => c.id === id);
    const patch = (list, fn) => list.map(c => (c.id === id ? fn(c) : c));
    const drop  = list => list.filter(c => c.id !== id);
    const inFolder = fn =>
      setFolders(l => l.map(f => (f.key !== from ? f : { ...f, chats: fn(f.chats) })));

    if (key === 'rename') {
      if (from === 'loose') setChats(l => patch(l, c => ({ ...c, title: arg })));
      else inFolder(rows => patch(rows, c => ({ ...c, title: arg })));
      return;
    }
    if (key === 'duplicate') {
      const copy = src => ({ ...src, id: `${src.id}-d${Date.now()}`,
                             title: `${src.title} copy`, pinned: false });
      if (from === 'loose') setChats(l => l.flatMap(c => (c.id === id ? [c, copy(c)] : [c])));
      else inFolder(rows => rows.flatMap(c => (c.id === id ? [c, copy(c)] : [c])));
      return;
    }
    if (key === 'delete' || key === 'archive') {
      if (from === 'loose') setChats(drop); else inFolder(drop);
      if (openChat?.id === id) onOpenChat?.(null);
      return;
    }
    if (key === 'move') {
      let moving;
      if (from === 'loose') setChats(l => { moving = l.find(c => c.id === id); return drop(l); });
      else setFolders(l => l.map(f => {
        if (f.key !== from) return f;
        moving = f.chats.find(c => c.id === id);
        return { ...f, chats: f.chats.filter(c => c.id !== id) };
      }));
      setFolders(l => l.map(f => (f.key !== arg ? f : {
        ...f, chats: [...f.chats, { id, title: moving?.title || '', pinned: false }],
      })));
      setOpen(o => ({ ...o, [arg]: true }));
      return;
    }
    if (key === 'share') {
      copyText(`https://nash.chat/c/${id}`).then(ok =>
        onNotify?.(ok ? 'Link copied' : 'Could not copy', 'share'));
      return;
    }
  };

  const pinChat = id =>
    setChats(list => list.map(c => (c.id === id ? { ...c, pinned: !c.pinned } : c)));
  const pinInFolder = (key, id) =>
    setFolders(list => list.map(f => (f.key !== key ? f : {
      ...f,
      chats: f.chats.map(c => (c.id === id ? { ...c, pinned: !c.pinned } : c)),
    })));

  /* forks arrive from above; adopt any we have not seen yet */
  useEffect(() => {
    if (!extraChats.length) return;
    setChats(list => {
      const have = new Set(list.map(c => c.id));
      const fresh = extraChats.filter(c => !have.has(c.id))
        .map(c => ({ id: c.id, title: c.title, group: c.group, pinned: false }));
      return fresh.length ? [...fresh, ...list] : list;
    });
  }, [extraChats]);

  const q = query.trim().toLowerCase();
  const hit = c => !q || haystack(c.title).includes(q);

  const pinned = chats.filter(c => c.pinned && hit(c));
  const groups = GROUP_ORDER
    .map(g => [g, chats.filter(c => c.group === g && !c.pinned && hit(c))])
    .filter(([, rows]) => rows.length);
  /* while searching, a folder with nothing in it is just noise */
  const shownFolders = q
    ? folders.map(f => ({ ...f, chats: f.chats.filter(hit) })).filter(f => f.chats.length)
    : folders;
  const nothing = q && !pinned.length && !groups.length && !shownFolders.length;

  return (
    <motion.aside
      className={`sidebar ${mobile ? 'drawer' : ''}`}
      animate={mobile
        ? { x: drawer ? 0 : '-104%',
            backgroundColor: 'var(--sunken)', borderRightColor: 'var(--border)' }
        : { x: 0, width: collapsed ? 126 : 280,
            backgroundColor: collapsed ? 'rgba(0,0,0,0)' : 'var(--sunken)',
            borderRightColor: collapsed ? 'rgba(0,0,0,0)' : 'var(--border)' }}
      transition={liquidWide}
    >
      {/* the brand row never moves and never resizes */}
      <div className="brand">
        <b>nash:</b>
        {!mobile && <motion.button className="panel" onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          whileHover={{ color: 'var(--t1)' }} whileTap={{ scale: 0.92 }}
          transition={{ duration: dur.hover, ease }}>
          <Icon name="panel" size={18} />
        </motion.button>}
      </div>

      {/* slides out of the clip rather than fading — the panel
          narrows and the content travels with it */}
      <motion.div className="sb-body"
        animate={{ x: !mobile && collapsed ? -168 : 0,
                   opacity: !mobile && collapsed ? 0.15 : 1 }}
        style={{ pointerEvents: !mobile && collapsed ? 'none' : 'auto' }}
        transition={liquidWide}
      >
            <div className="sb-scroll">
              <div className="gap" />
              <OrgSwitcher collapsed={collapsed} org={org} onPick={switchOrg} />
              <div className="gap" />
              <div className="searchfield">
                <Icon name="search" size={14} />
                <input value={query} placeholder="Search messages"
                       onChange={e => setQuery(e.target.value)}
                       onKeyDown={e => e.key === 'Escape' && setQuery('')} />
                {query && (
                  <button className="clear" onClick={() => setQuery('')} aria-label="Clear search">
                    <Icon name="x" size={13} />
                  </button>
                )}
              </div>
              <div className="gap" />
              {NAV.map(n => (
                <motion.button key={n.label}
                  className={`navitem ${n.label === 'New Chat' && view === 'chat' ? 'active' : ''}`}
                  onClick={n.label === 'New Chat' ? onNewChat : undefined}
                  whileHover={{ backgroundColor:'var(--hover)', color:'var(--t1)' }}
                  whileTap={{ scale: 0.99 }} transition={{ duration: dur.hover, ease }}>
                  <Icon name={n.icon} size={16} /><span>{n.label}</span>
                </motion.button>
              ))}
              <MoreMenu collapsed={collapsed} mobile={mobile} view={view} onNav={onNav} />
              <div className="gap" style={{ height: 8 }} />
              <button className="sechead" onClick={() => setChatsOpen(v => !v)}>
                <span>Chats</span><Chevron open={chatsOpen} />
              </button>

              <Collapse open={chatsOpen}>
                <div className="sechead row">
                  <button className="lbl" onClick={() => setFoldersOpen(v => !v)}>
                    <span>Folders</span>
                  </button>
                  <motion.button className="addfolder" aria-label="New folder"
                    onClick={() => { setFoldersOpen(true); setAdding(true); }}
                    whileHover={{ color:'var(--t1)' }} whileTap={{ scale: 0.9 }}
                    transition={{ duration: dur.hover, ease }}>
                    <Icon name="plus" size={14} />
                  </motion.button>
                  <button className="chevbtn" onClick={() => setFoldersOpen(v => !v)}
                    aria-label={foldersOpen ? 'Collapse folders' : 'Expand folders'}>
                    <Chevron open={foldersOpen} />
                  </button>
                </div>

                <Collapse open={foldersOpen}>
                  <AnimatePresence initial={false}>
                    {adding && (
                      <motion.div key="nf" style={{ overflow:'hidden' }}
                        initial={{ height:0, opacity:0 }} animate={{ height:34, opacity:1 }}
                        exit={{ height:0, opacity:0 }} transition={{ duration: dur.swap, ease }}>
                        <div className="newfolder">
                          <Icon name="folder" size={16} />
                          <input autoFocus value={draft} placeholder="Folder name"
                            onChange={e => setDraft(e.target.value)}
                            onBlur={addFolder}
                            onKeyDown={e => {
                              if (e.key === 'Enter')  addFolder();
                              if (e.key === 'Escape') { setAdding(false); setDraft(''); }
                            }} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {shownFolders.map(f => (
                    <div key={f.key}
                      onDragEnter={() => setOver(f.key)}
                      onDragOver={e => { e.preventDefault(); setOver(f.key); }}
                      onDrop={e => {
                        e.preventDefault();
                        if (drag?.kind === 'folder') reorderFolder(f.key);
                        else moveToFolder(f.key);
                      }}>
                      <motion.button className="folderrow"
                        draggable
                        onDragStart={() => setDrag({ kind:'folder', key:f.key })}
                        onClick={() => setOpen(o => ({ ...o, [f.key]: !o[f.key] }))}
                        animate={{
                          backgroundColor: over === f.key ? 'var(--hover)' : 'rgba(0,0,0,0)',
                          color: over === f.key ? 'var(--t1)' : 'var(--t2)',
                        }}
                        whileHover={{ backgroundColor:'var(--hover)', color:'var(--t1)' }}
                        transition={{ duration: dur.hover, ease }}>
                        <Icon name="folder" size={16} /><span>{f.label}</span>
                        <Chevron open={open[f.key]} />
                      </motion.button>
                      <Collapse open={q ? true : open[f.key]}>
                        {f.chats.filter(c => c.pinned).map(c => (
                          <ChatRow key={c.id} title={c.title} pinned nested mobile={mobile}
                                   onDragStart={() => setDrag({ kind:'chat', id:c.id, title:c.title, from:f.key })}
                                   over={over === c.id}
                                   onDropHere={{ mark:() => setOver(c.id),
                                                 drop:() => dropOnChat(c, f.key) }}
                                   folders={folders} onAction={rowAction(c.id, f.key)}
                                   active={openChat?.id === c.id}
                                   onOpen={() => onOpenChat?.({ id:c.id, title:c.title,
                                 messages: extraChats.find(x => x.id === c.id)?.messages })}
                                   onPin={() => pinInFolder(f.key, c.id)} />
                        ))}
                        {f.chats.filter(c => !c.pinned).map(c => (
                          <ChatRow key={c.id} title={c.title} nested mobile={mobile}
                                   onDragStart={() => setDrag({ kind:'chat', id:c.id, title:c.title, from:f.key })}
                                   over={over === c.id}
                                   onDropHere={{ mark:() => setOver(c.id),
                                                 drop:() => dropOnChat(c, f.key) }}
                                   folders={folders} onAction={rowAction(c.id, f.key)}
                                   active={openChat?.id === c.id}
                                   onOpen={() => onOpenChat?.({ id:c.id, title:c.title,
                                 messages: extraChats.find(x => x.id === c.id)?.messages })}
                                   onPin={() => pinInFolder(f.key, c.id)} />
                        ))}
                      </Collapse>
                    </div>
                  ))}
                </Collapse>

                {pinned.length > 0 && (
                  <>
                    <div className="datemark first">Pinned</div>
                    {pinned.map(c => (
                      <ChatRow key={c.id} {...c} mobile={mobile}
                               onDragStart={() => setDrag({ kind:'chat', id:c.id, title:c.title, from:'loose' })}
                               over={over === c.id}
                               onDropHere={{ mark:() => setOver(c.id),
                                             drop:() => dropOnChat(c, 'loose') }}
                               folders={folders} onAction={rowAction(c.id, 'loose')}
                               active={openChat?.id === c.id}
                               onOpen={() => onOpenChat?.({ id:c.id, title:c.title,
                                 messages: extraChats.find(x => x.id === c.id)?.messages })}
                               onPin={() => pinChat(c.id)} />
                    ))}
                  </>
                )}
                {nothing && <div className="noresults">No chats match “{query.trim()}”</div>}

                {groups.map(([label, rows]) => (
                  <div key={label}>
                    <div className="datemark">{label}</div>
                    {rows.map(c => (
                      <ChatRow key={c.id} {...c} mobile={mobile}
                               onDragStart={() => setDrag({ kind:'chat', id:c.id, title:c.title, from:'loose' })}
                               over={over === c.id}
                               onDropHere={{ mark:() => setOver(c.id),
                                             drop:() => dropOnChat(c, 'loose') }}
                               folders={folders} onAction={rowAction(c.id, 'loose')}
                               active={openChat?.id === c.id}
                               onOpen={() => onOpenChat?.({ id:c.id, title:c.title,
                                 messages: extraChats.find(x => x.id === c.id)?.messages })}
                               onPin={() => pinChat(c.id)} />
                    ))}
                  </div>
                ))}
              </Collapse>
            </div>

            <div className="sb-foot">
              <div className="rule" />
              <div className="userrow">
                <div className="avatar">{(user.name || 'K')[0].toUpperCase()}</div>
                <div className="who"><b>{user.name}</b><small>{user.email}</small></div>
                <span style={{ color:'var(--t3)', display:'flex' }}><Icon name="gear" size={14} /></span>
              </div>
              <div className="version">Nash v1.0.0</div>
            </div>
      </motion.div>
    </motion.aside>
  );
}
