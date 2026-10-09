/** Every colour the stylesheets can use. Each key becomes a CSS variable: `surface2` -> `--surface-2`. */
export interface Palette {
  // page
  bg: string;
  surface: string;
  surface2: string;
  border: string;
  // text and links
  text: string;
  muted: string;
  link: string;
  // primary buttons
  accent: string;
  accentHover: string;
  onAccent: string;
  // status
  ok: string;
  okBg: string;
  // categories (tones used for icons, gradients and highlights)
  blue: string;
  blueBg: string;
  green: string;
  greenBg: string;
  purple: string;
  purpleBg: string;
  red: string;
  redBg: string;
  // elevation
  shadow: string;
  shadowPop: string;
  // selected item in the theme switch
  controlActive: string;
  controlShadow: string;
}

/** Tells the browser which built-in controls (scrollbars, form fields) to draw. */
export type ColorScheme = 'light' | 'dark';

export interface Theme {
  label: string;
  scheme: ColorScheme;
  palette: Palette;
}
