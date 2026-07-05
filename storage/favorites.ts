import AsyncStorage from "@react-native-async-storage/async-storage";

import type { EventItem } from "@/types/event";

const FAVORITES_STORAGE_KEY = "@sortirose/favorites";
const LEGACY_FAVORITES_STORAGE_KEY = "@noctou/favorites";

export async function readFavorites(): Promise<EventItem[]> {
  let storedValue = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!storedValue) {
    storedValue = await AsyncStorage.getItem(LEGACY_FAVORITES_STORAGE_KEY);

    if (storedValue) {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, storedValue);
      await AsyncStorage.removeItem(LEGACY_FAVORITES_STORAGE_KEY);
    }
  }

  if (!storedValue) {
    return [];
  }

  try {
    return JSON.parse(storedValue) as EventItem[];
  } catch {
    return [];
  }
}

export async function writeFavorites(favoriteEvents: EventItem[]): Promise<void> {
  await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteEvents));
}
