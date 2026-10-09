import type { Panel } from '../svg.ts';

export interface Stats {
  login: string;
  repos: number;
  stars: number;
  followers: number;
  updated: string;
}

export const statsPanel = (s: Stats): Panel => ({
  name: 'stats',
  title: `GitHub: ${s.repos} public repositories, ${s.stars} stars and ${s.followers} followers for ${s.login}.`,
  height: 130,
  body: () => `
<style>
.tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 12px; }
.tile { padding: 14px 18px; border-radius: 16px; }
.tile b { display: block; font-size: 26px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.15; }
.tile span { color: var(--muted); font-size: 12.5px; }
</style>
<p class="prompt mono rise"><b>seyyed@github</b> ~ $ ./stats.sh <span style="opacity:.6"># updated ${s.updated}</span></p>
<div class="tiles">
${[
  [s.repos, 'public repositories'],
  [s.stars, 'stars earned'],
  [s.followers, 'followers'],
]
  .map(([value, label], i) => `<div class="card tile rise" style="--i:${i + 1}"><b>${value}</b><span>${label}</span></div>`)
  .join('')}
</div>`,
});
