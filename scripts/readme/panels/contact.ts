import { handles } from '../content.ts';
import type { Panel } from '../svg.ts';

export const contact: Panel = {
  name: 'contact',
  title: 'Contact: seyyedkhandon.en@gmail.com, LinkedIn, GitHub, Stack Overflow, YouTube, VS Code Marketplace and ADPList.',
  height: 250,
  body: () => `
<style>
.term { padding: 22px 26px; font-size: 13.5px; line-height: 1.9; }
.term b { color: var(--ok); font-weight: 600; }
.term .path { color: var(--link); }
.caret { display: inline-block; width: 8px; height: 15px; vertical-align: -2px; background: var(--accent); animation: blink 900ms step-end infinite; }
</style>
<p class="eyebrow">Contact</p>
<h2>Have a question, or want to work together?</h2>
<div class="card term mono" style="margin-top: 14px">
  <div class="rise"><b>seyyed@berlin</b> <span class="muted">~ $</span> mail seyyedkhandon.en@gmail.com</div>
  <div class="rise muted" style="--i:2"><b>seyyed@berlin</b> ~ $ ls links/</div>
  <div class="rise path" style="--i:3">${handles.join('&#160;&#160;&#160;')}</div>
  <div class="rise" style="--i:4"><b>seyyed@berlin</b> <span class="muted">~ $</span> <span class="caret"></span></div>
</div>`,
};
