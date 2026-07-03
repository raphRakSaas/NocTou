import { useInfiniteQuery, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { enrichEventsWithOpenAgenda } from "@/api/openAgenda";
import { fetchEvents } from "@/api/toulouse";
import { EVENTS_QUERY_KEY, HOUR_IN_MILLISECONDS } from "@/constants/query";
import type { EventsPage } from "@/types/event";

export function useEvents() {
  const queryClient = useQueryClient();
  const enrichedEventIdsRef = useRef<Set<string>>(new Set());

  const eventsQuery = useInfiniteQuery({
    queryKey: EVENTS_QUERY_KEY,
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchEvents(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextOffset ?? undefined,
    staleTime: HOUR_IN_MILLISECONDS,
    gcTime: 12 * HOUR_IN_MILLISECONDS,
  });

  useEffect(() => {
    const currentPages = eventsQuery.data?.pages;

    if (!currentPages) {
      return;
    }

    const pendingEvents = currentPages
      .flatMap((page) => page.items)
      .filter((eventItem) => !enrichedEventIdsRef.current.has(eventItem.id));

    if (pendingEvents.length === 0) {
      return;
    }

    pendingEvents.forEach((eventItem) => {
      enrichedEventIdsRef.current.add(eventItem.id);
    });

    let isCancelled = false;

    void enrichEventsWithOpenAgenda(pendingEvents).then((enrichedEvents) => {
      if (isCancelled || enrichedEvents.length === 0) {
        return;
      }

      const eventsById = new Map(enrichedEvents.map((eventItem) => [eventItem.id, eventItem]));

      queryClient.setQueryData<InfiniteData<EventsPage>>(EVENTS_QUERY_KEY, (currentData) => {
        if (!currentData) {
          return currentData;
        }

        return {
          ...currentData,
          pages: currentData.pages.map((page) => ({
            ...page,
            items: page.items.map((eventItem) => eventsById.get(eventItem.id) ?? eventItem),
          })),
        };
      });
    });

    return () => {
      isCancelled = true;
    };
  }, [eventsQuery.data?.pages, queryClient]);

  return eventsQuery;
}
