import { useEffect } from "react";
import { useQuery, useQueryClient, type InfiniteData } from "@tanstack/react-query";

import { enrichEventsWithOpenAgenda } from "@/api/openAgenda";
import { fetchEventById } from "@/api/toulouse";
import { EVENTS_QUERY_KEY, HOUR_IN_MILLISECONDS } from "@/constants/query";
import type { EventItem, EventsPage } from "@/types/event";

export function useEventById(eventId: string) {
  const queryClient = useQueryClient();

  const eventQuery = useQuery({
    queryKey: [...EVENTS_QUERY_KEY, eventId],
    queryFn: () => fetchEventById(eventId),
    enabled: Boolean(eventId),
    staleTime: HOUR_IN_MILLISECONDS,
    initialData: () => {
      const cachedPages = queryClient.getQueryData<InfiniteData<EventsPage>>(EVENTS_QUERY_KEY);
      return cachedPages?.pages.flatMap((page) => page.items).find((item) => item.id === eventId) as
        | EventItem
        | undefined;
    },
  });

  useEffect(() => {
    if (!eventQuery.data) {
      return;
    }

    if (eventQuery.data.imageUrl || eventQuery.data.imagePreviewUrl) {
      return;
    }

    let isCancelled = false;

    void enrichEventsWithOpenAgenda([eventQuery.data]).then(([enrichedEvent]) => {
      if (isCancelled || !enrichedEvent) {
        return;
      }

      queryClient.setQueryData([...EVENTS_QUERY_KEY, eventId], enrichedEvent);
    });

    return () => {
      isCancelled = true;
    };
  }, [eventId, eventQuery.data, queryClient]);

  return eventQuery;
}
