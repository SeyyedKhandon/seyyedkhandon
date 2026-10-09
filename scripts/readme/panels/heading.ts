import type { Panel } from '../svg.ts';

/** The eyebrow, title and one-line description that open a section. */
export const heading = (name: string, eyebrow: string, titleHtml: string, sub: string, alt: string, height = 98): Panel => ({
  name,
  title: alt,
  height,
  body: () => `<p class="eyebrow">${eyebrow}</p><h2>${titleHtml}</h2><p class="sub">${sub}</p>`,
});
