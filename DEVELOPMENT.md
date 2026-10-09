# Development

TypeScript and plain CSS, built with [Vite](https://vite.dev). No framework, no tracking, no external requests (the Inter font is bundled).

## Scripts

| Command | What it does |
| --- | --- |
| `npm install` | Install the dependencies |
| `npm run dev` | Start the dev server |
| `npm run typecheck` | Check the types |
| `npm run build` | Type-check and build the site into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run readme` | Regenerate the profile README panels in `profile/` |
| `npm run readme:live` | Refetch the GitHub numbers for the activity panel (needs `GITHUB_TOKEN`) |

## Project structure

```
index.html            The page content
public/               Served as-is: favicon and images under assets/
src/
  main.ts             Entry point
  styles/             CSS split by section, imported in order from index.css
  theme/
    types.ts          The Palette type: every colour a theme must define
    palettes/         One file per theme (light.ts, dark.ts)
    themes.ts         The registry of themes
    css.ts            Turns the palettes into CSS variables
    preference.ts     Saves and applies the visitor's choice
    switcher.ts       Builds the theme switch in the header
    prePaint.ts       Tiny head script so the first paint is already themed
  features/           Scroll effects: reveal.ts, scrollSpy.ts
scripts/readme/       Generates the profile README panels (see below)
profile/              The generated panels, light and dark (SVG)
.github/workflows/    Daily refresh of the activity panel
vite.config.ts        Inlines the theme CSS into the page head at build time
```

## Themes

Colours live only in `src/theme/palettes/`; the stylesheets read them as variables such as `var(--surface)`. The `Palette` type makes TypeScript complain when a theme misses a colour.

To add a theme:

1. Copy `src/theme/palettes/dark.ts` to a new file and change the values.
2. Add it to `themes` in `src/theme/themes.ts`.

The theme switch and the CSS pick it up from there. "Auto" follows the device and maps to the themes listed in `systemThemes`.

To add a colour, add it to `Palette` and to every palette file, then use it as `var(--your-colour)` (camelCase becomes kebab-case, `surface2` becomes `--surface-2`).

## Profile README

GitHub strips CSS and scripts from a README, but not from an SVG shown as an image. `readme.md` is assembled from SVG tiles: HTML and CSS inside `<foreignObject>`, with the font and images embedded, written once per theme so `<picture>` can match GitHub's light or dark mode. The tiles reuse the palettes in `src/theme/palettes/`.

- `scripts/readme/content.ts` holds the text, numbers and link targets. Keep it in step with `index.html`.
- `scripts/readme/panels/` has the tiles; `svg.ts` has the shared styles and the wrapper.
- `npm run readme` rewrites the tiles in `profile/` and generates `readme.md`, so edit `scripts/readme/build.ts` rather than the README.
- `npm run readme:live` fetches the numbers for the stats tile; run it locally with `GITHUB_TOKEN=$(gh auth token) npm run readme:live`.
- `.github/workflows/profile.yml` runs `readme:live` every day and commits the refreshed stats.
- A link can't live inside an SVG image, so every tile is its own image wrapped in a link in `readme.md`.

## Updating the content

The text, links and VS Code install counts are written in `index.html`. The `--w` value of each bar is the count divided by FiraCode's, as a percentage.

## Deploying

`netlify.toml` tells Netlify to run `npm run build` and publish `dist/`. The built site is also committed in `dist/`, so it can be uploaded to any static host as-is, or opened straight from disk by double-clicking `dist/index.html` (the build uses relative paths and a plain deferred script for that). Run `npm run build` and commit `dist/` after changing the site.

## Credits

- Inter font, SIL Open Font License 1.1 (`public/assets/fonts/`).
- Product screenshots and icons come from the products' own repositories.
