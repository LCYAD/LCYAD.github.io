(function () {
  if (window.lucide) window.lucide.createIcons();

  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');
  var savedTheme = localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
  toggle.addEventListener('click', function () { setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'); });

  var tabs = Array.prototype.slice.call(document.querySelectorAll('.sidebar-tab'));
  var sections = tabs.map(function (tab) {
    return { tab: tab, section: document.querySelector(tab.getAttribute('href')) };
  }).filter(function (item) { return item.section; });
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      tabs.forEach(function (tab) { tab.classList.remove('active'); });
      var active = sections.find(function (item) { return item.section === entry.target; });
      if (active) active.tab.classList.add('active');
    });
  }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
  sections.forEach(function (item) { observer.observe(item.section); });
}());
