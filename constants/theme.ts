import type { ThemeMode, ThemePalette } from "@/types/theme";

export const lightTheme: ThemePalette = {
  background: "#F8FAFC",
  surface: "#FFFFFF",
  surfaceMuted: "#F1F5F9",
  text: "#0F172A",
  textMuted: "#64748B",
  border: "#E2E8F0",
  divider: "#F1F5F9",
  headerBackground: "#F8FAFC",
  statusBarStyle: "dark",
  accentSoft: "#EFF6FF",
  accentSoftText: "#1D4ED8",
  primaryButton: "#0F172A",
  primaryButtonText: "#FFFFFF",
  chip: {
    background: "#FFFFFF",
    border: "#E2E8F0",
    text: "#334155",
    activeBackground: "#0F172A",
    activeText: "#FFFFFF",
  },
  favoriteButton: {
    inactiveBackground: "#F1F5F9",
    inactiveText: "#334155",
    activeBackground: "#0F172A",
    activeText: "#FFFFFF",
  },
  tabBar: {
    background: "#FFFFFF",
    border: "rgba(15, 23, 42, 0.1)",
    shadow: "#64748B",
    activeTint: "#0F172A",
    inactiveTint: "#64748B",
    activeHome: "#E2E8F0",
    activeMap: "#DBEAFE",
    activeFavorites: "#FCE7F3",
  },
};

export const darkTheme: ThemePalette = {
  background: "#0F172A",
  surface: "#1E293B",
  surfaceMuted: "#334155",
  text: "#F8FAFC",
  textMuted: "#94A3B8",
  border: "#334155",
  divider: "#334155",
  headerBackground: "#0F172A",
  statusBarStyle: "light",
  accentSoft: "#1E3A8A",
  accentSoftText: "#93C5FD",
  primaryButton: "#F8FAFC",
  primaryButtonText: "#0F172A",
  chip: {
    background: "#1E293B",
    border: "#334155",
    text: "#CBD5E1",
    activeBackground: "#F8FAFC",
    activeText: "#0F172A",
  },
  favoriteButton: {
    inactiveBackground: "#334155",
    inactiveText: "#E2E8F0",
    activeBackground: "#F8FAFC",
    activeText: "#0F172A",
  },
  tabBar: {
    background: "#1E293B",
    border: "rgba(255, 255, 255, 0.1)",
    shadow: "#020617",
    activeTint: "#FFFFFF",
    inactiveTint: "#94A3B8",
    activeHome: "rgba(255, 255, 255, 0.12)",
    activeMap: "#1D4ED8",
    activeFavorites: "#DB2777",
  },
};

export function getThemePalette(themeMode: ThemeMode): ThemePalette {
  return themeMode === "dark" ? darkTheme : lightTheme;
}
