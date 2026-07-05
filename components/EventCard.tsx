import { Image, Pressable, Text, View } from "react-native";

import { getCategoryFallbackImageUrl } from "@/constants/categoryImages";
import type { EventItem } from "@/types/event";
import { formatDistance } from "@/utils/events";

interface EventCardProps {
  eventItem: EventItem;
  distanceInKilometers?: number | null;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
}

export function EventCard({
  eventItem,
  distanceInKilometers = null,
  isFavorite,
  onPress,
  onToggleFavorite,
}: EventCardProps) {
  const cardImageUrl =
    eventItem.imagePreviewUrl ?? eventItem.imageUrl ?? getCategoryFallbackImageUrl(eventItem.category);

  return (
    <View className="mb-4 overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <Pressable onPress={onPress}>
        <View>
          <Image
            source={{ uri: cardImageUrl }}
            resizeMode="cover"
            fadeDuration={120}
            style={{ width: "100%", height: 208 }}
          />
          <View className="absolute inset-x-0 bottom-0 bg-black/40 px-5 py-4">
            <Text className="text-xs font-semibold uppercase tracking-wide text-white/85">
              {eventItem.category}
            </Text>
            <Text className="mt-3 text-2xl font-semibold text-white">{eventItem.title}</Text>
            <Text className="mt-2 text-sm text-white/85">{eventItem.displayDate}</Text>
          </View>
        </View>
        <View className="px-5 py-4">
          <Text className="text-sm font-medium text-slate-900">{eventItem.venueName}</Text>
          <Text className="mt-1 text-sm leading-5 text-slate-600">{eventItem.summary}</Text>
          <View className="mt-4 flex-row flex-wrap items-center gap-2">
            <View className="rounded-full bg-slate-100 px-3 py-1">
              <Text className="text-xs font-medium text-slate-700">{eventItem.price}</Text>
            </View>
            {formatDistance(distanceInKilometers) ? (
              <View className="rounded-full bg-blue-50 px-3 py-1">
                <Text className="text-xs font-medium text-blue-700">
                  {formatDistance(distanceInKilometers)}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </Pressable>
      <View className="flex-row items-center justify-between border-t border-slate-100 px-5 py-4">
        <Text className="text-sm font-medium text-slate-500">{eventItem.city}</Text>
        <Pressable className="rounded-full bg-slate-900 px-4 py-2" onPress={onToggleFavorite}>
          <Text className="text-sm font-semibold text-white">
            {isFavorite ? "Retirer" : "Favori"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
