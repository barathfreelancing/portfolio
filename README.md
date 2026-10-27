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

- **Contact details and availability** live in `src/data/site.js`. Set `available: false` to hide the "Available for freelance projects" badge.
- **Projects** live in `src/data/projects.js`, including the case-study fields (problem, approach, implementation, outcome). Screenshots are served as WebP from `public/`; the original PNGs are kept beside them. New screenshots should be roughly 2.14:1.
- **Services** live in `src/data/services.js`. Each service's `inquiryType` must match a project type in `sections/Contact.jsx`; clicking its "Discuss ..." link preselects that type in the form.
- **Contact form** validates input and submits through Web3Forms when `VITE_WEB3FORMS_KEY` is configured. Without a key it opens the visitor's email client with the enquiry pre-filled. Set the key in a local `.env` file for development and in the deployment provider's environment settings for production.
- No testimonials, client logos, metrics, or years-of-experience claims are included. Add only verified information if these are introduced later.

## Deployment and security

- `vercel.json` keeps the SPA rewrite and adds `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and `Permissions-Policy` headers, plus a one-year immutable cache for Vite's hashed `/assets/*`.
- `VITE_WEB3FORMS_KEY` is compiled into the client bundle by design: Web3Forms access keys are public and only allow submissions to your inbox. Restrict the key to your domain in the Web3Forms dashboard. No other secrets are used by the site.
- `.env`, `dist/`, local review artifacts and the per-project `skills/` folder are git-ignored.

## Accessibility & motion

- Semantic sections with one `h1`, labelled landmarks, a skip link, visible focus states, and a keyboard-accessible mobile menu (focus trap, Escape to close, focus returned to the toggle).
- Motion is CSS-only, following Emil Kowalski's rules: the hero's cobalt field rises to the seam on load, the header takes the colour of the section beneath it, sections enter in a short stagger (heading, text, picture), and buttons and screenshots respond to press and hover. With `prefers-reduced-motion`, all movement and smooth scrolling are dropped and content simply fades in.
- The live element is the owner's current local time in India (`src/components/LocalTime.jsx`, time zone in `src/data/site.js`).

## Design tooling

The design was directed and checked with locally installed skills: Taste (`design-taste-frontend`: direction `type-only-statement`, saved in `.taste-skill/direction.json`; gate with its `lint.mjs` and `inspect.mjs`), Impeccable (context, craft floor, design hook and finish review; brief in `.impeccable/surfaces/src-app-jsx.md`) and Emil Kowalski's design-engineering rules for motion. `.taste-skill/` holds working files and screenshots and can be deleted.
