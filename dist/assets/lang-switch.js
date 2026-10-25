(function () {
  var ROUTES = { ko: '/', en: '/en/' };
  var cache = {};

  function currentLang() {
    return (document.documentElement.getAttribute('lang') || 'ko').toLowerCase().startsWith('en') ? 'en' : 'ko';
  }

  function snapshotCurrentDom() {
    var shell = document.querySelector('.page-shell');
    var skip = document.querySelector('.skip');
    if (!shell) return;
    cache[currentLang()] = {
      title: document.title,
      skipText: skip ? skip.textContent : '',
      shellHtml: shell.innerHTML
    };
  }

  function extractFromHtml(htmlText) {
    var doc = new DOMParser().parseFromString(htmlText, 'text/html');
    var shell = doc.querySelector('.page-shell');
    var skip = doc.querySelector('.skip');
    if (!shell) return null;
    return {
      title: doc.title,
      skipText: skip ? skip.textContent : '',
      shellHtml: shell.innerHTML
    };
  }

  function prefetchLang(lang) {
    if (cache[lang]) return Promise.resolve(cache[lang]);
    return fetch(ROUTES[lang], { credentials: 'same-origin' })
      .then(function (res) { return res.ok ? res.text() : ''; })
      .then(function (text) {
        if (!text) return null;
        var parsed = extractFromHtml(text);
        if (parsed) cache[lang] = parsed;
        return parsed;
      })
      .catch(function () { return null; });
  }

  function applyLang(lang, pushHistory) {
    var data = cache[lang];
    var shell = document.querySelector('.page-shell');
    if (!data || !shell) return false;

    document.documentElement.setAttribute('lang', lang);
    document.title = data.title;
    var skip = document.querySelector('.skip');
    if (skip && data.skipText) skip.textContent = data.skipText;
    shell.innerHTML = data.shellHtml;

    if (pushHistory) {
      history.pushState({ lang: lang }, '', ROUTES[lang]);
    }
    return true;
  }

  snapshotCurrentDom();

  var other = currentLang() === 'ko' ? 'en' : 'ko';
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(function () { prefetchLang(other); });
  } else {
    setTimeout(function () { prefetchLang(other); }, 120);
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var link = e.target.closest ? e.target.closest('[data-lang-switch]') : null;
    if (!link) return;

    var targetLang = link.getAttribute('data-lang-switch');
    if (!targetLang || !ROUTES[targetLang]) return;

    try {
      localStorage.setItem('minlabs_lang', targetLang);
    } catch (err) {}

    if (targetLang === currentLang()) {
      e.preventDefault();
      return;
    }

    if (cache[targetLang]) {
      e.preventDefault();
      applyLang(targetLang, true);
    } else {
      e.preventDefault();
      prefetchLang(targetLang).then(function (loaded) {
        if (loaded) {
          applyLang(targetLang, true);
        } else {
          window.location.href = ROUTES[targetLang];
        }
      });
    }
  });

  window.addEventListener('popstate', function () {
    var pathLang = window.location.pathname.indexOf('/en') === 0 ? 'en' : 'ko';
    if (pathLang !== currentLang() && cache[pathLang]) {
      applyLang(pathLang, false);
    }
  });
})();
