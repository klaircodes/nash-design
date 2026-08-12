/* ============================================================
   Nash — interactive prototype
   No build step, no dependencies. Real state, real transitions.
   ============================================================ */

/* ---------- icons ---------- */
const I = {
  panel:'<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="15" y1="3" x2="15" y2="21"/>',
  user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  minus:'<line x1="5" y1="12" x2="19" y2="12"/>',
  bookmark:'<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>',
  dots:'<circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>',
  chevD:'<polyline points="6 9 12 15 18 9"/>',
  folder:'<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  pin:'<line x1="12" y1="17" x2="12" y2="22"/><path d="M9 2h6l-1 7 3 3v3H7v-3l3-3z"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  list:'<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22 6 12 13 2 6"/>',
  drive:'<path d="M7.71 3.5L1.15 15l3.43 6 6.56-11.5z"/><path d="M22.85 15L16.29 3.5H9.42L15.99 15z"/><path d="M4.58 21h13.14l3.43-6H8.01z"/>',
  cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  db:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
  git:'<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  msg:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  check:'<polyline points="20 6 9 17 4 12"/>',
  alert:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  refresh:'<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
  pause:'<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',
  play:'<polygon points="5 3 19 12 5 21 5 3"/>',
  trash:'<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
  plug:'<path d="M9 2v6M15 2v6"/><path d="M6 8h12v4a6 6 0 0 1-12 0z"/><path d="M12 18v4"/>',
  dl:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  send:'<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
  ext:'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  spin:'<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  x:'<path d="M18 6L6 18M6 6l12 12"/>',
  lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff:'<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
  google:'<path d="M21.35 11.1H12v3.2h5.35a4.6 4.6 0 0 1-2 3l3.2 2.5c1.87-1.73 2.95-4.28 2.95-7.3 0-.6-.05-1.1-.15-1.4z"/><path d="M12 22c2.7 0 4.96-.9 6.55-2.4l-3.2-2.5c-.9.6-2.05.95-3.35.95-2.6 0-4.8-1.75-5.6-4.1l-3.3 2.55A10 10 0 0 0 12 22z"/><path d="M6.4 13.95a6 6 0 0 1 0-3.9L3.1 7.5a10 10 0 0 0 0 9z"/><path d="M12 5.95c1.47 0 2.78.5 3.82 1.5l2.84-2.84A10 10 0 0 0 3.1 7.5l3.3 2.55C7.2 7.7 9.4 5.95 12 5.95z"/>',
  back:'<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  chevR:'<polyline points="9 18 15 12 9 6"/>',
  logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  library:'<line x1="4" y1="21" x2="4" y2="10"/><line x1="9" y1="21" x2="9" y2="3"/><line x1="14" y1="21" x2="14" y2="8"/><line x1="19" y1="21" x2="19" y2="14"/>',
  memories:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M20 12c0 1.66-3.58 3-8 3s-8-1.34-8-3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/>',
  clip:'<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
  temp:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  servers:'<rect x="2" y="4" width="20" height="7" rx="2"/><rect x="2" y="13" width="20" height="7" rx="2"/><line x1="6" y1="7.5" x2="6.01" y2="7.5"/><line x1="6" y1="16.5" x2="6.01" y2="16.5"/>',
  wave:'<line x1="4" y1="10" x2="4" y2="14"/><line x1="8" y1="7" x2="8" y2="17"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="16" y1="7" x2="16" y2="17"/><line x1="20" y1="10" x2="20" y2="14"/>',
  mic:'<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>',
  chevL:'<polyline points="15 18 9 12 15 6"/>',
  sort:'<line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>',
  mcp:'<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>'
};
const ico = (n, s = 16, cls = '') =>
  `<svg class="${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${I[n]||''}</svg>`;
window.__ico = ico;

