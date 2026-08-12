import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Auth from './screens/Auth.jsx';
import Chat from './screens/Chat.jsx';
import Memories from './screens/Memories.jsx';
import Sidebar from './components/Sidebar.jsx';
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
                   openChat={openChat}
                   onOpenChat={c => {
                     setOpenChat(c ? { ...c, at: Date.now() } : null);
                     if (c) { setView('chat'); setDrawer(false); }
                   }}
                   mobile={mobile} drawer={drawer}
                   collapsed={mobile ? false : collapsed}
                   onToggle={() => mobile ? setDrawer(false) : setCollapsed(v => !v)} />
          {view === 'memories'
            ? <Memories mobile={mobile} drawer={drawer} onMenu={() => setDrawer(true)} />
            : <Chat user={user} sessionKey={session} openChat={openChat} mobile={mobile}
                    drawer={drawer} onMenu={() => setDrawer(true)} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
