import './styles/index.css';
import { initReveal } from './features/reveal.ts';
import { initScrollSpy } from './features/scrollSpy.ts';
import { initThemeSwitcher } from './theme/switcher.ts';

const themeSwitch = document.getElementById('theme-switch');
if (themeSwitch) initThemeSwitcher(themeSwitch);

initReveal();
initScrollSpy();
