import { STORAGE_KEY } from './preference.ts';
import { themeIds } from './themes.ts';

/**
 * A tiny script for the page head. It runs before the first paint, so a pinned theme
 * never flashes the other one, and it switches on the styles that need JavaScript.
 */
export function buildPrePaintScript(): string {
  return `(function(){var r=document.documentElement;r.classList.add('js');try{var t=localStorage.getItem(${JSON.stringify(
    STORAGE_KEY,
  )});if(${JSON.stringify(themeIds)}.indexOf(t)>-1)r.setAttribute('data-theme',t)}catch(e){}})();`;
}
