/* ═══════════════════════════════════════════════════════════════════════════
   ✏️  content.js  —  THIS IS THE ONLY FILE YOU NEED TO EDIT
   ═══════════════════════════════════════════════════════════════════════════

   Everything on the website lives here. Change the text between the 'quotes'
   and save. Refresh the page — done.

   THREE RULES SO NOTHING BREAKS:
     1. Only change text INSIDE the 'single quotes'.
     2. Every line ends with a comma  ,
     3. For an apostrophe inside text write  \'   (e.g. 'I\'m')

   ⚠️ A NOTE ON THIS DESIGN
   This site is built on restraint. The empty space is doing work — it is what
   makes it feel expensive. Every sentence you add takes some of that away.
   If you can say it in five words, say it in five.

   JUMP TO A SECTION:
     [1] PROFILE ....... name, location, email, links
     [2] OPENER ........ the first black screen
     [3] STATEMENT ..... the one big line
     [4] PROJECTS ...... ⭐ the heart of the site
     [5] SKILLS ........ your disciplines, as a datasheet
     [6] ABOUT ......... photo, a few lines, credentials
     [7] CONTACT ....... the closing screen
   ═══════════════════════════════════════════════════════════════════════════ */

window.PORTFOLIO = {

/* ═══════════════════════════════════════════════════════════════════════════
   [1] PROFILE
   ═══════════════════════════════════════════════════════════════════════════ */
profile: {
  name:     'Helia Amini',
  initials: 'HA',                          // used for the logo and as a photo fallback
  location: 'Eindhoven, Netherlands',
  email:    'helia@heliaamini.com',        // ← your real email
  resume:   'assets/resume.pdf',           // ← replace that file with your CV

  // Shown as small text links at the bottom. Add or delete lines freely.
  socials: [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/helia-amini' },
    { label: 'GitHub',   url: 'https://github.com/Helia007' },
  ],
},

/* ═══════════════════════════════════════════════════════════════════════════
   [2] OPENER  —  the first thing anyone sees. Keep it to one line.
   ═══════════════════════════════════════════════════════════════════════════ */
opener: {
  index: 'Portfolio — 2026',               // the small rotated label on the left edge
  line:  'Electrical engineering and human-centred design.',

  // The three columns under your name. Delete one to show two.
  meta: [
    { label: 'Based in', value: 'Eindhoven, NL' },
    { label: 'Reading',  value: 'EE + Psychology & Technology, TU/e' },
    { label: 'Status',   value: 'Open to internships' },
  ],
},

/* ═══════════════════════════════════════════════════════════════════════════
   [3] STATEMENT  —  the one place on the site where you actually write.
   Two sentences maximum. Make them count.
   ═══════════════════════════════════════════════════════════════════════════ */
statement: {
  text: 'Every system eventually meets a person. I work on that moment.',

  // Three short facts. Delete one to show two.
  meta: [
    { value: 'TU/e',   label: 'Eindhoven University of Technology' },
    { value: 'EE + P&T', label: 'Dual degree, 2025–2028' },
    { value: '41/45',  label: 'International Baccalaureate' },
  ],
},

/* ═══════════════════════════════════════════════════════════════════════════
   [4] ⭐ PROJECTS  —  the heart of the site
   ═══════════════════════════════════════════════════════════════════════════

   HOW TO ADD ONE
   ──────────────
   Copy the template below, paste it into the list, fill it in.
   The site numbers them, builds the filter links, and lays out the grid
   for you. Add 3 or add 30 — it holds.

   ── TEMPLATE — copy from here ────────────────────────────────────────────
   {
     title:    'Name of the project',
     category: 'Engineering',                   // becomes a filter link
     year:     '2026',
     role:     'What you did',
     status:   '',                              // 'In progress' / '' 
     featured: false,                           // true = full-width image
     summary:  'One sentence. It appears in the popup, not on the grid.',
     image:    'assets/projects/my-photo.jpg',  // '' = quiet placeholder
     gallery:  [],
     tags:     ['Skill one', 'Skill two'],
     highlights: [
       'A bullet about what you did.',
       'A bullet about the result.',
     ],
     links: [
       { label: 'View project', url: 'https://...' },
     ],
   },
   ── to here ──────────────────────────────────────────────────────────────

   PICTURES
   ────────
   Drop files into  assets/projects/  then write the name here.
   Best size: 1600 × 1000 px. Lowercase filenames, no spaces.
   This design leans on images — a real photo beats a placeholder every time.
   ═══════════════════════════════════════════════════════════════════════════ */
projects: [

  {
    title:    'Assistive Technology for Visually Impaired Children',
    category: 'Engineering',
    year:     '2024',
    role:     'Concept, CAD and prototyping',
    status:   'In progress',
    featured: true,
    summary:  'A learning device built with former LightHouse school members in The Hague, closing the gap for visually impaired children in mainstream classrooms.',
    image:    '',
    gallery:  [],
    tags:     ['Product Development', 'CAD', 'Accessibility'],
    highlights: [
      'Interviewed teachers and specialists to find where existing classroom material fails.',
      'Turned those findings into a physical concept, iterated across several CAD versions.',
      'Building toward a prototype for real classroom testing.',
    ],
    links: [],
  },

  {
    title:    'Operant Conditioning in Digital Products',
    category: 'Research',
    year:     '2025',
    role:     'Independent research',
    status:   '',
    featured: false,
    summary:  'How apps use reinforcement schedules to shape behaviour — and where the line sits between helpful design and manipulation.',
    image:    '',
    gallery:  [],
    tags:     ['Behavioural Science', 'UX Research'],
    highlights: [
      'Mapped common product mechanics onto classical reinforcement schedules.',
      'Argued where persuasive design becomes manipulation.',
    ],
    links: [
      { label: 'Read on LinkedIn', url: 'https://linkedin.com/in/helia-amini' },
    ],
  },

  {
    title:    'Engineering Inventory System',
    category: 'Engineering',
    year:     '2023',
    role:     'Engineering intern, Shell',
    status:   '',
    featured: false,
    summary:  'Inventory tracking and component classification for the mechanical engineering department at Shell, Amsterdam.',
    image:    '',
    gallery:  [],
    tags:     ['Systems', 'Documentation'],
    highlights: [
      'Worked inside a multidisciplinary engineering team on live industrial processes.',
      'Delivered documentation that improved component traceability.',
    ],
    links: [],
  },

  {
    title:    'This Portfolio',
    category: 'Design',
    year:     '2026',
    role:     'Design and front-end build',
    status:   '',
    featured: false,
    summary:  'Designed and coded from scratch — content-driven, responsive, and built so the whole site updates from a single file.',
    image:    '',
    gallery:  [],
    tags:     ['HTML / CSS', 'JavaScript', 'UX Design'],
    highlights: [
      'Every section renders from one plain-text file. No frameworks, no build step.',
      'Full keyboard navigation and reduced-motion support.',
    ],
    links: [
      { label: 'Source', url: 'https://github.com/Helia007' },
    ],
  },

  {
    title:    'Personal Brand Identity',
    category: 'Design',
    year:     '2025',
    role:     'Visual identity',
    status:   '',
    featured: false,
    summary:  'A personal logo and visual system used across professional platforms.',
    image:    '',
    gallery:  [],
    tags:     ['Branding', 'Visual Design'],
    highlights: [],
    links: [],
  },

  /* ⬆️ ADD YOUR NEXT PROJECT RIGHT HERE — paste the template from above ⬆️ */

],

/* ═══════════════════════════════════════════════════════════════════════════
   [5] SKILLS  —  laid out like a datasheet: a discipline on the left,
   what you can do on the right. Copy a { } block to add a whole new row.
   ═══════════════════════════════════════════════════════════════════════════ */
skills: [
  {
    group: 'Electrical & Hardware',
    items: ['Circuit Analysis', 'Signals & Systems', 'CAD Design', 'Prototyping', 'Measurement & Test'],
  },
  {
    group: 'Software & Data',
    items: ['Python', 'HTML / CSS / JavaScript', 'Node.js', 'Data Analysis'],
  },
  {
    group: 'Human Factors',
    items: ['UX Research', 'Human-Technology Interaction', 'Behavioural Science', 'User Testing'],
  },
  {
    group: 'Working Practice',
    items: ['Technical Writing', 'Public Speaking', 'Entrepreneurship', 'English · Dutch · Farsi'],
  },
],

/* ═══════════════════════════════════════════════════════════════════════════
   [6] ABOUT  —  short. Two paragraphs is the ceiling.
   ═══════════════════════════════════════════════════════════════════════════ */
about: {
  photo:    'assets/photo.jpg',            // '' shows your initials instead
  photoAlt: 'Helia Amini',

  text: [
    'I study Electrical Engineering alongside Psychology & Technology at Eindhoven University of Technology. One teaches me how systems are built; the other, who they are built for.',
    'Before that: an engineering internship at Shell, entrepreneurship training at Harvard Business School, and an assistive technology project for visually impaired children.',
  ],

  // One quiet list. Add a line for anything worth showing.
  credentials: [
    { title: 'BSc Electrical Engineering + Psychology & Technology', org: 'Eindhoven University of Technology', date: '2025 — 2028' },
    { title: 'Engineering Intern, Mechanical Engineering',           org: 'Shell · Amsterdam',                  date: '2023' },
    { title: 'International Baccalaureate — 41/45',                  org: 'International School of The Hague',  date: '2025' },
    { title: 'Entrepreneurship',                                     org: 'Harvard Business School',            date: '2023' },
    { title: 'The Complete Web Developer',                           org: 'Udemy',                              date: '2023' },
  ],
},

/* ═══════════════════════════════════════════════════════════════════════════
   [7] CONTACT  —  the closing screen
   ═══════════════════════════════════════════════════════════════════════════ */
contact: {
  line: 'Available for internships and collaborations.',
  note: '',                                 // optional small line under the email
},

footer: {
  note: 'Designed and built in Eindhoven.',
},

};
