import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from '../components/Icon.jsx';
import Composer from '../components/Composer.jsx';
import ModelPicker from '../components/ModelPicker.jsx';
import { ease } from '../lib/motion.js';

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

export default function Chat({ user, sessionKey, mobile, onMenu }) {
  const first = (user.name || 'there').split(' ')[0];
  const [picker, setPicker] = useState(false);
  const [model, setModel]   = useState('GPT-4.1');
  const [pinned, setPinned] = useState(['Claude Opus 4.8', 'GPT-5']);

  const togglePin = name =>
    setPinned(p => p.includes(name) ? p.filter(x => x !== name) : [...p, name]);

  const pick = (
    <ModelPicker open={picker} model={model} pinned={pinned}
      onPick={name => { setModel(name); setPicker(false); }}
      onPin={togglePin} onClose={() => setPicker(false)} inline={mobile} />
  );
  return (
    <div className="main">
      <div className="topbar">
        {mobile && (
          <motion.button className="menu" onClick={onMenu} aria-label="Open sidebar"
            whileTap={{ scale: 0.9 }}>
            <Icon name="panel" size={19} />
          </motion.button>
        )}
        {mobile && <span className="wordmark">Nash</span>}
        <button className="more"><Icon name="dotsH" size={18} /></button>
      </div>
      {/* on a phone the picker replaces the conversation instead of covering it */}
      <AnimatePresence mode="wait" initial={false}>
        {mobile && picker ? (
          <motion.div key="pick" className="pickhost">{pick}</motion.div>
        ) : (
          <motion.div key="body" className="chatbody"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease }}>
            <motion.h1
              key={sessionKey}
              className="greet"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease }}
            >
              {greeting()}, {first}
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <Composer model={model} onOpenPicker={() => setPicker(true)} />

      <AnimatePresence>{!mobile && picker && pick}</AnimatePresence>
    </div>
  );
}