/* ---------- state ---------- */
const state = {
  view: 'chat',
  theme: (() => { try { return localStorage.getItem('nash.theme') || 'dark'; } catch (e) { return 'dark'; } })(),
  user: { name:'Klair', email:'claire@backboard.io' },
  userMenu: false,
  moreMenu: null,      // {x, y} when the More flyout is open
  composerOpen: false,
  model: 'GPT-4.1',
  modelPanel: null,    // null | 'root' | provider name
  modelQuery: '',
  modelFilter: 'All',
  pinned: ['Claude Opus 4.8'],
  chats: null,          // filled on mount from CHATS
  activeChat: null,
  tab: 'All',
  layout: 'grid',
  query: '',
  rail: null,          // connector id whose detail rail is open
  modal: null,         // {kind, id}
  popover: false,      // in-chat connector picker
  chatsOpen: true,
  foldersOpen: true,
  folders: { work: true, research: false, personal: false },
  connectors: [
    { id:'gmail', name:'Gmail', icon:'mail', cat:'Google Workspace', tools:6,
      desc:'Read and compose messages, search threads, manage drafts.',
      status:'connected', when:'2w ago', inChat:true,
      perms:[['Read your mail','Subject lines, message bodies and attachments in any thread.'],
             ['Send on your behalf','Compose and send new messages. Nash always asks first.']],
      toolList:[['search_messages','Find threads by query',true],['read_thread','Read a full conversation',true],
                ['send_message','Send a new email',true],['create_draft','Save a draft without sending',false]] },
    { id:'github', name:'GitHub', icon:'git', cat:'Developer', tools:11,
      desc:'Read repositories, issues and pull requests. Open and comment on issues.',
      status:'connected', when:'1mo ago', inChat:false,
      perms:[['Read your repositories','Code, issues and pull requests in repos you can access.'],
             ['Comment and open issues','Create issues and post comments. Nash always asks first.']],
      toolList:[['list_issues','List issues in a repository',true],['create_issue','Open a new issue',true],
                ['review_pr','Post a pull request review',false]] },
    { id:'gcal', name:'Google Calendar', icon:'cal', cat:'Google Workspace', tools:4,
      desc:'Read calendars, events and free/busy availability.',
      status:'connected', when:'3w ago', inChat:true,
      perms:[['Read your calendars','Events, attendees and free/busy windows.']],
      toolList:[['list_events','List events in a range',true],['find_free','Find a free slot',true]] },
    { id:'pg', name:'Postgres — Staging', icon:'db', cat:'Custom', tools:3,
      desc:'Read-only queries against the staging database.',
      status:'needs-auth', when:'expired 3d ago', inChat:false,
      perms:[['Read from staging','Run read-only queries against any table the credential can see.']],
      toolList:[['run_query','Execute a read-only SQL query',false],['list_tables','List tables in a schema',false],
                ['describe_table','Return column types',false]] },
    { id:'drive', name:'Google Drive', icon:'drive', cat:'Google Workspace', tools:5,
      desc:'Browse, search and read files across your Drive.',
      status:'available', when:'', inChat:false,
      perms:[['Read your files','Names, contents and folder structure in any Drive you can access.'],
             ['Search across Drive','Run searches on your behalf to find documents.']],
      toolList:[['search_files','Find documents by query',true],['read_file','Read a file’s contents',true],
                ['list_folder','List what is in a folder',true]] },
    { id:'linear', name:'Linear', icon:'zap', cat:'Developer', tools:8,
      desc:'Read and create issues, browse projects and cycles.',
      status:'available', when:'', inChat:false,
      perms:[['Read your issues','Issues, projects and cycles in workspaces you belong to.']],
      toolList:[['list_issues','List issues',true],['create_issue','Create an issue',true]] },
    { id:'slack', name:'Slack', icon:'msg', cat:'Comms', tools:9,
      desc:'Read channels and threads, post messages on your behalf.',
      status:'available', when:'', inChat:false,
      perms:[['Read channels','Messages and threads in channels you are a member of.']],
      toolList:[['read_channel','Read a channel',true],['post_message','Post a message',true]] }
  ],
  toasts: [],
  lastRemoved: null
};

const STATUS = {
  connected:{ dot:'ok', label:null },
  'needs-auth':{ dot:'warn', label:'Needs auth', cls:'s-warn' },
  paused:{ dot:'off', label:'Paused', cls:'s-off' },
  error:{ dot:'err', label:'Error', cls:'s-err' },
  available:{ dot:null, label:null }
};

const byId = id => state.connectors.find(c => c.id === id);
const mine = () => state.connectors.filter(c => c.status !== 'available');
const browse = () => state.connectors.filter(c => c.status === 'available');

/* ---------- toasts ---------- */
let toastSeq = 0;
function toast(text, opts = {}) {
  const id = ++toastSeq;
  state.toasts.push({ id, text, tone: opts.tone || 'ok', action: opts.action, onAction: opts.onAction });
  render();
  setTimeout(() => dismissToast(id), opts.duration || 5200);
}
function dismissToast(id) {
  const el = document.querySelector(`[data-toast="${id}"]`);
  if (el) {
    el.classList.add('out');
    setTimeout(() => { state.toasts = state.toasts.filter(t => t.id !== id); render(); }, 280);
  } else {
    state.toasts = state.toasts.filter(t => t.id !== id);
    render();
  }
}

/* ---------- sidebar ---------- */
const CHATS = [
  ['Connector permissions review','Today',       false],
  ['Invoice chase — Northwind',   'Today',       false],
  ['Q3 roadmap draft',            'Yesterday',   true ],
  ['Bug triage — render loop',    'Yesterday',   false],
  ['Voice chat',                  'Previous 7 days', false],
  ['Fork: Testing — What’s Next?','Previous 7 days', false],
  ['Friendly Chat Beginnings',    'Previous 30 days', false],
  ['Creating a PDF summary',      'Previous 30 days', true ],
  ['Whimsical Tales Unfold',      'Previous 30 days', false],
  ['Testing the Waters',          'June',        false],
  ['Voice chat',                  'June',        false]
];
const DATE_ORDER = ['Today','Yesterday','Previous 7 days','Previous 30 days','June'];

const FOLDERS = [
  ['work', 'Work', ['Q3 roadmap', 'Pricing research', 'Launch checklist']],
  ['research', 'Research', ['Competitor teardown', 'User interviews']],
  ['personal', 'Personal', ['Reading list']]
];

