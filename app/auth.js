/* ============================================================
   Nash — authentication
   Screens: signin · signup · forgot · sent · reset · verify · twofa
            · workspace · done
   Every field validates on blur and on submit. Every failure the
   server could realistically return has a state here.
   ============================================================ */

(function () {
const A = {
  screen: 'signin',
  email: '', password: '', name: '', confirm: '',
  code: ['','','','','',''],
  remember: true, terms: false,
  peek: false, caps: false,
  errors: {},          // field -> message
  alert: null,         // {tone, title, body, action, onAction}
  busy: false,
  attempts: 0,
  lockUntil: 0,        // epoch ms
  resendUntil: 0,      // epoch ms
  pendingEmail: '',
  reason: null         // arrived here because of ...
};

/* ---------- demo accounts, so every edge case is reachable ---------- */
const ACCOUNTS = {
  'unverified@nash.io': 'unverified',
  '2fa@nash.io':        'twofa',
  'multi@nash.io':      'workspace',
  'err@nash.io':        'server',
  'taken@nash.io':      'taken'
};
const OTP_OK = '123456';
const OTP_EXPIRED = '000000';

/* ---------- validation ---------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function strength(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[0-9]/.test(pw) && /[a-z]/i.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 4);
}
const STRENGTH_LABEL = ['', 'Too weak', 'Weak', 'Good', 'Strong'];

function validate(fields) {
  const e = {};
  if (fields.includes('name') && !A.name.trim()) e.name = 'Enter your name.';
  if (fields.includes('email')) {
    if (!A.email.trim()) e.email = 'Enter your email address.';
    else if (!EMAIL_RE.test(A.email.trim())) e.email = 'That doesn’t look like an email address.';
  }
  if (fields.includes('password')) {
    if (!A.password) e.password = 'Enter your password.';
    else if (A.screen === 'signup' && A.password.length < 8)
      e.password = 'Use at least 8 characters.';
    else if (A.screen === 'signup' && strength(A.password) < 2)
      e.password = 'Mix in a number or a symbol.';
  }
  if (fields.includes('confirm')) {
    if (!A.confirm) e.confirm = 'Re-enter your password.';
    else if (A.confirm !== A.password) e.confirm = 'Passwords don’t match.';
  }
  if (fields.includes('terms') && !A.terms) e.terms = 'Accept the terms to continue.';
  return e;
}

/* ---------- icons ---------- */
const ic = (n, s = 16) => window.__ico(n, s);

/* ---------- small builders ---------- */
function field(key, label, opts = {}) {
  const bad = A.errors[key];
  const type = opts.type || 'text';
  const isPw = type === 'password';
  const shown = isPw && A.peek ? 'text' : type;
  return `
  <div class="f ${bad ? 'bad' : ''}">
    <label>${label}${opts.aside || ''}</label>
    <div class="inpwrap">
      ${opts.icon ? `<span class="lead">${ic(opts.icon, 16)}</span>` : ''}
      <input id="fld-${key}" type="${shown}" value="${A[key] || ''}"
             placeholder="${opts.placeholder || ''}"
             autocomplete="${opts.autocomplete || 'off'}"
             ${opts.inputmode ? `inputmode="${opts.inputmode}"` : ''}>
      ${isPw ? `<span class="peek" data-peek>${ic(A.peek ? 'eyeoff' : 'eye', 16)}</span>` : ''}
    </div>
    ${bad ? `<div class="err">${ic('alert', 13)}${bad}</div>` : ''}
    ${!bad && opts.hint ? `<div class="hint">${opts.hint}</div>` : ''}
    ${isPw && A.caps ? `<div class="caps">${ic('alert', 13)}Caps Lock is on.</div>` : ''}
    ${opts.meter ? meter() : ''}
  </div>`;
}
function meter() {
  const s = strength(A.password);
  return `<div class="meter s${s}"><i></i><i></i><i></i><i></i></div>
          ${A.password ? `<div class="meterlabel">${STRENGTH_LABEL[s]}</div>` : ''}`;
}
function alertBox() {
  if (!A.alert) return '';
  const a = A.alert;
  return `<div class="alert ${a.tone}">
    ${ic(a.tone === 'ok' ? 'check' : 'alert', 15)}
    <div><b>${a.title}</b>${a.body ? `<p>${a.body}</p>` : ''}
      ${a.action ? `<span class="act" data-alertact>${a.action}</span>` : ''}</div>
  </div>`;
}
function submitBtn(label, id) {
  return `<button class="submit" data-submit="${id}" ${A.busy ? 'disabled' : ''}>
    ${A.busy ? `${ic('spin', 17)}<span>Just a moment…</span>`
             : `<span>${label}</span>`}
  </button>`;
}
function lockNotice() {
  const left = Math.ceil((A.lockUntil - Date.now()) / 1000);
  if (left <= 0) return '';
  return `<div class="alert warn">${ic('alert', 15)}
    <div><b>Too many attempts</b>
      <p>For your security, try again in <span class="mono">${left}s</span>.</p></div></div>`;
}

/* ---------- screens ---------- */
function signin() {
  const locked = A.lockUntil > Date.now();
  return `
  <div class="auth-head">
    <h1>Sign in to Nash</h1>
    <p>Your chats, connectors and saved answers, wherever you left them.</p>
  </div>
  ${locked ? lockNotice() : alertBox()}
  ${field('email','Email',{type:'email',icon:'mail',placeholder:'you@company.com',
      autocomplete:'email',inputmode:'email'})}
  ${field('password','Password',{type:'password',icon:'lock',placeholder:'••••••••',
      autocomplete:'current-password',
      aside:'<a data-go="forgot">Forgot?</a>'})}
  <div class="check ${A.remember ? 'on' : ''}" data-check="remember">
    <span class="box">${ic('check',12)}</span><span>Keep me signed in on this device</span>
  </div>
  ${submitBtn('Sign in','signin')}
  <div class="orline"><span>or</span></div>
  <div class="sso">
    <button class="ssobtn" data-sso="Google">${ic('google',17)}Continue with Google</button>
    <button class="ssobtn" data-sso="SSO">${ic('shield',17)}Continue with SSO</button>
  </div>
  <div class="demo">
    <b>Try the edge cases</b>
    Password <code>wrong</code> fails · 5 failures locks the form<br>
    <code>unverified@nash.io</code> · <code>2fa@nash.io</code> · <code>multi@nash.io</code> · <code>err@nash.io</code>
  </div>`;
}

function signup() {
  return `
  <div class="auth-head">
    <h1>Create your account</h1>
    <p>Free to start. No card, no trial clock.</p>
  </div>
  ${alertBox()}
  ${field('name','Full name',{icon:'user',placeholder:'Claire Sarcia',autocomplete:'name'})}
  ${field('email','Work email',{type:'email',icon:'mail',placeholder:'you@company.com',
      autocomplete:'email',inputmode:'email'})}
  ${field('password','Password',{type:'password',icon:'lock',placeholder:'At least 8 characters',
      autocomplete:'new-password',meter:true})}
  <div class="check ${A.terms ? 'on' : ''} ${A.errors.terms ? 'bad' : ''}" data-check="terms">
    <span class="box">${ic('check',12)}</span>
    <span>I agree to the <a>Terms of Service</a> and <a>Privacy Policy</a>.</span>
  </div>
  ${A.errors.terms ? `<div class="err" style="margin:-12px 0 16px">${ic('alert',13)}${A.errors.terms}</div>` : ''}
  ${submitBtn('Create account','signup')}
  <div class="orline"><span>or</span></div>
  <div class="sso">
    <button class="ssobtn" data-sso="Google">${ic('google',17)}Sign up with Google</button>
  </div>
  <div class="demo">
    <b>Try the edge cases</b>
    <code>taken@nash.io</code> is already registered · short or simple passwords are rejected
  </div>`;
}

function forgot() {
  return `
  <div class="backlink" data-go="signin">${ic('back',15)}Back to sign in</div>
  <div class="auth-head">
    <h1>Reset your password</h1>
    <p>Enter the email on your account and we’ll send a link to set a new password.</p>
  </div>
  ${alertBox()}
  ${field('email','Email',{type:'email',icon:'mail',placeholder:'you@company.com',
      autocomplete:'email',inputmode:'email'})}
  ${submitBtn('Send reset link','forgot')}`;
}

function sent() {
  const wait = Math.ceil((A.resendUntil - Date.now()) / 1000);
  return `
  <div class="done authswap">
    <div class="seal">${ic('mail',24)}</div>
    <div class="auth-head">
      <h1>Check your email</h1>
      <p>If an account exists for <b style="color:var(--t2)">${A.pendingEmail}</b>,
         a reset link is on its way. It expires in 30 minutes.</p>
    </div>
    ${alertBox()}
    <button class="submit" data-submit="opendemo"><span>I’ve got the link</span></button>
    <div style="margin-top:16px;font-size:12.5px;color:var(--t3)">
      Didn’t get it?
      ${wait > 0
        ? `<span class="mono">Resend in ${wait}s</span>`
        : `<a style="color:var(--t1);font-weight:500;cursor:pointer" data-resend>Resend email</a>`}
    </div>
    <div class="demo" style="margin-top:22px">
      <b>Note</b>
      We never confirm whether an address is registered — that would let anyone
      enumerate your users.
    </div>
  </div>`;
}

function reset() {
  return `
  <div class="auth-head">
    <h1>Set a new password</h1>
    <p>Choose something you haven’t used here before.</p>
  </div>
  ${alertBox()}
  ${field('password','New password',{type:'password',icon:'lock',
      placeholder:'At least 8 characters',autocomplete:'new-password',meter:true})}
  ${field('confirm','Confirm password',{type:'password',icon:'lock',
      placeholder:'Re-enter it',autocomplete:'new-password'})}
  ${submitBtn('Save and sign in','reset')}`;
}

function verify() {
  const wait = Math.ceil((A.resendUntil - Date.now()) / 1000);
  return `
  <div class="backlink" data-go="signin">${ic('back',15)}Use a different account</div>
  <div class="auth-head">
    <h1>Verify your email</h1>
    <p>We sent a 6-digit code to <b style="color:var(--t2)">${A.pendingEmail}</b>.</p>
  </div>
  ${alertBox()}
  <div class="otp ${A.errors.code ? 'bad' : ''}">
    ${A.code.map((v,i) => `<input data-otp="${i}" inputmode="numeric" maxlength="1" value="${v}">`).join('')}
  </div>
  ${A.errors.code ? `<div class="err" style="margin-bottom:14px">${ic('alert',13)}${A.errors.code}</div>` : ''}
  <div style="height:10px"></div>
  ${submitBtn('Verify','verify')}
  <div style="margin-top:16px;font-size:12.5px;color:var(--t3)">
    ${wait > 0 ? `<span class="mono">Resend code in ${wait}s</span>`
               : `<a style="color:var(--t1);font-weight:500;cursor:pointer" data-resend>Resend code</a>`}
  </div>
  <div class="demo">
    <b>Try the edge cases</b>
    <code>123456</code> works · <code>000000</code> is expired · anything else is wrong
  </div>`;
}

function twofa() {
  return `
  <div class="backlink" data-go="signin">${ic('back',15)}Back to sign in</div>
  <div class="auth-head">
    <h1>Two-step verification</h1>
    <p>Enter the 6-digit code from your authenticator app.</p>
  </div>
  ${alertBox()}
  <div class="otp ${A.errors.code ? 'bad' : ''}">
    ${A.code.map((v,i) => `<input data-otp="${i}" inputmode="numeric" maxlength="1" value="${v}">`).join('')}
  </div>
  ${A.errors.code ? `<div class="err" style="margin-bottom:14px">${ic('alert',13)}${A.errors.code}</div>` : ''}
  <div style="height:10px"></div>
  ${submitBtn('Verify','twofa')}
  <div style="margin-top:16px;font-size:12.5px;color:var(--t3)">
    Lost your device? <a style="color:var(--t1);font-weight:500;cursor:pointer">Use a recovery code</a>
  </div>
  <div class="demo"><b>Try the edge cases</b><code>123456</code> works · anything else is rejected</div>`;
}

const WORKSPACES = [
  ['B','Backboard','Owner · 12 members'],
  ['N','Nash Labs','Admin · 4 members'],
  ['P','Personal','Just you']
];
function workspace() {
  return `
  <div class="auth-head">
    <h1>Choose a workspace</h1>
    <p>You belong to more than one. You can switch at any time.</p>
  </div>
  <div class="wslist">
    ${WORKSPACES.map(([k,n,m]) => `
      <button class="wsrow" data-ws="${n}">
        <span class="sq">${k}</span>
        <span class="tt"><b>${n}</b><small>${m}</small></span>
        ${ic('chevR',16)}
      </button>`).join('')}
  </div>`;
}

/* ---------- shell ---------- */
const SCREENS = { signin, signup, forgot, sent, reset, verify, twofa, workspace };
const FOOT = {
  signin: `Don’t have an account? <a data-go="signup">Create one</a>`,
  signup: `Already have an account? <a data-go="signin">Sign in</a>`,
  forgot: `Remembered it? <a data-go="signin">Sign in</a>`,
  workspace: `Wrong account? <a data-go="signin">Sign out</a>`
};

function render() {
  const body = (SCREENS[A.screen] || signin)();
  document.getElementById('app').innerHTML = `
  <div class="auth">
    <div class="auth-pane">
      <div class="auth-brand"><b>nash:</b></div>
      <div class="auth-form authswap" key="${A.screen}">${body}</div>
      <div class="auth-foot">${FOOT[A.screen] || ''}</div>
    </div>
    <div class="auth-side">
      <div class="marks">
        <span class="mark">${ic('shield',15)}SOC 2 Type II</span>
        <span class="mark">${ic('lock',15)}Encrypted at rest</span>
        <span class="mark">${ic('plug',15)}17,000+ models</span>
      </div>
      <div class="quote">
        <p>“Every answer worth keeping, kept — with the question that produced it.”</p>
        <small>Nash · connectors, personas and memory in one place</small>
      </div>
    </div>
  </div>
  <button class="themebtn" data-theme style="position:fixed">
    ${ic(document.documentElement.dataset.theme === 'dark' ? 'sun' : 'moon', 14)}
    ${document.documentElement.dataset.theme === 'dark' ? 'Light' : 'Dark'}
  </button>`;
  restoreFocus();
}

/* keep the caret where the user left it across re-renders */
let focusKey = null, caret = 0;
function restoreFocus() {
  if (!focusKey) return;
  const el = document.getElementById(focusKey);
  if (el) { el.focus(); try { el.setSelectionRange(caret, caret); } catch (e) {} }
}

/* ---------- flow ---------- */
function go(screen, opts = {}) {
  A.screen = screen;
  A.errors = {};
  if (!opts.keepAlert) A.alert = null;
  if (!opts.keepCode) A.code = ['','','','','',''];
  A.busy = false; A.peek = false;
  focusKey = null;
  render();
}
function fail(title, body, extra = {}) {
  A.busy = false;
  A.alert = { tone:'err', title, body, ...extra };
  render();
}
function work(ms, done) {
  A.busy = true; A.alert = null; render();
  setTimeout(done, ms);
}
function finish() {
  const session = { email:A.email || A.pendingEmail, name:A.name || 'Klair', at:Date.now() };
  try { localStorage.setItem('nash.session', JSON.stringify(session)); } catch (e) {}
  document.getElementById('app').style.opacity = '0';
  document.getElementById('app').style.transition = 'opacity .28s var(--ease)';
  setTimeout(() => {
    document.getElementById('app').style.opacity = '';
    window.NashApp.mount();
  }, 280);
}

function doSignin() {
  const e = validate(['email','password']);
  A.errors = e;
  if (Object.keys(e).length) { render(); return; }
  work(900, () => {
    const kind = ACCOUNTS[A.email.trim().toLowerCase()];
    if (kind === 'server')
      return fail('Something went wrong at our end',
        'Your details were fine — we just could not reach the service. Nothing was changed.',
        { action:'Try again', onAction: doSignin });
    if (A.password === 'wrong') {
      A.attempts++;
      if (A.attempts >= 5) {
        A.lockUntil = Date.now() + 30000;
        A.attempts = 0;
        A.busy = false; A.alert = null; render(); tick();
        return;
      }
      return fail('That email or password is wrong',
        `Check both and try again. ${5 - A.attempts} attempt${5-A.attempts===1?'':'s'} left before we pause sign-in.`);
    }
    if (kind === 'unverified') {
      A.pendingEmail = A.email; A.resendUntil = Date.now() + 45000;
      go('verify'); tick();
      A.alert = { tone:'warn', title:'Verify your email first',
        body:'We sent a new code just now.' };
      render();
      return;
    }
    if (kind === 'twofa') { go('twofa'); return; }
    if (kind === 'workspace') { go('workspace'); return; }
    finish();
  });
}
function doSignup() {
  const e = validate(['name','email','password','terms']);
  A.errors = e;
  if (Object.keys(e).length) { render(); return; }
  work(1000, () => {
    if (ACCOUNTS[A.email.trim().toLowerCase()] === 'taken')
      return fail('That email is already registered',
        'Sign in instead, or reset the password if you have forgotten it.',
        { action:'Go to sign in', onAction: () => go('signin') });
    A.pendingEmail = A.email;
    A.resendUntil = Date.now() + 45000;
    go('verify'); tick();
  });
}
function doForgot() {
  const e = validate(['email']);
  A.errors = e;
  if (Object.keys(e).length) { render(); return; }
  work(850, () => {
    A.pendingEmail = A.email;
    A.resendUntil = Date.now() + 45000;
    go('sent'); tick();
  });
}
function doReset() {
  const e = validate(['password','confirm']);
  A.errors = e;
  if (Object.keys(e).length) { render(); return; }
  work(900, () => finish());
}
function doCode(next) {
  const code = A.code.join('');
  if (code.length < 6) {
    A.errors = { code:'Enter all six digits.' };
    render(); return;
  }
  work(850, () => {
    if (code === OTP_EXPIRED) {
      A.busy = false;
      A.errors = { code:'That code has expired. Request a new one.' };
      A.code = ['','','','','',''];
      render(); return;
    }
    if (code !== OTP_OK) {
      A.busy = false;
      A.errors = { code:'That code isn’t right. Check and try again.' };
      A.code = ['','','','','',''];
      render();
      const first = document.querySelector('[data-otp="0"]');
      if (first) first.focus();
      return;
    }
    next();
  });
}

/* countdown ticker for lockout + resend */
let ticking = false;
function tick() {
  if (ticking) return;
  ticking = true;
  const iv = setInterval(() => {
    const needs = A.lockUntil > Date.now() || A.resendUntil > Date.now();
    if (!needs) { clearInterval(iv); ticking = false; }
    if (['signin','sent','verify'].includes(A.screen)) render();
  }, 1000);
}

/* ---------- events ---------- */
function onClick(e) {
  const t = e.target.closest('[data-go],[data-submit],[data-check],[data-peek],[data-sso],[data-ws],[data-resend],[data-alertact],[data-theme]');
  if (!t) return;
  const d = t.dataset;

  if (d.theme !== undefined) {
    const cur = document.documentElement.dataset.theme;
    document.documentElement.dataset.theme = cur === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('nash.theme', document.documentElement.dataset.theme); } catch (x) {}
    render(); return;
  }
  if (d.go) { go(d.go); return; }
  if (d.peek !== undefined) { A.peek = !A.peek; render(); return; }
  if (d.check) { A[d.check] = !A[d.check]; delete A.errors[d.check]; render(); return; }
  if (d.alertact && A.alert && A.alert.onAction) { A.alert.onAction(); return; }
  if (d.resend !== undefined) {
    A.resendUntil = Date.now() + 45000;
    A.alert = { tone:'ok', title:'Sent again', body:'Give it a minute to arrive.' };
    render(); tick(); return;
  }
  if (d.sso) {
    work(1000, () => {
      if (d.sso === 'SSO')
        return fail('SSO isn’t set up for this domain',
          'Ask an admin to enable it, or sign in with a password.');
      finish();
    });
    return;
  }
  if (d.ws) { finish(); return; }

  if (d.submit === 'signin')  return doSignin();
  if (d.submit === 'signup')  return doSignup();
  if (d.submit === 'forgot')  return doForgot();
  if (d.submit === 'reset')   return doReset();
  if (d.submit === 'verify')  return doCode(() => go('reset'));
  if (d.submit === 'twofa')   return doCode(() => finish());
  if (d.submit === 'opendemo') return go('reset');
}

function onInput(e) {
  const el = e.target;
  if (el.id && el.id.startsWith('fld-')) {
    const key = el.id.slice(4);
    A[key] = el.value;
    focusKey = el.id; caret = el.selectionStart;
    if (A.errors[key]) { delete A.errors[key]; render(); }
    else if (key === 'password' && A.screen !== 'signin') render();   // live meter
    return;
  }
  if (el.dataset.otp !== undefined) {
    const i = +el.dataset.otp;
    const digits = el.value.replace(/\D/g,'');
    if (digits.length > 1) {                       // pasted
      digits.split('').slice(0,6).forEach((d,k) => { if (i+k < 6) A.code[i+k] = d; });
      A.errors = {}; render();
      const last = Math.min(i + digits.length, 5);
      const n = document.querySelector(`[data-otp="${last}"]`); if (n) n.focus();
      return;
    }
    A.code[i] = digits;
    el.value = digits;
    if (digits && i < 5) { const n = document.querySelector(`[data-otp="${i+1}"]`); if (n) n.focus(); }
  }
}

function onKey(e) {
  if (e.getModifierState) A.caps = e.getModifierState('CapsLock');
  const el = e.target;

  if (el.dataset && el.dataset.otp !== undefined) {
    const i = +el.dataset.otp;
    if (e.key === 'Backspace' && !A.code[i] && i > 0) {
      A.code[i-1] = '';
      const p = document.querySelector(`[data-otp="${i-1}"]`);
      if (p) { p.value = ''; p.focus(); }
    }
    if (e.key === 'ArrowLeft' && i > 0) document.querySelector(`[data-otp="${i-1}"]`).focus();
    if (e.key === 'ArrowRight' && i < 5) document.querySelector(`[data-otp="${i+1}"]`).focus();
  }
  if (e.key === 'Enter' && !A.busy) {
    const map = { signin:doSignin, signup:doSignup, forgot:doForgot, reset:doReset,
                  verify:() => doCode(() => go('reset')), twofa:() => doCode(finish) };
    if (map[A.screen]) { e.preventDefault(); map[A.screen](); }
  }
  if (el.type === 'password' || (el.id && el.id.startsWith('fld-'))) {
    const was = document.querySelector('.caps');
    if (A.caps && !was) render();
    if (!A.caps && was) render();
  }
}

function onBlur(e) {
  const el = e.target;
  if (!el.id || !el.id.startsWith('fld-')) return;
  const key = el.id.slice(4);
  if (!A[key]) return;                       // don't scold an untouched field
  const e2 = validate([key]);
  if (e2[key]) { A.errors[key] = e2[key]; focusKey = null; render(); }
}

/* ---------- boot ---------- */
window.NashAuth = {
  mount(reason) {
    A.screen = 'signin'; A.errors = {}; A.busy = false;
    A.alert = reason === 'expired'
      ? { tone:'warn', title:'Your session expired', body:'Sign in again to pick up where you left off.' }
      : null;
    document.addEventListener('click', onClick);
    document.addEventListener('input', onInput);
    document.addEventListener('keydown', onKey);
    document.addEventListener('blur', onBlur, true);
    render();
  },
  unmount() {
    document.removeEventListener('click', onClick);
    document.removeEventListener('input', onInput);
    document.removeEventListener('keydown', onKey);
    document.removeEventListener('blur', onBlur, true);
  }
};
})();
