import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from './Icon.jsx';
import { ease, dur, liquid, liquidWide } from '../lib/motion.js';
import { FOLDERS, CHATS, GROUP_ORDER, ORGS } from '../lib/data.js';

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
          <div style={{ display:'flex', flexDirection:'column', gap:2 }}>{children}</div>
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

function ChatRow({ title, pinned, nested, mobile, onPin, onOpen, active,
                  onDragStart, onDropHere, over }) {
  const [hover, setHover] = useState(false);

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
      onClick={onOpen}
      draggable={Boolean(onDragStart)} onDragStart={onDragStart}
      onDragOver={onDropHere ? (e => { e.preventDefault(); onDropHere.mark(); }) : undefined}
      onDrop={onDropHere ? (e => { e.preventDefault(); onDropHere.drop(); }) : undefined}
      onHoverStart={() => setHover(true)} onHoverEnd={() => setHover(false)}
      animate={{ backgroundColor: active || hover || over ? 'var(--hover)' : 'rgba(0,0,0,0)',
                 color: active || hover || over ? 'var(--t1)' : 'var(--t2)' }}
      transition={{ duration: dur.hover, ease }}
    >
      <span className="title">{title}</span>
      {/* Touch has no hover, so nothing can be revealed on demand — showing an
          overflow menu and an empty pin on every row just adds noise. On a phone
          only genuinely pinned rows carry a mark, and it only unpins. */}
      <div className="rowacts">
        {!mobile && (
          <motion.span className="dots"
            animate={{ opacity: hover ? 1 : 0 }}
            style={{ pointerEvents: hover ? 'auto' : 'none' }}
            transition={{ duration: dur.hover, ease }}>
            <Icon name="dotsH" size={15} />
          </motion.span>
        )}
        {(!mobile || pinned) && <PinBtn />}
      </div>
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
  { icon:'books',   label:'Library' },
  { icon:'memory',  label:'Memories' },
  { icon:'clip',    label:'MCP Settings' },
];

