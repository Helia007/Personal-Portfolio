/* ================================================================
   HELIA AMINI PORTFOLIO — MAIN.JS
   ================================================================ */

/* ── EmailJS (replace with your credentials from emailjs.com) ── */
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
if (typeof emailjs !== 'undefined') emailjs.init(EMAILJS_PUBLIC_KEY);

/* ================================================================
   1. THEME TOGGLE
================================================================ */
const themeToggle = document.getElementById('themeToggle');
const html        = document.documentElement;
const savedTheme  = localStorage.getItem('portfolio-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
});

/* ================================================================
   2. NAVBAR — hide on scroll down, show on scroll up
================================================================ */
const navbar    = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('hidden', y > lastScrollY && y > 100);
  backToTop.classList.toggle('visible', y > 500);
  highlightNav(y);
  lastScrollY = y;
}, { passive: true });

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ================================================================
   3. ACTIVE NAV HIGHLIGHT
================================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNav(scrollY) {
  let current = '';
  sections.forEach(s => { if (scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
  });
}

/* ================================================================
   4. MOBILE MENU
================================================================ */
const hamburger  = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ================================================================
   5. SMOOTH SCROLL
================================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - (navbar.offsetHeight + 8);
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ================================================================
   6. TYPEWRITER
================================================================ */
const typewriterEl = document.getElementById('typewriter');
const roles = [
  'human & technology.',
  'psychology & design.',
  'behaviour & innovation.',
  'people & products.',
  'science & creativity.',
];

let roleIndex = 0, charIndex = 0, isDeleting = false, typingDelay = 100;

function typeRole() {
  const current = roles[roleIndex];
  if (!isDeleting) {
    typewriterEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) { isDeleting = true; typingDelay = 1800; }
    else typingDelay = 85 + Math.random() * 40;
  } else {
    typewriterEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; typingDelay = 400; }
    else typingDelay = 45;
  }
  setTimeout(typeRole, typingDelay);
}
setTimeout(typeRole, 900);

/* ================================================================
   7. SCROLL REVEAL (Intersection Observer)
================================================================ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('skills-block')) animateSkillBars();
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

/* ================================================================
   8. SKILL BAR ANIMATION
================================================================ */
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    setTimeout(() => { bar.style.width = bar.getAttribute('data-level') + '%'; }, 150);
  });
}

/* ================================================================
   9. COUNTER ANIMATION (quick facts)
================================================================ */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    let start = 0;
    const step = () => {
      start += Math.ceil(target / 40);
      if (start >= target) { el.textContent = target; return; }
      el.textContent = start;
      requestAnimationFrame(step);
    };
    step();
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

/* ================================================================
   10. PROJECT FILTER
================================================================ */
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      const show = filter === 'all' || card.getAttribute('data-category') === filter;
      card.classList.toggle('hidden', !show);
      if (show) {
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50);
      }
    });
  });
});

/* ================================================================
   11. PROGRESS BAR ANIMATION (upcoming section)
================================================================ */
const progressObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.tp-bar').forEach(bar => {
        const fill = document.createElement('div');
        // already styled via CSS var --progress
      });
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.timeline-item').forEach(el => progressObserver.observe(el));

/* ================================================================
   12. CUSTOM CURSOR (desktop only)
================================================================ */
if (window.matchMedia('(pointer: fine)').matches) {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function animateCursor() {
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animateCursor);
  })();

  document.querySelectorAll('a, button, .project-card, .tag, .skill-pill, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}

/* ================================================================
   13. HERO PARALLAX
================================================================ */
const heroEl      = document.getElementById('hero');
const heroContent = document.querySelector('.hero-content');
const heroBgText  = document.querySelector('.hero-bg-text');

if (heroEl && window.matchMedia('(pointer: fine)').matches) {
  heroEl.addEventListener('mousemove', e => {
    const rect = heroEl.getBoundingClientRect();
    const dx = ((e.clientX - rect.left) / rect.width  - .5) * 2;
    const dy = ((e.clientY - rect.top)  / rect.height - .5) * 2;
    if (heroContent) heroContent.style.transform = `translate(${dx*6}px,${dy*4}px)`;
    if (heroBgText)  heroBgText.style.transform  = `translate(${dx*12}px,${dy*8}px)`;
  }, { passive: true });
  heroEl.addEventListener('mouseleave', () => {
    if (heroContent) { heroContent.style.transition = 'transform .8s ease'; heroContent.style.transform = ''; setTimeout(() => heroContent.style.transition = '', 800); }
    if (heroBgText)  { heroBgText.style.transition  = 'transform .8s ease'; heroBgText.style.transform  = ''; setTimeout(() => heroBgText.style.transition  = '', 800); }
  });
}

/* ================================================================
   14. PAGE FADE IN
================================================================ */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.35s ease';
  requestAnimationFrame(() => requestAnimationFrame(() => { document.body.style.opacity = '1'; }));
});

/* ================================================================
   15. CONTACT FORM
================================================================ */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formToast   = document.getElementById('formToast');

function validateForm() {
  let valid = true;
  const name  = document.getElementById('name');
  const email = document.getElementById('email');
  const msg   = document.getElementById('message');
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);

  name.parentElement.classList.toggle('error', !name.value.trim());
  email.parentElement.classList.toggle('error', !emailOk);
  msg.parentElement.classList.toggle('error', !msg.value.trim());

  if (!name.value.trim() || !emailOk || !msg.value.trim()) valid = false;
  return valid;
}

['name','email','message'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', e => {
    e.target.parentElement.classList.remove('error');
  });
});

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validateForm()) return;

    submitBtn.querySelector('.btn-text').style.display    = 'none';
    submitBtn.querySelector('.btn-loading').style.display = 'flex';
    submitBtn.disabled = true;
    formToast.className = 'form-toast';

    try {
      if (typeof emailjs === 'undefined') throw new Error('not loaded');
      if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') throw new Error('not configured');
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm);
      formToast.textContent = '✓ Message sent! I\'ll get back to you soon.';
      formToast.className   = 'form-toast success';
      contactForm.reset();
    } catch (err) {
      formToast.textContent = EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID'
        ? '⚠ EmailJS not set up yet — see README for instructions.'
        : '✕ Something went wrong. Please email me directly.';
      formToast.className = 'form-toast error';
    }

    submitBtn.querySelector('.btn-text').style.display    = 'inline';
    submitBtn.querySelector('.btn-loading').style.display = 'none';
    submitBtn.disabled = false;
    setTimeout(() => formToast.className = 'form-toast', 7000);
  });
}
