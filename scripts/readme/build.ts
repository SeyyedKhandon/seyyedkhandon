import { mkdirSync, writeFileSync } from 'node:fs';
import { contact } from './panels/contact.ts';
import { hero } from './panels/hero.ts';
import { learnPanel } from './panels/learn.ts';
import { packsPanel } from './panels/packs.ts';
import { products } from './panels/products.ts';
import { work } from './panels/work.ts';
import { panelThemes, renderPanel, type Panel } from './svg.ts';

/** Writes every panel as `profile/<name>-<theme>.svg`. */
export const panels: Panel[] = [hero, packsPanel, products, learnPanel, work, contact];

const out = new URL('../../profile/', import.meta.url);
mkdirSync(out, { recursive: true });

for (const panel of panels) {
  for (const theme of panelThemes) {
    writeFileSync(new URL(`${panel.name}-${theme}.svg`, out), renderPanel(panel, theme));
  }
}
console.log(`Wrote ${panels.length * panelThemes.length} panels to profile/`);
