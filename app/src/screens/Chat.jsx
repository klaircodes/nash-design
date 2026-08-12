import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from '../components/Icon.jsx';
import Composer from '../components/Composer.jsx';
import ModelPicker from '../components/ModelPicker.jsx';
import { ease, liquid, liquidWide } from '../lib/motion.js';

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

export default function Chat({ user, sessionKey, mobile, drawer, onMenu }) {
  const first = (user.name || 'there').split(' ')[0];
  const [picker, setPicker] = useState(false);
  const [tools, setTools]   = useState(false);

  /* on a phone both panels occupy the same slab above the composer, so opening
     one closes the other rather than stacking them */
  const openPicker  = () => { if (mobile) setTools(false); setPicker(true); };
  const toggleTools = () => { if (mobile) setPicker(false); setTools(v => !v); };
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
        {/* same element as the one beside the open drawer — shared layoutId, so
            it travels there instead of one vanishing and another appearing */}
        {mobile && !drawer && (
          <motion.button className="menu" layoutId="sbtoggle" onClick={onMenu}
            aria-label="Open sidebar" whileTap={{ scale: 0.9 }} transition={liquidWide}>
            <Icon name="panel" size={19} />
          </motion.button>
        )}
        <button className="more"><Icon name="dotsH" size={18} /></button>
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

      {/* phone: opens above the composer at roughly the height of Add to Chat,
          scrolling inside itself — the conversation stays on screen */}
      <AnimatePresence initial={false}>
        {mobile && picker && (
          <motion.div key="pick" className="pickhost"
            /* a fixed height, not the content's — three results and thirty
               should open to the same panel */
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '52vh', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: liquid, opacity: { duration: 0.2, ease } }}
            style={{ overflow: 'hidden' }}>
            {pick}
          </motion.div>
        )}
      </AnimatePresence>


      <Composer model={model} onOpenPicker={openPicker}
                tools={tools} onToggleTools={toggleTools} />

      <AnimatePresence>{!mobile && picker && pick}</AnimatePresence>
    </div>
  );
}
