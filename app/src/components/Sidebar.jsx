import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from './Icon.jsx';
import { ease, dur } from '../lib/motion.js';
import { FOLDERS, CHATS, GROUP_ORDER } from '../lib/data.js';

/* One collapsible section. Motion animates height to auto, which
   CSS cannot do, and it eases closed as well as open. */
function Collapse({ open, children }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="c"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ height: { duration: dur.move, ease }, opacity: { duration: 0.2, ease } }}
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

function ChatRow({ title, pinned, nested }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      className={`chatrow ${nested ? 'nested' : ''}`}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      animate={{ backgroundColor: hover ? 'var(--hover)' : 'rgba(0,0,0,0)',
                 color: hover ? 'var(--t1)' : 'var(--t2)' }}
      transition={{ duration: dur.hover, ease }}
    >
      <span className="title">{title}</span>
      <AnimatePresence>
        {hover && (
          <motion.span className="dots" key="d"
            initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 14 }}
            exit={{ opacity: 0, width: 0 }} transition={{ duration: dur.hover, ease }}>
            <Icon name="dots" size={14} />
          </motion.span>
        )}
      </AnimatePresence>
      {/* the pin is a data state, so it stays anchored furthest right */}
      {pinned && <span className="pin"><Icon name="pin" size={13} /></span>}
    </motion.div>
  );
}

const NAV = [
  { icon:'plus',     label:'New Chat' },
  { icon:'bookmark', label:'Bookmarks' },
  { icon:'users',    label:'Persona Marketplace' },
  { icon:'dots',     label:'More' },
];

export default function Sidebar({ user, onNewChat }) {
  const [chatsOpen, setChatsOpen] = useState(true);
  const [foldersOpen, setFoldersOpen] = useState(true);
  const [open, setOpen] = useState({ work:true, research:false, personal:false });

  const pinned = CHATS.filter(c => c.pinned);
  const groups = GROUP_ORDER
    .map(g => [g, CHATS.filter(c => c.group === g && !c.pinned)])
    .filter(([, rows]) => rows.length);

  return (
    <aside className="sidebar">
      <div className="sb-head">
        <div className="brand"><b>nash:</b><span className="panel"><Icon name="panel" size={18} /></span></div>
        <div className="gap" />
        <div className="org"><Icon name="user" size={15} /><span style={{flex:1}}>Personal</span><Icon name="chevD" size={14} /></div>
        <div className="gap" />
        <div className="searchfield"><Icon name="search" size={14} /><span>Search messages</span></div>
        <div className="gap" />
        {NAV.map(n => (
          <motion.button
            key={n.label}
            className={`navitem ${n.label === 'New Chat' ? 'active' : ''}`}
            onClick={n.label === 'New Chat' ? onNewChat : undefined}
            whileHover={{ backgroundColor:'var(--hover)', color:'var(--t1)' }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: dur.hover, ease }}
          >
            <Icon name={n.icon} size={16} /><span>{n.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="sb-scroll">
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
                  {f.chats.map(c => <ChatRow key={c} title={c} nested />)}
                </Collapse>
              </div>
            ))}
          </Collapse>

          {pinned.length > 0 && (
            <>
              <div className="datemark first">Pinned</div>
              {pinned.map((c, i) => <ChatRow key={`p${i}`} {...c} />)}
            </>
          )}
          {groups.map(([label, rows]) => (
            <div key={label}>
              <div className="datemark">{label}</div>
              {rows.map((c, i) => <ChatRow key={`${label}${i}`} {...c} />)}
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
      </div>
    </aside>
  );
}
