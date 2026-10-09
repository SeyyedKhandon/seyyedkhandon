import { topics } from '../content.ts';
import { esc, type Panel } from '../svg.ts';

export const work: Panel = {
  name: 'work',
  title: `Professional work: ${topics.map((t) => t.name).join(', ')}.`,
  height: 570,
  body: () => `
<style>
.topic { display: grid; gap: 6px; align-content: start; padding: 20px; }
.ico { width: 40px; height: 40px; border-radius: 12px; display: grid; place-items: center; margin-bottom: 4px; }
.ico svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.text { color: var(--muted); font-size: 13px; line-height: 1.5; }
.tags { margin-top: 6px; }
</style>
<p class="eyebrow">Professional work</p>
<h2>What I have built with teams</h2>
<p class="sub">Over ten years in web products, from trading and messaging to security and developer tools.</p>
<div class="grid cols3">
${topics
  .map(
    (t, i) => `<div class="card topic rise" style="--i:${i}">
  <span class="ico ${t.tone}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${t.icon}</svg></span>
  <h3>${esc(t.name)}</h3><p class="text">${esc(t.text)}</p>
  <div class="tags">${t.tags.map((tag) => `<span>${esc(tag)}</span>`).join('')}</div>
</div>`,
  )
  .join('\n')}
</div>`,
};
