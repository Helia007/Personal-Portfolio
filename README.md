# Helia Amini — Portfolio

A fast, static portfolio site. No frameworks, no build step, no npm.
**Everything you write lives in one file: `content.js`.**

---

## 🟢 The 30-second version

| I want to…                    | Open this file        | Look for            |
|-------------------------------|-----------------------|---------------------|
| Add or edit a **project**     | `content.js`          | section `[3]`       |
| Change my **name / title**    | `content.js`          | section `[1]`       |
| Rewrite my **About** text     | `content.js`          | section `[4]`       |
| Add a **job or degree**       | `content.js`          | section `[6]`       |
| Add a **photo**               | drop it in `assets/`  | then name it in `content.js` |
| Change the **colours**        | `css/styles.css`      | `--accent` at the top |

You almost never need to touch `index.html`, `css/styles.css` or `js/main.js`.

---

## 📁 What's in here

```
index.html          the page skeleton — rarely needs editing
content.js       ← ⭐ ALL YOUR TEXT AND PROJECTS LIVE HERE
css/styles.css      the design
js/main.js          reads content.js and builds the page
assets/
  photo.jpg         your portrait
  resume.pdf        your CV
  projects/         ← put your project images in here
```

---

## ⭐ Adding a project (the important one)

1. Open `content.js`.
2. Scroll to **section [3] PROJECTS**.
3. Copy the template block written in the comment there.
4. Paste it into the list — a good spot is right above the line that says
   `⬆️ ADD YOUR NEXT PROJECT RIGHT HERE`.
5. Fill it in:

```js
{
  title:    'Smart Braille Reader',
  category: 'Engineering',        // this becomes a filter button automatically
  year:     '2026',
  role:     'Hardware design & user testing',
  status:   'In progress',        // small badge on the card — leave '' for none
  featured: true,                 // true = the card takes a double-width slot
  summary:  'One or two sentences. This is what people read on the card.',
  image:    'assets/projects/braille.jpg',
  gallery:  ['assets/projects/braille-2.jpg', 'assets/projects/braille-3.jpg'],
  tags:     ['Electronics', 'CAD', 'User Testing'],
  highlights: [
    'Tested three sensor layouts with six users.',
    'Cut the response time from 400 ms to 90 ms.',
  ],
  links: [
    { label: 'GitHub', url: 'https://github.com/...', icon: 'fa-brands fa-github' },
  ],
},
```

6. Save, refresh the page. That's it.

**The site handles the rest for you:**
- numbering (01, 02, 03…) is automatic
- the filter buttons are built from whatever `category` values you use
- the grid re-flows for 3 projects or 30
- clicking a card opens the full case-study popup

**Every field is optional except `title`.** Delete any line you don't need —
empty sections simply disappear instead of leaving a gap.

---

## 🖼 Adding pictures

1. Put the image file in `assets/projects/`.
2. Write the path in `content.js`: `image: 'assets/projects/my-file.jpg'`

- Best size: **1200 × 750 px** (a wide rectangle). JPG or PNG.
- Keep filenames lowercase with no spaces: `solar-panel.jpg`, not `Solar Panel.JPG`.
  Web servers are case-sensitive — this is the #1 cause of missing images.
- `gallery: [...]` takes extra images shown inside the popup.
- **No image yet?** Leave `image: ''` and the site draws a clean coloured cover
  with an icon. If you type a filename that doesn't exist, it falls back to the
  same cover rather than showing a broken image.

Your portrait goes in `assets/photo.jpg` (or change the name in `content.js` → `about.photo`).
Your CV goes in `assets/resume.pdf`.

---

## 🎨 Changing the colours

Open `css/styles.css`. At the very top there are two blocks — `:root` (light mode)
and `[data-theme="dark"]` (dark mode). Change these two lines in **each** block:

```css
--accent:   #2f5bff;   /* main colour: buttons, links, highlights */
--accent-2: #00b3a4;   /* secondary accent: small details */
```

Pick the dark-mode versions a little lighter than the light-mode ones so text
stays readable on a dark background.

---

## 🔤 Common edits, in one place

| What you see on the site        | Where in `content.js`          |
|---------------------------------|--------------------------------|
| Green "Open to internships" pill | `profile.availability` — set to `''` to hide |
| The rotating words in the hero  | `hero.rotating`                |
| The three numbers under the hero| `hero.stats`                   |
| The scrolling word ticker       | `hero.marquee`                 |
| Skills columns                  | section `[5] skills`           |
| Timeline entries                | section `[6] experience`       |
| "Now & Next" cards              | section `[8] next`             |
| Email address                   | `profile.email`                |

---

## ✅ Rules so nothing breaks

1. Only edit text **inside the 'single quotes'**.
2. Keep the **comma** at the end of each line.
3. For an apostrophe inside text, write `\'` — e.g. `'I\'m a student'`.
4. If the page goes blank, you have a typo. Press **F12** in the browser,
   open the **Console** tab, and it will tell you which line.

---

## 🌐 Putting it online

The site is plain HTML/CSS/JS, so it works on any host.

**GitHub Pages (free):** repository → Settings → Pages → Source: `main` branch,
`/ (root)` → Save. Live in a minute at `username.github.io/repo-name`.

**GoDaddy / cPanel:** File Manager → `public_html/` → upload `index.html`,
`content.js`, and the `css/`, `js/`, `assets/` folders. Keep the folder structure
exactly as it is. Then enable free SSL under cPanel → SSL/TLS Status.

**Custom domain on GitHub Pages:** Settings → Pages → Custom domain, then point
a CNAME record at `username.github.io` in your registrar's DNS.

After uploading, check: homepage loads, images appear, résumé downloads,
site looks right on a phone, all social links go to your real profiles.

---

## 🔧 If something looks wrong

**Images not showing** — filename is case-sensitive; check it matches exactly,
and that the file really is in `assets/projects/`.

**Icons are blank squares** — Font Awesome is loaded from a CDN, so you need
an internet connection.

**Changes not appearing** — hard refresh: `Ctrl + Shift + R` (Windows) or
`Cmd + Shift + R` (Mac).

**Page is blank** — a missing comma or quote in `content.js`. Check the browser
console (F12).

---

## Built with

HTML5 · CSS custom properties, Grid & Flexbox · vanilla JavaScript ·
Google Fonts (Space Grotesk, Inter, JetBrains Mono) · Font Awesome 6

Light and dark themes, full keyboard navigation, reduced-motion support,
and a print stylesheet. No build tools required — open `index.html` and go.
