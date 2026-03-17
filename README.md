# 🚀 Personal Portfolio — Setup & Deployment Guide

A clean, luxury-editorial portfolio site. Dark/light mode, animated, responsive,
with a working contact form powered by EmailJS.

---

## 📁 File Structure

```
portfolio/
├── index.html          ← Main page (all sections live here)
├── css/
│   └── styles.css      ← All styles, CSS variables, responsive design
├── js/
│   └── main.js         ← Interactions, animations, EmailJS form
├── assets/
│   ├── resume.pdf      ← Your CV (replace with yours)
│   └── photo.jpg       ← Your profile photo (replace with yours)
└── README.md           ← This file
```

---

## ✏️ How to Personalise

### 1. Replace placeholder info

Search and replace the following in `index.html`:

| Find                        | Replace with                  |
|-----------------------------|-------------------------------|
| `Alex Morgan`               | Your full name                |
| `AM`                        | Your initials                 |
| `hello@yourname.com`        | Your email                    |
| `+31 6 12 34 56 78`         | Your phone number             |
| `Amsterdam, Netherlands`    | Your city                     |
| `yourusername`              | Your social media usernames   |
| `yourname.com`              | Your domain                   |

### 2. Add your photo

Option A — Photo file:
1. Drop your photo into `/assets/photo.jpg`
2. In `index.html`, find the `.about-photo-placeholder` div and replace it with:
   ```html
   <img src="assets/photo.jpg" alt="Your Name" />
   ```
   (keep the `.about-photo-wrap` parent div)

Option B — If you keep the CSS placeholder, just update the text inside it.

### 3. Add your real projects

In `index.html`, find the `<!-- Project 1 -->` block and update:
- `<h3 class="project-title">` — project name
- `<p class="project-desc">` — short description
- `<span class="tag tag-sm">` — tech stack
- `href="#"` on the overlay links → your GitHub URL and live demo URL

To add a screenshot image, replace the `.project-img-placeholder` div with:
```html
<img src="assets/project-name.jpg" alt="Project Name" />
```
Recommended image size: **800 × 500px**

### 4. Update your resume

Replace `assets/resume.pdf` with your actual CV file.

### 5. Typewriter effect

In `js/main.js`, find the `roles` array around line 55 and update it:
```javascript
const roles = [
  'full-stack apps.',
  'beautiful UIs.',
  // ← add your own
];
```

### 6. Skill bar percentages

In `index.html`, each skill bar has a `data-level` attribute:
```html
<div class="skill-fill" data-level="95"></div>
```
Change the number (0–100) to match your actual skill level.

---

## 📧 EmailJS — Contact Form Setup (Free)

The contact form uses [EmailJS](https://www.emailjs.com/) to send emails without a backend.
Free tier allows **200 emails/month**.

### Step-by-step:

1. **Create an account** at https://www.emailjs.com/
2. **Add an Email Service** (Gmail recommended):
   - Dashboard → Email Services → Add New Service
   - Select Gmail → Connect Account → Copy the **Service ID**
3. **Create an Email Template**:
   - Dashboard → Email Templates → Create New Template
   - Use these exact variable names in the template body:
     ```
     From: {{name}} ({{email}})
     Subject: {{subject}}
     Message: {{message}}
     ```
   - Copy the **Template ID**
4. **Get your Public Key**:
   - Account → API Keys → copy your **Public Key**
5. **Update `js/main.js`** at the top:
   ```javascript
   const EMAILJS_SERVICE_ID  = 'service_xxxxxxx';   // ← your Service ID
   const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx';  // ← your Template ID
   const EMAILJS_PUBLIC_KEY  = 'xxxxxxxxxxxxxxxx';  // ← your Public Key
   ```

**That's it!** The form will now send emails directly to your Gmail inbox.

---

## 🌐 Deploying to GoDaddy (Shared Hosting)

This is a static site — no Node.js or server setup needed.

### Method 1: cPanel File Manager (Easiest)

1. **Log in** to your GoDaddy account → My Products → Web Hosting → Manage
2. Open **cPanel** (usually at `yourdomain.com/cpanel`)
3. Go to **File Manager** → navigate to `public_html/`
4. Click **Upload** → upload all your files:
   - `index.html`
   - `css/styles.css`
   - `js/main.js`
   - `assets/` folder (resume, photo)
   
   ⚠️ Make sure to preserve the folder structure exactly!
5. Visit `yourdomain.com` — your site should be live.

### Method 2: FTP with FileZilla (Recommended for multiple files)

1. Download [FileZilla](https://filezilla-project.org/) (free)
2. In GoDaddy cPanel → **FTP Accounts** → note your FTP username/host
   - Host: `ftp.yourdomain.com`
   - Username: your cPanel username
   - Port: `21`
3. Connect in FileZilla
4. Navigate to `public_html/` on the right (server) panel
5. Drag your entire `portfolio/` folder contents into `public_html/`
6. Done! Visit your domain.

### After Uploading — Checklist

- [ ] Visit `yourdomain.com` — does the homepage load?
- [ ] Check on mobile (use Chrome DevTools or your phone)
- [ ] Test the contact form (send yourself a test message)
- [ ] Check that resume download works (`assets/resume.pdf` exists)
- [ ] Make sure all social links point to your real profiles

### Custom Domain + HTTPS

GoDaddy provides free SSL certificates:
- cPanel → **SSL/TLS Status** → enable for your domain
- Your site will then be accessible at `https://yourdomain.com`

---

## 🔧 Common Issues

**Images not loading?**
- Check file names are lowercase and match exactly (case-sensitive on servers)
- Verify the file is in the right folder

**Contact form not sending?**
- Make sure you replaced all three EmailJS credentials in `main.js`
- Check the browser console (F12) for error messages
- Verify your EmailJS template uses `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`

**Fonts not loading?**
- This requires an internet connection (Google Fonts CDN)
- For offline use, download the fonts and host them locally

**Site looks different on mobile?**
- Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- Clear browser cache

---

## 🎨 Customising the Design

### Change accent colour (the gold)

In `css/styles.css`, find the `:root` block and update:
```css
--accent:     #c9a448;   /* change to any hex colour */
--accent-rgb: 201, 164, 72;  /* same colour as RGB values (no #) */
```

### Switch to light mode by default

In `index.html`, change:
```html
<html lang="en" data-theme="dark">
```
to:
```html
<html lang="en" data-theme="light">
```

### Add more sections

Copy any `<section>` block in `index.html`, give it a new `id`,
and add a nav link pointing to `#your-new-id`.

---

## 📦 Tech Stack

- **HTML5** — semantic markup, SEO meta tags, OG tags
- **CSS3** — custom properties, Grid, Flexbox, CSS animations, clamp()
- **Vanilla JavaScript** — IntersectionObserver, EmailJS, no build tools needed
- **EmailJS** — contact form backend (free tier)
- **Google Fonts** — Cormorant Garamond, Archivo, DM Mono
- **Font Awesome 6** — icons

No frameworks, no npm, no build step. Just open `index.html` and go.

---

Made with ♥
