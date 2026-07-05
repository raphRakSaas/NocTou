import { useEffect } from "react";

import type { useEvents } from "@/hooks/useEvents";
import { flattenEventPages } from "@/utils/events";

export function useAllEventsLoaded(eventsQuery: ReturnType<typeof useEvents>) {
  const pageCount = eventsQuery.data?.pages.length ?? 0;
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = eventsQuery;

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && !isPending) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isPending, pageCount]);

  const loadedEvents = flattenEventPages(eventsQuery.data?.pages);
  const totalCount = eventsQuery.data?.pages[0]?.totalCount ?? loadedEvents.length;
  const isLoadingAll = eventsQuery.hasNextPage || eventsQuery.isFetchingNextPage;

  return {
    loadedEvents,
    totalCount,
    isLoadingAll,
  };
}
