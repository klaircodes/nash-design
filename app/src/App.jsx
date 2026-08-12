import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Auth from './screens/Auth.jsx';
import Chat from './screens/Chat.jsx';
import Sidebar from './components/Sidebar.jsx';
import { ease } from './lib/motion.js';
import './styles/shell.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(0);   // bumping this starts a fresh chat
  const [collapsed, setCollapsed] = useState(false);

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
          <Sidebar user={user} onNewChat={() => setSession(s => s + 1)}
                   collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />
          <Chat user={user} sessionKey={session}
                collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
