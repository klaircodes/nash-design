/* ============================================================
   Nash — bootstrap
   Restores theme, then mounts auth or the app depending on session.
   ============================================================ */
(function () {
  let theme = 'dark';
  try { theme = localStorage.getItem('nash.theme') || 'dark'; } catch (e) {}
  document.documentElement.dataset.theme = theme;

  let session = null;
  try { session = JSON.parse(localStorage.getItem('nash.session') || 'null'); } catch (e) {}

  // sessions older than 12 hours are treated as expired
  const EXPIRY = 12 * 60 * 60 * 1000;
  if (session && Date.now() - (session.at || 0) > EXPIRY) {
    try { localStorage.removeItem('nash.session'); } catch (e) {}
    session = null;
    window.NashAuth.mount('expired');
    return;
  }

  if (session) window.NashApp.mount();
  else window.NashAuth.mount();
})();