function sidebar() {
  const nav = [['plus','New Chat','chat'],['bookmark','Bookmarks','bookmarks'],
               ['users','Persona Marketplace',null],['dots','More',null]];
  return `
  <aside class="sidebar">
   <div class="sb-head">
    <div class="brand"><b>nash:</b><span style="color:var(--t3)">${ico('panel',18)}</span></div>
    <div class="spacer"></div>
    <div class="org">${ico('user',15)}<span style="flex:1">Personal</span>${ico('chevD',14)}</div>
    <div class="spacer"></div>
    <div class="searchfield">${ico('search',14)}<span>Search messages</span></div>
    <div class="spacer"></div>
    ${nav.map(([i,l,v]) => `
      <div class="navitem ${(l==='New Chat' ? (state.view==='chat'&&!state.activeChat) : state.view===v)?'active':''} ${l==='More'&&state.moreMenu?'active':''}"
           ${l==='More' ? 'data-more' : l==='New Chat' ? 'data-newchat' : (v?`data-go="${v}"`:'')}>
        ${ico(i,16)}<span>${l}</span></div>`).join('')}
   </div>

   <div class="sb-scroll">
    <div class="spacer" style="height:8px"></div>
    <div class="sechead ${state.chatsOpen?'':'collapsed'}" data-toggle="chats">
      <span>Chats</span>${ico('chevD',14,'chev')}
    </div>
    <div class="collapsible ${state.chatsOpen?'':'closed'}"><div class="inner">

      <div class="sechead ${state.foldersOpen?'':'collapsed'}" data-toggle="folders">
        <span>Folders</span>${ico('chevD',14,'chev')}
      </div>
      <div class="collapsible ${state.foldersOpen?'':'closed'}"><div class="inner">
        ${FOLDERS.map(([k,label,chats]) => `
          <div class="folderrow ${state.folders[k]?'':'collapsed'}" data-folder="${k}">
            ${ico('folder',16)}<span>${label}</span>${ico('chevD',14,'chev')}
          </div>
          <div class="collapsible ${state.folders[k]?'':'closed'}"><div class="inner">
            ${chats.map(c => `<div class="folderchat">${c}</div>`).join('')}
          </div></div>`).join('')}
      </div></div>

      ${chatGroups()}

    </div></div>
   </div>

   <div class="sb-foot">
    <div class="divider"></div>
    <div style="position:relative">
      ${state.userMenu ? usermenu() : ''}
      <div class="footer" data-usermenu>
        <div class="avatar">${(state.user.name||'K')[0].toUpperCase()}</div>
        <div class="who"><b>${state.user.name||'Klair'}</b><small>${state.user.email}</small></div>
        ${ico('gear',14)}
      </div>
    </div>
   </div>
  </aside>`;
}

/* ---------- sidebar chat rows ---------- */
function chatRow(title, pinned, active) {
  return `
  <div class="chatrow ${active?'active':''} ${pinned?'pinned':''}" data-chat="${title}">
    <span>${title}</span>
    <span class="dots">${ico('dots',14)}</span>
    ${pinned ? `<button class="pin" data-unpin="${title}" title="Unpin">${ico('pin',13)}</button>` : ''}
  </div>`;
}
function chatGroups() {
  const pins = state.chats.filter(c => c[2]);
  let out = '';
  if (pins.length) {
    out += `<div class="datemark">Pinned</div>` +
           pins.map(c => chatRow(c[0], true, c[0] === state.activeChat)).join('');
  }
  for (const label of DATE_ORDER) {
    const rows = state.chats.filter(c => c[1] === label && !c[2]);
    if (!rows.length) continue;
    out += `<div class="datemark">${label}</div>` +
           rows.map(c => chatRow(c[0], false, c[0] === state.activeChat)).join('');
  }
  return out;
}

/* ---------- More flyout ---------- */
const MORE = [
  ['library','Library','library'],
  ['memories','Memories','memories'],
  ['mcp','MCP Settings','connectors']
];
function moreflyout() {
  if (!state.moreMenu) return '';
  const { x, y } = state.moreMenu;
  return `
  <div class="flyout" style="left:${x}px;top:${y}px">
    ${MORE.map(([i,l,v]) => `
      <div class="flyrow ${state.view===v?'on':''}" data-go="${v}">
        ${ico(i,16)}<span>${l}</span>
      </div>`).join('')}
  </div>`;
}

/* ---------- user / settings menu ---------- */
function usermenu() {
  return `
  <div class="popover" style="bottom:56px;left:0;width:252px">
    <div class="plist" style="padding:6px">
      <div class="prow" style="gap:10px"><span style="color:var(--t3)">${ico('gear',15)}</span>
        <div class="tt"><b>Settings</b></div></div>

      <div class="prow" style="gap:10px;align-items:center">
        <span style="color:var(--t3)">${ico(state.theme==='dark'?'moon':'sun',15)}</span>
        <div class="tt"><b>Appearance</b><small>${state.theme==='dark'?'Dark':'Light'}</small></div>
        <div class="toggle sm ${state.theme==='light'?'on':''}" data-themetoggle><div class="knob"></div></div>
      </div>

      <div style="height:1px;background:var(--border);margin:6px 4px"></div>

      <div class="prow" style="gap:10px" data-signout>
        <span style="color:var(--err)">${ico('logout',15)}</span>
        <div class="tt"><b style="color:var(--err)">Sign out</b></div></div>
    </div>
  </div>`;
}

/* ---------- connector card ---------- */
function statusBits(c) {
  const s = STATUS[c.status];
  const dot = s.dot ? `<span class="dot ${s.dot}"></span>` : '';
  const parts = [];
  if (s.label) parts.push(`<span class="${s.cls}">${s.label}</span>`, '<span>·</span>');
  else if (c.status === 'available') parts.push(`<span>${c.cat}</span>`, '<span>·</span>');
  parts.push(`<span>${c.tools} tools${c.when ? ' · ' + c.when : ''}</span>`);
  return { dot, meta: parts.join('') };
}
function cardActions(c) {
  if (c.status === 'available')
    return `<button class="btn primary" data-connect="${c.id}">${ico('dl',14)}Connect</button>`;
  if (c.status === 'needs-auth')
    return `<button class="btn primary" data-reconnect="${c.id}">${ico('refresh',14)}Reconnect</button>`;
  if (c.status === 'paused')
    return `<button class="btn primary" data-resume="${c.id}">${ico('play',14)}Resume</button>
            <button class="btn" data-disconnect="${c.id}">Disconnect</button>`;
  return `<button class="btn" data-manage="${c.id}">Manage</button>
          <button class="btn" data-pause="${c.id}">Pause</button>`;
}
function card(c) {
  const { dot, meta } = statusBits(c);
  return `
  <div class="card">
    <div class="top">
      <div class="iconbox">${ico(c.icon,15)}</div>
      <div class="nm">
        <div class="row1">${dot}<b>${c.name}</b></div>
        <div class="meta">${meta}</div>
      </div>
      <span style="color:var(--t3)">${ico('dots',15)}</span>
    </div>
    <div class="desc">${c.desc}</div>
    <div class="actions">${cardActions(c)}</div>
  </div>`;
}
function listRow(c) {
  const { dot } = statusBits(c);
  const s = STATUS[c.status];
  const chip = s.label
    ? `<span class="chip warn">${s.label}</span>`
    : `<span class="chip">${c.cat}</span>`;
  return `
  <div class="listrow">
    <div class="iconbox">${ico(c.icon,15)}</div>
    <div class="nm">
      <div class="row1">${dot}<b>${c.name}</b>${chip}</div>
      <div class="oneline">${c.desc}</div>
    </div>
    <span style="font-size:12px;color:var(--t4)">${c.tools} tools${c.when?' · '+c.when:''}</span>
    ${cardActions(c)}
    <span style="color:var(--t3)">${ico('dots',15)}</span>
  </div>`;
}

