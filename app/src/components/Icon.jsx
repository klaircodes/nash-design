const P = {
  mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22 6 12 13 2 6"/>',
  lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff:'<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
  check:'<polyline points="20 6 9 17 4 12"/>',
  google:'<path d="M21.35 11.1H12v3.2h5.35a4.6 4.6 0 0 1-2 3l3.2 2.5c1.87-1.73 2.95-4.28 2.95-7.3 0-.6-.05-1.1-.15-1.4z"/><path d="M12 22c2.7 0 4.96-.9 6.55-2.4l-3.2-2.5c-.9.6-2.05.95-3.35.95-2.6 0-4.8-1.75-5.6-4.1l-3.3 2.55A10 10 0 0 0 12 22z"/><path d="M6.4 13.95a6 6 0 0 1 0-3.9L3.1 7.5a10 10 0 0 0 0 9z"/><path d="M12 5.95c1.47 0 2.78.5 3.82 1.5l2.84-2.84A10 10 0 0 0 3.1 7.5l3.3 2.55C7.2 7.7 9.4 5.95 12 5.95z"/>',
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
