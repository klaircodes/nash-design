/* Placeholder content. Nothing here navigates yet. */
export const FOLDERS = [
  { key:'work',     label:'Work',     chats:['Pricing research','Launch checklist'] },
  { key:'research', label:'Research', chats:['Competitor teardown'] },
  { key:'personal', label:'Personal', chats:['Reading list'] },
];

/* every chat here has its own thread in CONVERSATIONS — nothing repeats */
export const CHATS = [
  { title:'Connector permissions review', group:'Today',           pinned:false },
  { title:'Invoice chase — Northwind',    group:'Today',           pinned:false },
  { title:'Q3 roadmap draft',             group:'Yesterday',       pinned:true  },
  { title:'Bug triage — render loop',     group:'Yesterday',       pinned:false },
  { title:'Creating a PDF summary',       group:'Previous 7 days', pinned:true  },
  { title:'Voice chat',                   group:'Previous 7 days', pinned:false },
  { title:'Why .map() returns a new array', group:'Previous 7 days', pinned:false },
  { title:'Resume review',                group:'Previous 7 days', pinned:false },
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

/* Canned threads. Frontend only — no model is called; the reply is fixed.
   Each chat gets its own content; chats without an entry open empty. */
export const REPLY = 'this is a test thanks for using';

export const CONVERSATIONS = {
  'Connector permissions review': [
    { role:'user', text:
      'Can you take the connector permissions review from last week and turn it into ' +
      'something I can actually hand to the security team? I want the scopes we ask ' +
      'for laid out per connector, a note on which ones are read-only versus write, ' +
      'and a short paragraph on what happens to a token when someone leaves the ' +
      'workspace. If a connector needs a scope we cannot justify, flag it rather than ' +
      'quietly listing it. Keep the tone plain — no marketing language, no hedging. ' +
      'It should read like something an engineer wrote for another engineer, and it ' +
      'needs to survive being pasted into a ticket without losing its structure.' },
    { role:'bot', blocks:[
      { t:'h2', v:'Connector scopes — security review' },
      { t:'p',  v:'Each connector gets its own block: the scopes it requests, why it needs them, and whether the access is read or write. Anything that cannot be justified in one sentence moves to a flagged list at the end.' },
      { t:'h3', v:'Token handling' },
      { t:'p',  v:'Tokens are revoked on seat removal, refresh tokens are not reissued, and cached artefacts are dropped on the next sweep. Nothing else depends on this section, so it can be lifted out wholesale.' },
      { t:'ol', v:[
        ['Read-only', 'calendar, contacts, and file listing. Safe to grant by default.'],
        ['Write', 'drive upload and issue creation. Needs an owner on record.'],
        ['Flagged', '`admin.directory.user` — we never call it. Drop from the manifest.'],
      ]},
      { t:'quote', v:'If a scope has no caller in the codebase, it does not belong in the manifest.' },
    ]},
    { role:'user', text:'Good. Which one is the risky scope?' },
    { role:'bot', text:REPLY },
  ],

  'Q3 roadmap draft': [
    { role:'user', blocks:[
      { t:'p',  v:'Write me a blog post about:' },
      { t:'ul', v:[
        'The benefits of design tokens',
        'How to migrate from hex to tokens',
        'Real-world examples from Stripe and Linear',
      ]},
      { t:'p',  v:'Make it casual but informative.' },
    ]},
    { role:'bot', blocks:[
      { t:'h2', v:'Design Tokens: The Foundation of Scalable UI' },
      { t:'p',  v:'If you have ever changed a brand colour and had to update 47 files manually, you already know the problem design tokens solve. They are the single source of truth for every visual decision in your product.' },
      { t:'h3', v:'Why tokens matter' },
      { t:'ol', v:[
        ['Consistency', 'one change propagates everywhere. No more “which grey is this?”'],
        ['Theming', 'dark mode, brand variants, and white-labeling become trivial.'],
        ['Handoff', 'designers and engineers share the same vocabulary.'],
      ]},
      { t:'h3', v:'Real-world examples' },
      { t:'p',  v:'Stripe uses a token layer called “Sail” that maps semantic names to raw values. Their entire component library references tokens like color.background.primary rather than hex codes. Linear takes a similar approach — their design system ships with a complete token set that powers both light and dark themes from a single source.' },
      { t:'p',  v:'In practice, you would reference `color.text.primary` instead of `#E4E5E8`.' },
      { t:'quote', v:'The best design system is one where you never have to think about colours, spacing, or typography — the tokens handle it.' },
    ]},
  ],

  'Invoice chase — Northwind': [
    { role:'user', text:'Draft a short follow-up on the Northwind invoice. Firm, not rude.' },
    { role:'bot',  text:REPLY },
  ],

  'Creating a PDF summary': [
    { role:'user', text:'Summarise the attached spec into one page a PM can skim.' },
    { role:'bot', blocks:[
      { t:'p',  v:'One page, four sections: what changes, what does not, what it costs, and what has to be decided this week.' },
      { t:'ul', v:[
        'Scope — sidebar, composer, and the model picker only.',
        'Out of scope — bookmarks and MCP, which ship after.',
        'Open — whether personas keep their own pinned list.',
      ]},
    ]},
  ],

  'Resume review': [
    { role:'user', blocks:[
      { t:'file', name:'resume_2026.pdf', meta:'PDF · 2.4 MB' },
      { t:'p',    v:'Review my resume and suggest improvements.' },
    ]},
    { role:'bot', blocks:[
      { t:'p', v:'Here is a draft cover letter tailored to a product design role:' },
      { t:'doc', title:'Cover Letter Draft', v:[
        'Dear Hiring Manager,',
        'I am writing to express my strong interest in the Senior Product Designer position at your company. With over 6 years of experience in product design and a proven track record of shipping user-centered products at scale, I believe I would be a valuable addition to your team.',
        'In my current role at…',
      ]},
    ]},
  ],

  'Why .map() returns a new array': [
    { role:'user', blocks:[
      { t:'code', v:'const x = [1, 2, 3];\nx.map(n => n * 2);' },
      { t:'p',    v:'Why does this return a new array?' },
    ]},
    { role:'bot', blocks:[
      { t:'p', v:'`.map()` builds a new array from the return value of the callback for every element. It never touches the original — that is what makes it safe to chain.' },
      { t:'p', v:'Here is how you can implement that:' },
      { t:'code', lang:'javascript', v:
'function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("Claire"));' },
    ]},
  ],

  'Voice chat': [
    { role:'user', text:'Can we start a voice session from the composer directly?' },
    { role:'bot',  text:REPLY },
  ],

  'Pricing research': [
    { role:'user', text:'What do the three competitors charge for a seat, and what is bundled?' },
    { role:'bot', blocks:[
      { t:'p',  v:'All three anchor on a per-seat price and then gate model access rather than usage.' },
      { t:'ol', v:[
        ['Entry', 'one model family, no connectors, capped history.'],
        ['Team',  'all families plus shared personas — this is where they make margin.'],
        ['Enterprise', 'priced on request, which in practice means seat count times a multiplier.'],
      ]},
    ]},
  ],

  'Launch checklist': [
    { role:'user', text:'What is left before we can call this launchable?' },
    { role:'bot',  text:REPLY },
  ],

  'Competitor teardown': [
    { role:'user', text:'Pull apart their onboarding — where does it lose people?' },
    { role:'bot', blocks:[
      { t:'p',    v:'Two drop-offs. The first is a workspace step before anyone has seen the product; the second is model selection presented as a decision rather than a default.' },
      { t:'quote', v:'Nobody wants to choose a model before they have asked a question.' },
    ]},
  ],

  'Reading list': [
    { role:'user', text:'Add the token piece to the list and tell me what is still unread.' },
    { role:'bot',  text:REPLY },
  ],

  'Bug triage — render loop': [
    { role:'user', text:'The sidebar re-renders on every hover. Where would you look first?' },
    { role:'bot', blocks:[
      { t:'p',  v:'Start with component identity. A component declared inside another component is a new type on every render, so React unmounts and remounts its whole subtree instead of updating it.' },
      { t:'p',  v:'Move the row component to module scope and give it local state — the hover no longer travels through the parent at all.' },
    ]},
    { role:'user', text:'That was exactly it.' },
    { role:'bot',  text:REPLY },
  ],
};
