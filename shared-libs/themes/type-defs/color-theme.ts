export interface ColorTheme {
  identifier: string;
  displayName: string;
  shade: ThemeShade;
  colors: Colors;
  fontColors: TextColors;
  backgroundColors: BackgroundColors;
  animation: {
    scale: number;
  };
}

export type ThemeShade = 'light' | 'dark';
export interface Colors {
  brand: string;
  white: string;
  offWhite: string;
  baseBackground: string;
  borderBackground: string;
  danger: string;
  success: string;
  warning: string;
  info: string;
  darkBackground: string;
  lightBackground: string;
  dark: string;
  altBackground: string;
  gray: string;
  gray20: string;
  gray40: string;
  gray70: string;
  transparent: string;
  opaque: string;
  lightBlue: string;
  gold: string;
  paceBlue: string;
}
export interface TextColors {
  primary: keyof Colors;
  brand: keyof Colors;
  secondary: keyof Colors;
  baseBorder: keyof Colors;
  alwaysLight: keyof Colors;
  alwaysDark: keyof Colors;
  error: keyof Colors;
  light: keyof Colors;
  disabled: keyof Colors;
  brandAlt: keyof Colors;
  gold: keyof Colors;
}
export interface BackgroundColors {
  primary: keyof Colors;
  brand: keyof Colors;
  baseBackground: keyof Colors;
  alwaysDark: keyof Colors;
  alwaysLight: keyof Colors;
  error: keyof Colors;
  surface: keyof Colors;
  brandAlt: keyof Colors;
  onBackground: keyof Colors;
  clear: keyof Colors;
  darkBackground: keyof Colors;
  lightBlue: keyof Colors;
  modal: keyof Colors;
  paceBlue: keyof Colors;
}