/* ---------- connectors view ---------- */
const TABS = ['All','Connected','Google','Developer','Data','Comms','Custom'];
function matches(c) {
  const q = state.query.trim().toLowerCase();
  if (q && !(c.name + c.desc + c.cat).toLowerCase().includes(q)) return false;
  if (state.tab === 'All') return true;
  if (state.tab === 'Connected') return c.status !== 'available';
  if (state.tab === 'Custom') return c.cat === 'Custom';
  if (state.tab === 'Data') return c.cat === 'Custom';
  if (state.tab === 'Google') return c.cat === 'Google Workspace';
  return c.cat === state.tab;
}
function connectorsView() {
  const m = mine().filter(matches), b = browse().filter(matches);
  const attention = mine().filter(c => c.status !== 'connected').length;
  const wrap = items => state.layout === 'grid'
    ? `<div class="grid ${state.rail ? 'two' : ''}">${items.map(card).join('')}</div>`
    : `<div class="listview">${items.map(listRow).join('')}</div>`;

  let body = '';
  if (!m.length && !b.length) {
    body = state.query
      ? `<div class="empty">
          <div class="ib">${ico('search',24)}</div>
          <h3>No connectors match “${state.query}”</h3>
          <p>Search looks at names, descriptions and the tools each connector exposes.</p>
          <div class="row"><button class="btn" data-clear>${ico('x',14)}Clear search</button></div>
         </div>`
      : `<div class="empty">
          <div class="ib">${ico('plug',24)}</div>
          <h3>No connectors yet</h3>
          <p>Connect a tool and Nash can use it inside any chat — read your mail, search Drive, open issues.</p>
         </div>`;
  } else {
    if (m.length) body += `<div class="sectionlabel"><h2>My connectors</h2>
      <p>${mine().length} connected${attention ? ` · ${attention} needs attention` : ''}</p></div>${wrap(m)}`;
    if (b.length) body += `<div class="sectionlabel"><h2>Browse</h2>
      <p>Popular this week</p></div>${wrap(b)}`;
  }

  return `
  <div class="view">
    <div class="pagehead">
      <div><h1>Connectors</h1><p>Give Nash access to the tools you already use.</p></div>
      <div class="sp"></div>
      <button class="btn primary" data-add>${ico('plus',15)}Add custom server</button>
    </div>
    <div class="toolbar">
      <div class="search">${ico('search',15)}
        <input id="q" placeholder="Search connectors..." value="${state.query}">
      </div>
      <div class="seg">
        <button class="${state.layout==='list'?'on':''}" data-layout="list">${ico('list',14)}</button>
        <button class="${state.layout==='grid'?'on':''}" data-layout="grid">${ico('grid',14)}</button>
      </div>
    </div>
    <div class="tabs">
      ${TABS.map(t => `<button class="tab ${state.tab===t?'on':''}" data-tab="${t}">${t}</button>`).join('')}
    </div>
    ${body}
  </div>`;
}

/* ---------- rail ---------- */
function rail() {
  const c = byId(state.rail);
  if (!c) return '';
  const s = STATUS[c.status];
  const on = c.toolList.filter(t => t[2]).length;
  const banner = c.status === 'needs-auth'
    ? `<div class="banner warn">${ico('alert',14)}<div>
        <b>Reconnect to use this again</b>
        <p>The stored token expired 3 days ago. Your tool settings are kept.</p></div></div>` : '';
  return `
  <aside class="rail">
    <div class="rhead">
      <div class="iconbox">${ico(c.icon,16)}</div>
      <div class="tc">
        <b><span class="dot ${s.dot||'off'}" style="display:inline-block;margin-right:6px"></span>${c.name}</b>
        <small>${c.cat} · ${c.when || 'not connected'}</small>
      </div>
      <button class="iconbtn" data-closerail>${ico('panel',16)}</button>
    </div>
    <div style="height:1px;background:var(--border)"></div>
    <div class="rbody">
      ${banner}
      <p class="rlabel">What it can reach</p>
      ${c.perms.map(([t,d]) => `<div class="perm">${ico('shield',14)}<div><b>${t}</b><p>${d}</p></div></div>`).join('')}
      <p class="rlabel" style="margin-top:18px">Tools · ${on} of ${c.toolList.length} on</p>
      ${c.toolList.map(([n,d,active], i) => `
        <div class="toolrow">
          <div class="tt"><b>${n}</b><small>${d}</small></div>
          <div class="toggle sm ${active?'on':''}" data-tool="${c.id}:${i}"><div class="knob"></div></div>
        </div>`).join('')}
    </div>
    <div class="rfoot">
      ${c.status === 'paused'
        ? `<button class="btn primary" style="flex:1" data-resume="${c.id}">${ico('play',14)}Resume</button>`
        : `<button class="btn" style="flex:1" data-pause="${c.id}">${ico('pause',14)}Pause</button>`}
      <button class="btn" data-disconnect="${c.id}">${ico('trash',14)}Disconnect</button>
    </div>
  </aside>`;
}

