# Barath Kumar — Freelance Portfolio

A minimal, editorial portfolio site built with React, Vite, Tailwind CSS, Framer Motion, and Lucide React. Static frontend only, no backend required.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional, preview the production build locally
```

The build output goes to `dist/`.

## Deploying

**Vercel**
1. Push this project to a GitHub repo.
2. Import the repo in Vercel.
3. Framework preset: Vite. Build command `npm run build`, output directory `dist`.

**Netlify**
1. Push this project to a GitHub repo.
2. New site from Git in Netlify.
3. Build command `npm run build`, publish directory `dist`.

## Editing content

Everything content-related lives in `src/data/`:

- `projects.js` — add, remove, or edit projects. Each project needs an id, number, title, description, technologies array, image path, and links.
- `services.js` — the five service offerings and their icons (from `lucide-react`).
- `recommendations.js` — starts empty on purpose. Add objects like `{ name, role, quote }` once you have real testimonials, and update `recommendationFormUrl` to point at your actual intake form.

## Images

- `public/images/profile.jpg` — hero portrait. Replace with a real photo (recommended: at least 800×1000px, portrait orientation).
- `public/images/projects/*.png` — project screenshots. Replace with real screenshots (recommended: 1200×825px, 16:11 ratio) — filenames must match what's referenced in `projects.js`.

All images currently shipped are generated placeholders so the layout never breaks before you swap in real assets.

## Structure

```
src/
├── components/     UI building blocks (Navbar, Hero, Projects, Services, etc.)
├── data/           Editable content (projects, services, recommendations)
├── hooks/          useScrollAnimation — scroll-triggered reveal helper
├── layouts/        MainLayout — shared page chrome (Navbar + Footer)
└── styles/         Shared CSS (typography, animation keyframes)
```

## Notes

- Reduced motion is respected via `prefers-reduced-motion`.
- The Recommendations section intentionally ships with an empty state rather than fake testimonials — see `src/data/recommendations.js`.
