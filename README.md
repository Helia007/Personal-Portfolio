# Helia Amini — Portfolio

A static site. No frameworks, no build step, no npm.
**Everything you write lives in one file: `content.js`.**

---

## 🟢 The 30-second version

| I want to…                  | Open           | Look for      |
|-----------------------------|----------------|---------------|
| Add or edit a **project**    | `content.js`   | section `[3]` |
| Change my **name / email**   | `content.js`   | section `[1]` |
| Change the **cover**         | `content.js`   | section `[2]` |
| Rewrite the **big line**     | `content.js`   | `about.lead`  |
| Edit **skills**              | `content.js`   | section `[4]` |
| Edit **About / credentials** | `content.js`   | section `[5]` |
| Add a **photo**             | `assets/`      | then name it in `content.js` |
| Change the **accent colour**| `css/styles.css` | `--accent` at the top |

You should never need to touch `index.html`, `css/styles.css` or `js/main.js`.

---

## 🖤 About this design

A dark cover, a white page, a dark close. The cover and contact screens stay
dark in both themes because that framing is art-directed; everything between
is white and stays out of the way of your work.

The order is: **cover → about → work → skills → contact.** People meet you,
then your projects, then the detail.

Work is a museum grid — every tile the same size, evenly hung, caption
beneath. `featured: true` puts a project first in the grid rather than making
it bigger, so the wall stays even.

The cover is built from layers: drifting fields of teal light, a circuit trace
pattern with pulses running along it, a vignette and film grain. To calm the
circuitry, lower the opacity on `.circuit .traces path` in `css/styles.css`;
to remove the light, delete the `<span class="glow">` elements from
`index.html`.

Accent colour is deep teal (`--accent`), used for links, hover states and the
status badge — nothing else.

## ⭐ Adding a project

1. Open `content.js`, go to **section [4]**.
2. Copy the template in the comment there.
3. Paste it into the list, above the line that says `⬆️ ADD YOUR NEXT PROJECT`.
4. Fill it in:

```js
{
  title:    'Smart Braille Reader',
  category: 'Engineering',        // becomes a filter link automatically
  year:     '2026',
  role:     'Hardware design and user testing',
  status:   'In progress',        // small mono note beside the title, '' for none
  featured: true,                 // true = full-width image across the grid
  summary:  'One sentence. Appears in the popup, not on the grid.',
  image:    'assets/projects/braille.jpg',
  gallery:  ['assets/projects/braille-2.jpg'],
  tags:     ['Electronics', 'CAD', 'User Testing'],
  highlights: [
    'Tested three sensor layouts with six users.',
    'Cut response time from 400 ms to 90 ms.',
  ],
  links: [
    { label: 'GitHub', url: 'https://github.com/...' },
  ],
},
```

The site builds the filter links, lays out the grid, and opens the popup.
Add 3 projects or 30 — it holds.

**Every field except `title` is optional.** Delete what you don't need; empty
things disappear instead of leaving a gap.

---

## 🖼 Pictures matter more in this design

The grid is mostly images. With no photos it still looks clean, but it is
carrying far less. **Real project photos are the single biggest upgrade you
can make to this site.**

1. Put the file in `assets/projects/`
2. Write the path: `image: 'assets/projects/my-file.jpg'`

- Best size: **1600 × 1000 px**. JPG or PNG.
- Lowercase filenames, no spaces: `solar-tracker.jpg` — servers are
  case-sensitive, and this is the #1 cause of missing images.
- No photo yet? Leave `image: ''` and a quiet placeholder appears. A wrong
  filename falls back to the same placeholder rather than breaking.

Portrait: `assets/photo.jpg` · CV: `assets/resume.pdf`

---

## 🎨 Colours

`css/styles.css`, at the very top. Two blocks — `:root` (light) and
`[data-theme="dark"]`. Change `--accent` in both.

The opener and contact screens stay near-black in both themes on purpose:
that entrance is art-directed, not something visitors switch.

---

## ✅ Rules so nothing breaks

1. Only edit text **inside the 'single quotes'**.
2. Keep the **comma** at the end of each line.
3. For an apostrophe, write `\'` — e.g. `'I\'m a student'`.
4. Blank page? You have a typo. Press **F12**, open **Console**, it names the line.

---

## 🌐 Putting it online

**GitHub Pages:** Settings → Pages → Source: `main`, `/ (root)` → Save.
Live at `helia007.github.io/Personal-Portfolio`.

**Custom domain:** add it under Pages → Custom domain, then point a CNAME
record at `helia007.github.io` in your registrar's DNS.

**cPanel / GoDaddy:** upload `index.html`, `content.js` and the `css/`, `js/`,
`assets/` folders into `public_html/`, keeping the structure. Enable SSL under
SSL/TLS Status.

---

## Built with

HTML5 · CSS custom properties and Grid · vanilla JavaScript ·
Google Fonts (Inter Tight, Inter, JetBrains Mono)

Icons are inline SVG, so the only external request is the font. Light and dark
themes, full keyboard navigation, reduced-motion support, print stylesheet.
No build tools — open `index.html` and go.
