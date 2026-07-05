import AsyncStorage from "@react-native-async-storage/async-storage";

import type { ThemeMode } from "@/types/theme";

const themeStorageKey = "@sortirose/theme";
const legacyThemeStorageKey = "@noctou/theme";

export async function readThemeMode(): Promise<ThemeMode | null> {
  let storedValue = await AsyncStorage.getItem(themeStorageKey);

  if (!storedValue) {
    storedValue = await AsyncStorage.getItem(legacyThemeStorageKey);

    if (storedValue === "light" || storedValue === "dark") {
      await AsyncStorage.setItem(themeStorageKey, storedValue);
      await AsyncStorage.removeItem(legacyThemeStorageKey);
    }
  }

  if (storedValue === "light" || storedValue === "dark") {
    return storedValue;
  }

  return null;
}

export async function writeThemeMode(themeMode: ThemeMode): Promise<void> {
  await AsyncStorage.setItem(themeStorageKey, themeMode);
}
