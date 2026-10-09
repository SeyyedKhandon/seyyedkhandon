import { chromeExtensions, otherTools, type Product } from '../content.ts';
import { esc, image, type Panel } from '../svg.ts';
import { heading } from './heading.ts';

export const chromeHeading = heading(
  'chrome-head',
  'Chrome extensions',
  'Small helpers for everyday browsing',
  'Each one does a single job, well.',
  'Chrome extensions: small helpers for everyday browsing.',
);

export const toolsHeading = heading(
  'tools-head',
  'Other tools',
  'Built to understand how things work',
  'Open-source experiments in networking and blockchain.',
  'Other tools: open-source experiments in networking and blockchain.',
);

const styles = `
<style>
.product { padding: 0; overflow: hidden; }
.shot { height: 150px; background: var(--surface-2); border-bottom: 1px solid var(--border); overflow: hidden; }
.shot img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
.body { padding: 14px 18px 18px; display: grid; gap: 8px; }
.head { display: flex; align-items: center; gap: 12px; }
.head img { width: 38px; height: 38px; border-radius: 10px; }
.text { color: var(--muted); font-size: 13.5px; line-height: 1.5; }
</style>`;

const tile = (p: Product, name: string, i: number): Panel => ({
  name,
  title: `${p.name}, ${p.meta}. ${p.text}`,
  width: 442,
  height: 300,
  body: () => `${styles}
<div class="card product rise" style="--i:${i}">
  <div class="shot">${image(p.image, p.name, p.position)}</div>
  <div class="body">
    <div class="head">${p.icon ? image(p.icon) : ''}<div><h3>${esc(p.name)}</h3><p class="meta">${esc(p.meta)}</p></div></div>
    <p class="text">${esc(p.text)}</p>
  </div>
</div>`,
});

export const chromeTiles = chromeExtensions.map((p, i) => tile(p, `chrome-${i}`, i));
export const toolTiles = otherTools.map((p, i) => tile(p, `tool-${i}`, i));

export const softpedia: Panel = {
  name: 'softpedia',
  title: 'Older Windows utilities and experiments are on Softpedia.',
  height: 36,
  body: () =>
    `<style>.line { padding-top: 6px; font-weight: 600; color: var(--muted); } .line b { color: var(--link); }</style><p class="line">Older Windows utilities and experiments are on <b>Softpedia &#8594;</b></p>`,
};
