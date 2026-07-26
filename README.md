# att-landing

Landing page for the excursion **«Тысячелетний Брест и Брестская крепость»** (Ekskursii.by) — markup test assignment for ATT.

One-page layout: header, hero, schedule with search form, reviews slider, footer. Built from the Figma mockup with responsive breakpoints (mobile / tablet / desktop from 1024px).

**Live:** https://att-landing-gray.vercel.app/

## Stack

- HTML5 (semantic markup, BEM)
- SCSS + design tokens
- Vanilla JavaScript (ES modules)
- Vite
- [Air Datepicker](https://air-datepicker.com/) — only third-party UI library (calendar)

## Structure

```
src/
  sections/     # header, hero, schedule, reviews, footer
  styles/       # tokens, base, shared components
  js/           # burger, dropdown, calendar, schedule-form, reviews-slider
  assets/
    images/     # hero + avatar (jpg/webp)
    fonts/      # Montserrat woff2
public/         # icons sprite, logos, favicon
```

Sections are HTML partials assembled by Vite. Styles load from `index.html`; interactivity lives in small native JS modules.

## Approved deviations

- **Font:** Montserrat instead of Poppins — approved (web Poppins lacks Cyrillic; Montserrat is the closest available match).
- **Language dropdown (РУС / ENG):** UI as in the mockup. Full page translate (my-portfolio CSS dual-lang pattern) — **next phase**, not in this commit.
- **Currency dropdown (BYN / RUB / EUR):** UI only until currency conversion is implemented in the next phase.
- **Accent contrast:** Figma gold `#f2b124` kept 1:1 for buttons, header controls, review city, etc. Lighthouse may flag WCAG contrast; pixel match to the mockup takes priority for this assignment.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Quality checks

Checked against:

1. **Lighthouse Desktop** + **Lighthouse Mobile**
2. **[W3C Markup Validator](https://validator.w3.org/nu/)** (Nu Html Checker)

### Done this iteration

- **SEO:** `<meta name="description">` in `src/index.html`
- **Media:** hero and review avatars via `<picture>` — WebP (`source`) + JPG fallback (`img`); files in `src/assets/images/`
- **Accessibility (non-visual):** reviews slides without invalid `role="group"`; review author as `<h3>`; hit-area tweaks where layout allows
- **Picture CSS:** BEM classes (`hero__picture`, `review-card__picture`) with `display: contents` — no global tag styles for `picture`
- **W3C:** void elements without trailing `/` (`meta`, `img`, `input`, `source`, `hr`, …)
- **SCSS:** section/component styles nested with BEM `&` (header, hero, schedule, reviews, footer, button, dropdown)
- **A11y utility:** `.visually-hidden` uses `clip-path: inset(50%)` (not deprecated `clip`)
- **CSS Validator:** 0 errors; keep optional `-webkit-text-size-adjust` for iOS (validator warning OK)

### Intentionally not changed for pixel match

- Accent / button / header / city colors — stay as in Figma (`#f2b124`)
- No `robots.txt` — not required for this static landing
- Language dropdown does not translate the page yet — next: i18n + currency (see PROJECT-AUDIT §0 / my-portfolio pattern)

### Mobile

![Lighthouse Mobile](./docs/lighthouse-mobile.png)

### Desktop

![Lighthouse Desktop](./docs/lighthouse-desktop.png)
