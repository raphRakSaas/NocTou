import type { ThemeMode, ThemePalette } from "@/types/theme";

const accentCoral = "#FF7A59";
const accentCoralSoft = "#FFB08F";
const accentCoralMuted = "#FFEDE6";
const accentCoralDeep = "#E85D3A";

export const lightTheme: ThemePalette = {
  background: "#EEF2F6",
  surface: "#FFFFFF",
  surfaceMuted: "#F1F5F9",
  text: "#0F172A",
  textMuted: "#64748B",
  border: "rgba(15, 23, 42, 0.08)",
  divider: "#E2E8F0",
  headerBackground: "transparent",
  statusBarStyle: "dark",
  accent: accentCoral,
  accentSoft: accentCoralMuted,
  accentSoftText: accentCoralDeep,
  primaryButton: accentCoral,
  primaryButtonText: "#FFFFFF",
  glass: {
    background: "rgba(255, 255, 255, 0.78)",
    border: "rgba(15, 23, 42, 0.08)",
  },
  chip: {
    background: "rgba(255, 255, 255, 0.82)",
    border: "rgba(15, 23, 42, 0.08)",
    text: "#334155",
    activeBackground: accentCoral,
    activeText: "#FFFFFF",
  },
  favoriteButton: {
    inactiveBackground: "rgba(255, 255, 255, 0.82)",
    inactiveText: "#334155",
    activeBackground: accentCoral,
    activeText: "#FFFFFF",
  },
  tabBar: {
    background: "rgba(255, 255, 255, 0.88)",
    border: "rgba(15, 23, 42, 0.08)",
    shadow: "#64748B",
    activeTint: "#FFFFFF",
    inactiveTint: "#64748B",
    activeBackground: accentCoral,
  },
};

export const darkTheme: ThemePalette = {
  background: "#0B0D10",
  surface: "rgba(255, 255, 255, 0.08)",
  surfaceMuted: "rgba(255, 255, 255, 0.12)",
  text: "#FFFFFF",
  textMuted: "rgba(255, 255, 255, 0.62)",
  border: "rgba(255, 255, 255, 0.12)",
  divider: "rgba(255, 255, 255, 0.08)",
  headerBackground: "transparent",
  statusBarStyle: "light",
  accent: accentCoral,
  accentSoft: "rgba(255, 122, 89, 0.18)",
  accentSoftText: accentCoralSoft,
  primaryButton: accentCoral,
  primaryButtonText: "#FFFFFF",
  glass: {
    background: "rgba(255, 255, 255, 0.08)",
    border: "rgba(255, 255, 255, 0.12)",
  },
  chip: {
    background: "rgba(255, 255, 255, 0.08)",
    border: "rgba(255, 255, 255, 0.12)",
    text: "rgba(255, 255, 255, 0.82)",
    activeBackground: accentCoral,
    activeText: "#FFFFFF",
  },
  favoriteButton: {
    inactiveBackground: "rgba(255, 255, 255, 0.12)",
    inactiveText: "#FFFFFF",
    activeBackground: accentCoral,
    activeText: "#FFFFFF",
  },
  tabBar: {
    background: "rgba(255, 255, 255, 0.08)",
    border: "rgba(255, 255, 255, 0.12)",
    shadow: "#000000",
    activeTint: "#FFFFFF",
    inactiveTint: "rgba(255, 255, 255, 0.62)",
    activeBackground: accentCoral,
  },
};

export function getThemePalette(themeMode: ThemeMode): ThemePalette {
  return themeMode === "dark" ? darkTheme : lightTheme;
}
