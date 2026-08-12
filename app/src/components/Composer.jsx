import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from './Icon.jsx';
import { ease, dur, liquid } from '../lib/motion.js';

const TOOLS = [
  { icon:'temp',    label:'Temporary chat' },
  { icon:'servers', label:'Connectors' },
  { icon:'wave',    label:'Voice mode' },
  { icon:'gear',    label:'Chat settings' },
];

/* + morphs into − : the vertical bar collapses into the horizontal
   one. One continuous movement rather than an icon swap. */
function Morph({ open }) {
  return (
    <span className="morph">
      <motion.i className="bar h"
        animate={{ scaleX: open ? 0.82 : 1 }}
        transition={{ duration: dur.move, ease }} />
      <motion.i className="bar v"
        animate={{ scaleY: open ? 0 : 1, rotate: open ? 90 : 0 }}
        transition={{ duration: dur.move, ease }} />
    </span>
  );
}

const row = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.035, delayChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 6 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease } },
};

export default function Composer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="composerwrap">
      <motion.div
        className="composer"
        animate={{ borderRadius: open ? 20 : 22 }}
        transition={{ duration: dur.move, ease }}
      >
        <div className="crow">
          <motion.button className="round" onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Hide tools' : 'Show tools'}
            whileHover={{ backgroundColor: 'var(--border)' }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: dur.hover, ease }}>
            <Morph open={open} />
          </motion.button>

          <input placeholder="Ask anything..." />

          <motion.button className="modelpick"
            whileHover={{ backgroundColor: 'var(--hover)', color: 'var(--t1)' }}
            transition={{ duration: dur.hover, ease }}>
            GPT-4.1 <Icon name="chevD" size={14} />
          </motion.button>

          <motion.button className="round"
            whileHover={{ backgroundColor: 'var(--border)' }} whileTap={{ scale: 0.94 }}
            transition={{ duration: dur.hover, ease }}>
            <Icon name="mic" size={16} />
          </motion.button>

          <motion.button className="round accent"
            whileHover={{ opacity: 0.9 }} whileTap={{ scale: 0.94 }}
            transition={{ duration: dur.hover, ease }}>
            <Icon name="send" size={16} />
          </motion.button>
        </div>

        {/* height animates to the row's own size, with a spring so it
            settles rather than stopping dead. Eases closed too. */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div key="tools"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ height: liquid, opacity: { duration: 0.2, ease } }}
              style={{ overflow: 'hidden' }}
            >
              <motion.div className="trow" variants={row} initial="hidden" animate="show">
                <motion.button className="pill" variants={item}>
                  <Icon name="clip" size={15} /> Add File
                </motion.button>
                <motion.button className="pill" variants={item}>
                  <Icon name="image" size={15} /> Create Image
                </motion.button>
                <span className="sp" />
                {TOOLS.map(t => (
                  <motion.button key={t.icon} className="round sm" title={t.label} variants={item}>
                    <Icon name={t.icon} size={15} />
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
