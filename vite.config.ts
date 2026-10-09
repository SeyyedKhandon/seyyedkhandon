import { defineConfig, type Plugin } from 'vite';
import { buildThemeCss } from './src/theme/css.ts';
import { buildPrePaintScript } from './src/theme/prePaint.ts';

/** Writes the theme colours into the page head, so the very first paint is already themed. */
function inlineTheme(): Plugin {
  return {
    name: 'inline-theme',
    transformIndexHtml: () => [
      { tag: 'script', children: buildPrePaintScript(), injectTo: 'head' },
      { tag: 'style', children: buildThemeCss(), injectTo: 'head' },
    ],
  };
}

export default defineConfig({
  plugins: [inlineTheme()],
});
