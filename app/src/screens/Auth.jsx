import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from '../components/Icon.jsx';
import { ease, dur } from '../lib/motion.js';
import '../styles/auth.css';

const COPY = {
  login: {
    title: 'Welcome back!',
    sub: 'Log in to pick up right where you left off.',
    cta: 'Log in',
    footLead: 'Don’t have an account?',
    footLink: 'Sign up here',
    other: 'signup',
  },
  signup: {
    title: 'Create your account',
    sub: 'Set up Nash for yourself or your team in under a minute.',
    cta: 'Sign up',
    footLead: 'Already have an account?',
    footLink: 'Log in',
    other: 'login',
  },
};

function Field({ label, value, onChange, placeholder, type = 'text', peekable, peeked, onPeek }) {
  return (
    <div className="fld">
      <label>{label}</label>
      <div className="inp">
        <input
          type={peekable && peeked ? 'text' : type}
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
        />
        {peekable && (
          <span className="eye" onClick={onPeek} role="button" aria-label="Toggle password">
            <Icon name={peeked ? 'eyeoff' : 'eye'} />
          </span>
        )}
      </div>
    </div>
  );
}

export default function Auth({ onDone }) {
  const [screen, setScreen] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [peeked, setPeeked] = useState(false);
  const [remember, setRemember] = useState(true);

  const c = COPY[screen];
  const ready = screen === 'login'
    ? Boolean(email.trim() && password)
    : Boolean(name.trim() && email.trim() && password);

  /* SSO needs no credentials — it signs you straight in.
     Only the email + password path waits for input. */
  const enter = () => onDone({
    name: name.trim() || 'Klair',
    email: email.trim() || 'claire@backboard.io',
  });
  const submit = () => { if (ready) enter(); };
  const swap = () => { setScreen(c.other); setPeeked(false); };

  return (
    <div className="auth">
      <div className="hero">
        <motion.div
          className="hero-blobs"
          animate={{ x: [0, -22, 0], y: [0, 18, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="hero-veil" />
        <span className="hero-mark">Nash</span>
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.05 }}
        >
          <h2>Every AI model.<br />One workspace. Zero lock-in.</h2>
          <p>Switch anytime. Your memory, your data, and your budget stay with you,
             not with any one AI company.</p>
        </motion.div>
      </div>

      <div className="cardpane">
        <span className="mob-mark">Nash</span>
        <AnimatePresence mode="wait">
          <motion.form
            key={screen}
            className="form"
            onSubmit={e => { e.preventDefault(); submit(); }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: dur.swap, ease }}
          >
            <div className="form-head">
              <h1>{c.title}</h1>
              <p>{c.sub}</p>
            </div>

            {screen === 'signup' && (
              <Field label="Name" value={name} onChange={setName} placeholder="Your name" />
            )}
            <Field label="Email" value={email} onChange={setEmail}
                   placeholder="Input your email" type="email" />
            <Field label="Password" value={password} onChange={setPassword}
                   placeholder="Input your password" type="password"
                   peekable peeked={peeked} onPeek={() => setPeeked(v => !v)} />

            {screen === 'login' && (
              <div className="remember">
                <div className={`me ${remember ? 'on' : ''}`} onClick={() => setRemember(v => !v)}>
                  <motion.span className="box" animate={{ scale: remember ? [1, .88, 1] : 1 }}
                               transition={{ duration: 0.22, ease }}>
                    <Icon name="check" size={11} />
                  </motion.span>
                  <span>Remember me</span>
                </div>
                <span className="forgot">Forgot password?</span>
              </div>
            )}

            <motion.button
              type="submit" className="primary" disabled={!ready}
              whileHover={ready ? { opacity: 0.9 } : {}}
              whileTap={ready ? { scale: 0.994 } : {}}
              transition={{ duration: dur.press, ease }}
            >
              {c.cta}
            </motion.button>

            <div className="divrow"><i /><span>Or continue with</span><i /></div>

            <div className="ssos">
              <motion.button type="button" className="sso" onClick={enter}
                whileHover={{ backgroundColor: 'rgba(255,255,255,.07)' }}
                whileTap={{ scale: 0.994 }} transition={{ duration: dur.hover, ease }}>
                <Icon name="google" /> Continue with Google
              </motion.button>
              <motion.button type="button" className="sso" onClick={enter}
                whileHover={{ backgroundColor: 'rgba(255,255,255,.07)' }}
                whileTap={{ scale: 0.994 }} transition={{ duration: dur.hover, ease }}>
                Continue with Backboard SSO
              </motion.button>
            </div>

            <div className="flink">
              <span>{c.footLead}</span>
              <button type="button" onClick={swap}>{c.footLink}</button>
            </div>
          </motion.form>
        </AnimatePresence>
      </div>
    </div>
  );
}
