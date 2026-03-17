/* ================================================================
   PORTFOLIO — MAIN.JS
   Handles: theme toggle, typewriter, scroll animations,
            mobile menu, project filters, contact form (EmailJS)
   ================================================================ */

// ================================================================
// 0. EMAILJS CONFIG — Replace with your own credentials
//    Sign up at https://www.emailjs.com and get:
//    • Service ID  (from your Email Service panel)
//    • Template ID (from your Email Template panel)
//    • Public Key  (from Account > API Keys)
// ================================================================
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

// Initialise EmailJS
(function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
})();

// ================================================================
// 1. THEME TOGGLE — Dark / Light
// ================================================================
const themeToggle = document.getElementById('themeToggle');
const html        = document.documentElement;

// Persist theme preference in localStorage
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
});

// ================================================================
// 2. NAVBAR — Hide on scroll down, reveal on scroll up
// ================================================================
const navbar    = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;

  // Hide/show navbar
  if (currentY > lastScrollY && currentY > 100) {
    navbar.classList.add('hidden');
  } else {
    navbar.classList.remove('hidden');
  }

  // Back-to-top button
  if (currentY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Highlight active nav link based on section in view
  highlightActiveNav(currentY);

  lastScrollY = currentY;
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ================================================================
// 3. ACTIVE NAV LINK HIGHLIGHT
// ================================================================
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function highlightActiveNav(scrollY) {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ================================================================
// 4. MOBILE MENU
// ================================================================
const hamburger  = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  // Prevent background scrolling when menu is open
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when a link is clicked
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ================================================================
// 5. SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ================================================================
// 6. TYPEWRITER EFFECT (Hero)
//    — Edit the 'roles' array to change what the typewriter cycles through
// ================================================================
const typewriterEl = document.getElementById('typewriter');
const roles = [
  'full-stack apps.',
  'beautiful UIs.',
  'fast APIs.',
  'digital experiences.',
  'things that matter.',
];

let roleIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingDelay = 100;

function typeRole() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    // Typing forward
    typewriterEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      // Pause at end before deleting
      isDeleting  = true;
      typingDelay = 1800;
    } else {
      typingDelay = 90 + Math.random() * 40; // slight variation feels human
    }
  } else {
    // Deleting
    typewriterEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting  = false;
      roleIndex   = (roleIndex + 1) % roles.length;
      typingDelay = 400;
    } else {
      typingDelay = 45;
    }
  }

  setTimeout(typeRole, typingDelay);
}

// Start typewriter after hero animation completes
setTimeout(typeRole, 1000);

// ================================================================
// 7. SCROLL REVEAL — Intersection Observer
// ================================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars when about section is revealed
      if (entry.target.classList.contains('skills-block')) {
        animateSkillBars();
      }
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px',
});

document.querySelectorAll('.scroll-reveal').forEach(el => {
  revealObserver.observe(el);
});

// ================================================================
// 8. SKILL BAR ANIMATION
// ================================================================
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    const level = bar.getAttribute('data-level');
    // Small timeout so the animation starts AFTER the section fades in
    setTimeout(() => {
      bar.style.width = level + '%';
    }, 200);
  });
}

// ================================================================
// 9. PROJECT FILTER
// ================================================================
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const show     = filter === 'all' || category === filter;

      if (show) {
        card.classList.remove('hidden');
        // Re-trigger scroll reveal on shown cards
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ================================================================
// 10. CUSTOM CURSOR (desktop only)
// ================================================================
if (window.matchMedia('(pointer: fine)').matches) {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Ring follows with slight lag for a smooth feel
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Enlarge ring on hoverable elements
  document.querySelectorAll('a, button, .project-card, .tag').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}

// ================================================================
// 11. CONTACT FORM — Validation + EmailJS Submission
// ================================================================
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formToast   = document.getElementById('formToast');

// Basic validator
function validateForm() {
  let valid = true;

  const name  = document.getElementById('name');
  const email = document.getElementById('email');
  const msg   = document.getElementById('message');

  // Name
  if (!name.value.trim()) {
    name.parentElement.classList.add('error');
    valid = false;
  } else {
    name.parentElement.classList.remove('error');
  }

  // Email (simple regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailRegex.test(email.value)) {
    email.parentElement.classList.add('error');
    valid = false;
  } else {
    email.parentElement.classList.remove('error');
  }

  // Message
  if (!msg.value.trim()) {
    msg.parentElement.classList.add('error');
    valid = false;
  } else {
    msg.parentElement.classList.remove('error');
  }

  return valid;
}

