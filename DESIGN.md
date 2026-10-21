---
name: Barathkumar Portfolio
description: One continuous anime sky, dusk to first light, carrying a full-stack Python & AI developer's work.
colors:
  night: "#07060f"
  night-panel: "#0d0b1c"
  night-raised: "#15122a"
  starlight: "#f4f0ff"
  starlight-dim: "#cdc6e8"
  starlight-faint: "#a59dc9"
  aurora-violet: "#8b6cff"
  aurora-blue: "#4f7bff"
  signal-magenta: "#ff4fb8"
  signal-magenta-hi: "#ff7ccc"
  on-signal: "#14051a"
  error-rose: "#ff9db0"
  success-mint: "#9ff0c4"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(3.4rem, 10.5vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 62"
  headline:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.9rem, 7.4vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.88
    fontVariation: "'wdth' 62"
  title:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.4vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 0.88
    fontVariation: "'wdth' 62"
  statement:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 3.3vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.06em"
    fontVariation: "'wdth' 125"
rounded:
  none: "0px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "24px"
  "6": "32px"
  "7": "48px"
  "8": "64px"
  "9": "96px"
  section: "clamp(96px, 14vw, 192px)"
components:
  button-primary:
    backgroundColor: "{colors.signal-magenta}"
    textColor: "{colors.on-signal}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.signal-magenta-hi}"
  button-ghost:
    backgroundColor: "rgba(7, 6, 15, 0.42)"
    textColor: "{colors.starlight}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-small:
    padding: "0 16px"
    height: "40px"
  input:
    backgroundColor: "{colors.night}"
    textColor: "{colors.starlight}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
    height: "48px"
  panel:
    backgroundColor: "rgba(10, 8, 22, 0.75)"
    rounded: "{rounded.none}"
    padding: "clamp(20px, 3vw, 36px)"
---

# Design System: Barathkumar Portfolio

## Overview

**Creative North Star: "The Sky Between Chapters"**

The page is not a dark website with a hero image; it is one live sky (WebGL, `src/world/`) that the reader travels through. Each section is a chapter with its own time of day: dusk over a floating city, twilight, night among distant islands, deep night for the work, aurora for services, first light above a cloud sea for contact. Content sits on the sky in set type and sharp-cornered panels, never in glowing cards.

The interface itself is quiet so the world can be loud: off-white type, hairline rules, square controls, and a single magenta signal for anything the visitor can act on. Typography does the editorial work through width, not through a second family: compressed heavy capitals for chapter titles, normal width for reading, expanded capitals for chrome.

**Key Characteristics:**
- One procedural sky behind everything; colour lives at page scale in the world, not in UI accents.
- One family (Archivo variable) at three widths: 62% titles, 100% reading, 125% labels.
- Magenta is the only interactive colour; violet and blue belong to the sky and secondary titles.
- All-sharp shapes (0px radius); the entity is the only round thing on the page.
- Motion is authored per chapter: title-card wipes, a scroll-lit statement, uncovering rows, a sticky stack of stills, a route that draws itself.

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

### Inputs / Fields
- **Style:** Night fill, Hairline Strong stroke, 0px radius, 48px minimum height, label above in label typography.
- **Focus:** Magenta border plus a 2px Magenta outline. **Error:** Error Rose border with the message below. The select uses a Phosphor CaretDown; the range is a 2px track filled in Magenta with a square thumb.

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
