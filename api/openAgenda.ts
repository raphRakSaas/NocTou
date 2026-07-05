import { create } from "axios";
import Constants from "expo-constants";

import type { EventItem } from "@/types/event";
import { parseEventDate } from "@/utils/events";

const toulouseOpenAgendaUid = 42448083;
const openAgendaPageSize = 300;
const maxOpenAgendaRequests = 6;
const matchingWindowPaddingDays = 3;
const minimumMatchScore = 7;

const openAgendaApiClient = create({
  baseURL: "https://api.openagenda.com/v2",
  timeout: 15000,
});

interface OpenAgendaImageVariant {
  filename: string;
  type: "full" | "thumbnail";
}

interface OpenAgendaImage {
  base: string;
  filename: string;
  variants: OpenAgendaImageVariant[];
}

interface OpenAgendaRegistration {
  type: "link" | "email" | "phone";
  value: string;
}

interface OpenAgendaLocation {
  name?: string | null;
}

interface OpenAgendaTiming {
  begin: string;
  end: string;
}

interface OpenAgendaEvent {
  title: string;
  image?: OpenAgendaImage | null;
  billetterie?: string | null;
  registration?: OpenAgendaRegistration[] | null;
  location?: OpenAgendaLocation | null;
  firstTiming?: OpenAgendaTiming | null;
}

interface OpenAgendaEventsResponse {
  total: number;
  events: OpenAgendaEvent[];
  after: (number | string)[] | null;
}

export async function enrichEventsWithOpenAgenda(eventItems: EventItem[]): Promise<EventItem[]> {
  const openAgendaApiKey = getOpenAgendaApiKey();

  if (!openAgendaApiKey || eventItems.length === 0) {
    return eventItems;
  }

  try {
    const matchingWindow = buildMatchingWindow(eventItems);
    const openAgendaEvents = await fetchOpenAgendaEvents(
      openAgendaApiKey,
      matchingWindow.start,
      matchingWindow.end,
    );

    return eventItems.map((eventItem) => mergeWithOpenAgendaEvent(eventItem, openAgendaEvents));
  } catch {
    return eventItems;
  }
}

function getOpenAgendaApiKey(): string | null {
  const expoConfig = Constants.expoConfig;
  const openAgendaApiKey = expoConfig?.extra?.openAgendaApiKey;

  return typeof openAgendaApiKey === "string" && openAgendaApiKey.length > 0 ? openAgendaApiKey : null;
}

async function fetchOpenAgendaEvents(
  openAgendaApiKey: string,
  startDateIso: string,
  endDateIso: string,
): Promise<OpenAgendaEvent[]> {
  const collectedEvents: OpenAgendaEvent[] = [];
  let afterCursor: (number | string)[] | null = null;
  let requestCount = 0;
  let totalEvents = Number.POSITIVE_INFINITY;

  while (requestCount < maxOpenAgendaRequests && collectedEvents.length < totalEvents) {
    const searchParams = new URLSearchParams();
    searchParams.append("monolingual", "fr");
    searchParams.append("size", String(openAgendaPageSize));
    searchParams.append("sort", "timings.asc");
    searchParams.append("timings[gte]", startDateIso);
    searchParams.append("timings[lte]", endDateIso);
    searchParams.append("if[]", "title");
    searchParams.append("if[]", "image");
    searchParams.append("if[]", "billetterie");
    searchParams.append("if[]", "registration");
    searchParams.append("if[]", "location");
    searchParams.append("if[]", "firstTiming");

    for (const cursorValue of afterCursor ?? []) {
      searchParams.append("after[]", String(cursorValue));
    }

    const response = await openAgendaApiClient.get<OpenAgendaEventsResponse>(
      `/agendas/${toulouseOpenAgendaUid}/events?${searchParams.toString()}`,
      {
        headers: {
          key: openAgendaApiKey,
        },
      },
    );

    collectedEvents.push(...response.data.events);
    afterCursor = response.data.after;
    totalEvents = response.data.total;
    requestCount += 1;

    if (!afterCursor) {
      break;
    }
  }

  return collectedEvents;
}

function mergeWithOpenAgendaEvent(eventItem: EventItem, openAgendaEvents: OpenAgendaEvent[]): EventItem {
  const matchingEvent = findBestMatchingOpenAgendaEvent(eventItem, openAgendaEvents);

  if (!matchingEvent) {
    return eventItem;
  }

  return {
    ...eventItem,
    bookingUrl: eventItem.bookingUrl ?? matchingEvent.billetterie ?? extractRegistrationLink(matchingEvent),
    imagePreviewUrl: eventItem.imagePreviewUrl ?? buildImagePreviewUrl(matchingEvent.image),
    imageUrl: eventItem.imageUrl ?? buildImageUrl(matchingEvent.image),
  };
}

