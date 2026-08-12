/* Placeholder content. Nothing here navigates yet. */
export const FOLDERS = [
  { key:'work',     label:'Work',     chats:['Q3 roadmap','Pricing research','Launch checklist'] },
  { key:'research', label:'Research', chats:['Competitor teardown','User interviews'] },
  { key:'personal', label:'Personal', chats:['Reading list'] },
];

export const CHATS = [
  { title:'Connector permissions review', group:'Today',            pinned:false },
  { title:'Invoice chase — Northwind',    group:'Today',            pinned:false },
  { title:'Q3 roadmap draft',             group:'Yesterday',        pinned:true  },
  { title:'Bug triage — render loop',     group:'Yesterday',        pinned:false },
  { title:'Voice chat',                   group:'Previous 7 days',  pinned:false },
  { title:'Fork: Testing — What’s Next?', group:'Previous 7 days',  pinned:false },
  { title:'Friendly Chat Beginnings',     group:'Previous 30 days', pinned:false },
  { title:'Creating a PDF summary',       group:'Previous 30 days', pinned:true  },
  { title:'Whimsical Tales Unfold',       group:'Previous 30 days', pinned:false },
  { title:'Testing the Waters',           group:'June',             pinned:false },
  { title:'Voice chat',                   group:'June',             pinned:false },
];

export const GROUP_ORDER = ['Today','Yesterday','Previous 7 days','Previous 30 days','June'];

/* ---------- models ----------
   date drives Newest/Oldest, tags drive the filters.            */
export const PROVIDERS = [
  { name:'Open AI',   note:'GPT-5, GPT-5 mini, o4' },
  { name:'Anthropic', note:'Claude Opus 5, Opus 4.8, Sonnet 5' },
  { name:'Google',    note:'Gemini 3 Pro, Gemini 3 Flash' },
  { name:'Meta',      note:'Llama 4, Llama 4 Scout' },
  { name:'Mistral',   note:'Mistral Large 3, Codestral' },
  { name:'xAI',       note:'Grok 4, Grok 4 mini' },
];

const m = (name, provider, date, tags, isNew) => ({ name, provider, date, tags, isNew: !!isNew });

export const MODELS = [
  m('GPT-5',            'Open AI',   '2026-06-20', ['vision','powerful']),
  m('GPT-5 mini',       'Open AI',   '2026-06-20', ['vision','fast']),
  m('GPT-5 nano',       'Open AI',   '2026-04-02', ['fast']),
  m('o4',               'Open AI',   '2026-02-08', ['powerful']),

  m('Claude Opus 5',    'Anthropic', '2026-07-29', ['vision','powerful'], true),
  m('Claude Opus 4.8',  'Anthropic', '2026-03-18', ['vision','powerful']),
  m('Claude Sonnet 5',  'Anthropic', '2026-06-02', ['vision','fast']),
  m('Claude Haiku 4.5', 'Anthropic', '2026-01-14', ['vision','fast']),

  m('Gemini 3 Pro',     'Google',    '2026-05-11', ['vision','powerful']),
  m('Gemini 3 Flash',   'Google',    '2026-05-11', ['vision','fast']),
  m('Gemma 3',          'Google',    '2026-02-20', ['open-source','fast']),

  m('Llama 4',          'Meta',      '2026-04-02', ['open-source','powerful']),
  m('Llama 4 Scout',    'Meta',      '2026-04-02', ['open-source','fast']),

  m('Mistral Large 3',  'Mistral',   '2026-03-30', ['open-source','powerful']),
  m('Codestral',        'Mistral',   '2026-02-19', ['open-source','fast']),

  m('Grok 4',           'xAI',       '2026-07-08', ['vision','powerful'], true),
  m('Grok 4 mini',      'xAI',       '2026-07-08', ['fast']),
];

export const FILTERS = [
  { key:'all',         label:'All' },
  { key:'open-source', label:'Open source' },
  { key:'fast',        label:'Fast' },
  { key:'powerful',    label:'Powerful' },
];

