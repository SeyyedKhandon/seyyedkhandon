import type { Theme } from '../types.ts';

export const light: Theme = {
  label: 'Light',
  scheme: 'light',
  palette: {
    bg: '#f5f5f3',
    surface: '#ffffff',
    surface2: '#f1f1ef',
    border: '#e7e7e3',

    text: '#0e0e0d',
    muted: '#6b6b66',
    link: '#2563c9',

    accent: '#0e0e0d',
    accentHover: '#2b2b29',
    onAccent: '#ffffff',

    ok: '#276b1a',
    okBg: 'rgba(88, 180, 65, 0.14)',

    blue: '#2563c9',
    blueBg: 'rgba(37, 99, 201, 0.12)',
    green: '#276b1a',
    greenBg: 'rgba(88, 180, 65, 0.18)',
    purple: '#7c3fc4',
    purpleBg: 'rgba(124, 63, 196, 0.12)',
    red: '#b8341b',
    redBg: 'rgba(212, 71, 43, 0.12)',

    shadow: '0 1px 2px rgba(15, 15, 12, 0.04), 0 6px 24px rgba(15, 15, 12, 0.06)',
    shadowPop: '0 2px 6px rgba(15, 15, 12, 0.08), 0 14px 44px rgba(15, 15, 12, 0.14)',

    controlActive: '#ffffff',
    controlShadow: '0 1px 2px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',
  },
};
