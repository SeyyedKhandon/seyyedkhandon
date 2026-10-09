import { readFileSync } from 'node:fs';
import { declarations } from '../../src/theme/css.ts';
import { themes } from '../../src/theme/themes.ts';

/** GitHub shows READMEs in light or dark; each panel is written once per theme. */
export const panelThemes = ['light', 'dark'] as const;
export type PanelTheme = (typeof panelThemes)[number];

export interface Panel {
  name: string;
  /** Used as the image description for screen readers. */
  title: string;
  height: number;
  body: () => string;
}

const WIDTH = 900;
const root = new URL('../../', import.meta.url);

const cache = new Map<string, string>();
/** Images and fonts are embedded: an SVG shown as an image cannot load files. */
export function dataUri(path: string, mime: string): string {
  let uri = cache.get(path);
  if (!uri) {
    uri = `data:${mime};base64,${readFileSync(new URL(path, root)).toString('base64')}`;
    cache.set(path, uri);
  }
  return uri;
}

export const image = (name: string, alt = '', position?: string): string => {
  const mime = name.endsWith('.png') ? 'image/png' : 'image/jpeg';
  const dir = name.endsWith('.png') || /-(promo|poster|screen|cover)\.jpg$/.test(name) ? 'scripts/readme/images' : 'public/assets';
  const style = position ? ` style="object-position: ${position}"` : '';
  return `<img src="${dataUri(`${dir}/${name}`, mime)}" alt="${esc(alt)}"${style} />`;
};

/** The markup must be valid XML, so text is escaped and tags are closed. */
export const esc = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const styles = (theme: PanelTheme) => `
@font-face { font-family: 'Inter Variable'; font-weight: 100 900; src: url(${dataUri('public/assets/fonts/inter-latin-wght-normal.woff2', 'font/woff2')}) format('woff2-variations'); }
.panel { box-sizing: border-box; ${declarations(themes[theme])} width: ${WIDTH}px; padding: 4px 6px; font: 14px/1.5 'Inter Variable', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif; color: var(--text); }
.panel * { box-sizing: border-box; margin: 0; }
.mono { font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace; }
.muted, .meta { color: var(--muted); }
.meta { font-size: 12.5px; }
.card { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 20px; box-shadow: var(--shadow); }
.eyebrow { color: var(--link); font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.09em; margin-bottom: 6px; }
h2 { font-size: 30px; line-height: 1.1; letter-spacing: -0.03em; font-weight: 800; margin-bottom: 6px; }
h3 { font-size: 16px; letter-spacing: -0.01em; font-weight: 700; }
.sub { color: var(--muted); font-size: 15px; margin-bottom: 16px; }
.grad { background: linear-gradient(100deg, var(--blue), var(--green) 60%, var(--purple)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.tags { display: flex; flex-wrap: wrap; gap: 5px; }
.tags span { padding: 1px 9px; border-radius: 99px; background: var(--surface-2); color: var(--muted); font-size: 11.5px; font-weight: 600; }
.grid { display: grid; gap: 14px; }
.cols2 { grid-template-columns: repeat(2, 1fr); }
.cols3 { grid-template-columns: repeat(3, 1fr); }
.blue { background: var(--blue-bg); color: var(--blue); }
.green { background: var(--green-bg); color: var(--green); }
.purple { background: var(--purple-bg); color: var(--purple); }
.red { background: var(--red-bg); color: var(--red); }
.prompt { font-size: 13px; color: var(--muted); }
.prompt b { color: var(--ok); font-weight: 600; }
@keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes grow { from { transform: scaleX(0); } to { transform: none; } }
@keyframes blink { 50% { opacity: 0; } }
.rise { animation: rise 600ms cubic-bezier(0.2, 0.7, 0.2, 1) both; animation-delay: calc(var(--i, 0) * 70ms); }
@media (prefers-reduced-motion: reduce) { .panel * { animation: none !important; } }
`;

export function renderPanel(panel: Panel, theme: PanelTheme): string {
  const { height } = panel;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${height}" viewBox="0 0 ${WIDTH} ${height}" role="img" aria-label="${esc(panel.title)}">
<foreignObject width="${WIDTH}" height="${height}"><div xmlns="http://www.w3.org/1999/xhtml" class="panel"><style>${styles(theme)}</style>${panel.body()}</div></foreignObject>
</svg>
`;
}
