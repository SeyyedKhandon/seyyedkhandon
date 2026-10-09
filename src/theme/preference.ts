import { themeIds, type ThemeId } from './themes.ts';

/** "system" follows the device; anything else pins one theme. */
export type ThemeChoice = ThemeId | 'system';

export const STORAGE_KEY = 'skh_theme';

const isThemeId = (value: unknown): value is ThemeId => themeIds.includes(value as ThemeId);

/** Storage can be blocked (private mode, strict settings); the device's setting decides then. */
export function loadChoice(): ThemeChoice {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isThemeId(saved) ? saved : 'system';
  } catch {
    return 'system';
  }
}

export function saveChoice(choice: ThemeChoice): void {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // blocked storage: the choice lasts until the page is closed
  }
}

export function applyChoice(choice: ThemeChoice): void {
  const root = document.documentElement;
  if (choice === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', choice);
}
