import { createContext, useCallback, useEffect, useMemo, useState, type PropsWithChildren } from "react";

import { readFavorites, writeFavorites } from "@/storage/favorites";
import type { EventItem } from "@/types/event";

interface FavoritesContextValue {
  favoriteEvents: EventItem[];
  isReady: boolean;
  isFavorite: (eventId: string) => boolean;
  toggleFavorite: (eventItem: EventItem) => Promise<void>;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [favoriteEvents, setFavoriteEvents] = useState<EventItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadFavorites() {
      const storedFavorites = await readFavorites();

      if (isMounted) {
        setFavoriteEvents(storedFavorites);
        setIsReady(true);
      }
    }

    void loadFavorites();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleFavorite = useCallback(async (eventItem: EventItem) => {
    let updatedFavorites: EventItem[] = [];

    setFavoriteEvents((currentFavoriteEvents) => {
      updatedFavorites = currentFavoriteEvents.some(
        (favoriteEvent) => favoriteEvent.id === eventItem.id,
      )
        ? currentFavoriteEvents.filter((favoriteEvent) => favoriteEvent.id !== eventItem.id)
        : [eventItem, ...currentFavoriteEvents];

      return updatedFavorites;
    });

    await writeFavorites(updatedFavorites);
  }, []);

  const contextValue = useMemo<FavoritesContextValue>(
    () => ({
      favoriteEvents,
      isReady,
      isFavorite: (eventId) => favoriteEvents.some((favoriteEvent) => favoriteEvent.id === eventId),
      toggleFavorite,
    }),
    [favoriteEvents, isReady, toggleFavorite],
  );

  return <FavoritesContext.Provider value={contextValue}>{children}</FavoritesContext.Provider>;
}
