import { motion } from 'motion/react';
import Icon from '../components/Icon.jsx';
import Composer from '../components/Composer.jsx';
import { ease } from '../lib/motion.js';

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

export default function Chat({ user, sessionKey }) {
  const first = (user.name || 'there').split(' ')[0];
  return (
    <div className="main">
      <div className="topbar">
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
