# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Band website for Family Vision (familyvision.band). Gatsby 4 static site that pulls tour dates and text content from Google Sheets, deployed to GitHub Pages.

## Commands

- `yarn dev` — sync data from Google Sheets + start Gatsby dev server
- `yarn build` — production build to /public
- `yarn serve` — serve production build locally
- `yarn format` — run Prettier
- `yarn clean` — clear Gatsby cache (useful when GraphQL schema changes)

No test suite is configured.

## Architecture

**Data pipeline:** Google Sheets → `sync.sh` downloads CSVs to `src/data/` (gitignored) → `gatsby-transformer-csv` exposes data as GraphQL nodes → queried via `StaticQuery` in `src/pages/index.js`.

Two sheets are synced:
- **calendar** (gid=0): date, venue, location, bands — rendered as tour dates sorted by date descending, grouped by year
- **text** (gid=407807123): text, link — rendered as contact/link section

GraphQL fragments are defined in `src/graphql-fragments/` (CalendarCSV.jsx, TextCSV.jsx).

**Single-page site:** `src/pages/index.js` contains all rendering logic. `404.js` redirects to index.

**Styling:** SCSS in `src/styles/global.scss`, imported via `gatsby-browser.js`. Responsive breakpoint mixins at 576/768/992/1200px. Fonts: Didact Gothic, Playfair Display, Roboto Mono (loaded from Google Fonts).

**Deployment:** GitHub Actions (`.github/workflows/deploy.yml`) triggers on push to main and hourly via cron. Runs `sync.sh` then builds and deploys to gh-pages branch. Requires `ACCESS_TOKEN` secret.

## Formatting

Prettier config: no semicolons, avoid parens on single arrow function params.
