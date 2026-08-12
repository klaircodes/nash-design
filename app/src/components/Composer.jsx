import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from './Icon.jsx';
import { ease, dur, liquid } from '../lib/motion.js';
import useIsMobile from '../lib/useIsMobile.js';
import '../styles/models.css';

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

/* the model lives in Chat: on a phone the picker is a full screen of its own,
   so it can't be owned by the composer it sits above */
/* phone: the tool strip has nowhere to lay itself out, so the same accordion
   opens an "Add to Chat" panel instead of a row of pills */
const ADDLIST = [
  { icon:'temp',    label:'Temp Chat' },
  { icon:'servers', label:'MCP Servers', more:true },
  { icon:'wave',    label:'Voice Mode' },
];

export default function Composer({ model, onOpenPicker }) {
  const [open, setOpen] = useState(false);
  const mobile = useIsMobile();

  const AddToChat = () => (
    <div className="addto">
      <div className="addto-head">
        <h4>Add to Chat</h4>
        <motion.button className="addto-x" onClick={() => setOpen(false)} aria-label="Close"
          whileTap={{ scale: 0.9 }} transition={{ duration: dur.hover, ease }}>
          <Icon name="x" size={15} />
        </motion.button>
      </div>

      <motion.div className="tiles" variants={row} initial="hidden" animate="show">
        <motion.button className="tile" variants={item}>
          <Icon name="clip" size={21} /><span>Add File</span>
        </motion.button>
        <motion.button className="tile" variants={item}>
          <Icon name="image" size={21} /><span>Image</span>
        </motion.button>
      </motion.div>

      <motion.div className="group" variants={row} initial="hidden" animate="show">
        {ADDLIST.map(a => (
          <motion.button key={a.label} className="grow" variants={item}>
            <Icon name={a.icon} size={17} /><span>{a.label}</span>
            {a.more && <Icon name="chevR" size={15} />}
          </motion.button>
        ))}
      </motion.div>

      <motion.div className="group" variants={row} initial="hidden" animate="show">
        <motion.button className="grow" variants={item}>
          <Icon name="gear" size={17} /><span>Settings</span><Icon name="chevR" size={15} />
        </motion.button>
      </motion.div>
    </div>
  );

  return (
    <div className="composerwrap">
      <AnimatePresence initial={false}>
        {open && mobile && (
          <motion.div key="addto"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: liquid, opacity: { duration: 0.2, ease } }}
            style={{ overflow: 'hidden' }}
          >
            <AddToChat />
          </motion.div>
        )}
      </AnimatePresence>

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

          <motion.button className="modelpick" onClick={onOpenPicker}
            whileHover={{ backgroundColor: 'var(--hover)', color: 'var(--t1)' }}
            transition={{ duration: dur.hover, ease }}>
            <span className="mname">{model}</span> <Icon name="chevD" size={14} />
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
          {open && !mobile && (
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

      <p className="disclaim">Nash can make mistakes. Please double-check responses.</p>
    </div>
  );
}
