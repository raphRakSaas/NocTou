import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchEvents } from "@/api/toulouse";
import { EVENTS_QUERY_KEY, HOUR_IN_MILLISECONDS } from "@/constants/query";

export function useEvents() {
  return useInfiniteQuery({
    queryKey: EVENTS_QUERY_KEY,
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchEvents(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextOffset ?? undefined,
    staleTime: HOUR_IN_MILLISECONDS,
    gcTime: 12 * HOUR_IN_MILLISECONDS,
  });
}
