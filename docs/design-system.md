# Design System — Mohammedan Sporting Club, Faridpur

## 1. Concept

A club founded in ১৯৩৬ (1936) — the design should feel like an old, respected
institution that has stayed sharp, not a generic "sports app." Reference points:
engraved club crests, ribbon/rosette badges, stadium marble, ledger typography.
The signature element is the **crest emblem**: the logo's sunburst + crescent +
star ring, redrawn as a thin gold line-art motif and reused as a section divider,
a loading/hover accent, and a background watermark — never as decoration alone,
always marking something earned (an achievement, a founding date, a president's
tenure).

## 2. Color

| Token         | Hex       | Use                                              |
|---------------|-----------|---------------------------------------------------|
| `forest-900`  | `#06211A` | Dark-mode base / footer background                 |
| `forest-800`  | `#0A3324` | Primary dark green (header, hero base)             |
| `forest-600`  | `#155839` | Primary buttons, links on light backgrounds        |
| `forest-100`  | `#CFE4D9` | Tinted section backgrounds (light mode)            |
| `gold-500`    | `#C6A02F` | Primary accent — CTAs, active nav, crest lines     |
| `gold-600`    | `#A9832A` | Gold text on cream (better contrast)               |
| `cream`       | `#FAF8F2` | Primary light-mode background                      |
| `cream-soft`  | `#F3EFE4` | Card / alt-section background                      |
| `ink`         | `#132018` | Primary text on light backgrounds                  |

Dark mode swaps `cream` ⇄ `forest-900`, `ink` ⇄ near-white, and keeps `gold-500`
as the one constant accent so the crest motif always reads the same.

## 3. Typography

- **Display** (`--font-display`): **Fraunces** — a serif with real weight
  contrast and slightly idiosyncratic curves, used at large size for H1/H2 and
  for the "১৯৩৬" founding badge. Set with `font-variation-settings` for a soft,
  slightly condensed optical size at hero scale — reads as engraved, not corporate.
- **Body** (`--font-body`): **Inter** — neutral, highly legible at small sizes,
  used for paragraphs, nav, forms, tables (admin).
- **Bengali display** (`--font-display-bn`): **Tiro Bangla** — a Bengali serif
  with a comparable editorial/engraved quality to Fraunces, used for বাংলা
  headings so both languages feel like the same design, not a translated
  afterthought.
- **Bengali body** (`--font-body-bn`): **Hind Siliguri** — clean, high
  legibility Bengali sans for body copy and UI chrome.

Type scale (desktop): H1 `clamp(2.5rem, 5vw, 4.25rem)`, H2 `2.5rem`, H3
`1.75rem`, body `1rem`/`1.125rem`, caption `0.8125rem` with wide letter-spacing
and uppercase for eyebrows ("প্রতিষ্ঠিত ১৯৩৬" / "ESTABLISHED 1936").

## 4. Layout

- Max content width `1280px`, generous vertical rhythm (`py-24`/`py-32` between
  sections) — the site should feel unhurried and institutional, not densely
  packed like a modern SaaS landing page.
- Hero: full-bleed dark forest gradient, centered crest watermark line-art at
  low opacity behind the headline, the real gold crest emblem small and crisp
  above the club name, established-date ribbon under the CTA row.
- Cards (committee, news, events): cream background, thin `gold-500/30` hairline
  border, no heavy shadows — a shadow only appears on hover (`shadow-gold`) as a
  small lift, echoing a medal catching light rather than a generic elevated card.
- Section dividers use a redrawn thin-line version of the crest's sunburst ring
  instead of a plain `<hr>`.

## 5. Motion (Framer Motion)

- Hero: staged reveal — crest fades/scales in first, then headline lines
  stagger up, then the CTA row and established-date ribbon.
- Scroll reveals: sections fade+translate-y once on entering viewport
  (`whileInView`, `viewport={{ once: true }}`), never re-triggering repeatedly.
- Timeline (History page): each era node draws in with a small delay keyed to
  its year, and the connecting line uses a `pathLength` draw animation.
- Respect `prefers-reduced-motion`: all transforms fall back to opacity-only.

## 6. Accessibility floor

- All interactive elements have visible focus rings in `gold-500`.
- Color contrast checked for text on both `forest-800` and `cream` backgrounds.
- Language switch preserves the current page/route (`/en/history` ⇄ `/bn/history`).
- Reduced-motion media query respected globally via a Tailwind `motion-safe:` /
  `motion-reduce:` convention in components.
