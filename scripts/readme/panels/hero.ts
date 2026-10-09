import { asciiLogo } from '../ascii-logo.ts';
import { stats } from '../content.ts';
import type { Panel } from '../svg.ts';

const LEAD = 'Software engineer in Berlin, building since 2011.';

const logo = asciiLogo
  .map((line, i) => {
    const mix = Math.round((i / (asciiLogo.length - 1)) * 100);
    return `<div class="rise" style="--i:${i + 4}; color: color-mix(in srgb, var(--green) ${mix}%, var(--blue))">${line.replace(/ /g, '&#160;')}</div>`;
  })
  .join('');

export const hero: Panel = {
  name: 'hero',
  title: 'Seyyed Mahdi Hassanpour: practical tools people actually use. Software engineer in Berlin, building since 2011.',
  height: 270,
  body: () => `
<style>
.hero { display: grid; grid-template-columns: minmax(0, 1fr) 330px; gap: 28px; align-items: center; padding: 18px 8px; }
h1 { font-size: 50px; line-height: 1.03; letter-spacing: -0.035em; font-weight: 800; margin: 14px 0; }
.type { display: block; width: ${LEAD.length}ch; overflow: hidden; white-space: nowrap; font-size: 14px; color: var(--muted); border-right: 2px solid var(--accent); animation: typing 2s steps(${LEAD.length}) 600ms both, blink 900ms step-end 2.6s infinite; }
@keyframes typing { from { width: 0; } }
.stats { display: grid; grid-template-columns: repeat(4, auto); justify-content: start; gap: 6px 28px; margin-top: 26px; }
.stats b { display: block; font-size: 26px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; }
.stats span { color: var(--muted); font-size: 12.5px; }
.ascii { font-size: 7.4px; line-height: 1.02; white-space: nowrap; padding: 14px 10px; border-radius: 22px; }
</style>
<div class="hero">
  <div>
    <p class="prompt mono rise"><b>seyyed@berlin</b> ~ $ whoami</p>
    <h1 class="rise" style="--i:1">Practical tools<br/><span class="grad">people actually use.</span></h1>
    <p class="type mono">${LEAD}</p>
    <div class="stats">${stats.map((s, i) => `<div class="rise" style="--i:${i + 6}"><b>${s.value}</b><span>${s.label.replace('&', '&amp;')}</span></div>`).join('')}</div>
  </div>
  <div class="card ascii mono" aria-hidden="true">${logo}</div>
</div>`,
};
