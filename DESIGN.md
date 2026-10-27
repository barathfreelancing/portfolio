---
name: Barathkumar Portfolio
description: A type-led freelancer portfolio in paper, charcoal and one cobalt, where colour fields do the work pictures would and the real project screenshots carry the proof.
colors:
  bg: "#f3f3f0"
  surface: "#ffffff"
  surface-2: "#e7e6e1"
  ink: "#141414"
  ink-2: "#3f3e3a"
  ink-3: "#64635d"
  line: "#d9d8d2"
  accent: "#2649e8"
  accent-hover: "#1c38c2"
  accent-soft: "#dce3fc"
  accent-mid: "#bccbfa"
  on-accent: "#ffffff"
  on-accent-2: "#d9e0fd"
  dark: "#141518"
  dark-2: "#1c1d21"
  dark-3: "#2a2b30"
  on-dark: "#f3f3f0"
  on-dark-2: "#b9b8b2"
  link-on-dark: "#9fb2ff"
typography:
  family: "Archivo Variable (self-hosted, wdth 62-125)"
  display: "780, clamp(3.5rem, 9.5vw, 8.5rem), 0.88, -0.04em, wdth 88%"
  heading: "720, clamp(2.25rem, 4.4vw, 4rem), 0.98, -0.035em, wdth 88%"
  subheading: "680, clamp(1.625rem, 2.5vw, 2.25rem), 1.08, -0.025em, wdth 88%"
  lead: "400, clamp(1.25rem, 1.8vw, 1.625rem), 1.35"
  body: "400, 1.0625rem, 1.55"
  small: "0.875rem, 1.5"
rounded:
  all: "0px (square everywhere; only the status dot and coupon notches are round)"
---

# Design System: Barathkumar Portfolio

## Direction

Taste direction **type-only-statement** (seed 1986015355), with the owner's palette and typeface kept. The first screen is words, colour and space only; the five real project screenshots arrive later, large. Colour does the work imagery would: cobalt is both the action colour and a whole field in three places (hero lower half, process, footer).

Each section is its own composition; no two neighbours share a layout:

| Section | Blueprint | Ground |
| --- | --- | --- |
| Hero | Headline across two fields | paper above a seam, cobalt below |
| Services | Statement cell (sticky) + dark rows | pale / charcoal |
| Work | Names as one paragraph, then project rows | paper |
| Process | Itinerary on a slip | white slip on cobalt |
| About | Two columns, highlighted words + toolkit table | white |
| Contact | Clip-out coupon form | dark coupon on paper |
| Footer | Contact as the headline | cobalt |

## Rules

- **One accent.** Cobalt marks the action (buttons, case-study toggle) or fills a whole field. On cobalt, the action inverts to a white button with cobalt text. On dark grounds, links use `#9fb2ff`.
- **Tone steps, not lines.** Surfaces are separated by a change of ground. Lines exist only in the toolkit table and form controls. No resting shadows.
- **Square corners.** Buttons, inputs, media and panels are all square.
- **No eyebrows, no tiny tracked capitals, no decorative numbering.** The 01–04 in the process slip stays because order is the information there (and the owner asked for it).
- **Headlines on two lines or fewer.** The one exception is the owner's exact contact headline, which takes three lines on phones.
- **Screenshots sit on a pale mat** (`surface-2`) with no frame or shadow, cropped from the top (`object-position: center bottom`) to hide captured browser chrome.

## Components

- **Header:** sticky; takes the ground of the chapter beneath its middle line (`data-tone` on sections: paper, pale, white, dark, cobalt), easing over 300ms. Under 960px, a "Menu" text toggle opens a full-screen paper menu with a focus trap.
- **Hero headline:** set twice, each copy clipped at 67% of its height so the seam cuts line two; above the seam in charcoal, below in white.
- **Service row:** title, related projects, "Discuss …" link (preselects the form's project type), the client problem, a plain list of deliverables. Rows alternate `dark` / `dark-2`.
- **Work index:** "Selected work:" followed by every project name, each trailed by a small screenshot frame; hovering a name scales its frame to 1.6.
- **Project row:** large screenshot on a mat (links to the live site) beside title, category, description, a white panel with Problem / My role / Built with, then Live demo (charcoal button), Source code, Read case study. Rows alternate sides and mirror their column widths.
- **Case study:** expands under the row (`grid-template-rows` 0fr→1fr, 300ms open, 200ms close) into Overview, Problem, Approach, Implementation, Technology stack, Outcome, Links. Closed panels are `inert` and hidden.
- **Slip:** white receipt with a zigzag bottom edge (`clip-path`), dotted leaders between what happens and what you hold, and an inverted closing row.
- **Coupon:** dark card with notches and a dotted perforation; stub holds contact methods, availability and live time; the slip holds the form with filled fields, a 2px inner focus ring, and a full-width cobalt submit bar.
- **Live time:** the owner's current time in India, updated every 30s, beside the availability note (hero, coupon, footer).

## Motion (Emil Kowalski's rules)

- **Signature:** on load the paper retreats upward (cobalt rises) while both headline clips travel with the seam; 1100ms `--ease-in-out` (cubic-bezier(0.77, 0, 0.175, 1)), all three in step. The hero body then rises 16px, staggered 80ms.
- **Colour by chapter:** header background and ink transition 300ms `ease`.
- **Section entrances:** heading, then text, then picture, staggered 70ms, rising 24px over 800ms `--ease-out` (cubic-bezier(0.23, 1, 0.32, 1)). Screenshots uncover top-down with `clip-path` over 1000ms.
- **Feedback:** buttons scale to 0.97 on press (160ms); arrows nudge 2–3px; screenshots zoom to 1.03 on hover. All hover effects gated to `(hover: hover) and (pointer: fine)`.
- **Reduced motion:** no travel, clips or smooth scrolling; content still fades in over 300ms.

## Don'ts

- No anime, mascots, illustrations, neon, glow, gradients or glass.
- No rounded corners, no pill buttons, no resting shadows.
- No invented testimonials, logos, metrics or client claims.
- No scroll hijacking or cursor effects.
