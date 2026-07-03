import { Image, Pressable, Text, View } from "react-native";

import type { EventItem } from "@/types/event";

interface MapEventSheetProps {
  eventItem: EventItem;
  onOpenDetails: () => void;
  onOpenDirections: () => void;
  onShare: () => void;
}

export function MapEventSheet({
  eventItem,
  onOpenDetails,
  onOpenDirections,
  onShare,
}: MapEventSheetProps) {
  const heroImageUrl = eventItem.imagePreviewUrl ?? eventItem.imageUrl;

  return (
    <View className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
      <View className="flex-row gap-4">
        {heroImageUrl ? (
          <Image
            source={{ uri: heroImageUrl }}
            resizeMode="cover"
            fadeDuration={100}
            style={{ width: 88, height: 88, borderRadius: 20 }}
          />
        ) : (
          <View className="h-[88px] w-[88px] items-center justify-center rounded-[20px] bg-slate-100">
            <Text className="text-xs font-semibold uppercase tracking-wide text-slate-500">Carte</Text>
          </View>
        )}

        <View className="flex-1">
          <Text className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            {eventItem.category}
          </Text>
          <Text className="mt-2 text-lg font-semibold leading-6 text-slate-950" numberOfLines={2}>
            {eventItem.title}
          </Text>
          <Text className="mt-2 text-sm text-slate-600" numberOfLines={1}>
            {eventItem.venueName}
          </Text>
          <Text className="mt-1 text-sm text-slate-500" numberOfLines={1}>
            {eventItem.displayDate}
          </Text>
        </View>
      </View>

      <View className="mt-4 gap-3">
        <Pressable className="items-center rounded-full bg-slate-950 px-4 py-3" onPress={onOpenDirections}>
          <Text className="text-sm font-semibold text-white">Y aller</Text>
        </Pressable>

        <View className="flex-row gap-3">
          <Pressable
            className="flex-1 items-center rounded-full bg-blue-50 px-4 py-3"
            onPress={onOpenDetails}
          >
            <Text className="text-sm font-semibold text-blue-700">Voir la fiche</Text>
          </Pressable>
          <Pressable
            className="flex-1 items-center rounded-full bg-rose-50 px-4 py-3"
            onPress={onShare}
          >
            <Text className="text-sm font-semibold text-rose-700">Partager</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
