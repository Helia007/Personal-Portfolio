/* ═══════════════════════════════════════════════════════════════════════
   main.js — reads content.js and builds the page.
   You should not need to edit this file. All your text lives in content.js
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var D = window.PORTFOLIO;
  if (!D) { console.error('content.js did not load — check the file name and that it sits next to index.html'); return; }

  /* ── helpers ───────────────────────────────────────────────────────── */
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };
  var has = function (v) { return v != null && String(v).trim() !== ''; };
  var list = function (v) { return Array.isArray(v) ? v.filter(has) : []; };
  var set = function (id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; return el; };

  /* A stable colour + icon for projects that have no image yet */
  var COVER_ICONS = {
    engineering: 'fa-solid fa-microchip',
    hardware:    'fa-solid fa-microchip',
    research:    'fa-solid fa-flask',
    design:      'fa-solid fa-pen-ruler',
    software:    'fa-solid fa-code',
    web:         'fa-solid fa-code',
    community:   'fa-solid fa-users',
    product:     'fa-solid fa-cube'
  };
  function coverIcon(cat) {
    var k = String(cat || '').toLowerCase();
    for (var key in COVER_ICONS) if (k.indexOf(key) > -1) return COVER_ICONS[key];
    return 'fa-solid fa-layer-group';
  }
  function hue(str) {
    var h = 0, s = String(str || '');
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
    return h;
  }

  /* ── 1. PROFILE, NAV, FOOTER ───────────────────────────────────────── */
  var P = D.profile || {};

  var logoHTML = '<span class="br">[</span>' + esc(P.initials || 'ME') + '<span class="br">]</span>';
  ['logo', 'logoFooter'].forEach(function (id) { set(id, logoHTML); });

  ['navResume', 'contactResume'].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    if (has(P.resume)) el.setAttribute('href', P.resume);
    else el.remove();
  });

  if (has(P.name)) document.title = P.name + (has(P.title) ? ' — ' + P.title : '');

  set('footerCopy', '© ' + new Date().getFullYear() + ' ' + esc(P.name || ''));
  set('footerTagline', esc((D.footer && D.footer.tagline) || P.tagline || ''));
  set('footerNote', esc((D.footer && D.footer.note) || ''));

  /* ── 2. HERO ───────────────────────────────────────────────────────── */
  var H = D.hero || {};

  if (has(P.availability)) {
    var pill = document.getElementById('heroPill');
    if (pill) { pill.hidden = false; set('heroPillText', esc(P.availability)); }
  }
  set('heroGreeting', esc(H.greeting || 'Hello — I’m'));
  set('heroName',     esc(P.name || ''));
  set('heroTitle',    esc(P.title || ''));
  set('heroIntro',    esc(H.intro || P.tagline || ''));
  set('heroRotatePrefix', esc(H.rotatingPrefix || ''));

  set('heroStats', list(H.stats).map(function (s) {
    return '<li><span class="stat-value">' + esc(s.value) + '</span>' +
           '<span class="stat-label">' + esc(s.label) + '</span></li>';
  }).join(''));

  var words = list(H.marquee);
  if (words.length) {
    var run = words.map(function (w) { return '<span>' + esc(w) + '</span><span class="sep">/</span>'; }).join('');
    set('marquee', run + run);   // duplicated so the loop is seamless
  }

  /* typewriter */
  var rotEl = document.getElementById('heroRotate');
  var roles = list(H.rotating);
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (rotEl && roles.length) {
    if (reduceMotion) {
      rotEl.textContent = roles[0];
    } else {
      var ri = 0, ci = 0, del = false;
      (function tick() {
        var word = roles[ri];
        ci += del ? -1 : 1;
        rotEl.textContent = word.slice(0, ci);
        var wait = 78;
        if (!del && ci === word.length) { del = true; wait = 1900; }
        else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; wait = 350; }
        else if (del) { wait = 38; }
        setTimeout(tick, wait);
      })();
    }
  }

  /* ── 3. PROJECTS ───────────────────────────────────────────────────── */
  var projects = list(D.projects).filter(function (p) { return has(p.title); });
  var grid     = document.getElementById('projectGrid');
  var emptyEl  = document.getElementById('emptyNote');

  function coverHTML(p) {
    return '<div class="card-cover" style="--h:' + hue(p.category || p.title) + '">' +
           '<i class="' + coverIcon(p.category) + '"></i></div>';
  }

  /* Shows the image if it exists; quietly falls back to a drawn cover if the
     file is missing or misspelled — so a wrong filename never breaks the page. */
  function mediaHTML(p) {
    if (!has(p.image)) return coverHTML(p);
    return '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy" data-fallback="cover">';
  }

  function wireFallbacks(root, project) {
    $$('img[data-fallback]', root).forEach(function (img) {
      img.addEventListener('error', function () {
        var kind = img.getAttribute('data-fallback');
        if (kind === 'cover') img.outerHTML = coverHTML(project || {});
        else img.remove();
      }, { once: true });
    });
  }

  function cardHTML(p, i) {
    var m = [];
    m.push('<span class="cat">' + esc(p.category || 'Project') + '</span>');
    if (has(p.year)) m.push('<span>' + esc(p.year) + '</span>');
    m.push('<span>' + String(i + 1).padStart(2, '0') + '</span>');

    return '' +
      '<button class="card reveal' + (p.featured ? ' featured' : '') + '" data-i="' + i +
        '" data-cat="' + esc(p.category || '') + '" aria-haspopup="dialog">' +
        '<div class="card-media">' +
          (has(p.status) ? '<span class="card-badge">' + esc(p.status) + '</span>' : '') +
          mediaHTML(p, i) +
          '<span class="card-open"><i class="fa-solid fa-arrow-up-right-from-square"></i></span>' +
        '</div>' +
        '<div class="card-body">' +
          '<div class="card-meta">' + m.join('<span aria-hidden="true">·</span>') + '</div>' +
          '<h3 class="card-title">' + esc(p.title) + '</h3>' +
          '<p class="card-desc">' + esc(p.summary || '') + '</p>' +
          (list(p.tags).length
            ? '<div class="tags">' + list(p.tags).slice(0, 4).map(function (t) {
                return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>'
            : '') +
          '<span class="card-more">Read the story <i class="fa-solid fa-arrow-right"></i></span>' +
        '</div>' +
      '</button>';
  }

  if (grid) {
    grid.innerHTML = projects.map(cardHTML).join('');
    $$('.card', grid).forEach(function (card) {
      wireFallbacks(card, projects[parseInt(card.getAttribute('data-i'), 10)]);
    });
  }

  /* filters — built automatically from the categories you use */
  var filterBar = document.getElementById('filters');
  if (filterBar && projects.length) {
    var cats = [];
    projects.forEach(function (p) {
      var c = has(p.category) ? p.category : 'Other';
      if (cats.indexOf(c) === -1) cats.push(c);
    });
    if (cats.length > 1) {
      var btns = ['<button class="filter-btn active" data-f="all">All<span class="count">' + projects.length + '</span></button>'];
      cats.forEach(function (c) {
        var n = projects.filter(function (p) { return (p.category || 'Other') === c; }).length;
        btns.push('<button class="filter-btn" data-f="' + esc(c) + '">' + esc(c) + '<span class="count">' + n + '</span></button>');
      });
      filterBar.innerHTML = btns.join('');

      filterBar.addEventListener('click', function (e) {
        var btn = e.target.closest('.filter-btn');
        if (!btn) return;
        $$('.filter-btn', filterBar).forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.getAttribute('data-f'), shown = 0;
        $$('.card', grid).forEach(function (card) {
          var ok = f === 'all' || card.getAttribute('data-cat') === f;
          card.style.display = ok ? '' : 'none';
          if (ok) shown++;
        });
        if (emptyEl) emptyEl.hidden = shown > 0;
      });
    } else {
      filterBar.remove();
    }
  }

  /* ── 4. PROJECT MODAL ──────────────────────────────────────────────── */
  var modal = document.getElementById('modal');
  var modalBody = document.getElementById('modalBody');
  var lastFocus = null;

  function openProject(i) {
    var p = projects[i];
    if (!p || !modal) return;

    var meta = ['<span class="cat">' + esc(p.category || 'Project') + '</span>'];
    if (has(p.year))   meta.push('<span>' + esc(p.year) + '</span>');
    if (has(p.role))   meta.push('<span>' + esc(p.role) + '</span>');
    if (has(p.status)) meta.push('<span>' + esc(p.status) + '</span>');

    var html = '<div class="m-media">' + mediaHTML(p, i) + '</div><div class="m-body">' +
      '<div class="m-meta">' + meta.join('') + '</div>' +
      '<h2 class="m-title" id="modalTitle">' + esc(p.title) + '</h2>' +
      (has(p.summary) ? '<p class="m-summary">' + esc(p.summary) + '</p>' : '');

    if (list(p.highlights).length) {
      html += '<p class="m-sub">What I did</p><ul class="m-list">' +
        list(p.highlights).map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul>';
    }
    if (list(p.tags).length) {
      html += '<p class="m-sub">Skills &amp; tools</p><div class="tags">' +
        list(p.tags).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>';
    }
    if (list(p.gallery).length) {
      html += '<p class="m-sub">Gallery</p><div class="m-gallery">' +
        list(p.gallery).map(function (g) {
          return '<img src="' + esc(g) + '" alt="' + esc(p.title) + '" loading="lazy" data-fallback="drop">';
        }).join('') + '</div>';
    }
    if (list(p.links).length) {
      html += '<div class="m-links">' + list(p.links).map(function (l, n) {
        return '<a class="btn ' + (n === 0 ? 'btn-solid' : 'btn-outline') + '" href="' + esc(l.url) +
               '" target="_blank" rel="noopener"><i class="' + esc(l.icon || 'fa-solid fa-arrow-up-right-from-square') +
               '"></i> ' + esc(l.label || 'Open') + '</a>';
      }).join('') + '</div>';
    }
    html += '</div>';

    modalBody.innerHTML = html;
    wireFallbacks(modalBody, p);
    modal.hidden = false;
    document.body.classList.add('locked');
    lastFocus = document.activeElement;
    var closeBtn = document.getElementById('modalClose');
    if (closeBtn) closeBtn.focus();
  }

  function closeProject() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    modalBody.innerHTML = '';
    document.body.classList.remove('locked');
    if (lastFocus) lastFocus.focus();
  }

  if (grid) grid.addEventListener('click', function (e) {
    var card = e.target.closest('.card');
    if (card) openProject(parseInt(card.getAttribute('data-i'), 10));
  });
  if (modal) modal.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-close') || e.target.closest('#modalClose')) closeProject();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeProject(); closeMenu(); }
    /* keep tabbing inside the dialog while it is open */
    if (e.key === 'Tab' && modal && !modal.hidden) {
      var f = $$('a[href], button, [tabindex]:not([tabindex="-1"])', modal)
                .filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ── 5. ABOUT ──────────────────────────────────────────────────────── */
  var A = D.about || {};
  var portrait = document.getElementById('portrait');
  if (portrait) {
    var fb = '<div class="portrait-fallback">' + esc(P.initials || '') + '</div>';
    if (has(A.photo)) {
      portrait.innerHTML = '<img src="' + esc(A.photo) + '" alt="' + esc(A.photoAlt || P.name || '') + '">';
      var pimg = portrait.querySelector('img');
      pimg.addEventListener('error', function () { portrait.innerHTML = fb; }, { once: true });
    } else {
      portrait.innerHTML = fb;
    }
  }
  set('facts', list(A.facts).map(function (f) {
    return '<div class="fact"><dt>' + esc(f.label) + '</dt><dd>' + esc(f.value) + '</dd></div>';
  }).join(''));
  set('aboutLead', esc(A.lead || ''));
  set('aboutBody', list(A.body).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join(''));

  set('skillGroups', list(D.skills).map(function (g) {
    return '<div class="skill-card"><h4><i class="' + esc(g.icon || 'fa-solid fa-star') + '"></i>' +
      esc(g.group) + '</h4><ul>' +
      list(g.items).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') +
      '</ul></div>';
  }).join(''));

  /* ── 6. EXPERIENCE + CERTIFICATES ──────────────────────────────────── */
  set('timeline', list(D.experience).map(function (x) {
    return '<li class="tl-item reveal' + (x.current ? ' current' : '') + '">' +
      '<span class="tl-dot"></span>' +
      '<div class="tl-head"><span class="tl-role">' + esc(x.role) + '</span>' +
      '<span class="tl-date">' + esc(x.date) + '</span></div>' +
      (has(x.org)  ? '<span class="tl-org">' + esc(x.org) + '</span>' : '') +
      (has(x.desc) ? '<p class="tl-desc">' + esc(x.desc) + '</p>' : '') +
      '</li>';
  }).join(''));

  var certs = list(D.certifications);
  if (certs.length) {
    set('certGrid', certs.map(function (c) {
      return '<div class="cert reveal"><i class="fa-solid fa-award"></i><div>' +
        '<span class="cert-title">' + esc(c.title) + '</span>' +
        '<span class="cert-issuer">' + esc(c.issuer) + (has(c.note) ? ' · ' + esc(c.note) : '') + '</span>' +
        '</div></div>';
    }).join(''));
  } else {
    ['certHead', 'certGrid'].forEach(function (id) { var el = document.getElementById(id); if (el) el.remove(); });
  }

  /* ── 7. NOW & NEXT ─────────────────────────────────────────────────── */
  set('nextGrid', list(D.next).map(function (n) {
    return '<article class="next-card reveal"><span class="next-state">' + esc(n.state) + '</span>' +
      '<h3>' + esc(n.title) + '</h3><p>' + esc(n.desc) + '</p></article>';
  }).join(''));

  /* ── 8. CONTACT ────────────────────────────────────────────────────── */
  var C = D.contact || {};
  if (has(C.heading)) set('contactHeading', esc(C.heading));
  set('contactText', esc(C.text || ''));
  set('contactNote', esc(C.ctaNote || ''));

  var mail = document.getElementById('contactMail');
  if (mail) {
    if (has(P.email)) { mail.textContent = P.email; mail.setAttribute('href', 'mailto:' + P.email); }
    else mail.remove();
  }

  set('socials', list(P.socials).map(function (s) {
    return '<a class="social" href="' + esc(s.url) + '" target="_blank" rel="noopener" ' +
      'aria-label="' + esc(s.label) + '" title="' + esc(s.label) + '"><i class="' + esc(s.icon) + '"></i></a>';
  }).join(''));

  var metaRows = [];
  if (has(P.location)) metaRows.push(['Location', P.location]);
  if (has(P.title))    metaRows.push(['Focus', P.title]);
  if (has(P.availability)) metaRows.push(['Status', P.availability]);
  set('contactMeta', metaRows.map(function (r) {
    return '<div><dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd></div>';
  }).join(''));

  /* ── 9. THEME TOGGLE ───────────────────────────────────────────────── */
  var root = document.documentElement;
  var themeBtn = document.getElementById('themeToggle');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'dark' ? '#080b12' : '#f7f8fa');
  });

  /* ── 10. MOBILE MENU ───────────────────────────────────────────────── */
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

  /* ── 11. SCROLL: nav state, active link, progress, back-to-top ─────── */
  var nav      = document.getElementById('nav');
  var progress = document.getElementById('navProgress');
  var toTop    = document.getElementById('toTop');
  var navLinks = $$('.nav-link');
  var sections = navLinks.map(function (l) { return document.querySelector(l.getAttribute('href')); });
  var lastY = 0, ticking = false;

  function onScroll() {
    var y = window.scrollY;
    if (nav) {
      nav.classList.toggle('scrolled', y > 8);
      nav.classList.toggle('hidden', y > lastY && y > 400 && !(menu && menu.classList.contains('open')));
    }
    if (toTop) toTop.classList.toggle('show', y > 700);
    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }
    var active = -1;
    sections.forEach(function (s, i) { if (s && y >= s.offsetTop - 140) active = i; });
    navLinks.forEach(function (l, i) { l.classList.toggle('active', i === active); });
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ── 12. REVEAL ON SCROLL ──────────────────────────────────────────── */
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var i = $$('.reveal', en.target.parentElement).indexOf(en.target);
        en.target.style.transitionDelay = Math.min(i, 5) * 60 + 'ms';
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

})();
