# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally (confirmed):

- Small-business owners and founders, in India and abroad, who need a website, web application, API integration, or AI/automation and judge a freelancer by finished, working work.
- Agencies and studios that subcontract frontend, motion, or Python/AI work and judge craft, reliability, and technical range.

Both arrive cold, scan the work, and decide whether to start a conversation.

## Product Purpose

The personal freelance portfolio of Barathkumar, a full-stack Python and AI developer. It exists to turn a visitor into an enquiry. Success is a sent enquiry form (confirmed as the primary action); WhatsApp and email are secondary routes.

## Positioning

One person who builds both the cinematic, motion-heavy frontend and the Python/AI backend behind it: the live projects demonstrate GSAP/Three.js storytelling, while the services cover FastAPI/Flask APIs, RAG, LangGraph, n8n automation, and data pipelines.

## Operating Context

Visitors reach the site from a shared link (WhatsApp, GitHub, a proposal) on phones and laptops. They open live project links in new tabs and compare against other freelancers. Enquiries go through Web3Forms (`VITE_WEB3FORMS_KEY`); without a key the form opens a pre-filled email.

## Capabilities and Constraints

- Stack: React 19 + Vite 8, GSAP + ScrollTrigger, Lenis, plain CSS per section, oxlint. Deployed on Vercel (SPA rewrite).
- Sections and anchors that must keep working: `#top`, `#about`, `#technology`, `#work`, `#services`, `#contact`. Primary nav labels: Work, Services, About, Contact.
- Process and Principles are folded into Services and About respectively (confirmed); their copy is kept.
- Project order stays as in `src/data/projects.js` (confirmed).

## Brand Commitments

- Name and wordmark: BARATHKUMAR.
- Visual direction pinned by the owner's brief: an anime-inspired fantasy universe (cinematic landscapes, floating architecture, atmospheric depth, an abstract digital entity, luminous particles), editorial typography, and violet, blue, magenta, and midnight-black tones, told through cinematic scroll storytelling.

## Evidence on Hand

- Five shipped projects with live URLs and source repositories: STUDDS, MANO Residences, BMW E30 M3, Hong Zao, Drishti Opticians (`src/data/projects.js`, screenshots in `public/`). All five were designed and developed solo by Barathkumar (confirmed). Drishti Opticians is client work; the other four are self-initiated concept builds (confirmed).
- Earlier Python/ML repositories on github.com/barath220904 (sentiment analysis, house-price prediction, virtual mouse, chatbot, image converter), listed as secondary evidence without their unverified percentage claims.
- Contact: barathfreelancing@gmail.com, WhatsApp +91 81482 90307, github.com/barathfreelancing (the freelance account holding every showcased project; confirmed as the public GitHub link).
- Confirmed commitment: a reply within 24 hours of an enquiry.
- Absent, and not to be fabricated: testimonials, client logos, metrics, years of experience, pricing beyond the enquiry form's budget ranges.

## Product Principles

1. Real work is the proof; spectacle frames it and never replaces it.
2. Every route to contact works on the first try, on any device.
3. Plain, specific language about what gets built; no invented claims.
4. The experience degrades gracefully: reduced motion, no WebGL, slow phones.

## Accessibility & Inclusion

WCAG AA contrast, full keyboard navigation (including the mobile menu's focus trap), visible focus, and a complete `prefers-reduced-motion` experience.
