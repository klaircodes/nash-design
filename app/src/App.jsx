import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Auth from './screens/Auth.jsx';
import Chat from './screens/Chat.jsx';
import Memories from './screens/Memories.jsx';
import Sidebar from './components/Sidebar.jsx';
import Toast from './components/Toast.jsx';
import Icon from './components/Icon.jsx';
import { ease, liquidWide } from './lib/motion.js';
import useIsMobile from './lib/useIsMobile.js';
import './styles/shell.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(0);   // bumping this starts a fresh chat
  const [collapsed, setCollapsed] = useState(false);
  const [drawer, setDrawer]       = useState(false);
  const [openChat, setOpenChat]   = useState(null);
  const [view, setView]           = useState('chat');
  const [useMemory, setUseMemory] = useState(true);
  const [note, setNote]           = useState(null);
  const [forks, setForks]         = useState([]);

  /* a fork becomes a chat of its own: it lands in the sidebar and opens */
  const addFork = (title, messages) => {
    const id = `fk${Date.now()}`;
    const entry = { id, title, messages, group: 'Today', pinned: false };
    setForks(f => [...f, entry]);
    setOpenChat({ ...entry, at: Date.now() });
    setView('chat');
    notify('Forked into a new chat', 'fork');
  };

  /* one place for app-wide confirmations, bottom right like every other toast */
  const notify = (msg, icon) => setNote({ msg, icon, at: Date.now() });
  useEffect(() => {
    if (!note) return;
    const t = setTimeout(() => setNote(null), 2600);
    return () => clearTimeout(t);
  }, [note]);
  const mobile = useIsMobile();

  return (
    <AnimatePresence mode="wait">
      {!user ? (
        <motion.div key="auth" style={{ height:'100%' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease }}>
          <Auth onDone={setUser} />
        </motion.div>
      ) : (
        <motion.div key="app" className="shell"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.28, ease }}>
          {/* on mobile the panel leaves the flow entirely and slides over the
              chat as a drawer; on desktop it collapses in place as before */}
          <AnimatePresence>
            {mobile && drawer && (
              <motion.div className="drawerscrim" onClick={() => setDrawer(false)}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease }}>
                <motion.button className="drawerclose" layoutId="sbtoggle"
                  aria-label="Close sidebar" onClick={() => setDrawer(false)}
                  whileTap={{ scale: 0.9 }} transition={liquidWide}>
                  <Icon name="panel" size={19} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <Sidebar user={user}
                   onNewChat={() => {
                     setSession(s => s + 1); setOpenChat(null);
                     setView('chat'); setDrawer(false);
                   }}
                   view={view} onNav={v => { setView(v); setDrawer(false); }}
                   onNotify={notify} extraChats={forks}
                   openChat={openChat}
                   onOpenChat={c => {
                     setOpenChat(c ? { ...c, at: Date.now() } : null);
                     if (c) { setView('chat'); setDrawer(false); }
                   }}
                   mobile={mobile} drawer={drawer}
                   collapsed={mobile ? false : collapsed}
                   onToggle={() => mobile ? setDrawer(false) : setCollapsed(v => !v)} />
          {view === 'memories'
            ? <Memories mobile={mobile} drawer={drawer} onMenu={() => setDrawer(true)}
                        use={useMemory} onUse={setUseMemory} />
            : <Chat user={user} sessionKey={session} openChat={openChat} mobile={mobile}
                    drawer={drawer} onMenu={() => setDrawer(true)} onNotify={notify}
                    onFork={addFork} />}
          <div className="toasts">
            <AnimatePresence initial={false}>
              {note && (
                <Toast key="note" icon={note.icon} onClose={() => setNote(null)}>
                  {note.msg}
                </Toast>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
