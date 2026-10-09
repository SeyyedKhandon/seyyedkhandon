import { packs, stats } from '../content.ts';
import { image, type Panel } from '../svg.ts';
import { heading } from './heading.ts';

export const packsHeading = heading(
  'vscode-head',
  'VS Code extensions',
  `Seven extensions, <span class="grad">${stats[0].value} installs</span>`,
  'Opinionated packs that turn a fresh VS Code into a productive setup in one click. Bars show installs relative to FiraCode.',
  `Seven VS Code extensions with ${stats[0].value} installs.`,
  98,
);

const rowStyles = `
<style>
.pack { display: grid; grid-template-columns: 44px minmax(0, 1.2fr) minmax(0, 1fr); align-items: center; gap: 16px; padding: 10px 16px; border-radius: 16px; }
.pack img { width: 44px; height: 44px; border-radius: 12px; object-fit: cover; display: block; }
.pack p { color: var(--muted); font-size: 13px; }
.count { font-weight: 800; font-size: 18px; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 5px; }
.bar { height: 7px; border-radius: 7px; background: var(--surface-2); overflow: hidden; }
.bar i { display: block; height: 100%; min-width: 6px; border-radius: 7px; background: linear-gradient(90deg, var(--blue), var(--green)); transform-origin: left; animation: grow 900ms cubic-bezier(0.2, 0.7, 0.2, 1) both; animation-delay: calc(var(--i) * 90ms + 200ms); }
</style>`;

export const packRows: Panel[] = packs.map((p, i) => ({
  name: `vscode-${p.name.toLowerCase()}`,
  title: `${p.name}, ${p.count} installs: ${p.text} Open it on the VS Code Marketplace.`,
  height: 76,
  body: () => `${rowStyles}
<div class="card pack rise" style="--i:${i}">
  ${image(p.image)}
  <div><h3>${p.name}</h3><p>${p.text}</p></div>
  <div><div class="count">${p.count}</div><div class="bar"><i style="--i:${i}; width:${p.width}%"></i></div></div>
</div>`,
}));
