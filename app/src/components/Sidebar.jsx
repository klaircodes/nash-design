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

function ChatRow({ title, pinned, nested, mobile }) {
  const [hover, setHover] = useState(false);

  /* generous 26px target — the glyph alone was fiddly to hit */
  const PinBtn = () => (
    <motion.button className={`pin ${pinned ? 'on' : ''}`}
      aria-label={pinned ? 'Unpin chat' : 'Pin chat'}
      animate={{ opacity: pinned || hover ? 1 : 0 }}
      style={{ pointerEvents: pinned || hover ? 'auto' : 'none' }}
      whileTap={{ scale: 0.86 }}
      transition={{ duration: dur.hover, ease }}>
      <Icon name="pin" size={15} />
    </motion.button>
  );

  return (
    <motion.div className={`chatrow ${nested ? 'nested' : ''}`}
      onHoverStart={() => setHover(true)} onHoverEnd={() => setHover(false)}
      animate={{ backgroundColor: hover ? 'var(--hover)' : 'rgba(0,0,0,0)',
                 color: hover ? 'var(--t1)' : 'var(--t2)' }}
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

function MoreMenu({ collapsed }) {
  const { open, setOpen, at, ref, toggle } = useFlyout(collapsed);
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

export default function Sidebar({ user, onNewChat, collapsed, onToggle, mobile, drawer }) {
  const [chatsOpen, setChatsOpen] = useState(true);
  const [foldersOpen, setFoldersOpen] = useState(true);
  const [open, setOpen] = useState({ work:true, research:false, personal:false });

  const pinned = CHATS.filter(c => c.pinned);
  const groups = GROUP_ORDER
    .map(g => [g, CHATS.filter(c => c.group === g && !c.pinned)])
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
              <MoreMenu collapsed={collapsed} />
              <div className="gap" style={{ height: 8 }} />
              <button className="sechead" onClick={() => setChatsOpen(v => !v)}>
                <span>Chats</span><Chevron open={chatsOpen} />
              </button>

              <Collapse open={chatsOpen}>
                <button className="sechead" onClick={() => setFoldersOpen(v => !v)}>
                  <span>Folders</span><Chevron open={foldersOpen} />
                </button>

                <Collapse open={foldersOpen}>
                  {FOLDERS.map(f => (
                    <div key={f.key}>
                      <motion.button className="folderrow"
                        onClick={() => setOpen(o => ({ ...o, [f.key]: !o[f.key] }))}
                        whileHover={{ backgroundColor:'var(--hover)', color:'var(--t1)' }}
                        transition={{ duration: dur.hover, ease }}>
                        <Icon name="folder" size={16} /><span>{f.label}</span>
                        <Chevron open={open[f.key]} />
                      </motion.button>
                      <Collapse open={open[f.key]}>
                        {f.chats.map(c => <ChatRow key={c} title={c} nested mobile={mobile} />)}
                      </Collapse>
                    </div>
                  ))}
                </Collapse>

                {pinned.length > 0 && (
                  <>
                    <div className="datemark first">Pinned</div>
                    {pinned.map((c, i) => <ChatRow key={`p${i}`} {...c} mobile={mobile} />)}
                  </>
                )}
                {groups.map(([label, rows]) => (
                  <div key={label}>
                    <div className="datemark">{label}</div>
                    {rows.map((c, i) => <ChatRow key={`${label}${i}`} {...c} mobile={mobile} />)}
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
