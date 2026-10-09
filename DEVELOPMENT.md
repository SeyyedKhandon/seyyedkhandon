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
vite.config.ts        Inlines the theme CSS into the page head at build time
```

## Themes

Colours live only in `src/theme/palettes/`; the stylesheets read them as variables such as `var(--surface)`. The `Palette` type makes TypeScript complain when a theme misses a colour.

To add a theme:

1. Copy `src/theme/palettes/dark.ts` to a new file and change the values.
2. Add it to `themes` in `src/theme/themes.ts`.

The theme switch and the CSS pick it up from there. "Auto" follows the device and maps to the themes listed in `systemThemes`.

To add a colour, add it to `Palette` and to every palette file, then use it as `var(--your-colour)` (camelCase becomes kebab-case, `surface2` becomes `--surface-2`).

## Updating the content

The text, links and VS Code install counts are written in `index.html`. The `--w` value of each bar is the count divided by FiraCode's, as a percentage.

## Deploying

`netlify.toml` tells Netlify to run `npm run build` and publish `dist/`. The built site is also committed in `dist/`, so it can be uploaded to any static host as-is. Run `npm run build` and commit `dist/` after changing the site.

## Credits

- Inter font, SIL Open Font License 1.1 (`public/assets/fonts/`).
- Product screenshots and icons come from the products' own repositories.
