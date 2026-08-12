import { motion } from 'motion/react';
import Icon from '../components/Icon.jsx';
import { ease } from '../lib/motion.js';

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

/* Static for now — the composer becomes interactive next increment. */
function Composer() {
  return (
    <div className="composerwrap">
      <div className="composer">
        <div className="crow">
          <span className="round"><Icon name="plus" size={17} /></span>
          <input placeholder="Ask anything..." />
          <span className="modelpick">GPT-4.1 <Icon name="chevD" size={14} /></span>
          <span className="round"><Icon name="mic" size={16} /></span>
          <span className="round accent"><Icon name="send" size={16} /></span>
        </div>
      </div>
    </div>
  );
}

export default function Chat({ user, sessionKey }) {
  const first = (user.name || 'there').split(' ')[0];
  return (
    <div className="main">
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
