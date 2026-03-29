# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio website for conductor Rira Kim. Static single-page site (plain HTML/CSS/JS, no build tools or frameworks). Hosted on GitHub Pages at **rirakim.com** (custom domain via CNAME). Repository: `lilac-onductor/Rira-Personal-Website`.

## Deployment

Pushes to `main` auto-deploy via GitHub Actions (`.github/workflows/deploy.yml`). No build step — the entire repo root is uploaded as-is to GitHub Pages.

To preview locally, open `index.html` in a browser or use any static server (e.g., `python3 -m http.server`).

## Architecture

- **`index.html`** — Single-page layout with all content: hero, biography, media (featured video + YouTube embeds + press), gallery, contact. Content is duplicated in three languages within the HTML.
- **`css/style.css`** — All styling. Uses CSS custom properties (`:root` vars) for theming. BEM-style class naming (`nav__link`, `hero__content`, etc.). Responsive via media queries.
- **`js/main.js`** — Client-side interactivity: trilingual language switcher (DE/EN/KO), mobile hamburger menu, transparent-to-solid nav on scroll, IntersectionObserver for section highlighting and fade-in animations, gallery lightbox.

## Trilingual System

The site supports German (default), English, and Korean. Two mechanisms work together:

1. **`data-i18n` attributes** on elements whose text content is swapped via the `i18n` object in `main.js` (navigation labels, section titles).
2. **`lang` attributes** on content blocks (`<div lang="en">`, `<div lang="de">`, `<div lang="ko">`) — CSS rules show/hide the correct block based on `html[data-lang]`. Biography text, press quotes, and featured video titles use this approach.

When adding new translatable content, use `lang` attributes for long-form content and `data-i18n` for short UI strings (adding the key to the `i18n` object in `main.js`).

## Images

All images are pre-optimized JPEGs in `images/`. Subdirectories: `hero/` (two sizes: 1200 and 2400), `bio/`, `gallery/` (full-size 1200 + thumb 400 variants). No image build pipeline — optimize manually before committing.
