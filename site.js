// Theme switch (Auto / Light / Dark), links that stay highlighted while you scroll, and cards that fade in.
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // ---- theme
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-theme-choice]'));
  function show(choice) {
    if (choice === 'light' || choice === 'dark') root.setAttribute('data-theme', choice);
    else root.removeAttribute('data-theme');
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-theme-choice') === choice)); });
  }
  var saved = 'system';
  try { saved = localStorage.getItem('skh_theme') || 'system'; } catch (e) { /* blocked storage */ }
  show(saved);
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var choice = b.getAttribute('data-theme-choice');
      show(choice);
      try { localStorage.setItem('skh_theme', choice); } catch (e) { /* blocked storage */ }
    });
  });

  // ---- cards fade in when they scroll into view
  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (i) { io.observe(i); });
  } else {
    items.forEach(function (i) { i.classList.add('in'); });
  }

  // ---- the section you are in is marked in the top bar
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a, n) { a.classList.toggle('current', sections[n] === e.target); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) spy.observe(s); });
  }
})();
