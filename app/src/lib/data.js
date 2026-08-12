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
  'Product Strategist','Code Reviewer','Bug Hunter','Frontend Engineer',
  'Product Designer','Test Writer','Refactor Partner','Documentation Writer',
  'Data Analyst','Copy Editor','Interview Coach','Meeting Summariser',
];

export const fmtDate = iso => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { month:'short', day:'2-digit' });
};