/* ---------- chat ---------- */
const GREETING = () => {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
};
const firstName = () => (state.user.name || 'there').split(' ')[0];

const TOOLS = [
  ['temp','Temporary chat'],
  ['servers','Connectors'],
  ['wave','Voice mode'],
  ['gear','Chat settings']
];

function composer() {
  const open = state.composerOpen;
  return `
  <div class="composer ${open ? 'open' : ''}">
    <div class="crow">
      <button class="round" data-composer aria-label="${open?'Collapse':'Expand'} tools">
        <span class="morph"><i class="h"></i><i class="v"></i></span>
      </button>
      <input placeholder="Ask anything..." id="ask">
      <button class="modelpick" data-modelopen>
        <span>${state.model}</span>${ico('chevD',14)}
      </button>
      <button class="round">${ico('mic',16)}</button>
      <button class="round accent">${ico('send',16)}</button>
    </div>
    <div class="tgrid"><div class="tclip">
      <div class="trow">
        <button class="pill">${ico('clip',15)}Add File</button>
        <button class="pill">${ico('image',15)}Create Image</button>
        <span class="sp"></span>
        ${TOOLS.map(([i,t]) => `<button class="round sm" title="${t}"
          ${i==='servers' ? 'data-popover' : ''}>${ico(i,15)}</button>`).join('')}
      </div>
    </div></div>
  </div>`;
}

function chatView() {
  return `
  <div class="chatwrap">
    <div class="chathead"><span class="sp"></span>
      <button class="iconbtn">${ico('dots',18)}</button>
    </div>
    <div class="chatbody">
      <h1 class="greet">${GREETING()}, ${firstName()}</h1>
    </div>
    <div class="composerwrap">
      ${state.popover ? popover() : ''}
      ${composer()}
    </div>
  </div>`;
}

/* ---------- model picker ---------- */
const PINNED_MODELS = [
  ['Claude Opus 4.8','Mar 18 · Vision'],
  ['GPT-5','Jun 20 · Vision']
];
const PROVIDERS = [
  ['Open AI',14,'GPT-5, GPT-5 mini, o4'],
  ['Anthropic',8,'Claude Opus 5, Opus 4.8, Sonnet 5'],
  ['Google',11,'Gemini 3 Pro, Gemini 3 Flash'],
  ['Meta',9,'Llama 4, Llama 4 Scout'],
  ['Mistral',6,'Mistral Large 3, Codestral']
];
const PROVIDER_MODELS = {
  'Anthropic':[
    ['Claude Opus 5','Jul 29 · Vision',true],
    ['Claude Opus 4.8','Mar 18 · Vision',false],
    ['Claude Sonnet 5','Jun 02 · Vision',false],
    ['Claude Haiku 4.5','Jan 14 · Vision',false]
  ],
  'Open AI':[
    ['GPT-5','Jun 20 · Vision',true],
    ['GPT-5 mini','Jun 20 · Vision',false],
    ['o4','Feb 08 · Reasoning',false]
  ],
  'Google':[['Gemini 3 Pro','May 11 · Vision',true],['Gemini 3 Flash','May 11 · Vision',false]],
  'Meta':[['Llama 4','Apr 02 · Open source',false],['Llama 4 Scout','Apr 02 · Open source',false]],
  'Mistral':[['Mistral Large 3','Mar 30 · Open source',false],['Codestral','Feb 19 · Code',false]]
};
const FILTERS = ['All','Open source','Fast','Powerful'];

