import { mkdirSync, writeFileSync } from 'node:fs';
import { statsPanel, type Stats } from './panels/stats.ts';
import { panelThemes, renderPanel } from './svg.ts';

/**
 * Fetches the numbers for the stats panel from GitHub and writes `profile/stats-<theme>.svg`.
 * Needs GITHUB_TOKEN; locally: GITHUB_TOKEN=$(gh auth token) npm run readme:live
 */
const LOGIN = 'SeyyedKhandon';
const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error('Set GITHUB_TOKEN to fetch the numbers for the stats panel.');
  process.exit(1);
}

const query = `query($login: String!, $after: String) {
  user(login: $login) {
    followers { totalCount }
    repositories(first: 100, after: $after, ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) {
      totalCount
      pageInfo { hasNextPage endCursor }
      nodes { stargazerCount }
    }
  }
}`;

async function request(after: string | null) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'profile-readme' },
    body: JSON.stringify({ query, variables: { login: LOGIN, after } }),
  });
  const json = await response.json();
  if (!response.ok || json.errors) throw new Error(`GitHub API error: ${JSON.stringify(json.errors ?? json)}`);
  return json.data.user;
}

let user = await request(null);
let stars = 0;
for (;;) {
  stars += user.repositories.nodes.reduce((sum: number, repo: { stargazerCount: number }) => sum + repo.stargazerCount, 0);
  if (!user.repositories.pageInfo.hasNextPage) break;
  const next = await request(user.repositories.pageInfo.endCursor);
  next.repositories.totalCount = user.repositories.totalCount;
  user = { ...user, repositories: next.repositories };
}

const stats: Stats = {
  login: LOGIN,
  repos: user.repositories.totalCount,
  stars,
  followers: user.followers.totalCount,
  updated: new Date().toISOString().slice(0, 10),
};

const out = new URL('../../profile/', import.meta.url);
mkdirSync(out, { recursive: true });
for (const theme of panelThemes) {
  writeFileSync(new URL(`stats-${theme}.svg`, out), renderPanel(statsPanel(stats), theme));
}
console.log(`Wrote the stats panels: ${stats.repos} repos, ${stats.stars} stars, ${stats.followers} followers.`);
