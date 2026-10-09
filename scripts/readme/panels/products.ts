import { chromeExtensions, otherTools, type Product } from '../content.ts';
import { esc, image, type Panel } from '../svg.ts';

const card = (p: Product, i: number) => `
<div class="card product rise" style="--i:${i}">
  <div class="shot">${image(p.image, p.name, p.position)}</div>
  <div class="body">
    <div class="head">${p.icon ? image(p.icon) : ''}<div><h3>${esc(p.name)}</h3><p class="meta">${esc(p.meta)}</p></div></div>
    <p class="text">${esc(p.text)}</p>
  </div>
</div>`;

export const products: Panel = {
  name: 'products',
  title: `Chrome extensions (${chromeExtensions.map((p) => p.name).join(', ')}) and other tools (${otherTools.map((p) => p.name).join(', ')}).`,
  height: 790,
  body: () => `
<style>
.product { padding: 0; overflow: hidden; }
.shot { height: 150px; background: var(--surface-2); border-bottom: 1px solid var(--border); overflow: hidden; }
.shot img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
.body { padding: 14px 18px 18px; display: grid; gap: 8px; }
.head { display: flex; align-items: center; gap: 12px; }
.head img { width: 38px; height: 38px; border-radius: 10px; }
.text { color: var(--muted); font-size: 13.5px; line-height: 1.5; }
.gap { height: 22px; }
</style>
<p class="eyebrow">Chrome extensions</p>
<h2>Small helpers for everyday browsing</h2>
<p class="sub">Each one does a single job, well.</p>
<div class="grid cols2">${chromeExtensions.map((p, i) => card(p, i)).join('')}</div>
<div class="gap"></div>
<p class="eyebrow">Other tools</p>
<h2>Built to understand how things work</h2>
<p class="sub">Open-source experiments in networking and blockchain.</p>
<div class="grid cols2">${otherTools.map((p, i) => card(p, i + 2)).join('')}</div>`,
};
