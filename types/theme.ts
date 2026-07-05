export type ThemeMode = "light" | "dark";

export interface ThemePalette {
  background: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  border: string;
  divider: string;
  headerBackground: string;
  statusBarStyle: "light" | "dark";
  accent: string;
  accentSoft: string;
  accentSoftText: string;
  primaryButton: string;
  primaryButtonText: string;
  glass: {
    background: string;
    border: string;
  };
  chip: {
    background: string;
    border: string;
    text: string;
    activeBackground: string;
    activeText: string;
  };
  favoriteButton: {
    inactiveBackground: string;
    inactiveText: string;
    activeBackground: string;
    activeText: string;
  };
  tabBar: {
    background: string;
    border: string;
    shadow: string;
    activeTint: string;
    inactiveTint: string;
    activeBackground: string;
  };
}
