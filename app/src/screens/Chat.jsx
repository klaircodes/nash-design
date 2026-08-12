import { motion, AnimatePresence } from 'motion/react';
import Icon from '../components/Icon.jsx';
import Composer from '../components/Composer.jsx';
import { ease } from '../lib/motion.js';

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

export default function Chat({ user, sessionKey, collapsed, onToggle }) {
  const first = (user.name || 'there').split(' ')[0];
  return (
    <div className="main">
      <div className="topbar">
        <div className="left">
          <AnimatePresence initial={false}>
            {collapsed && (
              <motion.div key="mark" className="left"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.22, ease, delay: collapsed ? 0.1 : 0 }}
              >
                <b>nash:</b>
                <motion.button className="panel" onClick={onToggle}
                  aria-label="Expand sidebar"
                  whileHover={{ color: 'var(--t1)' }} whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.16, ease }}>
                  <Icon name="panel" size={18} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button className="more"><Icon name="dots" size={18} /></button>
      </div>
      <div className="chatbody">
        <motion.h1
          key={sessionKey}
          className="greet"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
        >
          {greeting()}, {first}
        </motion.h1>
      </div>
      <Composer />
    </div>
  );
}
