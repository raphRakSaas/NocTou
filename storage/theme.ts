import AsyncStorage from "@react-native-async-storage/async-storage";

import type { ThemeMode } from "@/types/theme";

const themeStorageKey = "@noctou/theme";

export async function readThemeMode(): Promise<ThemeMode | null> {
  const storedValue = await AsyncStorage.getItem(themeStorageKey);

  if (storedValue === "light" || storedValue === "dark") {
    return storedValue;
  }

  return null;
}

export async function writeThemeMode(themeMode: ThemeMode): Promise<void> {
  await AsyncStorage.setItem(themeStorageKey, themeMode);
}