function modelRow(name, meta, opts = {}) {
  const isPinned = state.pinned.includes(name);
  const selected = state.model === name;
  return `
  <div class="mrow ${selected?'sel':''}" data-model="${name}">
    <div class="mt">
      <div class="mn">${name}${opts.isNew?'<span class="newtag">New</span>':''}</div>
      <div class="mm">${meta}</div>
    </div>
    ${selected ? `<span class="tick">${ico('check',16)}</span>` : ''}
    <button class="pinbtn ${isPinned?'on':''}" data-pin="${name}">${ico('pin',15)}</button>
  </div>`;
}
function filterRow() {
  return `
  <div class="filters">
    <span class="flabel">Filter</span>
    ${FILTERS.map(f => `<button class="fpill ${state.modelFilter===f?'on':''}" data-mfilter="${f}">${f}</button>`).join('')}
    <button class="fsort">${ico('sort',15)}</button>
  </div>`;
}
function modelModal() {
  if (!state.modelPanel) return '';
  const q = state.modelQuery.trim().toLowerCase();
  const root = state.modelPanel === 'root';
  let inner;

  if (root) {
    const pins = PINNED_MODELS.filter(m => !q || m[0].toLowerCase().includes(q));
    const provs = PROVIDERS.filter(p => !q || (p[0]+p[2]).toLowerCase().includes(q));
    inner = `
      <div class="mhead">
        <div class="mtitle"><h3>Select Model</h3><small>17,000+ models · 200+ providers</small></div>
        <button class="iconbtn" data-modelclose>${ico('x',16)}</button>
      </div>
      <div class="msearch">${ico('search',15)}
        <input id="mq" placeholder="Search 17,000+ models..." value="${state.modelQuery}">
      </div>
      ${filterRow()}
      <div class="mscroll">
        ${pins.length ? `<div class="mlabel">Pinned</div>${pins.map(m=>modelRow(m[0],m[1])).join('')}` : ''}
        <div class="mrow personas" data-personas>
          <div class="mt"><div class="mn">Personas</div><div class="mm">12 saved presets</div></div>
          ${ico('chevR',16)}
        </div>
        ${provs.length ? `<div class="mlabel">Providers · most used first</div>
          ${provs.map(([n,c,sub]) => `
            <div class="mrow" data-provider="${n}">
              <div class="mt">
                <div class="mn">${n}<span class="count">${c}</span></div>
                <div class="mm">${sub}</div>
              </div>${ico('chevR',16)}
            </div>`).join('')}` : ''}
        ${!pins.length && !provs.length ? `<div class="mempty">No models match “${state.modelQuery}”</div>` : ''}
      </div>`;
  } else {
    const p = state.modelPanel;
    const list = (PROVIDER_MODELS[p]||[]).filter(m => !q || m[0].toLowerCase().includes(q));
    const pins = list.filter(m => state.pinned.includes(m[0]));
    const rest = list.filter(m => !state.pinned.includes(m[0]));
    inner = `
      <div class="mhead">
        <button class="iconbtn" data-modelback>${ico('chevL',16)}</button>
        <div class="mtitle"><h3>${p}</h3><small>${(PROVIDER_MODELS[p]||[]).length} models · all support vision</small></div>
        <button class="iconbtn" data-modelclose>${ico('x',16)}</button>
      </div>
      <div class="msearch">${ico('search',15)}
        <input id="mq" placeholder="Search ${p} models..." value="${state.modelQuery}">
      </div>
      ${filterRow()}
      <div class="mscroll">
        ${pins.length ? `<div class="mlabel">Pinned</div>${pins.map(m=>modelRow(m[0],m[1],{isNew:m[2]})).join('')}` : ''}
        ${rest.length ? `<div class="mlabel">All models · newest first</div>
          ${rest.map(m=>modelRow(m[0],m[1],{isNew:m[2]})).join('')}` : ''}
        ${!list.length ? `<div class="mempty">No ${p} models match “${state.modelQuery}”</div>` : ''}
      </div>`;
  }
  return `<div class="scrim" data-modelscrim><div class="modelpanel">${inner}</div></div>`;
}

/* ---------- bookmarks ---------- */
const FOLDERS_BM = [
  ['React patterns','Rendering, hooks and state answers worth keeping. Mostly from the dashboard rebuild.','8 saved','2d ago'],
  ['Prompt library','System prompts and phrasings that got good results. Copy straight out of here.','12 saved','5h ago'],
  ['Debugging notes','Root causes and fixes for bugs that took more than one try to understand.','3 saved','1w ago'],
  ['Client explanations','Plain-language answers for non-technical stakeholders. Reuse in emails.','9 saved','3d ago'],
  ['SQL and data','Query patterns, window functions, migration gotchas.','11 saved','6d ago'],
  ['Unsorted','Anything saved without a folder lands here.','5 saved','1h ago']
];
function bookmarksView() {
  return `
  <div class="view">
    <div class="pagehead">
      <div><h1>Bookmarks</h1><p>48 saved responses across 6 folders</p></div>
      <div class="sp"></div>
      <button class="btn primary">${ico('plus',15)}New folder</button>
    </div>
    <div class="toolbar">
      <div class="search">${ico('search',15)}<input placeholder="Search bookmarks and folders"></div>
    </div>
    <div class="grid">
      ${FOLDERS_BM.map(([n,d,c,u]) => `
        <div class="card">
          <div class="top">
            <div class="iconbox">${ico('folder',15)}</div>
            <div class="nm"><div class="row1"><b>${n}</b></div></div>
            <span style="color:var(--t3)">${ico('dots',15)}</span>
          </div>
          <div class="desc">${d}</div>
          <div class="meta"><span style="color:var(--t2);font-weight:500">${c}</span><span>·</span><span>Updated ${u}</span></div>
        </div>`).join('')}
    </div>
  </div>`;
}

