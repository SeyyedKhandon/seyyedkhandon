import { applyChoice, loadChoice, saveChoice, type ThemeChoice } from './preference.ts';
import { themeIds, themes } from './themes.ts';

const options: { choice: ThemeChoice; label: string; title?: string }[] = [
  { choice: 'system', label: 'Auto', title: "Follow the device's light or dark setting" },
  ...themeIds.map((id) => ({ choice: id, label: themes[id].label })),
];

/** Fills the theme switch with one button per theme, plus "Auto". */
export function initThemeSwitcher(container: HTMLElement): void {
  const buttons = options.map(({ choice, label, title }) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    if (title) button.title = title;
    button.addEventListener('click', () => {
      select(choice);
      saveChoice(choice);
    });
    return { choice, button };
  });

  function select(choice: ThemeChoice): void {
    applyChoice(choice);
    buttons.forEach((b) => b.button.setAttribute('aria-pressed', String(b.choice === choice)));
  }

  container.append(...buttons.map((b) => b.button));
  select(loadChoice());
}