function MoreMenu({ collapsed, mobile }) {
  const { open, setOpen, at, ref, toggle } = useFlyout(collapsed);

  /* a flyout needs somewhere to fly to; on a phone the drawer owns the screen,
     so the destinations are listed outright instead */
  if (mobile) return (
    <>
      {MORE.map(m => (
        <motion.button key={m.label} className="navitem"
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
            initial={{ opacity:0, x: at.drop ? 0 : -10, y: at.drop ? -8 : 0, scale:.98 }}
            animate={{ opacity:1, x:0, y:0, scale:1 }}
            exit={{ opacity:0, x: at.drop ? 0 : -8, y: at.drop ? -6 : 0, scale:.98 }}
            transition={liquid}>
            {MORE.map(m => (
              <motion.button key={m.label} className="orgrow" onClick={() => setOpen(false)}
                whileHover={{ backgroundColor:'var(--hover)' }} transition={{ duration: dur.hover, ease }}>
                <Icon name={m.icon} size={16} />
                <div className="ot"><b>{m.label}</b></div>
              </motion.button>
            ))}
          </motion.div>
        </>)}
      </AnimatePresence>
    </>
  );
}

function OrgSwitcher({ collapsed }) {
  const { open, setOpen, at, ref, toggle } = useFlyout(collapsed);

  return (
    <>
      <motion.button ref={ref} className={`org ${open ? 'open' : ''}`} onClick={toggle}
        whileHover={{ backgroundColor:'var(--hover)', color:'var(--t1)' }}
        transition={{ duration: dur.hover, ease }}>
        <Icon name="user" size={15} />
        <span style={{ flex:1, textAlign:'left' }}>Personal</span>
        <motion.span style={{ display:'flex' }}
          animate={{ rotate: open ? 180 : 0 }} transition={{ duration: dur.swap, ease }}>
          <Icon name="chevD" size={14} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (<>
          <div className="orgveil" onClick={() => setOpen(false)} />
          <motion.div className="orgmenu" style={{ top: at.top, left: at.left }}
            initial={{ opacity:0, x: at.drop ? 0 : -10, y: at.drop ? -8 : 0, scale:.98 }}
            animate={{ opacity:1, x:0, y:0, scale:1 }}
            exit={{ opacity:0, x: at.drop ? 0 : -8, y: at.drop ? -6 : 0, scale:.98 }}
            transition={liquid}>
            <motion.button className="orgrow" onClick={() => setOpen(false)}
              whileHover={{ backgroundColor:'var(--hover)' }} transition={{ duration: dur.hover, ease }}>
              <Icon name="user" size={16} />
              <div className="ot"><b>Personal</b></div>
              <span className="tick"><Icon name="check" size={15} /></span>
            </motion.button>
            {ORGS.map(o => (
              <motion.button key={o} className="orgrow" onClick={() => setOpen(false)}
                whileHover={{ backgroundColor:'var(--hover)' }} transition={{ duration: dur.hover, ease }}>
                <Icon name="building" size={16} />
                <div className="ot"><b>{o}</b><small>Sign in to this organization</small></div>
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
                                 openChat, onOpenChat }) {
  const [chatsOpen, setChatsOpen] = useState(true);
  const [foldersOpen, setFoldersOpen] = useState(true);
  const [open, setOpen] = useState({ work:true, research:false, personal:false });

  /* pin state is live: loose chats move between the Pinned group and their date
     group, while a folder's chats pin to the top of that folder and stay in it */
  const [chats, setChats] = useState(
    () => CHATS.map((c, i) => ({ ...c, id:`c${i}` })));
  const [folders, setFolders] = useState(
    () => FOLDERS.map(f => ({
      ...f,
      chats: f.chats.map((title, i) => ({ title, pinned:false, id:`${f.key}${i}` })),
    })));

  const [drag, setDrag]     = useState(null);   // the chat being dragged
  const [over, setOver]     = useState(null);   // folder it is hovering
  const [adding, setAdding] = useState(false);

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

  /* dropping onto a chat drops it into that slot — inside a folder, or in the
     loose list, where it also adopts the target's date group */
  const dropOnChat = (target, where) => {
    if (!drag || drag.kind !== 'chat' || drag.id === target.id) return;
    detach();
    const moving = { id: drag.id, title: drag.title, pinned: false };
    if (where === 'loose') {
      setChats(list => {
        const rest = list.filter(c => c.id !== drag.id);
        const at = rest.findIndex(c => c.id === target.id);
        rest.splice(at < 0 ? rest.length : at, 0, { ...moving, group: target.group });
        return rest;
      });
    } else {
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

  const pinChat = id =>
    setChats(list => list.map(c => (c.id === id ? { ...c, pinned: !c.pinned } : c)));
  const pinInFolder = (key, id) =>
    setFolders(list => list.map(f => (f.key !== key ? f : {
      ...f,
      chats: f.chats.map(c => (c.id === id ? { ...c, pinned: !c.pinned } : c)),
    })));

  const pinned = chats.filter(c => c.pinned);
  const groups = GROUP_ORDER
    .map(g => [g, chats.filter(c => c.group === g && !c.pinned)])
    .filter(([, rows]) => rows.length);

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
              <OrgSwitcher collapsed={collapsed} />
              <div className="gap" />
              <div className="searchfield"><Icon name="search" size={14} /><span>Search messages</span></div>
              <div className="gap" />
              {NAV.map(n => (
                <motion.button key={n.label}
                  className={`navitem ${n.label === 'New Chat' ? 'active' : ''}`}
                  onClick={n.label === 'New Chat' ? onNewChat : undefined}
                  whileHover={{ backgroundColor:'var(--hover)', color:'var(--t1)' }}
                  whileTap={{ scale: 0.99 }} transition={{ duration: dur.hover, ease }}>
                  <Icon name={n.icon} size={16} /><span>{n.label}</span>
                </motion.button>
              ))}
              <MoreMenu collapsed={collapsed} mobile={mobile} />
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

                  {folders.map(f => (
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
                      <Collapse open={open[f.key]}>
                        {f.chats.filter(c => c.pinned).map(c => (
                          <ChatRow key={c.id} title={c.title} pinned nested mobile={mobile}
                                   onDragStart={() => setDrag({ kind:'chat', id:c.id, title:c.title, from:f.key })}
                                   over={over === c.id}
                                   onDropHere={{ mark:() => setOver(c.id),
                                                 drop:() => dropOnChat(c, f.key) }}
                                   active={openChat?.id === c.id}
                                   onOpen={() => onOpenChat?.({ id:c.id, title:c.title })}
                                   onPin={() => pinInFolder(f.key, c.id)} />
                        ))}
                        {f.chats.filter(c => !c.pinned).map(c => (
                          <ChatRow key={c.id} title={c.title} nested mobile={mobile}
                                   onDragStart={() => setDrag({ kind:'chat', id:c.id, title:c.title, from:f.key })}
                                   over={over === c.id}
                                   onDropHere={{ mark:() => setOver(c.id),
                                                 drop:() => dropOnChat(c, f.key) }}
                                   active={openChat?.id === c.id}
                                   onOpen={() => onOpenChat?.({ id:c.id, title:c.title })}
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
                               active={openChat?.id === c.id}
                               onOpen={() => onOpenChat?.({ id:c.id, title:c.title })}
                               onPin={() => pinChat(c.id)} />
                    ))}
                  </>
                )}
                {groups.map(([label, rows]) => (
                  <div key={label}>
                    <div className="datemark">{label}</div>
                    {rows.map(c => (
                      <ChatRow key={c.id} {...c} mobile={mobile}
                               onDragStart={() => setDrag({ kind:'chat', id:c.id, title:c.title, from:'loose' })}
                               over={over === c.id}
                               onDropHere={{ mark:() => setOver(c.id),
                                             drop:() => dropOnChat(c, 'loose') }}
                               active={openChat?.id === c.id}
                               onOpen={() => onOpenChat?.({ id:c.id, title:c.title })}
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
