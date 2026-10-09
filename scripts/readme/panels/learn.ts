import { learn } from '../content.ts';
import { esc, image, type Panel } from '../svg.ts';

export const learnPanel: Panel = {
  name: 'learn',
  title: `Books, tutorials and mentoring: ${learn.map((b) => b.name).join(', ')}, and mentoring on ADPList.`,
  height: 650,
  body: () => `
<style>
.book { display: grid; gap: 6px; align-content: start; }
.cover { height: 190px; border-radius: 12px; background: var(--surface-2); margin-bottom: 8px; overflow: hidden; position: relative; }
.cover img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; padding: 8px; }
.cover img.wide { object-fit: cover; padding: 0; }
.video { display: grid; place-items: center; background: linear-gradient(135deg, var(--blue-bg), var(--purple-bg)); text-align: center; }
.video b { font-size: 26px; letter-spacing: -0.03em; line-height: 1.1; margin-top: 46px; display: block; }
.video small { color: var(--muted); font-weight: 600; font-size: 14px; }
.play { position: absolute; top: 34px; left: 50%; width: 48px; height: 48px; margin-left: -24px; border-radius: 50%; background: var(--accent); }
.play::after { content: ''; position: absolute; left: 19px; top: 14px; border-style: solid; border-width: 10px 0 10px 16px; border-color: transparent transparent transparent var(--on-accent); }
.text { color: var(--muted); font-size: 13.5px; line-height: 1.5; }
.mentor { margin-top: 14px; padding: 22px 26px; }
.mentor .eyebrow { margin-bottom: 4px; }
</style>
<p class="eyebrow">Books, tutorials &amp; mentoring</p>
<h2>Things I wrote down so you do not have to learn them the hard way</h2>
<p class="sub">Books on growing as an engineer, video courses, and one-to-one mentoring.</p>
<div class="grid cols3">
${learn
  .map(
    (b, i) => `<div class="card book rise" style="--i:${i}">
  ${b.image ? `<div class="cover">${image(b.image, b.name).replace('<img', i === 1 ? '<img class="wide"' : '<img')}</div>` : `<div class="cover video"><span class="play"></span><div><b>Webpack 4</b><small>the Right Way</small></div></div>`}
  <h3>${esc(b.name)}</h3><p class="meta">${esc(b.meta)}</p><p class="text">${esc(b.text)}</p>
</div>`,
  )
  .join('\n')}
</div>
<div class="card mentor rise" style="--i:3">
  <p class="eyebrow">Mentoring</p>
  <h3 style="font-size:19px">Want to talk about your career, a team, or a hard technical decision?</h3>
  <p class="text" style="margin-top:6px">I mentor engineers on ADPList: growing into a lead, working with a team, or shaping a product.</p>
</div>`,
};
