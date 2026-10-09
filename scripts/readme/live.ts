import { mkdirSync, writeFileSync } from 'node:fs';
import { activityPanel, type Activity } from './panels/activity.ts';
import { panelThemes, renderPanel } from './svg.ts';

/**
 * Fetches the numbers for the activity panel from GitHub and writes `profile/activity-<theme>.svg`.
 * Needs GITHUB_TOKEN; locally: GITHUB_TOKEN=$(gh auth token) npm run readme:live
 */
const LOGIN = 'SeyyedKhandon';
const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error('Set GITHUB_TOKEN to fetch the activity numbers.');
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
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { contributionLevel } }
      }
    }
  }
}`;

const LEVELS: Record<string, number> = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };

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

const calendar = user.contributionsCollection.contributionCalendar;
const activity: Activity = {
  login: LOGIN,
  repos: user.repositories.totalCount,
  stars,
  followers: user.followers.totalCount,
  contributions: calendar.totalContributions,
  weeks: calendar.weeks.map((week: { contributionDays: { contributionLevel: string }[] }) =>
    week.contributionDays.map((day) => LEVELS[day.contributionLevel] ?? 0),
  ),
  updated: new Date().toISOString().slice(0, 10),
};

const out = new URL('../../profile/', import.meta.url);
mkdirSync(out, { recursive: true });
for (const theme of panelThemes) {
  writeFileSync(new URL(`activity-${theme}.svg`, out), renderPanel(activityPanel(activity), theme));
}
console.log(`Wrote the activity panels: ${activity.repos} repos, ${activity.stars} stars, ${activity.contributions} contributions.`);
