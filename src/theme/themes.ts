import { dark } from './palettes/dark.ts';
import { light } from './palettes/light.ts';
import type { ColorScheme, Theme } from './types.ts';

/**
 * The theme registry. To add a theme, create a file in `palettes/` and list it here;
 * the stylesheet and the theme switch are built from this object.
 */
export const themes = { light, dark } satisfies Record<string, Theme>;

export type ThemeId = keyof typeof themes;

/** The theme "Auto" resolves to for each system setting. */
export const systemThemes: Record<ColorScheme, ThemeId> = { light: 'light', dark: 'dark' };

export const themeIds = Object.keys(themes) as ThemeId[];
