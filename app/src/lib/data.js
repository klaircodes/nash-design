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
