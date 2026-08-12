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
  x:'<path d="M18 6L6 18M6 6l12 12"/>'
};
const ico = (n, s = 16, cls = '') =>
  `<svg class="${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${I[n]}</svg>`;

/* ---------- state ---------- */
const state = {
  view: 'connectors',
  theme: 'dark',
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
const DATES = [
  ['Today', ['Connector permissions review', 'Invoice chase — Northwind']],
  ['Yesterday', ['Q3 roadmap draft', 'Bug triage — render loop']],
  ['Previous 7 days', ['Voice chat', 'Fork: Testing — What’s Next?']],
  ['Previous 30 days', ['Friendly Chat Beginnings', 'Creating a PDF summary', 'Whimsical Tales Unfold']],
  ['June', ['Testing the Waters', 'Voice chat']]
];
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
    <div class="brand"><b>nash:</b><span style="color:var(--t3)">${ico('panel',18)}</span></div>
    <div class="spacer"></div>
    <div class="org">${ico('user',15)}<span style="flex:1">Personal</span>${ico('chevD',14)}</div>
    <div class="spacer"></div>
    <div class="searchfield">${ico('search',14)}<span>Search messages</span></div>
    <div class="spacer"></div>
    ${nav.map(([i,l,v]) => `
      <div class="navitem ${state.view===v?'active':''}" ${v?`data-go="${v}"`:''}>
        ${ico(i,16)}<span>${l}</span></div>`).join('')}
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

      ${DATES.map(([label, chats]) => `
        <div class="datemark">${label}</div>
        ${chats.map((c,i) => `
          <div class="chatrow ${label==='Today'&&i===0?'active':''}">
            <span>${c}</span>
            ${c==='Q3 roadmap draft' ? `<span class="pin">${ico('pin',13)}</span>` : ''}
            <span class="dots">${ico('dots',14)}</span>
          </div>`).join('')}`).join('')}

    </div></div>

    <div class="grow"></div>
    <div class="divider"></div>
    <div class="footer">
      <div class="avatar">K</div>
      <div class="who"><b>Klair</b><small>claire@backboard.io</small></div>
      ${ico('gear',14)}
    </div>
  </aside>`;
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
function chatView() {
  const active = state.connectors.filter(c => c.inChat && c.status === 'connected');
  return `
  <div class="view" style="display:flex;flex-direction:column;height:100%">
    <div style="flex:1;overflow-y:auto">
      <div class="thread">
        <div class="msg user"><div class="bubble">Does .map() mutate the array I call it on?</div></div>
        <div class="msg ai">
          <div class="model">Claude Opus 5</div>
          <div class="body">The <code>.map()</code> method creates a new array by calling a function on every
            element. It doesn’t modify the original array — it returns a new one, which is why it works well
            in React render logic.</div>
        </div>
        <div class="msg user"><div class="bubble">Any invoices outstanding this month?</div></div>
        <div class="toolcall">
          <div class="th">${ico('mail',14)}<b>Gmail</b>
            <span class="state" style="color:var(--ok)">Done</span></div>
          <div class="tool">search_messages</div>
          <div class="res">Found 4 threads matching “invoice” from the last 30 days.</div>
        </div>
        <div class="msg ai">
          <div class="model">Claude Opus 5</div>
          <div class="body">You have four open invoices. The oldest is from Northwind, dated 14 July, for £2,400.</div>
        </div>
      </div>
    </div>
    <div style="position:relative">
      ${state.popover ? popover(active) : ''}
      <div class="composer">
        <button class="round" data-popover>${state.popover ? ico('minus',17) : ico('plus',17)}</button>
        <input placeholder="Ask anything...">
        <span style="font-size:13px;color:var(--t2)">Claude Opus 5</span>
        <button class="round accent">${ico('send',16)}</button>
      </div>
    </div>
  </div>`;
}
function popover() {
  const list = state.connectors.filter(c => c.status !== 'available');
  const on = list.filter(c => c.inChat && c.status === 'connected').length;
  return `
  <div class="popover" style="bottom:82px;right:0">
    <div class="phead">
      <b>Connectors in this chat</b>
      <span class="chip">${on} on</span>
      <button class="btn ghost" style="padding:5px 9px" data-go="connectors">${ico('gear',13)}Manage</button>
    </div>
    <div class="prule"></div>
    <div class="plist">
      ${list.map(c => `
        <div class="prow">
          ${ico(c.icon,16)}
          <div class="tt"><b>${c.name}</b>
            <small>${c.status==='needs-auth' ? '<span style="color:var(--warn)">Needs auth</span> · ' : ''}${c.tools} tools</small>
          </div>
          ${c.status === 'needs-auth'
            ? `<button class="btn" style="padding:6px 10px;font-size:11.5px" data-reconnect="${c.id}">${ico('refresh',12)}Fix</button>`
            : `<div class="toggle sm ${c.inChat?'on':''}" data-inchat="${c.id}"><div class="knob"></div></div>`}
        </div>`).join('')}
    </div>
  </div>`;
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
             : state.view === 'chat' ? chatView()
             : bookmarksView();
  app.innerHTML = `
    <div class="shell">
      ${sidebar()}
      <div class="main">
        <button class="themebtn" data-theme>
          ${ico(state.theme==='dark'?'sun':'moon',14)}${state.theme==='dark'?'Light':'Dark'}
        </button>
        <div class="content">${view}</div>
        ${state.view==='connectors' ? rail() : ''}
        ${modal()}
        ${toasts()}
      </div>
    </div>`;
  const q = document.getElementById('q');
  if (q && document.activeElement !== q && state.query) {
    q.focus(); q.setSelectionRange(q.value.length, q.value.length);
  }
}

/* ---------- events ---------- */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-go],[data-toggle],[data-folder],[data-tab],[data-layout],[data-connect],[data-consent],[data-manage],[data-pause],[data-resume],[data-disconnect],[data-confirmdisconnect],[data-reconnect],[data-closerail],[data-tool],[data-inchat],[data-popover],[data-add],[data-cancel],[data-scrim],[data-theme],[data-clear],[data-toastclose],[data-toastaction]');
  if (!t) return;
  const d = t.dataset;

  if (d.scrim && e.target !== t) return;               // only the backdrop closes
  if (d.go)        { state.view = d.go; state.popover = false; state.rail = null; }
  if (d.toggle === 'chats')   state.chatsOpen = !state.chatsOpen;
  if (d.toggle === 'folders') state.foldersOpen = !state.foldersOpen;
  if (d.folder)    state.folders[d.folder] = !state.folders[d.folder];
  if (d.tab)       state.tab = d.tab;
  if (d.layout)    state.layout = d.layout;
  if (d.clear !== undefined) state.query = '';
  if (d.theme !== undefined) {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = state.theme;
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
});

document.addEventListener('input', e => {
  if (e.target.id === 'q') { state.query = e.target.value; render(); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (state.modal) state.modal = null;
    else if (state.popover) state.popover = false;
    else if (state.rail) state.rail = null;
    else return;
    render();
  }
});

document.documentElement.dataset.theme = state.theme;
render();
