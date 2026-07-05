import type { Coordinates, EventFilters, EventItem, EventsPage } from "@/types/event";

export function flattenEventPages(pages: EventsPage[] | undefined): EventItem[] {
  const allItems = pages?.flatMap((page) => page.items) ?? [];
  const uniqueItems = deduplicateEventsById(allItems);

  return uniqueItems.filter((eventItem) => !isEventFinished(eventItem));
}

export function deduplicateEventsById(items: EventItem[]): EventItem[] {
  const seenEventIds = new Set<string>();
  const uniqueItems: EventItem[] = [];

  for (const item of items) {
    if (seenEventIds.has(item.id)) {
      continue;
    }

    seenEventIds.add(item.id);
    uniqueItems.push(item);
  }

  return uniqueItems;
}

export function isEventFinished(eventItem: EventItem, referenceDate: Date = new Date()): boolean {
  const eventDates = collectEventDates(eventItem);

  if (eventDates.length === 0) {
    return false;
  }

  const latestEventDate = eventDates.reduce((latestDate, currentDate) =>
    currentDate > latestDate ? currentDate : latestDate,
  );

  return latestEventDate < startOfDay(referenceDate);
}

export function splitCategories(category: string): string[] {
  return [...new Set(category.split(",").map((value) => value.trim()).filter(Boolean))];
}

export function getPrimaryCategory(category: string): string {
  return splitCategories(category)[0] ?? category;
}

export function collectCategories(items: EventItem[]): string[] {
  return [...new Set(items.flatMap((item) => splitCategories(item.category)))].sort((left, right) =>
    left.localeCompare(right, "fr"),
  );
}

export function formatEventDateLabel(startDate: string, fallback: string): string {
  if (fallback) {
    return fallback;
  }

  const parsedDate = parseEventDate(startDate);

  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "long",
  }).format(parsedDate);
}

export function prioritizePhotoEvents(items: EventItem[]): EventItem[] {
  return [...items].sort((leftItem, rightItem) => {
    const leftHasImage = leftItem.imagePreviewUrl || leftItem.imageUrl ? 1 : 0;
    const rightHasImage = rightItem.imagePreviewUrl || rightItem.imageUrl ? 1 : 0;

    if (leftHasImage !== rightHasImage) {
      return rightHasImage - leftHasImage;
    }

    return parseEventDate(leftItem.startDate).getTime() - parseEventDate(rightItem.startDate).getTime();
  });
}

export function getUpcomingWeekendEvents(items: EventItem[], limit = 10): EventItem[] {
  const today = new Date();
  const todayAtMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const weekendWindowEnd = new Date(todayAtMidnight);
  weekendWindowEnd.setDate(weekendWindowEnd.getDate() + 10);

  const weekendEvents = items.filter((item) => {
    const eventDate = parseEventDate(item.startDate);
    const eventDay = eventDate.getDay();

    return (
      eventDate >= todayAtMidnight &&
      eventDate <= weekendWindowEnd &&
      (eventDay === 0 || eventDay === 6)
    );
  });

  return weekendEvents.slice(0, limit);
}

export interface HomeFeedSections {
  popularEvents: EventItem[];
  weekendEvents: EventItem[];
  categoryShelves: CategoryShelf[];
}

export function buildHomeFeedSections(items: EventItem[]): HomeFeedSections {
  const featuredEventIds = new Set<string>();

  const takeUniqueEvents = (candidates: EventItem[], limit: number): EventItem[] => {
    const selectedEvents: EventItem[] = [];

    for (const eventItem of candidates) {
      if (featuredEventIds.has(eventItem.id)) {
        continue;
      }

      selectedEvents.push(eventItem);
      featuredEventIds.add(eventItem.id);

      if (selectedEvents.length >= limit) {
        break;
      }
    }

    return selectedEvents;
  };

  const popularEvents = takeUniqueEvents(
    items.filter((eventItem) => eventItem.imagePreviewUrl || eventItem.imageUrl),
    8,
  );
  const weekendEvents = takeUniqueEvents(getUpcomingWeekendEvents(items), 10);
  const categoryShelves = buildCategoryShelves(
    items.filter((eventItem) => !featuredEventIds.has(eventItem.id)),
    3,
    featuredEventIds,
  );

  return {
    popularEvents,
    weekendEvents,
    categoryShelves,
  };
}

