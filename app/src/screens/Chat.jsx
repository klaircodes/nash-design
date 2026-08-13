import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from '../components/Icon.jsx';
import Composer from '../components/Composer.jsx';
import ModelPicker from '../components/ModelPicker.jsx';
import Message from '../components/Message.jsx';
import { CONVERSATIONS, REPLY, THINKING } from '../lib/data.js';
import { ease, liquid, liquidWide } from '../lib/motion.js';

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

export default function Chat({ user, sessionKey, openChat, mobile, drawer, onMenu, onNotify }) {
  const first = (user.name || 'there').split(' ')[0];
  const [thread, setThread] = useState([]);
  const scroller = useRef(null);

  /* New Chat empties the thread; opening one from the sidebar loads its own. */
  useEffect(() => { setThread([]); }, [sessionKey]);
  useEffect(() => {
    /* no shared fallback — a chat without its own thread opens empty */
    setThread(openChat ? (CONVERSATIONS[openChat.title] || []) : []);
  }, [openChat]);

  /* stay pinned to the newest message */
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [thread]);

  /* the reply lands after a beat, so the wait has something to show for itself */
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  /* forking keeps everything up to that reply and drops the rest, so the next
     thing you send continues from there instead of the end of the thread */
  const fork = i => {
    setThread(t => t.slice(0, i + 1));
    onNotify?.('Forked into a new chat', 'fork');
  };

  const send = text => {
    const word = THINKING[Math.floor(Math.random() * THINKING.length)];
    setThread(t => [...t, { role:'user', text }, { role:'bot', pending: word }]);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setThread(t => t.map(m => (m.pending ? { role:'bot', text: REPLY, model } : m)));
    }, 1500);
  };
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

      {thread.length === 0 ? (
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
      ) : (
        <div className="thread" ref={scroller}>
          <div className="threadin">
            {thread.map((m, i) => (
              <Message key={i} role={m.role} text={m.text} blocks={m.blocks}
                       pending={m.pending} failed={m.failed}
                       model={m.model || model} mobile={mobile} onNotify={onNotify}
                       onFork={() => fork(i)} />
            ))}
          </div>
        </div>
      )}

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


      <Composer model={model} onOpenPicker={openPicker} onSend={send}
                tools={tools} onToggleTools={toggleTools} />

      <AnimatePresence>{!mobile && picker && pick}</AnimatePresence>
    </div>
  );
}
