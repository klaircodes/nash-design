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