export function buildCategoryShelves(
  items: EventItem[],
  maxShelves = 3,
  featuredEventIds: Set<string> = new Set(),
): CategoryShelf[] {
  const groupedItems = new Map<string, EventItem[]>();

  for (const item of items) {
    if (featuredEventIds.has(item.id)) {
      continue;
    }

    const primaryCategory = getPrimaryCategory(item.category);

    if (!groupedItems.has(primaryCategory)) {
      groupedItems.set(primaryCategory, []);
    }

    groupedItems.get(primaryCategory)?.push(item);
  }

  return [...groupedItems.entries()]
    .map(([category, categoryItems]) => ({
      title: category,
      items: prioritizePhotoEvents(categoryItems).slice(0, 10),
      score: categoryItems.filter((item) => item.imagePreviewUrl || item.imageUrl).length * 10 + categoryItems.length,
    }))
    .filter((shelf) => shelf.items.length >= 2)
    .sort((leftShelf, rightShelf) => rightShelf.score - leftShelf.score)
    .slice(0, maxShelves)
    .map(({ title, items: shelfItems }) => {
      const uniqueShelfItems = shelfItems.filter((eventItem) => !featuredEventIds.has(eventItem.id)).slice(0, 10);

      for (const eventItem of uniqueShelfItems) {
        featuredEventIds.add(eventItem.id);
      }

      return { title, items: uniqueShelfItems };
    })
    .filter((shelf) => shelf.items.length >= 2);
}

export function parseEventDate(dateValue: string): Date {
  const [year, month, day] = dateValue.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatLongDate(dateValue: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parseEventDate(dateValue));
}

export interface EventPreviewDate {
  label: string;
  hasMoreDates: boolean;
}

export function formatEventPreviewDate(eventItem: EventItem): EventPreviewDate {
  const todayAtMidnight = startOfToday();
  const candidateDates = collectEventDates(eventItem).sort(
    (leftDate, rightDate) => leftDate.getTime() - rightDate.getTime(),
  );
  const upcomingDates = candidateDates.filter((dateValue) => dateValue >= todayAtMidnight);
  const referenceDates = upcomingDates.length > 0 ? upcomingDates : candidateDates;
  const nextDate = referenceDates[0];

  if (!nextDate) {
    return { label: "Date a confirmer", hasMoreDates: false };
  }

  const hasMoreDates =
    referenceDates.length > 1 ||
    candidateDates.length > 1 ||
    Boolean(eventItem.endDate && eventItem.endDate !== eventItem.startDate);

  let label = formatShortFrenchDate(nextDate);

  if (upcomingDates.length === 0 && candidateDates.length > 0) {
    label = `Termine · ${label}`;
  } else if (hasMoreDates) {
    label = `Prochaine · ${label}`;
  }

  return { label, hasMoreDates };
}

function collectEventDates(eventItem: EventItem): Date[] {
  const uniqueDateTimestamps = new Set<number>();

  const registerDate = (dateValue: Date) => {
    if (Number.isNaN(dateValue.getTime())) {
      return;
    }

    uniqueDateTimestamps.add(startOfDay(dateValue).getTime());
  };

  registerDate(parseEventDate(eventItem.startDate));

  if (eventItem.endDate) {
    registerDate(parseEventDate(eventItem.endDate));
  }

  for (const match of eventItem.displayDate.matchAll(/(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})/g)) {
    registerDate(new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1])));
  }

  return [...uniqueDateTimestamps].map((timestamp) => new Date(timestamp));
}

