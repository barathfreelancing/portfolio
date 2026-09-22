# Barathkumar — Freelance Portfolio

Full-stack Python & AI developer portfolio built with React + Vite, GSAP/ScrollTrigger, and Lenis smooth scroll.

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (typically http://localhost:5173).

## Build for production

```bash
npm install
npm run build
```

Output goes to `dist/`. Preview the production build with:

```bash
npm run preview
```

## Project structure

```
src/
├── components/     # Nav, Footer
├── sections/       # Hero, Services, Work, Process, Technology, About, Principles, Contact
├── data/           # services.js, projects.js, tech.js — edit content here
├── styles/         # tokens.css (design system) + one stylesheet per section
├── App.jsx         # assembles sections, sets up Lenis + ScrollTrigger
└── main.jsx
```

## Content notes — what still needs to be added

- **STUDDS project**: source link is wired to the given GitHub repo. A live/preview
  link is not yet included — add one in `src/data/projects.js` (`liveUrl`) and wire it
  into the "View project" button in `src/sections/Work.jsx` once a live URL exists.
- **Upcoming projects** (AI/RAG app, automation system, full-stack app) are intentional
  "Coming soon" placeholders — replace with real case studies in
  `src/data/projects.js` as they ship.
- **Contact form** is frontend-only: it validates input and opens the visitor's email
  client via a `mailto:` link with the details pre-filled. No backend/email service is
  wired up. To make it submit directly, connect a form backend (e.g. Formspree, a
  serverless function, or a custom API) inside `src/sections/Contact.jsx`.
- **WhatsApp number** is formatted with the +91 (India) country code based on the
  10-digit number provided. Double-check this is correct before publishing.
- No testimonials, client logos, metrics, or years-of-experience claims are included,
  per the brief — add only verified information if these are introduced later.

## Accessibility & motion

- Keyboard-navigable nav (including the mobile menu, which closes on Escape and
  returns focus to the toggle button).
- Visible focus states throughout.
- Respects `prefers-reduced-motion`: all content is immediately visible without
  relying on scroll animations, and Lenis smooth scroll / GSAP entrance and
  scroll-triggered effects are skipped.