/* ---------- modals ---------- */
function modal() {
  if (!state.modal) return '';
  const { kind, id } = state.modal;
  const c = id ? byId(id) : null;
  let inner = '';

  if (kind === 'consent') {
    inner = `
      <div class="mhead">
        <div class="iconbox">${ico(c.icon,16)}</div>
        <div><h3>Connect ${c.name}</h3>
          <small style="color:var(--t3);font-size:11.5px">Official · ${c.tools} tools</small></div>
      </div>
      <p class="rlabel" style="margin:0">What Nash will be able to do</p>
      ${c.perms.map(([t,d]) => `<div class="perm">${ico('shield',14)}<div><b>${t}</b><p>${d}</p></div></div>`).join('')}
      <p class="lead" style="font-size:11.5px;color:var(--t4)">You can disconnect at any time.</p>
      <div class="mfoot">
        <button class="btn ghost" data-cancel>Cancel</button>
        <button class="btn primary" data-consent="${c.id}">${ico('ext',14)}Continue</button>
      </div>`;
  }
  if (kind === 'connecting') {
    inner = `
      <div style="display:flex;flex-direction:column;align-items:center;text-align:center;padding:10px 0 4px">
        <div class="ib" style="width:56px;height:56px;border-radius:16px;background:var(--surface);
             display:grid;place-items:center;color:var(--t3);margin-bottom:16px">${ico('spin',22,'spinner')}</div>
        <h3 style="margin:0 0 7px">Connecting to ${c.name}…</h3>
        <p class="lead" style="margin-bottom:18px">Finish signing in on the tab that just opened.</p>
        <div class="progress" style="width:100%"><div class="fill"></div></div>
      </div>`;
  }
  if (kind === 'disconnect') {
    inner = `
      <div class="mhead">
        <div class="iconbox" style="background:var(--err-bg);color:var(--err)">${ico('alert',15)}</div>
        <h3>Disconnect ${c.name}?</h3>
      </div>
      <p class="lead">Nash loses access immediately and the stored credential is deleted. Past chats keep what
        was already returned — nothing is removed from your history.</p>
      <div class="mfoot">
        <button class="btn ghost" data-cancel>Cancel</button>
        <button class="btn danger" data-confirmdisconnect="${c.id}">Disconnect</button>
      </div>`;
  }
  if (kind === 'add') {
    inner = `
      <div class="mhead"><h3>Add a custom server</h3></div>
      <div class="field"><label>Server URL</label><div class="inp">https://mcp.internal.acme.co</div></div>
      <div class="field"><label>API key <span style="color:var(--t4);font-weight:400">· stored encrypted</span></label>
        <div class="inp">••••••••••••••••</div></div>
      <div class="banner warn" style="margin:0">${ico('alert',14)}<div>
        <b>Custom servers are not verified by Nash</b>
        <p>It can reach anything these credentials allow.</p></div></div>
      <div class="mfoot">
        <button class="btn ghost" data-cancel>Cancel</button>
        <button class="btn primary" data-cancel>Test connection</button>
      </div>`;
  }
  return `<div class="scrim" data-scrim><div class="modal">${inner}</div></div>`;
}

/* ---------- toasts ---------- */
function toasts() {
  if (!state.toasts.length) return '';
  return `<div class="toastwrap">
    ${state.toasts.map(t => `
      <div class="toast" data-toast="${t.id}">
        <span style="color:var(--${t.tone==='ok'?'ok':t.tone==='warn'?'warn':'t1'})">
          ${ico(t.tone==='ok'?'check':t.tone==='warn'?'alert':'pause',16)}</span>
        <span>${t.text}</span>
        ${t.action ? `<button class="btn" style="padding:7px 11px;font-size:12px" data-toastaction="${t.id}">${t.action}</button>` : ''}
        <button class="iconbtn" style="width:28px;height:28px" data-toastclose="${t.id}">${ico('x',14)}</button>
      </div>`).join('')}
  </div>`;
}

/* ---------- render ---------- */
const app = document.getElementById('app');
function render() {
  const view = state.view === 'connectors' ? connectorsView()
             : state.view === 'bookmarks'  ? bookmarksView()
             : chatView();
  app.innerHTML = `
    <div class="shell">
      ${sidebar()}
      ${moreflyout()}
      <div class="main">
        <div class="content">${view}</div>
        ${state.view==='connectors' ? rail() : ''}
        ${modal()}
        ${modelModal()}
        ${toasts()}
      </div>
    </div>`;
  for (const id of ['q','mq']) {
    const el = document.getElementById(id);
    const val = id === 'q' ? state.query : state.modelQuery;
    if (el && document.activeElement !== el && val) {
      el.focus(); el.setSelectionRange(el.value.length, el.value.length);
    }
  }
}