function startOfToday(): Date {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

function startOfDay(dateValue: Date): Date {
  return new Date(dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate());
}

function formatShortFrenchDate(dateValue: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(dateValue);
}

export function formatDistance(distanceInKilometers: number | null): string | null {
  if (distanceInKilometers == null) {
    return null;
  }

  if (distanceInKilometers < 1) {
    return `${Math.round(distanceInKilometers * 1000)} m`;
  }

  return `${distanceInKilometers.toFixed(1)} km`;
}

export function getDistanceInKilometers(
  origin: Coordinates | null,
  destination: Coordinates | null,
): number | null {
  if (!origin || !destination) {
    return null;
  }

  const earthRadiusInKilometers = 6371;
  const deltaLatitude = toRadians(destination.latitude - origin.latitude);
  const deltaLongitude = toRadians(destination.longitude - origin.longitude);
  const startLatitude = toRadians(origin.latitude);
  const endLatitude = toRadians(destination.latitude);

  const a =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(startLatitude) * Math.cos(endLatitude) * Math.sin(deltaLongitude / 2) ** 2;

  return 2 * earthRadiusInKilometers * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function applyEventFilters(
  items: EventItem[],
  filters: EventFilters,
  userCoordinates: Coordinates | null,
): EventItem[] {
  const filteredItems = items
    .filter((item) => matchesCategory(item, filters.category))
    .filter((item) => matchesDateFilter(item, filters));

  return filteredItems.sort((leftItem, rightItem) => {
    if (filters.sortMode === "proximity" && userCoordinates) {
      const leftDistance =
        getDistanceInKilometers(userCoordinates, leftItem.coordinates) ?? Number.POSITIVE_INFINITY;
      const rightDistance =
        getDistanceInKilometers(userCoordinates, rightItem.coordinates) ?? Number.POSITIVE_INFINITY;

      if (leftDistance !== rightDistance) {
        return leftDistance - rightDistance;
      }
    }

    return parseEventDate(leftItem.startDate).getTime() - parseEventDate(rightItem.startDate).getTime();
  });
}

export interface CategoryShelf {
  title: string;
  items: EventItem[];
}

function matchesCategory(item: EventItem, selectedCategory: string): boolean {
  if (selectedCategory === "all") {
    return true;
  }

  return splitCategories(item.category).includes(selectedCategory);
}

function matchesDateFilter(item: EventItem, filters: EventFilters): boolean {
  if (filters.selectedDate) {
    return eventOccursOnDate(item, parseEventDate(filters.selectedDate));
  }

  const dateFilter = filters.dateFilter;

  if (dateFilter === "all") {
    return true;
  }

  const eventDate = parseEventDate(item.startDate);
  const today = new Date();
  const todayAtMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  if (dateFilter === "today") {
    return eventOccursOnDate(item, todayAtMidnight);
  }

  const numberOfDays = dateFilter === "week" ? 7 : 30;
  const endDate = new Date(todayAtMidnight);
  endDate.setDate(endDate.getDate() + numberOfDays);

  return eventDate >= todayAtMidnight && eventDate <= endDate;
}

export function eventOccursOnDate(eventItem: EventItem, selectedDate: Date): boolean {
  const selectedTimestamp = startOfDay(selectedDate).getTime();
  const startTimestamp = startOfDay(parseEventDate(eventItem.startDate)).getTime();
  const endTimestamp = eventItem.endDate
    ? startOfDay(parseEventDate(eventItem.endDate)).getTime()
    : startTimestamp;

  if (selectedTimestamp >= startTimestamp && selectedTimestamp <= endTimestamp) {
    return true;
  }

  return collectEventDates(eventItem).some(
    (eventDate) => startOfDay(eventDate).getTime() === selectedTimestamp,
  );
}

export function toIsoDateString(dateValue: Date): string {
  const year = dateValue.getFullYear();
  const month = String(dateValue.getMonth() + 1).padStart(2, "0");
  const day = String(dateValue.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatIsoDateLabel(isoDate: string): string {
  return formatShortFrenchDate(parseEventDate(isoDate));
}

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}
