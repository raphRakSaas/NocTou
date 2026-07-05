import type { EventItem } from "@/types/event";

const openGraphFetchTimeoutMs = 4000;
const maxConcurrentOpenGraphFetches = 5;

const openGraphImagePatterns = [
  /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]*content=["']([^"']+)["']/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:image(?::secure_url)?["']/i,
];

export async function enrichEventsWithOpenGraphImages(eventItems: EventItem[]): Promise<EventItem[]> {
  const candidateEvents = eventItems.filter(
    (eventItem) => !eventItem.imageUrl && !eventItem.imagePreviewUrl && eventItem.bookingUrl,
  );

  if (candidateEvents.length === 0) {
    return eventItems;
  }

  const openGraphImageByEventId = new Map<string, string>();
  let nextCandidateIndex = 0;

  async function processNextCandidate(): Promise<void> {
    const candidateIndex = nextCandidateIndex;
    nextCandidateIndex += 1;

    if (candidateIndex >= candidateEvents.length) {
      return;
    }

    const candidateEvent = candidateEvents[candidateIndex];
    const openGraphImageUrl = await fetchOpenGraphImage(candidateEvent.bookingUrl as string);

    if (openGraphImageUrl) {
      openGraphImageByEventId.set(candidateEvent.id, openGraphImageUrl);
    }

    return processNextCandidate();
  }

  const workerCount = Math.min(maxConcurrentOpenGraphFetches, candidateEvents.length);
  await Promise.all(Array.from({ length: workerCount }, () => processNextCandidate()));

  if (openGraphImageByEventId.size === 0) {
    return eventItems;
  }

  return eventItems.map((eventItem) => {
    const openGraphImageUrl = openGraphImageByEventId.get(eventItem.id);

    if (!openGraphImageUrl) {
      return eventItem;
    }

    return {
      ...eventItem,
      imageUrl: eventItem.imageUrl ?? openGraphImageUrl,
      imagePreviewUrl: eventItem.imagePreviewUrl ?? openGraphImageUrl,
    };
  });
}

async function fetchOpenGraphImage(pageUrl: string): Promise<string | null> {
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => abortController.abort(), openGraphFetchTimeoutMs);

  try {
    const response = await fetch(pageUrl, {
      signal: abortController.signal,
      headers: {
        Accept: "text/html",
        "User-Agent": "Mozilla/5.0 (compatible; NocTouBot/1.0)",
      },
    });

    if (!response.ok) {
      return null;
    }

    const html = await response.text();

    for (const pattern of openGraphImagePatterns) {
      const match = html.match(pattern);

      if (match?.[1]) {
        return resolveAbsoluteImageUrl(match[1], pageUrl);
      }
    }

    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

function resolveAbsoluteImageUrl(imageUrl: string, pageUrl: string): string {
  try {
    return new URL(imageUrl, pageUrl).toString();
  } catch {
    return imageUrl;
  }
}
