import { useMemo, useState } from "react";

import type { EventDateFilter, EventFilters, EventSortMode } from "@/types/event";

const defaultFilters: EventFilters = {
  category: "all",
  dateFilter: "all",
  sortMode: "date",
  proximityEnabled: false,
};

export function useEventFilters() {
  const [filters, setFilters] = useState<EventFilters>(defaultFilters);

  const actions = useMemo(
    () => ({
      setCategory: (category: string) => {
        setFilters((currentFilters) => ({ ...currentFilters, category }));
      },
      setDateFilter: (dateFilter: EventDateFilter) => {
        setFilters((currentFilters) => ({ ...currentFilters, dateFilter }));
      },
      setSortMode: (sortMode: EventSortMode) => {
        setFilters((currentFilters) => ({
          ...currentFilters,
          sortMode,
          proximityEnabled: sortMode === "proximity" ? true : currentFilters.proximityEnabled,
        }));
      },
      setProximityEnabled: (proximityEnabled: boolean) => {
        setFilters((currentFilters) => ({
          ...currentFilters,
          proximityEnabled,
          sortMode: proximityEnabled ? "proximity" : "date",
        }));
      },
      resetFilters: () => {
        setFilters(defaultFilters);
      },
    }),
    [],
  );

  return {
    filters,
    ...actions,
  };
}
