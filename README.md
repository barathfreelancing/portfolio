# Barathkumar — Freelance Portfolio

Full-stack Python & AI developer portfolio built with React + Vite, GSAP/ScrollTrigger and Lenis. The page is one continuous anime sky rendered live in WebGL: the reader travels from dusk over a floating city (hero) through night (stack, work) and an aurora (services) to first light above a cloud sea (contact).

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (typically http://localhost:5173).

## Build, lint, preview

```bash
npm run build     # output in dist/
npm run lint      # oxlint
npm run preview
```

## Project structure

```
src/
├── world/          # WebGL sky: shader.js (procedural scene), states.js (one sky per chapter), World.jsx (renderer + scroll blending)
├── motion/         # gsap.js: plugin registration, shared easing curves, reduced-motion helper
├── components/     # Nav, Footer
├── sections/       # Hero, About (incl. principles), Technology, Work, Services (incl. process), Contact
├── data/           # services.js, projects.js, tech.js — edit content here
├── styles/         # tokens.css (design tokens) + one stylesheet per section
├── App.jsx         # assembles the page, sets up Lenis + ScrollTrigger
└── main.jsx
```

Design context lives in `PRODUCT.md` and `.impeccable/surfaces/` (direction contract), with the visual system documented in `DESIGN.md`.

## The world

- Everything in the sky (clouds, stars, aurora, floating islands and towers, the entity, light motes) is procedural geometry and noise in a single fragment shader, so there are no illustration assets to license.
- Each section has a chapter state in `src/world/states.js` (sky colours, sun, stars, aurora, clouds, camera height, entity position). Change a chapter there to re-light that part of the page.
- The canvas renders below CSS resolution and steps resolution down automatically on slow devices. Without WebGL, a CSS gradient sky on `<body>` is shown instead.

## Content notes

- **Projects** live in `src/data/projects.js`: each has a factual `kind` (Drishti Opticians is client work; the others are self-initiated concept builds), a `brief`, a `built` list, the stack and links. Screenshots are WebP in `public/` at full size plus an `-800.webp` version for phones; the original PNGs are in git history (commit 1141f7d). Add a project by adding an entry and both image sizes (about 2.14:1).
- **Python and ML repositories** (`pythonProjects` in the same file) link to github.com/barath220904. Keep their descriptions to what each repo does; their GitHub descriptions contain percentage claims that are not repeated here.
- **Response commitment:** the contact section and the success message promise a reply within 24 hours. Change both in `src/sections/Contact.jsx` if that changes.
- **Contact form** validates input and submits through Web3Forms when `VITE_WEB3FORMS_KEY` is configured. Without a key it opens the visitor's email client with the enquiry pre-filled. Set the key in a local `.env` file for development and in the deployment provider's environment settings for production.
- **WhatsApp number** is formatted with the +91 (India) country code. Double-check it before publishing.
- No testimonials, client logos, metrics, or years-of-experience claims are included. Add only verified information if these are introduced later.

## Deployment and security

- `vercel.json` keeps the SPA rewrite and adds `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and `Permissions-Policy` headers, plus a one-year immutable cache for Vite's hashed `/assets/*`.
- `VITE_WEB3FORMS_KEY` is compiled into the client bundle by design: Web3Forms access keys are public and only allow submissions to your inbox. Restrict the key to your domain in the Web3Forms dashboard. No other secrets are used by the site.
- `.env`, `dist/`, local review artifacts and the per-project `skills/` folder are git-ignored.

## Accessibility & motion

- In-page links scroll smoothly with Lenis for pointer clicks, jump instantly for keyboard activation, and move focus to the target section.
- Phones render the sky at 30fps; devices with under 4 GB of memory or 2 cores start at lower resolution; Save-Data visitors get a still sky.
- Keyboard-navigable nav, including the mobile menu (focus trap, Escape to close, focus returned to the toggle); visible focus states; labelled form fields with inline errors.
- `prefers-reduced-motion`: Lenis and all GSAP movement are skipped, every section is visible without scroll triggers, and the world is frozen: the sky still changes colour per chapter, while the city and entity fade out after the hero instead of travelling.
- Motion follows Emil Kowalski's curves (`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`), animates transform/opacity/clip-path, and gates hover effects to fine pointers.
