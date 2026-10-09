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

/**
 * Lets dist/index.html open straight from disk (file://): browsers refuse module scripts and
 * CORS-flagged stylesheets there, so the build uses a plain deferred script and no crossorigin.
 */
function openFromDisk(): Plugin {
  return {
    name: 'open-from-disk',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler: (html) => html.replace('<script type="module" crossorigin', '<script defer').replace('<link rel="stylesheet" crossorigin', '<link rel="stylesheet"'),
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [inlineTheme(), openFromDisk()],
});