/* ---------- events ---------- */
function onAppClick(e) {
  const t = e.target.closest('[data-go],[data-toggle],[data-folder],[data-tab],[data-layout],[data-connect],[data-consent],[data-manage],[data-pause],[data-resume],[data-disconnect],[data-confirmdisconnect],[data-reconnect],[data-closerail],[data-tool],[data-inchat],[data-popover],[data-add],[data-cancel],[data-scrim],[data-themetoggle],[data-clear],[data-toastclose],[data-toastaction],[data-usermenu],[data-signout],[data-more],[data-composer],[data-modelopen],[data-modelclose],[data-modelback],[data-modelscrim],[data-provider],[data-model],[data-pin],[data-mfilter],[data-personas],[data-chat],[data-unpin],[data-newchat]');
  if (!t) {                                        // click-away closes transient surfaces
    if (state.userMenu || state.popover || state.moreMenu) {
      state.userMenu = false; state.popover = false; state.moreMenu = null; render();
    }
    return;
  }
  const d = t.dataset;
  if (d.signout !== undefined) return;             // handled by its own listener
  if (d.usermenu !== undefined) { state.userMenu = !state.userMenu; state.moreMenu = null; render(); return; }
  if (d.more !== undefined) {
    if (state.moreMenu) { state.moreMenu = null; }
    else {
      const r = t.getBoundingClientRect();
      state.moreMenu = { x: Math.round(r.right + 10), y: Math.round(r.top - 6) };
    }
    state.userMenu = false; render(); return;
  }
  state.moreMenu = null;
  if (d.themetoggle === undefined && d.usermenu === undefined) state.userMenu = false;

  if (d.scrim && e.target !== t) return;               // only the backdrop closes
  if (d.go)        { state.view = d.go; state.popover = false; state.rail = null; }
  if (d.toggle === 'chats')   state.chatsOpen = !state.chatsOpen;
  if (d.toggle === 'folders') state.foldersOpen = !state.foldersOpen;
  if (d.folder)    state.folders[d.folder] = !state.folders[d.folder];
  if (d.tab)       state.tab = d.tab;
  if (d.layout)    state.layout = d.layout;
  if (d.clear !== undefined) state.query = '';
  if (d.unpin) {
    const row = state.chats.find(c => c[0] === d.unpin);
    if (row) row[2] = false;
    render(); return;
  }
  if (d.newchat !== undefined) {
    state.view = 'chat'; state.activeChat = null; state.composerOpen = false;
    state.popover = false; state.rail = null; state.moreMenu = null; state.modelPanel = null;
    render(); return;
  }
  if (d.chat) { state.activeChat = d.chat; state.view = 'chat'; render(); return; }
  if (d.composer !== undefined) { state.composerOpen = !state.composerOpen; render(); return; }
  if (d.modelopen !== undefined) { state.modelPanel='root'; state.modelQuery=''; state.modelFilter='All'; render(); return; }
  if (d.modelclose !== undefined || (d.modelscrim !== undefined && e.target === t)) {
    state.modelPanel = null; render(); return; }
  if (d.modelback !== undefined) { state.modelPanel='root'; state.modelQuery=''; render(); return; }
  if (d.provider) { state.modelPanel = d.provider; state.modelQuery=''; render(); return; }
  if (d.pin) {
    state.pinned = state.pinned.includes(d.pin)
      ? state.pinned.filter(x => x !== d.pin) : state.pinned.concat(d.pin);
    render(); return;
  }
  if (d.model) { state.model = d.model; state.modelPanel = null; render(); return; }
  if (d.mfilter) { state.modelFilter = d.mfilter; render(); return; }
  if (d.personas !== undefined) { render(); return; }
  if (d.themetoggle !== undefined) {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = state.theme;
    try { localStorage.setItem('nash.theme', state.theme); } catch (x) {}
  }
  if (d.popover !== undefined) state.popover = !state.popover;
  if (d.add !== undefined)     state.modal = { kind:'add' };
  if (d.cancel !== undefined || d.scrim) state.modal = null;
  if (d.manage)   { state.rail = state.rail === d.manage ? null : d.manage; }
  if (d.closerail) state.rail = null;

  if (d.connect)  state.modal = { kind:'consent', id:d.connect };

  if (d.consent) {
    const c = byId(d.consent);
    state.modal = { kind:'connecting', id:c.id };
    render();
    setTimeout(() => {
      c.status = 'connected'; c.when = 'just now'; c.inChat = true;
      state.modal = null;
      toast(`${c.name} connected · ${c.tools} tools added`, { tone:'ok', action:'Manage',
        onAction: () => { state.rail = c.id; } });
    }, 2200);
    return;
  }
  if (d.reconnect) {
    const c = byId(d.reconnect);
    state.modal = { kind:'connecting', id:c.id };
    render();
    setTimeout(() => {
      c.status = 'connected'; c.when = 'just now';
      c.toolList = c.toolList.map(t => [t[0], t[1], true]);
      state.modal = null;
      toast(`${c.name} reconnected`, { tone:'ok' });
    }, 1800);
    return;
  }
  if (d.pause) {
    const c = byId(d.pause);
    c.status = 'paused'; c.when = 'paused just now'; c.inChat = false;
    toast(`${c.name} paused — Nash will not call it`, { tone:'info', action:'Undo',
      onAction: () => { c.status = 'connected'; c.when = 'just now'; c.inChat = true; } });
  }
  if (d.resume) {
    const c = byId(d.resume);
    c.status = 'connected'; c.when = 'just now';
    toast(`${c.name} resumed`, { tone:'ok' });
  }
  if (d.disconnect) state.modal = { kind:'disconnect', id:d.disconnect };
  if (d.confirmdisconnect) {
    const c = byId(d.confirmdisconnect);
    const prev = { status:c.status, when:c.when, inChat:c.inChat };
    c.status = 'available'; c.when = ''; c.inChat = false;
    state.modal = null; state.rail = null;
    toast(`${c.name} disconnected`, { tone:'info', action:'Undo',
      onAction: () => Object.assign(c, prev) });
  }
  if (d.tool) {
    const [id, i] = d.tool.split(':');
    const c = byId(id);
    c.toolList[+i][2] = !c.toolList[+i][2];
  }
  if (d.inchat) { const c = byId(d.inchat); c.inChat = !c.inChat; }
  if (d.toastclose)  { dismissToast(+d.toastclose); return; }
  if (d.toastaction) {
    const t = state.toasts.find(x => x.id === +d.toastaction);
    if (t && t.onAction) t.onAction();
    dismissToast(+d.toastaction);
    return;
  }
  render();
}

document.addEventListener('input', e => {
  if (e.target.id === 'q') { state.query = e.target.value; render(); }
  if (e.target.id === 'mq') { state.modelQuery = e.target.value; render(); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (state.modelPanel) state.modelPanel = null;
    else if (state.modal) state.modal = null;
    else if (state.moreMenu) state.moreMenu = null;
    else if (state.popover) state.popover = false;
    else if (state.rail) state.rail = null;
    else return;
    render();
  }
});

/* ---------- sign out ---------- */
document.addEventListener('click', e => {
  if (!e.target.closest('[data-signout]')) return;
  document.removeEventListener('click', onAppClick);
  const app = document.getElementById('app');
  app.style.transition = 'opacity .24s var(--ease)';
  app.style.opacity = '0';
  setTimeout(() => { app.style.opacity = ''; window.NashAuth.mount(); }, 240);
});

/* ---------- mount ---------- */
window.NashApp = {
  state,
  mount(user) {
    state.user = user || { name: 'Klair', email: 'claire@backboard.io' };
    if (!state.chats) state.chats = CHATS.map(c => c.slice());
    state.view = 'chat';
    state.activeChat = null;          // a fresh chat, nothing selected
    state.composerOpen = false;
    state.rail = null; state.modal = null; state.popover = false;
    state.modelPanel = null; state.moreMenu = null; state.userMenu = false;
    if (window.NashAuth) window.NashAuth.unmount();
    document.addEventListener('click', onAppClick);
    render();
  }
};