export const SORTS = [
  { key:'newest', label:'Newest first' },
  { key:'oldest', label:'Oldest first' },
  { key:'az',     label:'Name A–Z' },
];

export const PERSONAS = [
  { name:'Product Strategist',    desc:'Turns rough product ideas into structured plans, competitive analysis and go-to-market strategy.' },
  { name:'Code Reviewer',         desc:'Reviews changes for logic issues, edge cases and consistency with the existing codebase.' },
  { name:'Bug Hunter',            desc:'Traces broken behaviour across files, state and user flows to narrow down the cause.' },
  { name:'Frontend Engineer',     desc:'Builds, debugs and refines interface code with attention to layout and interaction states.' },
  { name:'Product Designer',      desc:'Turns rough ideas into structured user flows, screen layouts and interaction patterns.' },
  { name:'Test Writer',           desc:'Creates focused tests for existing behaviour, edge cases and recent changes.' },
  { name:'Refactor Partner',      desc:'Simplifies messy code while preserving behaviour. Reduces duplication and improves structure.' },
  { name:'Documentation Writer',  desc:'Turns technical decisions, APIs and workflows into clear documentation.' },
  { name:'Data Analyst',          desc:'Writes queries, checks assumptions and explains what the numbers actually support.' },
  { name:'Copy Editor',           desc:'Tightens wording, fixes tone drift and cuts anything that is not earning its place.' },
  { name:'Interview Coach',       desc:'Runs practice questions, pushes back on vague answers and suggests sharper framing.' },
  { name:'Meeting Summariser',    desc:'Condenses notes into decisions, owners and open questions — nothing else.' },
];

export const fmtDate = iso => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { month:'short', day:'2-digit' });
};

export const ORGS = ['Mo', 'NashTest', 'Test'];

/* Canned threads. Frontend only — no model is called; the reply is fixed. */
export const REPLY = 'this is a test thanks for using';

const LONG_USER =
  'Can you take the connector permissions review from last week and turn it into ' +
  'something I can actually hand to the security team? I want the scopes we ask ' +
  'for laid out per connector, a note on which ones are read-only versus write, ' +
  'and a short paragraph on what happens to a token when someone leaves the ' +
  'workspace. If a connector needs a scope we cannot justify, flag it rather than ' +
  'quietly listing it. Keep the tone plain — no marketing language, no hedging. ' +
  'It should read like something an engineer wrote for another engineer, and it ' +
  'needs to survive being pasted into a ticket without losing its structure.';

const LONG_REPLY =
  'Here is the shape I would use. Each connector gets its own block with the ' +
  'scopes it requests, the reason it needs them, and whether the access is read ' +
  'or write. Anything that cannot be justified in one sentence goes in a separate ' +
  'list at the end so it is impossible to miss. Token handling is its own short ' +
  'section because it is the part security will actually read first: tokens are ' +
  'revoked on seat removal, refresh tokens are not reissued, and any cached ' +
  'artefacts are dropped on the next sweep. Nothing else in the document depends ' +
  'on that section, so it can be lifted out wholesale if they want it separately.';

export const CONVERSATIONS = {
  'Connector permissions review': [
    { role:'user', text:LONG_USER },
    { role:'bot',  text:LONG_REPLY },
    { role:'user', text:'Good. Which one is the risky scope?' },
    { role:'bot',  text:REPLY },
  ],
  'Invoice chase — Northwind': [
    { role:'user', text:'Draft a short follow-up on the Northwind invoice. Firm, not rude.' },
    { role:'bot',  text:REPLY },
  ],
  'Q3 roadmap draft': [
    { role:'user', text:'What is still unresolved in the Q3 draft?' },
    { role:'bot',  text:LONG_REPLY },
    { role:'user', text:'Cut it to three bullets.' },
    { role:'bot',  text:REPLY },
  ],
  'Bug triage — render loop': [
    { role:'user', text:'The sidebar re-renders on every hover. Where would you look first?' },
    { role:'bot',  text:REPLY },
  ],
};

export const FALLBACK_THREAD = [
  { role:'user', text:'Picking this back up — where did we leave it?' },
  { role:'bot',  text:REPLY },
];
