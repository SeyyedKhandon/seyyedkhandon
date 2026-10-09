import { systemThemes, themeIds, themes } from './themes.ts';
import type { Theme } from './types.ts';

const toVarName = (key: string) => `--${key.replace(/[A-Z0-9]/g, (c) => `-${c.toLowerCase()}`)}`;

export const declarations = ({ palette, scheme }: Theme) =>
  [...Object.entries(palette).map(([key, value]) => `${toVarName(key)}: ${value};`), `color-scheme: ${scheme};`].join(' ');

/**
 * Builds the CSS variables for every theme:
 *  - the system's light theme by default,
 *  - the system's dark theme when the device prefers dark and nothing is pinned,
 *  - one `[data-theme]` block per theme for when the visitor pins it.
 */
export function buildThemeCss(): string {
  const pinned = themeIds.map((id) => `:root[data-theme="${id}"] { ${declarations(themes[id])} }`);
  return [
    `:root { ${declarations(themes[systemThemes.light])} }`,
    `@media (prefers-color-scheme: dark) { :root:not([data-theme]) { ${declarations(themes[systemThemes.dark])} } }`,
    ...pinned,
  ].join('\n');
}
