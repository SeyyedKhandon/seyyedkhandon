// Runs before the page is drawn, so a pinned Light or Dark theme never flashes the other one.
try {
  var theme = localStorage.getItem('skh_theme');
  if (theme === 'light' || theme === 'dark') document.documentElement.setAttribute('data-theme', theme);
} catch (error) {
  // blocked storage: the device's setting decides
}
