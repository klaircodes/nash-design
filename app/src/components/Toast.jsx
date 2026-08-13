import { motion } from 'motion/react';
import Icon from './Icon.jsx';
import { liquid } from '../lib/motion.js';

/* Every notification in the app is this shape: a glyph, the message, an
   optional action, and a dismiss. Nothing renders its own variant. */
export default function Toast({ icon = 'check', tone, children, action, onClose }) {
  return (
    <motion.div className={`toast ${tone || ''}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={liquid}>
      <Icon name={icon} size={17} />
      <span>{children}</span>
      {action && (
        <button className="act" onClick={action.onClick}>{action.label}</button>
      )}
      {onClose && (
        <button className="x" onClick={onClose} aria-label="Dismiss">
          <Icon name="x" size={14} />
        </button>
      )}
    </motion.div>
  );
}
