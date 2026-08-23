/* ═══════════════════════════════════════════════════════════════════════════
   ✏️  content.js  —  THIS IS THE ONLY FILE YOU NEED TO EDIT
   ═══════════════════════════════════════════════════════════════════════════

   Everything you see on the website lives in this file: your name, your bio,
   your projects, your photos, your links. Change the text between the
   'quote marks' and save. Refresh the page — done.

   THREE RULES SO NOTHING BREAKS:
     1. Only change text INSIDE the 'single quotes'.
     2. Every line ends with a comma  ,
     3. If you want an apostrophe inside text, write  \'   (e.g. 'I\'m')

   JUMP TO A SECTION:
     [1] PROFILE ......... name, title, location, email, social links
     [2] HERO ............ the big first screen
     [3] PROJECTS ........ ⭐ the most important part — add as many as you like
     [4] ABOUT ........... your story + photo
     [5] SKILLS .......... grouped skill lists
     [6] EXPERIENCE ...... education, jobs, internships
     [7] CERTIFICATES .... courses & credentials
     [8] NOW & NEXT ...... what you're working on
     [9] CONTACT ......... contact card text

   ═══════════════════════════════════════════════════════════════════════════ */

window.PORTFOLIO = {

/* ═══════════════════════════════════════════════════════════════════════════
   [1] PROFILE  —  who you are
   ═══════════════════════════════════════════════════════════════════════════ */
profile: {
  name:        'Helia Amini',
  initials:    'HA',                       // shown in the logo, e.g. [HA]

  // Your headline. Keep this broad so it still fits if you change majors.
  title:       'Engineering & Human-Centred Technology',

  // One line under your name. This is your elevator pitch.
  tagline:     'I design and build technology around the people who use it — from circuits to interfaces.',

  location:    'Eindhoven, Netherlands',
  email:       'helia@heliaamini.com',     // ← put your real email here
  resume:      'assets/resume.pdf',        // ← replace that file with your CV

  // The little green pill at the top of the page. Set to '' to hide it.
  availability: 'Open to internships & research collaborations',

  // Social links. Delete a line to remove the icon, add a line to add one.
  // Icon names come from Font Awesome (fa-brands fa-linkedin-in, fa-github, etc.)
  socials: [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/helia-amini', icon: 'fa-brands fa-linkedin-in' },
    { label: 'GitHub',   url: 'https://github.com/Helia007',         icon: 'fa-brands fa-github' },
    // { label: 'Email',  url: 'mailto:you@example.com',              icon: 'fa-solid fa-envelope' },
  ],
},

/* ═══════════════════════════════════════════════════════════════════════════
   [2] HERO  —  the first screen people see
   ═══════════════════════════════════════════════════════════════════════════ */
hero: {
  greeting: 'Hello — I\'m',

  // These words rotate one after another after "I work at the intersection of".
  // Add or remove as many as you like.
  rotating: [
    'people and technology.',
    'hardware and human behaviour.',
    'engineering and design.',
    'research and real products.',
  ],
  rotatingPrefix: 'I work at the intersection of ',

  // Two short paragraphs. Keep it broad — this should still be true in 2 years.
  intro: 'Dual-degree student at TU/e in Eindhoven, combining Electrical Engineering with Psychology & Technology. I care about the moment a system meets a person — and about making that moment work.',

  // The three numbers under the intro. Delete a block to show only two.
  stats: [
    { value: 'TU/e',  label: 'Eindhoven University of Technology' },
    { value: '41/45', label: 'International Baccalaureate score' },
    { value: '6',     label: 'Projects & research pieces' },
  ],

  // The scrolling ticker under the hero. Add anything you want to be known for.
  marquee: [
    'Electrical Engineering', 'Human-Technology Interaction', 'UX Research',
    'Python', 'Prototyping', 'Behavioural Science', 'CAD Design',
    'Product Development', 'Signal & Systems', 'Entrepreneurship',
  ],
},

/* ═══════════════════════════════════════════════════════════════════════════
   [3] ⭐ PROJECTS  —  THE MOST IMPORTANT SECTION
   ═══════════════════════════════════════════════════════════════════════════

   HOW TO ADD A PROJECT
   ────────────────────
   1. Copy the whole template below (from  {  to  },  ) — it is commented out.
   2. Paste it inside the projects list, right after the  [  or between two  },
   3. Fill in your text. Delete any line you don't need — nothing will break.

   The page numbers your projects automatically, builds the filter buttons
   automatically, and lays out the grid automatically. Add 3 or add 30.

   ── TEMPLATE — copy from here ────────────────────────────────────────────
   {
     title:    'Name of the project',
     category: 'Engineering',                      // becomes a filter button
     year:     '2026',
     role:     'What you did, e.g. Design & build',
     status:   '',                                 // 'In progress' / 'Concept' / '' 
     featured: false,                              // true = takes a wide card
     summary:  'One or two sentences shown on the card.',
     image:    'assets/projects/my-photo.jpg',     // '' = auto gradient cover
     gallery:  [],                                 // more photos, shown in popup
     tags:     ['Skill one', 'Skill two'],
     highlights: [
       'A bullet point about what you did.',
       'Another one about the result.',
     ],
     links: [
       { label: 'View project', url: 'https://...', icon: 'fa-solid fa-arrow-up-right-from-square' },
     ],
   },
   ── to here ──────────────────────────────────────────────────────────────

   ADDING PICTURES
   ───────────────
   • Drop image files into the  assets/projects/  folder.
   • Then write the file name here, e.g.  image: 'assets/projects/robot.jpg'
   • Best size: about 1200 × 750 pixels. JPG or PNG.
   • Leave  image: ''  and the site draws a clean coloured cover for you.
   ═══════════════════════════════════════════════════════════════════════════ */
projects: [

  {
    title:    'Assistive Technology for Visually Impaired Children',
    category: 'Engineering',
    year:     '2024 — present',
    role:     'Concept, CAD & prototyping',
    status:   'In progress',
    featured: true,
    summary:  'A hands-on learning device developed with former LightHouse school members in The Hague, designed to close the learning gap for visually impaired children in mainstream classrooms.',
    image:    '',
    gallery:  [],
    tags:     ['Product Development', 'CAD Design', 'Prototyping', 'Accessibility'],
    highlights: [
      'Ran interviews with teachers and specialists to map where existing classroom material fails.',
      'Translated those findings into a physical concept and iterated the CAD model across several versions.',
      'Currently building toward a prototype that can be tested in a real classroom.',
    ],
    links: [],
  },

  {
    title:    'Operant Conditioning in Digital Products',
    category: 'Research',
    year:     '2025',
    role:     'Independent research & writing',
    status:   '',
    featured: false,
    summary:  'A written investigation into how apps use reinforcement schedules — Skinner\'s operant conditioning — to shape user behaviour, usually without the user ever noticing.',
    image:    '',
    gallery:  [],
    tags:     ['Behavioural Science', 'UX Research', 'Psychology'],
    highlights: [
      'Mapped common product mechanics onto classical reinforcement schedules.',
      'Argued where the line sits between helpful design and manipulation.',
    ],
    links: [
      { label: 'Read on LinkedIn', url: 'https://linkedin.com/in/helia-amini', icon: 'fa-brands fa-linkedin-in' },
    ],
  },

  {
    title:    'Engineering Inventory & Documentation System',
    category: 'Engineering',
    year:     '2023',
    role:     'Engineering intern',
    status:   '',
    featured: false,
    summary:  'Built inventory tracking and component classification documentation for the mechanical engineering department during a summer internship at Shell in Amsterdam.',
    image:    '',
    gallery:  [],
    tags:     ['Documentation', 'Systems', 'Engineering'],
    highlights: [
      'Worked inside a multidisciplinary engineering team on live industrial processes.',
      'Delivered structured documentation that improved component traceability for the team.',
    ],
    links: [],
  },

  {
    title:    'This Portfolio',
    category: 'Design',
    year:     '2026',
    role:     'Design & front-end build',
    status:   '',
    featured: false,
    summary:  'Designed and coded from scratch in HTML, CSS and JavaScript — content-driven, responsive, accessible, and built so the whole site can be updated from a single file.',
    image:    '',
    gallery:  [],
    tags:     ['HTML / CSS', 'JavaScript', 'UX Design', 'Accessibility'],
    highlights: [
      'Every section renders from one plain-text content file — no build tools, no frameworks.',
      'Full keyboard navigation, light and dark themes, and reduced-motion support.',
    ],
    links: [
      { label: 'Source on GitHub', url: 'https://github.com/Helia007', icon: 'fa-brands fa-github' },
    ],
  },

  {
    title:    'Personal Brand Identity',
    category: 'Design',
    year:     '2025',
    role:     'Visual identity design',
    status:   '',
    featured: false,
    summary:  'A personal logo and visual system used across professional platforms, pairing psychology-inspired symbolism with a clean, modern typographic base.',
    image:    '',
    gallery:  [],
    tags:     ['Branding', 'Visual Design', 'Identity'],
    highlights: [],
    links: [],
  },

  {
    title:    'VHTO Girls\' Day — STEM Engagement',
    category: 'Community',
    year:     '2023',
    role:     'Participant',
    status:   '',
    featured: false,
    summary:  'A nationwide programme encouraging girls into STEM pathways, with engineering and technology workshops hosted at STO Zuid-Limburg.',
    image:    '',
    gallery:  [],
    tags:     ['STEM', 'Community', 'Outreach'],
    highlights: [],
    links: [],
  },

  /* ⬆️ ADD YOUR NEXT PROJECT RIGHT HERE — paste the template from above ⬆️ */

],

/* ═══════════════════════════════════════════════════════════════════════════
   [4] ABOUT  —  your story
   ═══════════════════════════════════════════════════════════════════════════ */
about: {
  // Your photo. Put the file in assets/ and write its name here.
  // Leave it as '' and the site shows your initials in a styled frame instead.
  photo:    'assets/photo.jpg',
  photoAlt: 'Helia Amini',

  // The big opening line of the About section.
  lead: 'Every technology eventually lands in someone\'s hands. My work sits on that boundary — the engineering underneath, and the person in front of it.',

  // Normal paragraphs. Add or remove lines freely.
  body: [
    'I\'m a dual-degree student at Eindhoven University of Technology, studying Electrical Engineering alongside Psychology & Technology. One teaches me how systems are built; the other teaches me who they are built for. I keep both because the interesting problems live in between.',
    'That combination has taken me from an engineering internship at Shell, to entrepreneurship training at Harvard Business School, to leading an assistive technology project for visually impaired children — and it shapes how I approach every project: understand the person first, then engineer for them.',
  ],

  // Small labelled facts shown beside your photo.
  facts: [
    { label: 'Based in',  value: 'Eindhoven, NL' },
    { label: 'Studying',  value: 'EE + Psychology & Technology' },
    { label: 'Languages', value: 'English, Dutch, Farsi' },
    { label: 'Focus',     value: 'Human-centred systems' },
  ],
},

/* ═══════════════════════════════════════════════════════════════════════════
   [5] SKILLS  —  grouped into columns
   Add a whole new group by copying one { ... } block.
   ═══════════════════════════════════════════════════════════════════════════ */
skills: [
  {
    group: 'Engineering & Technical',
    icon:  'fa-solid fa-microchip',
    items: ['Electrical Engineering', 'Python', 'CAD Design', 'Prototyping', 'Circuit Analysis', 'Data Analysis'],
  },
  {
    group: 'Human & Research',
    icon:  'fa-solid fa-users-viewfinder',
    items: ['UX Research', 'Human-Technology Interaction', 'Behavioural Science', 'User Testing', 'Cognitive Psychology'],
  },
  {
    group: 'Build & Communicate',
    icon:  'fa-solid fa-compass-drafting',
    items: ['HTML / CSS / JavaScript', 'Node.js', 'Technical Writing', 'Public Speaking', 'Entrepreneurship', 'Business Modelling'],
  },
],

/* ═══════════════════════════════════════════════════════════════════════════
   [6] EXPERIENCE  —  education, work, everything with a date
   Newest first. Set  current: true  to give it a highlighted marker.
   ═══════════════════════════════════════════════════════════════════════════ */
experience: [
  {
    role:    'BSc Electrical Engineering + Psychology & Technology',
    org:     'Eindhoven University of Technology (TU/e)',
    date:    '2025 — 2028',
    current: true,
    desc:    'Dual-degree track combining electrical systems and signal fundamentals with cognitive psychology, perception and human-technology interaction.',
  },
  {
    role:    'Engineering Intern — Mechanical Engineering Dept.',
    org:     'Shell · Amsterdam',
    date:    'Jul — Aug 2023',
    current: false,
    desc:    'Worked inside a multidisciplinary engineering team on inventory management, component classification and structured documentation of industrial processes.',
  },
  {
    role:    'International Baccalaureate Diploma — 41/45',
    org:     'International School of The Hague',
    date:    '2023 — 2025',
    current: false,
    desc:    'Graduated in the top global percentile of the IB, with a focus on sciences and mathematics.',
  },
  {
    role:    'Delegate — Model United Nations',
    org:     'International School Hilversum',
    date:    'Jun 2023',
    current: false,
    desc:    'Represented a delegation in committee — research, argument construction, public speaking and negotiation under time pressure.',
  },
],

/* ═══════════════════════════════════════════════════════════════════════════
   [7] CERTIFICATES  —  courses and credentials
   ═══════════════════════════════════════════════════════════════════════════ */
certifications: [
  { title: 'The Complete Web Developer', issuer: 'Udemy', note: 'Node.js & software development' },
  { title: 'Entrepreneurship',           issuer: 'Harvard Business School', note: 'May 2023' },
],

/* ═══════════════════════════════════════════════════════════════════════════
   [8] NOW & NEXT  —  what you're working toward
   ═══════════════════════════════════════════════════════════════════════════ */
next: [
  {
    state: 'Now',
    title: 'Dual degree at TU/e',
    desc:  'Building depth in electrical engineering while keeping the human side of technology at the centre of how I design.',
  },
  {
    state: 'Building',
    title: 'Assistive technology prototype',
    desc:  'Taking the visually impaired learning device from CAD to a working prototype ready for classroom testing.',
  },
  {
    state: 'Looking for',
    title: 'Internship or research placement',
    desc:  'A team where engineering rigour and user research sit at the same table. Hardware, product or research — I\'m interested.',
  },
],

/* ═══════════════════════════════════════════════════════════════════════════
   [9] CONTACT
   ═══════════════════════════════════════════════════════════════════════════ */
contact: {
  heading: 'Let\'s build something',
  text:    'I read everything that arrives. Whether it\'s an internship, a research collaboration or a question about a project — say hello.',
  ctaNote: 'Usually replies within a couple of days.',
},

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════════════ */
footer: {
  tagline: 'Engineering technology around the people who use it.',
  note:    'Designed & built from scratch in Eindhoven.',
},

};