// Clear errors on input
['name', 'email', 'message'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    document.getElementById(id).parentElement.classList.remove('error');
  });
});

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  // Show loading state
  submitBtn.querySelector('.btn-text').style.display    = 'none';
  submitBtn.querySelector('.btn-loading').style.display = 'flex';
  submitBtn.disabled = true;

  // Hide any previous toast
  formToast.className = 'form-toast';
  formToast.style.display = 'none';

  // ---- EmailJS send ----
  // If you haven't set up EmailJS yet, the form will show an error message.
  // Template variables used: {{name}}, {{email}}, {{subject}}, {{message}}
  try {
    if (typeof emailjs === 'undefined') {
      throw new Error('EmailJS not loaded');
    }

    await emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      contactForm
    );

    // Success
    formToast.textContent = '✓ Message sent! I\'ll get back to you soon.';
    formToast.className   = 'form-toast success';
    contactForm.reset();

  } catch (err) {
    console.error('EmailJS error:', err);
    // If EmailJS isn't configured yet, show a helpful fallback message
    if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
      formToast.textContent = '⚠ EmailJS not configured yet. See the setup instructions in the README.';
    } else {
      formToast.textContent = '✕ Something went wrong. Please email me directly at hello@yourname.com';
    }
    formToast.className = 'form-toast error';
  }

  // Restore button
  submitBtn.querySelector('.btn-text').style.display    = 'inline';
  submitBtn.querySelector('.btn-loading').style.display = 'none';
  submitBtn.disabled = false;

  // Auto-hide toast after 6 seconds
  setTimeout(() => {
    formToast.className = 'form-toast';
  }, 6000);
});

// ================================================================
// 12. TIMELINE PROGRESS BAR ANIMATION (Upcoming section)
//     — Triggered when the bars scroll into view
// ================================================================
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // CSS animation is triggered via @keyframes bar-fill when element is
      // rendered; this observer ensures bars off-screen start their animation
      // only when visible (CSS animation-play-state trick)
      entry.target.querySelectorAll('.tp-bar').forEach(bar => {
        bar.style.animationPlayState = 'running';
      });
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item').forEach(item => {
  timelineObserver.observe(item);
});

// ================================================================
// 13. HERO PARALLAX (subtle depth effect on mouse move)
// ================================================================
const heroContent = document.querySelector('.hero-content');
const heroOrb1    = document.querySelector('.orb-1');
const heroOrb2    = document.querySelector('.orb-2');
const heroBgText  = document.querySelector('.hero-bg-text');

document.querySelector('.hero')?.addEventListener('mousemove', (e) => {
  const rect   = document.querySelector('.hero').getBoundingClientRect();
  const centerX = rect.width  / 2;
  const centerY = rect.height / 2;
  const dx = (e.clientX - rect.left - centerX) / centerX; // -1 to 1
  const dy = (e.clientY - rect.top  - centerY) / centerY; // -1 to 1

  heroContent.style.transform = `translate(${dx * 6}px, ${dy * 4}px)`;
  heroOrb1.style.transform    = `translate(${dx * 20}px, ${dy * 15}px) scale(1)`;
  heroOrb2.style.transform    = `translate(${dx * -15}px, ${dy * -10}px) scale(1)`;
  heroBgText.style.transform  = `translate(${dx * 12}px, ${dy * 8}px)`;
}, { passive: true });

// Reset on mouse leave
document.querySelector('.hero')?.addEventListener('mouseleave', () => {
  [heroContent, heroOrb1, heroOrb2, heroBgText].forEach(el => {
    if (el) el.style.transform = '';
  });
});

// ================================================================
// 14. PAGE LOAD — fade in everything nicely
// ================================================================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  // Short microtask delay then fade in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
});
