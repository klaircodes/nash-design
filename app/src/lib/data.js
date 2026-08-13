/* Placeholder content. Nothing here navigates yet. */
export const FOLDERS = [
  { key:'work',     label:'Work',     chats:['Q3 roadmap draft','Pricing research'] },
  { key:'research', label:'Research', chats:['Competitor teardown','Naming a design pattern'] },
  { key:'personal', label:'Personal', chats:['Resume review'] },
];

/* loose chats; the rest live in FOLDERS. Every title has its own thread. */
export const CHATS = [
  { title:'Connector permissions review',   group:'Today',           pinned:false },
  { title:'Bug triage — render loop',       group:'Yesterday',       pinned:false },
  { title:'Why .map() returns a new array', group:'Previous 7 days', pinned:false },
  { title:'Voice chat',                     group:'Previous 7 days', pinned:true  },
  { title:'Comparing models',               group:'Today',           pinned:false },
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

/* one org is already signed in; the others still need it */
export const ORGS = [
  { name:'Mo',       signedIn:false },
  { name:'NashTest', signedIn:true  },
  { name:'Test',     signedIn:false },
];

/* switching workspace swaps the content, never the behaviour */
export const WORKSPACES = {
  Personal: { chats: CHATS, folders: FOLDERS },
  NashTest: {
    chats: [
      { title:'Design system audit',   group:'Today',           pinned:true  },
      { title:'Onboarding copy pass',  group:'Today',           pinned:false },
      { title:'Sprint 12 retro',       group:'Previous 7 days', pinned:false },
    ],
    folders: [
      { key:'ws-design',  label:'Design',  chats:['Token migration'] },
      { key:'ws-eng',     label:'Engineering', chats:['Release checklist'] },
    ],
  },
};

/* Canned threads. Frontend only — no model is called; the reply is fixed.
   Each chat gets its own content; chats without an entry open empty. */
export const REPLY = 'this is a test thanks for using';

/* shown while a reply is on its way */
export const THINKING = [
  'Thinking', 'Brewing', 'Discombobulating', 'Pondering', 'Percolating',
  'Untangling', 'Rummaging', 'Noodling', 'Marinating', 'Cogitating',
  'Deliberating', 'Assembling',
];

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



  'Comparing models': [
    { role:'user', text:'Compare GPT-5, Claude Opus 5, and Gemini 3 Pro for me.' },
    { role:'bot', model:'Claude Sonnet 5', blocks:[
      { t:'p', v:'Here is a comparison of the models:' },
      { t:'table',
        head:['Model','Speed','Quality','Cost'],
        rows:[
          ['GPT-5',          'Fast',   'High',      '$$'],
          ['Claude Opus 5',  'Medium', 'Very high', '$$$'],
          ['Gemini 3 Pro',   'Fast',   'High',      '$$'],
        ]},
    ]},
    { role:'user', text:'Create a simple portfolio website for me.' },
    { role:'bot', model:'Claude Sonnet 5', blocks:[
      { t:'p',  v:'I have created the site — one page, no dependencies. Here is the file:' },
      { t:'dl', name:'portfolio.html', meta:'Code · HTML' },
    ]},
    { role:'user', text:'Analyse this 500-page PDF and summarise every chapter.' },
    { role:'bot', model:'Claude Opus 4.8', failed:true, blocks:[
      { t:'error', v:'Something went wrong generating the response. The model may be overloaded. Please try again or switch to a different model.' },
    ]},
  ],

  'Naming a design pattern': [
    { role:'user', blocks:[
      { t:'img', ratio:'3 / 2' },
      { t:'p',   v:'What is this design pattern called?' },
    ]},
    { role:'bot', model:'Open AI/DALL·E 3', blocks:[
      { t:'p',   v:'Here is the generated image based on your description:' },
      { t:'img', ratio:'1.57 / 1' },
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


  'Competitor teardown': [
    { role:'user', text:'Pull apart their onboarding — where does it lose people?' },
    { role:'bot', blocks:[
      { t:'p',    v:'Two drop-offs. The first is a workspace step before anyone has seen the product; the second is model selection presented as a decision rather than a default.' },
      { t:'quote', v:'Nobody wants to choose a model before they have asked a question.' },
    ]},
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

Object.assign(CONVERSATIONS, {
  'Design system audit': [
    { role:'user', text:'Where is the design system drifting from what is actually shipped?' },
    { role:'bot', blocks:[
      { t:'p',  v:'Three places, in order of how much they cost to leave alone:' },
      { t:'ol', v:[
        ['Colour', 'six greys in the code, four in the library. The two extras came from screenshots.'],
        ['Spacing', 'the 4px scale is respected everywhere except the composer, which uses 13 and 22.'],
        ['Icons', 'two sets in play — the outline set and whatever shipped with the picker.'],
      ]},
    ]},
  ],
  'Onboarding copy pass': [
    { role:'user', text:'Tighten the empty-state copy. It reads like a manual.' },
    { role:'bot',  text:REPLY },
  ],
  'Sprint 12 retro': [
    { role:'user', text:'Summarise what went wrong in sprint 12 without naming anyone.' },
    { role:'bot', blocks:[
      { t:'p',     v:'Two themes: work started before the shape was agreed, and review happened after merge rather than before.' },
      { t:'quote', v:'Nothing was late. Things were just decided twice.' },
    ]},
  ],
  'Token migration': [
    { role:'user', text:'What is left in the hex-to-token migration?' },
    { role:'bot',  text:REPLY },
  ],
  'Release checklist': [
    { role:'user', text:'Draft the pre-release checklist for the next tag.' },
    { role:'bot', blocks:[
      { t:'p',  v:'Keep it to what would actually block a release:' },
      { t:'ul', v:[
        'Dark and light both pass a visual sweep.',
        'Composer keyboard behaviour verified on a phone.',
        'No console errors on a cold load.',
      ]},
    ]},
  ],
});

/* ---------- memories ---------- */
export const MEM_SCOPES = ['Global', 'Workspace', 'Persona', 'Chat'];

/* the stored value stays stable; only what you read changes. Named by how far
   the memory reaches rather than by the object it hangs off. */
export const MEM_SCOPE_LABEL = {
  Global:    'Everywhere',
  Workspace: 'This workspace',
  Persona:   'One persona',
  Chat:      'One chat',
};

const MEM_SEED = [
  ['The user prefers Prometheus + Grafana for monitoring. They use alertmanager for routing and have a custom dashboard for SLO tracking.', 'Global', 'Open-source monitoring chat', 20, '2026-04-07'],
  ['Writes in British English. Prefers “colour”, “behaviour”, and em dashes over parentheses.', 'Global', 'Onboarding copy pass', 14, '2026-04-05'],
  ['The design system uses a 4px spacing scale. Anything off-scale is a bug, not a variant.', 'Workspace', 'Design system audit', 17, '2026-03-29'],
  ['Ships to production on Thursdays. Never on a Friday, never the day before a holiday.', 'Workspace', 'Release checklist', 15, '2026-03-24'],
  ['The Code Reviewer persona should lead with the failure scenario before the fix.', 'Persona', 'Persona tuning', 13, '2026-03-18'],
  ['Prefers answers that state the assumption up front rather than asking a clarifying question.', 'Persona', 'Persona tuning', 15, '2026-03-11'],
  ['In this thread, “the panel” always means the model picker, not the sidebar.', 'Chat', 'Comparing models', 13, '2026-03-04'],
  ['Treat every price in this thread as USD unless stated otherwise.', 'Chat', 'Pricing research', 11, '2026-02-26'],
  ['Do not suggest adding dependencies. This project stays on the standard library.', 'Workspace', 'Bug triage — render loop', 14, '2026-02-19'],
  ['The user is on a 14-inch laptop; check layouts at 1440×900 before calling them done.', 'Global', 'Design system audit', 18, '2026-02-12'],
];

export const MEMORIES = MEM_SEED.map(([text, scope, from, tokens, date], i) => ({
  id: `m${i}`, text, scope, from, tokens, date,
}));

export const fmtMemDate = iso => {
  const [y, m, d] = iso.split('-').map(Number);
  const month = ['Jan','Feb','Mar','Apr','May','Jun',
                 'Jul','Aug','Sep','Oct','Nov','Dec'][m - 1];
  return `${month} ${d}, ${y}`;
};
