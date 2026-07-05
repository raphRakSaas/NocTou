import { Image, Pressable, Text, View } from "react-native";

import { getCategoryFallbackImageUrl } from "@/constants/categoryImages";
import { useTheme } from "@/hooks/useTheme";
import type { EventItem } from "@/types/event";

interface EventRailCardProps {
  eventItem: EventItem;
  onPress: () => void;
}

export function EventRailCard({ eventItem, onPress }: EventRailCardProps) {
  const { colors } = useTheme();
  const railImageUrl =
    eventItem.imagePreviewUrl ?? eventItem.imageUrl ?? getCategoryFallbackImageUrl(eventItem.category);

  return (
    <Pressable
      className="mr-4 w-[268px] overflow-hidden rounded-[28px] border"
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      onPress={onPress}
    >
      <Image
        source={{ uri: railImageUrl }}
        resizeMode="cover"
        fadeDuration={100}
        style={{ width: "100%", height: 152 }}
      />

      <View className="px-4 py-4">
        <Text className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: colors.textMuted }}>
          {eventItem.category}
        </Text>
        <Text className="mt-2 text-xl font-semibold leading-7" style={{ color: colors.text }} numberOfLines={2}>
          {eventItem.title}
        </Text>
        <Text className="mt-2 text-sm" style={{ color: colors.textMuted }}>
          {eventItem.displayDate}
        </Text>
        <Text className="mt-1 text-sm" style={{ color: colors.textMuted }} numberOfLines={1}>
          {eventItem.venueName}
        </Text>
      </View>
    </Pressable>
  );
}
