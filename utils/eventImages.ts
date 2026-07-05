import { getCategoryFallbackImageUrl } from "@/constants/categoryImages";
import type { EventItem } from "@/types/event";

export const illustrativeImageDisclaimer =
  "Image illustrative non fournie par l'organisateur. Les visuels proviennent de banques libres de droits.";

export interface ResolvedEventImage {
  imageUrl: string;
  isIllustrativeFallback: boolean;
}

export function resolveEventImage(eventItem: EventItem): ResolvedEventImage {
  const eventImageUrl = eventItem.imageUrl ?? eventItem.imagePreviewUrl;

  if (eventImageUrl) {
    return {
      imageUrl: eventImageUrl,
      isIllustrativeFallback: false,
    };
  }

  return {
    imageUrl: getCategoryFallbackImageUrl(eventItem.category, eventItem.id),
    isIllustrativeFallback: true,
  };
}
