import type { Panel } from '../svg.ts';

export interface Activity {
  login: string;
  repos: number;
  stars: number;
  followers: number;
  contributions: number;
  /** Contribution level (0 to 4) for each day, one array per week, oldest first. */
  weeks: number[][];
  updated: string;
}

const levels = [0, 28, 50, 75, 100];

export const activityPanel = (a: Activity): Panel => ({
  name: 'activity',
  title: `GitHub activity of ${a.login}: ${a.repos} public repositories, ${a.stars} stars, ${a.followers} followers and ${a.contributions} contributions in the last year.`,
  height: 300,
  body: () => `
<style>
.tiles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin: 14px 0; }
.tile { padding: 14px 18px; border-radius: 16px; }
.tile b { display: block; font-size: 26px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.15; }
.tile span { color: var(--muted); font-size: 12.5px; }
.heat { padding: 18px 20px 14px; border-radius: 16px; }
.weeks { display: grid; grid-auto-flow: column; grid-template-rows: repeat(7, 11px); gap: 3px; justify-content: center; }
.weeks i { width: 11px; height: 11px; border-radius: 3px; background: color-mix(in srgb, var(--green) var(--l), var(--surface-2)); animation: pop 400ms ease both; animation-delay: calc(var(--w) * 14ms); }
@keyframes pop { from { opacity: 0; } }
.legend { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; color: var(--muted); font-size: 12px; }
.legend div { display: flex; align-items: center; gap: 3px; }
.legend i { width: 11px; height: 11px; border-radius: 3px; background: color-mix(in srgb, var(--green) var(--l), var(--surface-2)); }
</style>
<p class="prompt mono rise"><b>seyyed@github</b> ~ $ ./activity.sh</p>
<div class="tiles">
${[
  [a.repos, 'public repositories'],
  [a.stars, 'stars earned'],
  [a.followers, 'followers'],
  [a.contributions.toLocaleString('en-US'), 'contributions, last year'],
]
  .map(([value, label], i) => `<div class="card tile rise" style="--i:${i + 1}"><b>${value}</b><span>${label}</span></div>`)
  .join('')}
</div>
<div class="card heat rise" style="--i:5">
  <div class="weeks">${a.weeks.map((week, w) => week.map((level) => `<i style="--w:${w}; --l:${levels[level]}%"></i>`).join('')).join('')}</div>
  <div class="legend"><span>Updated ${a.updated}, refreshed daily</span><div><span>Less</span>${levels.map((l) => `<i style="--l:${l}%"></i>`).join('')}<span>More</span></div></div>
</div>`,
});
