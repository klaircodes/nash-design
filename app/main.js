/* ============================================================
   Nash — bootstrap
   Frontend only. Restores the saved theme, then shows the
   login screen. No session, no storage beyond the theme.
   ============================================================ */
(function () {
  let theme = 'dark';
  try { theme = localStorage.getItem('nash.theme') || 'dark'; } catch (e) {}
  document.documentElement.dataset.theme = theme;
  window.NashAuth.mount();
})();
