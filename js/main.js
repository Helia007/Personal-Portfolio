/* ═══════════════════════════════════════════════════════════════════════
   main.js — reads content.js and builds the page.
   You should not need to edit this. All your text lives in content.js
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var D = window.PORTFOLIO;
  if (!D) { console.error('content.js did not load — check it sits next to index.html'); return; }

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };
  var has  = function (v) { return v != null && String(v).trim() !== ''; };
  var list = function (v) { return Array.isArray(v) ? v.filter(has) : []; };
  var set  = function (id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; return el; };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var P = D.profile || {};

  /* ── 1. NAV, WORDMARK, RÉSUMÉ ──────────────────────────────────────── */
  set('wordmark', esc(P.name || ''));
  if (has(P.name)) document.title = P.name;

  ['navResume', 'contactResume'].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    if (has(P.resume)) el.setAttribute('href', P.resume);
    else el.remove();
  });

  /* ── 2. OPENER ─────────────────────────────────────────────────────── */
  var O = D.opener || {};
  set('openerIndex', esc(O.index || ''));
  set('openerName',  esc(P.name || ''));
  set('openerLine',  esc(O.line || ''));
  set('openerMeta', list(O.meta).map(function (m) {
    return '<div><dt>' + esc(m.label) + '</dt><dd>' + esc(m.value) + '</dd></div>';
  }).join(''));

  /* ── 4. WORK — a numbered index with a preview that follows it ────── */
  var projects = list(D.projects).filter(function (p) { return has(p.title); });
  /* featured projects are hung first; every tile is the same size */
  projects = projects.filter(function (p) { return p.featured; })
              .concat(projects.filter(function (p) { return !p.featured; }));
  var indexEl   = document.getElementById('workIndex');
  var previewEl = document.getElementById('workPreview');

  function coverHTML(p) {
    return '<div class="cover"><span>' + esc(p.category || 'Project') + '</span></div>';
  }
  function mediaHTML(p) {
    if (!has(p.image)) return coverHTML(p);
    return '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy" data-fallback="cover">';
  }
  /* a wrong filename falls back to the drawn cover rather than breaking */
  function wireFallbacks(root, project) {
    $$('img[data-fallback]', root).forEach(function (img) {
      img.addEventListener('error', function () {
        if (img.getAttribute('data-fallback') === 'cover') img.outerHTML = coverHTML(project || {});
        else img.remove();
      }, { once: true });
    });
  }

  var countEl = document.getElementById('workCount');
  if (countEl) countEl.textContent = projects.length + (projects.length === 1 ? ' project' : ' projects');

  var gallery = document.getElementById('gallery');
  if (gallery) {
    gallery.innerHTML = projects.map(function (p, i) {
      var cat = [];
      if (has(p.category)) cat.push(esc(p.category));
      if (has(p.year))     cat.push(esc(p.year));
      return '<article class="tile reveal" data-i="' + i + '">' +
        '<button class="tile-btn" aria-haspopup="dialog">' +
          '<span class="tile-media">' +
            (has(p.status) ? '<span class="tile-badge">' + esc(p.status) + '</span>' : '') +
            mediaHTML(p) +
          '</span>' +
          '<span class="tile-body">' +
            '<span class="tile-title">' + esc(p.title) + '</span>' +
            (cat.length ? '<span class="tile-cat">' + cat.join(' · ') + '</span>' : '') +
          '</span>' +
        '</button></article>';
    }).join('');
    $$('.tile', gallery).forEach(function (el) {
      wireFallbacks(el, projects[parseInt(el.getAttribute('data-i'), 10)]);
    });
    gallery.addEventListener('click', function (e) {
      var t = e.target.closest('.tile');
      if (t) openProject(parseInt(t.getAttribute('data-i'), 10));
    });
  }

  /* filters, built from whatever categories you actually use */
  var filterBar = document.getElementById('filters');
  var emptyEl   = document.getElementById('emptyNote');
  if (filterBar && gallery) {
    var cats = [];
    projects.forEach(function (p) {
      var c = has(p.category) ? p.category : 'Other';
      if (cats.indexOf(c) === -1) cats.push(c);
    });

    if (cats.length > 1) {
      filterBar.innerHTML = ['<button class="filter is-on" data-f="all">All</button>']
        .concat(cats.map(function (c) {
          return '<button class="filter" data-f="' + esc(c) + '">' + esc(c) + '</button>';
        })).join('');

      filterBar.addEventListener('click', function (e) {
        var btn = e.target.closest('.filter');
        if (!btn) return;
        $$('.filter', filterBar).forEach(function (b) { b.classList.remove('is-on'); });
        btn.classList.add('is-on');
        var f = btn.getAttribute('data-f'), shown = 0;
        $$('.tile', gallery).forEach(function (tile) {
          var p = projects[parseInt(tile.getAttribute('data-i'), 10)] || {};
          var ok = f === 'all' || (has(p.category) ? p.category : 'Other') === f;
          tile.hidden = !ok;
          if (ok) shown++;
        });
        if (emptyEl) emptyEl.hidden = shown > 0;
      });
    } else {
      filterBar.remove();          /* one category only — no point showing a filter */
    }
  }

  /* ── 5. PROJECT DIALOG ─────────────────────────────────────────────── */
  var modal = document.getElementById('modal');
  var modalBody = document.getElementById('modalBody');
  var lastFocus = null;

  function openProject(i) {
    var p = projects[i];
    if (!p || !modal) return;

    var meta = [];
    ['category', 'year', 'role', 'status'].forEach(function (k) {
      if (has(p[k])) meta.push('<span>' + esc(p[k]) + '</span>');
    });

    var html = '<div class="m-media">' + mediaHTML(p) + '</div><div class="m-body">' +
      (meta.length ? '<div class="m-meta">' + meta.join('') + '</div>' : '') +
      '<h2 class="m-title" id="modalTitle">' + esc(p.title) + '</h2>' +
      (has(p.summary) ? '<p class="m-summary">' + esc(p.summary) + '</p>' : '');

    if (list(p.highlights).length) {
      html += '<p class="m-sub">What I did</p><ul class="m-list">' +
        list(p.highlights).map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul>';
    }
    if (list(p.tags).length) {
      html += '<p class="m-sub">Skills</p><div class="m-tags">' +
        list(p.tags).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>';
    }
    if (list(p.gallery).length) {
      html += '<p class="m-sub">Gallery</p><div class="m-gallery">' +
        list(p.gallery).map(function (g) {
          return '<img src="' + esc(g) + '" alt="' + esc(p.title) + '" loading="lazy" data-fallback="drop">';
        }).join('') + '</div>';
    }
    if (list(p.links).length) {
      html += '<div class="m-links">' + list(p.links).map(function (l) {
        return '<a class="m-link" href="' + esc(l.url) + '" target="_blank" rel="noopener">' +
               esc(l.label || 'Open') + '</a>';
      }).join('') + '</div>';
    }
    html += '</div>';

    modalBody.innerHTML = html;
    wireFallbacks(modalBody, p);
    modal.hidden = false;
    document.body.classList.add('locked');
    lastFocus = document.activeElement;
    var close = document.getElementById('modalClose');
    if (close) close.focus();
  }

  function closeProject() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    modalBody.innerHTML = '';
    document.body.classList.remove('locked');
    if (lastFocus) lastFocus.focus();
  }

  if (modal) modal.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-close') || e.target.closest('#modalClose')) closeProject();
  });

  /* ── 5b. SKILLS — datasheet rows ───────────────────────────────────── */
  set('caps', list(D.skills).map(function (g) {
    return '<div class="cap reveal">' +
      '<h3 class="cap-title">' + esc(g.group) + '</h3>' +
      '<ul class="cap-list">' +
        list(g.items).map(function (it) { return '<li>' + esc(it) + '</li>'; }).join('') +
      '</ul></div>';
  }).join(''));

  /* ── 6. ABOUT ──────────────────────────────────────────────────────── */
  var A = D.about || {};
  var portrait = document.getElementById('portrait');
  if (portrait) {
    var fb = '<div class="portrait-fallback">' + esc(P.initials || '') + '</div>';
    if (has(A.photo)) {
      portrait.innerHTML = '<img src="' + esc(A.photo) + '" alt="' + esc(A.photoAlt || P.name || '') + '">';
      portrait.querySelector('img')
        .addEventListener('error', function () { portrait.innerHTML = fb; }, { once: true });
    } else {
      portrait.innerHTML = fb;
    }
  }
  set('aboutLead', esc(A.lead || ''));
  set('aboutText', list(A.text).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join(''));
  set('credentials', list(A.credentials).map(function (c) {
    return '<div class="cred reveal">' +
      (has(c.date) ? '<span class="cred-date">' + esc(c.date) + '</span>' : '') +
      '<span class="cred-title">' + esc(c.title) + '</span>' +
      (has(c.org) ? '<span class="cred-org">' + esc(c.org) + '</span>' : '') +
      '</div>';
  }).join(''));

  /* ── 7. CONTACT ────────────────────────────────────────────────────── */
  var C = D.contact || {};
  set('contactLine', esc(C.line || ''));
  set('contactNote', esc(C.note || ''));

  var mail = document.getElementById('contactMail');
  if (mail) {
    if (has(P.email)) { mail.textContent = P.email; mail.setAttribute('href', 'mailto:' + P.email); }
    else mail.remove();
  }

  set('socials', list(P.socials).map(function (s) {
    return '<a class="social" href="' + esc(s.url) + '" target="_blank" rel="noopener">' +
      esc(s.label) + '</a>';
  }).join(''));

  set('colophon', '© ' + new Date().getFullYear() + ' ' + esc(P.name || '') +
    (has(D.footer && D.footer.note) ? ' · ' + esc(D.footer.note) : ''));

  /* ── 8. THEME ──────────────────────────────────────────────────────── */
  var root = document.documentElement;
  var themeBtn = document.getElementById('themeToggle');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });

  /* ── 9. MENU ───────────────────────────────────────────────────────── */
  var burger = document.getElementById('burger');
  var menu   = document.getElementById('navMenu');
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('open');
    if (burger) { burger.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  }
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeProject(); closeMenu(); }
    if (e.key === 'Tab' && modal && !modal.hidden) {
      var f = $$('a[href], button', modal).filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ── 10. SCROLL ────────────────────────────────────────────────────── */
  var nav      = document.getElementById('nav');
  var opener   = document.getElementById('opener');
  var navLinks = $$('.nav-link').filter(function (l) { return (l.getAttribute('href') || '').indexOf('#') === 0; });
  var targets  = navLinks.map(function (l) { return document.querySelector(l.getAttribute('href')); });
  var lastY = 0, ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var past = opener ? y > opener.offsetHeight - 90 : y > 400;

    if (nav) {
      nav.classList.toggle('solid', past);
      nav.classList.toggle('on-dark', !past);
      nav.classList.toggle('up', y > lastY && y > 600 && !(menu && menu.classList.contains('open')));
    }
    var active = -1;
    targets.forEach(function (t, i) { if (t && y >= t.offsetTop - 160) active = i; });
    navLinks.forEach(function (l, i) { l.classList.toggle('active', i === active); });

    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ── 11. REVEAL ────────────────────────────────────────────────────── */
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var siblings = $$('.reveal', en.target.parentElement);
        en.target.style.transitionDelay = Math.min(siblings.indexOf(en.target), 4) * 90 + 'ms';
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { threshold: .06, rootMargin: '0px 0px -60px 0px' });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

})();
