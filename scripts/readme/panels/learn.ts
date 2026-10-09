import { learn } from '../content.ts';
import { esc, image, type Panel } from '../svg.ts';
import { heading } from './heading.ts';

export const learnHeading = heading(
  'learn-head',
  'Books, tutorials &amp; mentoring',
  'Things I wrote down so you do not have to learn them the hard way',
  'Books on growing as an engineer, video courses, and one-to-one mentoring.',
  'Books, tutorials and mentoring: things I wrote down so you do not have to learn them the hard way.',
  136,
);

const styles = `
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
</style>`;

export const learnTiles: Panel[] = learn.map((b, i) => ({
  name: `learn-${i}`,
  title: `${b.name}, ${b.meta}. ${b.text}`,
  width: 300,
  height: 355,
  body: () => `${styles}
<div class="card book rise" style="--i:${i}">
  ${
    b.image
      ? `<div class="cover">${image(b.image, b.name).replace('<img', i === 1 ? '<img class="wide"' : '<img')}</div>`
      : `<div class="cover video"><span class="play"></span><div><b>Webpack 4</b><small>the Right Way</small></div></div>`
  }
  <h3>${esc(b.name)}</h3><p class="meta">${esc(b.meta)}</p><p class="text">${esc(b.text)}</p>
</div>`,
}));

export const mentor: Panel = {
  name: 'mentoring',
  title: 'Mentoring: want to talk about your career, a team, or a hard technical decision? Book a session on ADPList.',
  height: 130,
  body: () => `
<style>.mentor { padding: 22px 26px; } .mentor .eyebrow { margin-bottom: 4px; } .mentor p.text { color: var(--muted); font-size: 13.5px; margin-top: 6px; }</style>
<div class="card mentor rise">
  <p class="eyebrow">Mentoring</p>
  <h3 style="font-size:19px">Want to talk about your career, a team, or a hard technical decision?</h3>
  <p class="text">I mentor engineers on ADPList: growing into a lead, working with a team, or shaping a product. Book a session →</p>
</div>`,
};
