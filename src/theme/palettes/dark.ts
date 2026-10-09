import type { Theme } from '../types.ts';

export const dark: Theme = {
  label: 'Dark',
  scheme: 'dark',
  palette: {
    bg: '#0b0b0a',
    surface: '#151514',
    surface2: '#1e1e1d',
    border: '#272726',

    text: '#f4f4f1',
    muted: '#8b8b85',
    link: '#7fa9f2',

    accent: '#f4f4f1',
    accentHover: '#dcdcd8',
    onAccent: '#0e0e0d',

    ok: '#7fcf5f',
    okBg: 'rgba(127, 207, 95, 0.14)',

    blue: '#8fb4f5',
    blueBg: 'rgba(127, 169, 242, 0.16)',
    green: '#8bd76b',
    greenBg: 'rgba(127, 207, 95, 0.16)',
    purple: '#c7a4f0',
    purpleBg: 'rgba(177, 130, 235, 0.16)',
    red: '#f29a82',
    redBg: 'rgba(240, 132, 103, 0.16)',

    shadow: 'none',
    shadowPop: '0 10px 40px rgba(0, 0, 0, 0.55)',

    controlActive: '#272726',
    controlShadow: 'none',
  },
};
