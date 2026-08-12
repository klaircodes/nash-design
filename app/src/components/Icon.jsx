const P = {
  mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22 6 12 13 2 6"/>',
  lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff:'<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
  check:'<polyline points="20 6 9 17 4 12"/>',
  google:'<path d="M21.35 11.1H12v3.2h5.35a4.6 4.6 0 0 1-2 3l3.2 2.5c1.87-1.73 2.95-4.28 2.95-7.3 0-.6-.05-1.1-.15-1.4z"/><path d="M12 22c2.7 0 4.96-.9 6.55-2.4l-3.2-2.5c-.9.6-2.05.95-3.35.95-2.6 0-4.8-1.75-5.6-4.1l-3.3 2.55A10 10 0 0 0 12 22z"/><path d="M6.4 13.95a6 6 0 0 1 0-3.9L3.1 7.5a10 10 0 0 0 0 9z"/><path d="M12 5.95c1.47 0 2.78.5 3.82 1.5l2.84-2.84A10 10 0 0 0 3.1 7.5l3.3 2.55C7.2 7.7 9.4 5.95 12 5.95z"/>',
  panel:'<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="15" y1="3" x2="15" y2="21"/>',
  user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  bookmark:'<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>',
  dots:'<circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>',
  dotsH:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  chevD:'<polyline points="6 9 12 15 18 9"/>',
  building:'<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="7" x2="9.01" y2="7"/><line x1="15" y1="7" x2="15.01" y2="7"/><line x1="9" y1="12" x2="9.01" y2="12"/><line x1="15" y1="12" x2="15.01" y2="12"/><path d="M10 22v-4h4v4"/>',
  folder:'<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  pin:'<g transform="rotate(-45 12 12)"><line x1="12" y1="17" x2="12" y2="22"/><path d="M9 2h6l-1 7 3 3v3H7v-3l3-3z"/></g>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  mic:'<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>',
  send:'<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
  clip:'<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
  temp:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><polyline points="12 8 12 11 14 12"/>',
  servers:'<rect x="2" y="4" width="20" height="7" rx="2"/><rect x="2" y="13" width="20" height="7" rx="2"/><line x1="6" y1="7.5" x2="6.01" y2="7.5"/><line x1="6" y1="16.5" x2="6.01" y2="16.5"/>',
  chevL:'<polyline points="15 18 9 12 15 6"/>',
  chevR:'<polyline points="9 18 15 12 9 6"/>',
  x:'<path d="M18 6L6 18M6 6l12 12"/>',
  sort:'<line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>',
  wave:'<line x1="4" y1="10" x2="4" y2="14"/><line x1="8" y1="7" x2="8" y2="17"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="16" y1="7" x2="16" y2="17"/><line x1="20" y1="10" x2="20" y2="14"/>',
};

export default function Icon({ name, size = 16, className = '' }) {
  const d = P[name];
  if (!d) return null;
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round"
         dangerouslySetInnerHTML={{ __html: d }} />
  );
}
