import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

import { getCategoryFallbackImageUrl } from "@/constants/categoryImages";
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
  const heroImageUrl =
    eventItem.imagePreviewUrl ?? eventItem.imageUrl ?? getCategoryFallbackImageUrl(eventItem.category);

  return (
    <View className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
      <View className="flex-row gap-4">
        <Image
          source={{ uri: heroImageUrl }}
          resizeMode="cover"
          fadeDuration={100}
          style={{ width: 88, height: 88, borderRadius: 20 }}
        />

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
        <Pressable
          className="min-h-[52px] flex-row items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3"
          onPress={onOpenDirections}
        >
          <Ionicons name="navigate" size={16} color="#FFFFFF" />
          <Text
            allowFontScaling={false}
            adjustsFontSizeToFit
            numberOfLines={1}
            className="text-sm font-semibold text-white"
          >
            Y aller
          </Text>
        </Pressable>

        <View className="flex-row gap-3">
          <Pressable
            className="min-h-[52px] flex-1 flex-row items-center justify-center gap-2 rounded-full bg-blue-50 px-4 py-3"
            onPress={onOpenDetails}
          >
            <Ionicons name="eye-outline" size={16} color="#1D4ED8" />
            <Text allowFontScaling={false} className="text-sm font-semibold text-blue-700">
              Voir la fiche
            </Text>
          </Pressable>
          <Pressable
            className="min-h-[52px] flex-1 flex-row items-center justify-center gap-2 rounded-full bg-rose-50 px-4 py-3"
            onPress={onShare}
          >
            <Ionicons name="share-social-outline" size={16} color="#BE185D" />
            <Text allowFontScaling={false} className="text-sm font-semibold text-rose-700">
              Partager
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