function findBestMatchingOpenAgendaEvent(
  eventItem: EventItem,
  openAgendaEvents: OpenAgendaEvent[],
): OpenAgendaEvent | null {
  const scoredCandidates = openAgendaEvents
    .map((openAgendaEvent) => ({
      event: openAgendaEvent,
      score: computeMatchScore(eventItem, openAgendaEvent),
    }))
    .filter((candidate) => candidate.score >= minimumMatchScore)
    .sort((leftCandidate, rightCandidate) => rightCandidate.score - leftCandidate.score);

  return scoredCandidates[0]?.event ?? null;
}

function computeMatchScore(eventItem: EventItem, openAgendaEvent: OpenAgendaEvent): number {
  const normalizedEventTitle = normalizeText(eventItem.title);
  const normalizedAgendaTitle = normalizeText(openAgendaEvent.title);
  const normalizedEventVenue = normalizeText(eventItem.venueName);
  const normalizedAgendaVenue = normalizeText(openAgendaEvent.location?.name ?? "");
  const normalizedEventBookingUrl = normalizeComparableUrl(eventItem.bookingUrl);
  const normalizedAgendaBookingUrl = normalizeComparableUrl(
    openAgendaEvent.billetterie ?? extractRegistrationLink(openAgendaEvent),
  );

  let score = 0;

  if (normalizedEventTitle === normalizedAgendaTitle) {
    score += 8;
  } else if (
    normalizedEventTitle.length > 0 &&
    normalizedAgendaTitle.length > 0 &&
    (normalizedEventTitle.includes(normalizedAgendaTitle) ||
      normalizedAgendaTitle.includes(normalizedEventTitle))
  ) {
    score += 5;
  }

  if (extractEventDate(openAgendaEvent.firstTiming?.begin) === eventItem.startDate) {
    score += 4;
  }

  if (normalizedEventVenue.length > 0 && normalizedEventVenue === normalizedAgendaVenue) {
    score += 4;
  } else if (
    normalizedEventVenue.length > 0 &&
    normalizedAgendaVenue.length > 0 &&
    (normalizedEventVenue.includes(normalizedAgendaVenue) ||
      normalizedAgendaVenue.includes(normalizedEventVenue))
  ) {
    score += 2;
  }

  if (
    normalizedEventBookingUrl.length > 0 &&
    normalizedAgendaBookingUrl.length > 0 &&
    normalizedEventBookingUrl === normalizedAgendaBookingUrl
  ) {
    score += 6;
  }

  return score;
}

function buildMatchingWindow(eventItems: EventItem[]) {
  const parsedDates = eventItems.map((eventItem) => parseEventDate(eventItem.startDate));
  const earliestDate = new Date(Math.min(...parsedDates.map((parsedDate) => parsedDate.getTime())));
  const latestDate = new Date(Math.max(...parsedDates.map((parsedDate) => parsedDate.getTime())));

  earliestDate.setDate(earliestDate.getDate() - matchingWindowPaddingDays);
  earliestDate.setHours(0, 0, 0, 0);

  latestDate.setDate(latestDate.getDate() + matchingWindowPaddingDays);
  latestDate.setHours(23, 59, 59, 999);

  return {
    start: earliestDate.toISOString(),
    end: latestDate.toISOString(),
  };
}

function buildImageUrl(openAgendaImage: OpenAgendaImage | null | undefined): string | null {
  if (!openAgendaImage?.base || !openAgendaImage.filename) {
    return null;
  }

  return `${openAgendaImage.base}${openAgendaImage.filename}`;
}

function buildImagePreviewUrl(openAgendaImage: OpenAgendaImage | null | undefined): string | null {
  if (!openAgendaImage?.base) {
    return null;
  }

  const thumbnailVariant = openAgendaImage.variants.find(
    (imageVariant) => imageVariant.type === "thumbnail",
  );

  if (thumbnailVariant?.filename) {
    return `${openAgendaImage.base}${thumbnailVariant.filename}`;
  }

  return buildImageUrl(openAgendaImage);
}

function extractRegistrationLink(openAgendaEvent: OpenAgendaEvent): string | null {
  const registrationLink = openAgendaEvent.registration?.find(
    (registrationItem) => registrationItem.type === "link",
  );

  return registrationLink?.value ?? null;
}

function extractEventDate(dateValue: string | null | undefined): string | null {
  return dateValue ? dateValue.slice(0, 10) : null;
}

function normalizeComparableUrl(urlValue: string | null | undefined): string {
  if (!urlValue) {
    return "";
  }

  return urlValue
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
}

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
