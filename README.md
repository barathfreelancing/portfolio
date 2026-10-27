# Barathkumar — Freelance Portfolio

Freelance portfolio of a full-stack Python & AI developer, built with React + Vite and plain CSS. A light, editorial single page that leads with services and real project work and ends in an enquiry form.

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
npm run preview   # serves dist/ (typically http://localhost:4173)
```

## Project structure

```
src/
├── sections/       # Hero, Services, Work (incl. case studies), Process, About (incl. principles + toolkit), Contact
├── data/           # site.js (contact details, availability), services.js, projects.js, tech.js — edit content here
├── components/     # Nav (colour by chapter), Footer, LocalTime
├── lib/            # motion.js (scroll reveal), inquiry.js (service → form preselect)
├── styles/         # tokens.css (design tokens) + one stylesheet per section
├── App.jsx         # assembles the page
└── main.jsx
```

The visual system is documented in `DESIGN.md`; audience and content rules in `PRODUCT.md`.

## Content notes

<<<<<<< HEAD
- **Projects** live in `src/data/projects.js`: each has a factual `kind` (Drishti Opticians is client work; the others are self-initiated concept builds), a `brief`, a `built` list, the stack and links. Screenshots are WebP in `public/` at full size plus an `-800.webp` version for phones; the original PNGs are in git history (commit 1141f7d). Add a project by adding an entry and both image sizes (about 2.14:1).
- **Python and ML repositories** (`pythonProjects` in the same file) link to github.com/barath220904. Keep their descriptions to what each repo does; their GitHub descriptions contain percentage claims that are not repeated here.
- **Response commitment:** the contact section and the success message promise a reply within 24 hours. Change both in `src/sections/Contact.jsx` if that changes.
=======
- **Contact details and availability** live in `src/data/site.js`. Set `available: false` to hide the "Available for freelance projects" badge.
- **Projects** live in `src/data/projects.js`, including the case-study fields (problem, approach, implementation, outcome). Screenshots are served as WebP from `public/`; the original PNGs are kept beside them. New screenshots should be roughly 2.14:1.
- **Services** live in `src/data/services.js`. Each service's `inquiryType` must match a project type in `sections/Contact.jsx`; clicking its "Discuss ..." link preselects that type in the form.
>>>>>>> 27c7e9f (ui change)
- **Contact form** validates input and submits through Web3Forms when `VITE_WEB3FORMS_KEY` is configured. Without a key it opens the visitor's email client with the enquiry pre-filled. Set the key in a local `.env` file for development and in the deployment provider's environment settings for production.
- No testimonials, client logos, metrics, or years-of-experience claims are included. Add only verified information if these are introduced later.

## Deployment and security

- `vercel.json` keeps the SPA rewrite and adds `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and `Permissions-Policy` headers, plus a one-year immutable cache for Vite's hashed `/assets/*`.
- `VITE_WEB3FORMS_KEY` is compiled into the client bundle by design: Web3Forms access keys are public and only allow submissions to your inbox. Restrict the key to your domain in the Web3Forms dashboard. No other secrets are used by the site.
- `.env`, `dist/`, local review artifacts and the per-project `skills/` folder are git-ignored.

## Accessibility & motion

<<<<<<< HEAD
- In-page links scroll smoothly with Lenis for pointer clicks, jump instantly for keyboard activation, and move focus to the target section.
- Phones render the sky at 30fps; devices with under 4 GB of memory or 2 cores start at lower resolution; Save-Data visitors get a still sky.
- Keyboard-navigable nav, including the mobile menu (focus trap, Escape to close, focus returned to the toggle); visible focus states; labelled form fields with inline errors.
- `prefers-reduced-motion`: Lenis and all GSAP movement are skipped, every section is visible without scroll triggers, and the world is frozen: the sky still changes colour per chapter, while the city and entity fade out after the hero instead of travelling.
- Motion follows Emil Kowalski's curves (`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`), animates transform/opacity/clip-path, and gates hover effects to fine pointers.
=======
- Semantic sections with one `h1`, labelled landmarks, a skip link, visible focus states, and a keyboard-accessible mobile menu (focus trap, Escape to close, focus returned to the toggle).
- Motion is CSS-only, following Emil Kowalski's rules: the hero's cobalt field rises to the seam on load, the header takes the colour of the section beneath it, sections enter in a short stagger (heading, text, picture), and buttons and screenshots respond to press and hover. With `prefers-reduced-motion`, all movement and smooth scrolling are dropped and content simply fades in.
- The live element is the owner's current local time in India (`src/components/LocalTime.jsx`, time zone in `src/data/site.js`).

## Design tooling

The design was directed and checked with locally installed skills: Taste (`design-taste-frontend`: direction `type-only-statement`, saved in `.taste-skill/direction.json`; gate with its `lint.mjs` and `inspect.mjs`), Impeccable (context, craft floor, design hook and finish review; brief in `.impeccable/surfaces/src-app-jsx.md`) and Emil Kowalski's design-engineering rules for motion. `.taste-skill/` holds working files and screenshots and can be deleted.
>>>>>>> 27c7e9f (ui change)
