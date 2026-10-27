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

<<<<<<< HEAD
## Colors

A midnight ground lit by a violet-blue sky, with magenta reserved for action.

### Primary
- **Signal Magenta** (#ff4fb8): primary buttons, the active nav underline, the process route fill and reached stops, the range thumb and fill, focus rings, caret and selection. Hover lifts to **Signal Magenta Hi** (#ff7ccc), which also colours the accent line of a title card.

### Secondary
- **Aurora Violet** (#8b6cff): secondary chapter titles ("From idea to system.") and the scrollbar thumb. Never on a control.
- **Aurora Blue** (#4f7bff): lives in the sky (aurora hem, motes, night tones); not used in UI chrome.

### Neutral
- **Night** (#07060f): page ground, inputs, the mobile menu, the footer.
- **Night Panel** (#0d0b1c): project frames; the form panel uses rgba(10, 8, 22, 0.75) so the dawn faintly shows at its edges.
- **Starlight** (#f4f0ff): headings and primary text.
- **Starlight Dim** (#cdc6e8): body copy and nav links at rest.
- **Starlight Faint** (#a59dc9): tech lists, placeholders, footer meta (7.9:1 on Night).
- **Hairline** (rgba(206, 196, 255, 0.16)) and **Hairline Strong** (rgba(206, 196, 255, 0.36)): rules, frame borders, input strokes.

### Named Rules
**The One Signal Rule.** Magenta means "you can act here". It never decorates a non-interactive surface except the accent line of a title card.

**The Sky Owns the Colour Rule.** Gradients, glows and saturated fields belong to the shader. UI elements stay flat: no gradient text, no glow borders, no coloured shadows.

## Typography

**Display Font:** Archivo Variable (self-hosted via @fontsource-variable/archivo, width axis 62–125%)
**Body Font:** the same family at normal width
**Label Font:** the same family at 125% width

**Character:** Compressed heavy capitals read like an anime title card or an episode card; the expanded capitals in the chrome read like a film's credit block. One family keeps it coherent.

### Hierarchy
- **Display** (800, clamp(3.4rem, 10.5vw, 6rem), 0.88, uppercase, 62% width): the hero title only.
- **Headline** (800, clamp(2.9rem, 7.4vw, 6rem), 0.88, uppercase, 62% width): chapter titles; service blocks use clamp(2.6rem, 5.6vw, 4.5rem).
- **Title** (800, clamp(2.1rem, 4.4vw, 3.5rem)): project titles and sub-chapter titles; small titles at clamp(1.6rem, 2.6vw, 2.1rem).
- **Statement** (500, clamp(1.6rem, 3.3vw, 2.75rem), 1.18): the About manifesto line.
- **Lead** (400, clamp(1.125rem, 1.6vw, 1.375rem), 1.5, max 34ch): one sentence under a title.
- **Body** (400, 1.0625rem, 1.65, max 62ch).
- **Label** (600, 0.75rem, 0.06em tracking, uppercase, 125% width): nav, buttons, form labels, footer links.

### Named Rules
**The Width Not Family Rule.** Hierarchy changes width and weight within Archivo. Never add a second display face or a serif for emphasis.

**The No Kicker Rule.** No small label above a heading; the title card carries its own weight.

## Layout

Container max 1320px with a fluid gutter of clamp(16px, 4vw, 48px). Sections are separated by `--section` (clamp(96px, 14vw, 192px)) top and bottom; services closes at 40% of that because the contact chapter opens immediately. The page uses a different layout family per chapter: bottom-left title card (hero), offset 12-column manifesto (about), index rows of name and items (stack), sticky stack of widescreen stills (work), a 2x2 of service blocks plus a horizontal route (services), a linked index of Python repositories (after the work), copy beside form (contact). Breakpoints: 1100px (frame body regrid), 900px wide and 620px tall (full-screen stacked stills only above both), 860px (nav collapses to the menu, the route turns vertical), 640/560/520px (fine adjustments). The hero always fits the first viewport (min-height 100dvh).

## Elevation & Depth

Depth comes from the world, not from shadows. The sky renders far and mid island layers with atmospheric haze, a cloud bank and a near city, and they parallax with the chapter camera. UI is flat: elevation is declared once, as a 1px hairline border, with no box-shadow anywhere. In the work stack, a receding still scales to 0.93 and dims under a Night overlay (up to 0.7) as the next still slides over it.

### Named Rules
**The Border Or Nothing Rule.** A surface gets a hairline or nothing. Never a border plus a soft shadow.

## Shapes

All-sharp: 0px radius on buttons, inputs, frames, panels, the range thumb and the route stops. Only the shader is curved (the entity's rings, the ring-gates, cloud billows). Icons come from Phosphor (regular weight; bold at small sizes in buttons).

## Components

### Buttons
- **Shape:** square (0px), 52px tall (40px small), label typography.
- **Primary:** Signal Magenta on On-Signal text (6.6:1). One per intent: "Hire me" (nav and hero, the hire intent everywhere) and "Send enquiry" (the form). "See the work" is the hero's ghost companion.
- **Ghost:** Starlight text, Hairline Strong border, rgba(7, 6, 15, 0.42) fill so it reads over the sky.
- **States:** hover (fine pointers only) shifts background or border over 200ms `ease`; press scales to 0.97 over 160ms `cubic-bezier(0.23, 1, 0.32, 1)`; disabled 60% opacity; the busy submit shows a linear bar sweeping along its bottom edge.

### Project still (signature)
- A widescreen frame (screenshots about 2.14:1, served with an 800w source for phones) on Night Panel with a hairline, the image cropped from the top. The body runs heading | story | meta: the compressed title and a Starlight Dim subtitle; the brief and a "What I built" list; then a factual kind label ("Client project" in Aurora Violet, "Concept build" in Starlight Faint, never above the title), the stack and the Live site / Source ghost buttons. On screens at least 900px wide and 620px tall the frames run near full-bleed (16px margins), each filling the height under the nav: the screenshot covers the card and the body is a solid Night Panel band along its bottom; frames stick and the previous one recedes (scale 0.93, dimmed) as the next slides over it. Below that the frames are a plain sequence with the image above the body.

### Hairline list marker
- Lists of facts (what I built, typical work) use a 10px x 1px Starlight Faint rule as the marker, never a dot or a glyph.
=======
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
>>>>>>> 27c7e9f (ui change)

- **Signature:** on load the paper retreats upward (cobalt rises) while both headline clips travel with the seam; 1100ms `--ease-in-out` (cubic-bezier(0.77, 0, 0.175, 1)), all three in step. The hero body then rises 16px, staggered 80ms.
- **Colour by chapter:** header background and ink transition 300ms `ease`.
- **Section entrances:** heading, then text, then picture, staggered 70ms, rising 24px over 800ms `--ease-out` (cubic-bezier(0.23, 1, 0.32, 1)). Screenshots uncover top-down with `clip-path` over 1000ms.
- **Feedback:** buttons scale to 0.97 on press (160ms); arrows nudge 2–3px; screenshots zoom to 1.03 on hover. All hover effects gated to `(hover: hover) and (pointer: fine)`.
- **Reduced motion:** no travel, clips or smooth scrolling; content still fades in over 300ms.

<<<<<<< HEAD
### Navigation
- Fixed, 68px (60px under 640px). Transparent over the hero, then Night at 0.96 with a hairline once the hero is behind. Links are label typography in Starlight Dim; the current chapter is Starlight with a 2px magenta underline that scales in from the left (200ms). Under 860px a Phosphor List/X toggle opens a full-screen Night menu of compressed titles that stagger in at 40ms.

### Service blocks
- Four always-visible blocks in a 2x2 grid (one column under 860px), each opened by a Hairline Strong top rule: compressed title, the value sentence in Starlight, a "Typical work" label in Starlight Faint, a hairline-marker list, and the tools in small Starlight Faint text. No accordion: a visitor should see every offer without clicking.

### Next steps (contact)
- A numbered list (the order is the information) of what happens after an enquiry, including the confirmed 24-hour reply. Numbers are compressed Starlight figures. Beside the email address, a small square Copy control (label typography, Hairline Strong border) copies it to the clipboard and announces "Email address copied".

## Do's and Don'ts

### Do:
- **Do** add new chapters to `src/world/states.js` when adding a section, so the sky changes with the reader.
- **Do** use `--ease-out` (cubic-bezier(0.23, 1, 0.32, 1)) for entrances and `--ease-in-out` (cubic-bezier(0.77, 0, 0.175, 1)) for on-screen movement; keep UI transitions at or under 300ms.
- **Do** gate hover effects behind `(hover: hover) and (pointer: fine)` and give every movement a reduced-motion variant that keeps opacity changes and drops transforms.
- **Do** keep the entity's resting positions out of text columns.

### Don't:
- **Don't** put coloured glows, glass blur or gradient text on UI; the sky already carries the colour.
- **Don't** round corners on controls or panels.
- **Don't** add eyebrows or kickers above headings, or number the sections.
- **Don't** use em dashes in visible copy.
=======
## Don'ts

- No anime, mascots, illustrations, neon, glow, gradients or glass.
- No rounded corners, no pill buttons, no resting shadows.
- No invented testimonials, logos, metrics or client claims.
- No scroll hijacking or cursor effects.
>>>>>>> 27c7e9f (ui change)
