import { Image, Pressable, Text, View } from "react-native";

import { getCategoryFallbackImageUrl } from "@/constants/categoryImages";
import type { EventItem } from "@/types/event";
import { formatDistance } from "@/utils/events";

interface EventGridCardProps {
  eventItem: EventItem;
  distanceInKilometers?: number | null;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
}

export function EventGridCard({
  eventItem,
  distanceInKilometers = null,
  isFavorite,
  onPress,
  onToggleFavorite,
}: EventGridCardProps) {
  const cardImageUrl =
    eventItem.imagePreviewUrl ?? eventItem.imageUrl ?? getCategoryFallbackImageUrl(eventItem.category);

  return (
    <View className="mb-4 min-h-[326px] flex-1 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
      <Pressable onPress={onPress}>
        <Image
          source={{ uri: cardImageUrl }}
          resizeMode="cover"
          fadeDuration={100}
          style={{ width: "100%", height: 148 }}
        />

        <View className="min-h-[136px] justify-between px-4 py-4">
          <View>
            <Text className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              {eventItem.category}
            </Text>
            <Text className="mt-2 text-base font-semibold leading-6 text-slate-950" numberOfLines={2}>
              {eventItem.title}
            </Text>
            <Text className="mt-2 text-sm text-slate-600" numberOfLines={1}>
              {eventItem.displayDate}
            </Text>
            <Text className="mt-1 text-sm text-slate-500" numberOfLines={1}>
              {eventItem.venueName}
            </Text>
          </View>

          <View className="mt-4 flex-row flex-wrap items-center gap-2">
            {formatDistance(distanceInKilometers) ? (
              <View className="rounded-full bg-blue-50 px-2.5 py-1">
                <Text className="text-[11px] font-semibold text-blue-700">
                  {formatDistance(distanceInKilometers)}
                </Text>
              </View>
            ) : null}
            <View className="rounded-full bg-slate-100 px-2.5 py-1">
              <Text className="text-[11px] font-semibold text-slate-700">{eventItem.price}</Text>
            </View>
          </View>
        </View>
      </Pressable>

      <View className="border-t border-slate-100 px-4 py-3">
        <Pressable
          className={`items-center rounded-full px-4 py-2 ${isFavorite ? "bg-slate-900" : "bg-slate-100"}`}
          onPress={onToggleFavorite}
        >
          <Text className={`text-sm font-semibold ${isFavorite ? "text-white" : "text-slate-700"}`}>
            {isFavorite ? "Enregistre" : "Favori"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
