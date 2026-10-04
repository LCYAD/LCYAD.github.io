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

  var contentScript = document.currentScript;
  var contentSource = contentScript && contentScript.dataset.resumeSource || 'data/resume.json';
  var localContentSource = 'data/resume.json';

  function text(value) {
    return typeof value === 'string' ? value : '';
  }

  function element(tagName, className, value) {
    var node = document.createElement(tagName);
    if (className) node.className = className;
    if (value) node.textContent = value;
    return node;
  }

  function appendIntro(container, intro) {
    if (text(intro)) container.appendChild(element('p', 'section-intro', intro));
  }

  function renderExperience(experience) {
    var container = document.getElementById('experience-content');
    var timeline = element('div', 'timeline');
    container.textContent = '';
    appendIntro(container, experience.intro);

    experience.items.forEach(function (item) {
      var article = element('article', 'timeline-item');
      var header = element('header', 'timeline-header');
      var companyGroup = element('div', 'company-group');
      var mark = element('span', 'company-mark', text(item.mark) || text(item.company).charAt(0));
      var company = element('h3', '', text(item.company));
      var period = element('p', '', text(item.period));
      companyGroup.appendChild(mark);
      companyGroup.appendChild(company);
      header.appendChild(companyGroup);
      header.appendChild(period);
      article.appendChild(header);

      if (text(item.role)) article.appendChild(element('p', 'timeline-role', item.role));
      if (text(item.location)) article.appendChild(element('p', 'timeline-location', item.location));
      if (Array.isArray(item.highlights) && item.highlights.length) {
        var highlights = element('ul');
        item.highlights.forEach(function (highlight) {
          if (text(highlight)) highlights.appendChild(element('li', '', highlight));
        });
        article.appendChild(highlights);
      }
      timeline.appendChild(article);
    });
    container.appendChild(timeline);
  }

  function renderSkills(skills) {
    var container = document.getElementById('skills-content');
    var grid = element('div', 'skills-grid');
    container.textContent = '';
    appendIntro(container, skills.intro);

    skills.categories.forEach(function (category) {
      var card = element('div', 'skill-category');
      card.appendChild(element('h3', '', text(category.title)));
      card.appendChild(element('p', '', Array.isArray(category.skills) ? category.skills.join(', ') : text(category.skills)));
      grid.appendChild(card);
    });
    container.appendChild(grid);
  }

  function renderCredentials(credentials) {
    var container = document.getElementById('credentials-content');
    var list = element('div', 'credentials-list');
    container.textContent = '';
    appendIntro(container, credentials.intro);

    credentials.items.forEach(function (item) {
      var credential = element('article', 'credential');
      var details = element('div');
      details.appendChild(element('h3', '', text(item.title)));
      if (text(item.detail)) details.appendChild(element('p', '', item.detail));
      credential.appendChild(details);
      if (text(item.period)) credential.appendChild(element('time', '', item.period));
      list.appendChild(credential);
    });
    container.appendChild(list);
  }

  function isResumeData(data) {
    function isObject(value) {
      return value !== null && typeof value === 'object' && !Array.isArray(value);
    }

    return data && data.experience && Array.isArray(data.experience.items) &&
      data.skills && Array.isArray(data.skills.categories) &&
      data.credentials && Array.isArray(data.credentials.items) &&
      data.experience.items.every(isObject) &&
      data.skills.categories.every(isObject) &&
      data.credentials.items.every(isObject);
  }

  function loadJson(source) {
    var url = new URL(source, window.location.href);
    url.searchParams.set('cacheBust', Date.now().toString());
    return fetch(url.href, { cache: 'no-store' }).then(function (response) {
      if (!response.ok) throw new Error('Unable to load resume content: ' + response.status);
      return response.json();
    }).then(function (data) {
      if (!isResumeData(data)) throw new Error('Resume content does not match the expected format.');
      return data;
    });
  }

  function showContentError() {
    ['experience-content', 'skills-content', 'credentials-content'].forEach(function (id) {
      var container = document.getElementById(id);
      container.textContent = '';
      container.appendChild(element('p', 'section-intro content-error', 'This content is temporarily unavailable. Please refresh the page.'));
    });
  }

  loadJson(contentSource).catch(function (error) {
    if (contentSource === localContentSource) throw error;
    console.warn('Could not load the Gist content. Using the local fallback instead.', error);
    return loadJson(localContentSource);
  }).then(function (data) {
    renderExperience(data.experience);
    renderSkills(data.skills);
    renderCredentials(data.credentials);
  }).catch(function (error) {
    console.error(error);
    showContentError();
  });
}());
