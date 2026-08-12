/* ============================================================
   Nash — authentication
   1:1 with the Figma file. Two screens only: Log in and Sign up.
   Frontend only. Nothing is sent anywhere and nothing is stored
   except the theme you picked.
   ============================================================ */

(function () {
const A = { screen:'login', name:'', email:'', password:'', peek:false, remember:true };
const ic = (n, s = 16) => window.__ico(n, s);

const canSubmit = () =>
  A.screen === 'login'
    ? !!(A.email.trim() && A.password)
    : !!(A.name.trim() && A.email.trim() && A.password);

function fieldRow(key, label, placeholder, isPw) {
  const type = isPw && !A.peek ? 'password' : 'text';
  return `
  <div class="fld">
    <label>${label}</label>
    <div class="inp">
      <input id="f-${key}" type="${type}" value="${A[key]}" placeholder="${placeholder}"
             autocomplete="${isPw ? (A.screen==='login'?'current-password':'new-password')
                                  : key==='email' ? 'email' : 'name'}">
      ${isPw ? `<span class="eye" data-peek>${ic(A.peek ? 'eyeoff' : 'eye', 16)}</span>` : ''}
    </div>
  </div>`;
}

function login() {
  return `
  <div class="head">
    <h1>Welcome back!</h1>
    <p>Log in to pick up right where you left off.</p>
  </div>
  ${fieldRow('email','Email','Input your email')}
  ${fieldRow('password','Password','Input your password',true)}
  <div class="remember">
    <div class="me ${A.remember?'on':''}" data-remember>
      <span class="box">${ic('check',11)}</span><span>Remember me</span>
    </div>
    <span class="forgot">Forgot password?</span>
  </div>
  <button class="primary ${canSubmit()?'':'off'}" data-submit>Log in</button>
  <div class="divrow"><i></i><span>Or continue with</span><i></i></div>
  <div class="ssos">
    <button class="sso" data-submit>${ic('google',16)}Continue with Google</button>
    <button class="sso" data-submit>Continue with Backboard SSO</button>
  </div>
  <div class="flink"><span>Don’t have an account?</span><a data-screen="signup">Sign up here</a></div>`;
}

function signup() {
  return `
  <div class="head">
    <h1>Create your account</h1>
    <p>Set up Nash for yourself or your team in under a minute.</p>
  </div>
  ${fieldRow('name','Name','Your name')}
  ${fieldRow('email','Email','Input your email')}
  ${fieldRow('password','Password','Input your password',true)}
  <button class="primary ${canSubmit()?'':'off'}" data-submit>Sign up</button>
  <div class="divrow"><i></i><span>Or continue with</span><i></i></div>
  <div class="ssos">
    <button class="sso" data-submit>${ic('google',16)}Continue with Google</button>
    <button class="sso" data-submit>Continue with Backboard SSO</button>
  </div>
  <div class="flink"><span>Already have an account?</span><a data-screen="login">Log in</a></div>`;
}

let focusKey = null, caret = 0;
function render() {
  document.getElementById('app').innerHTML = `
  <div class="auth">
    <div class="hero">
      <div class="hero-top">
        <span class="mark">Nash</span>
        <span class="back">${ic('back',16)}Back to Nash</span>
      </div>
      <div class="hero-copy">
        <h2>Every AI model.<br>One workspace. Zero lock-in.</h2>
        <p>Switch anytime. Your memory, your data, and your budget stay with you,
           not with any one AI company.</p>
      </div>
    </div>
    <div class="cardpane">
      <div class="form swap" data-screen-key="${A.screen}">
        ${A.screen === 'login' ? login() : signup()}
      </div>
    </div>
  </div>`;
  if (focusKey) {
    const el = document.getElementById(focusKey);
    if (el) { el.focus(); try { el.setSelectionRange(caret, caret); } catch (e) {} }
  }
}

function enter() {
  document.getElementById('app').style.transition = 'opacity .22s var(--ease)';
  document.getElementById('app').style.opacity = '0';
  setTimeout(() => {
    document.getElementById('app').style.opacity = '';
    window.NashApp.mount({ name: A.name.trim() || 'Klair',
                           email: A.email.trim() || 'claire@backboard.io' });
  }, 220);
}

function onClick(e) {
  const t = e.target.closest('[data-screen],[data-peek],[data-remember],[data-submit]');
  if (!t) return;
  const d = t.dataset;
  if (d.screen)              { A.screen = d.screen; A.peek = false; focusKey = null; render(); return; }
  if (d.peek !== undefined)  { A.peek = !A.peek; focusKey = null; render(); return; }
  if (d.remember !== undefined) { A.remember = !A.remember; render(); return; }
  if (d.submit !== undefined) enter();
}
function onInput(e) {
  const el = e.target;
  if (!el.id || !el.id.startsWith('f-')) return;
  const key = el.id.slice(2);
  const wasReady = canSubmit();
  A[key] = el.value;
  focusKey = el.id; caret = el.selectionStart;
  if (wasReady !== canSubmit()) render();          // only repaint when the button changes
}
function onKey(e) {
  if (e.key === 'Enter' && canSubmit()) { e.preventDefault(); enter(); }
}

window.NashAuth = {
  mount() {
    A.screen = 'login'; A.name = ''; A.email = ''; A.password = ''; A.peek = false;
    focusKey = null;
    document.addEventListener('click', onClick);
    document.addEventListener('input', onInput);
    document.addEventListener('keydown', onKey);
    render();
  },
  unmount() {
    document.removeEventListener('click', onClick);
    document.removeEventListener('input', onInput);
    document.removeEventListener('keydown', onKey);
  }
};
})();
