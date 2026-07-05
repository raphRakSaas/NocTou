import { Image, Pressable, Text, View } from "react-native";

import { getCategoryFallbackImageUrl } from "@/constants/categoryImages";
import { useTheme } from "@/hooks/useTheme";
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
  const { colors } = useTheme();
  const cardImageUrl =
    eventItem.imagePreviewUrl ?? eventItem.imageUrl ?? getCategoryFallbackImageUrl(eventItem.category);

  return (
    <View
      className="mb-4 min-h-[326px] flex-1 overflow-hidden rounded-[24px] border"
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
    >
      <Pressable onPress={onPress}>
        <Image
          source={{ uri: cardImageUrl }}
          resizeMode="cover"
          fadeDuration={100}
          style={{ width: "100%", height: 148 }}
        />

        <View className="min-h-[136px] justify-between px-4 py-4">
          <View>
            <Text className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: colors.textMuted }}>
              {eventItem.category}
            </Text>
            <Text className="mt-2 text-base font-semibold leading-6" style={{ color: colors.text }} numberOfLines={2}>
              {eventItem.title}
            </Text>
            <Text className="mt-2 text-sm" style={{ color: colors.textMuted }} numberOfLines={1}>
              {eventItem.displayDate}
            </Text>
            <Text className="mt-1 text-sm" style={{ color: colors.textMuted }} numberOfLines={1}>
              {eventItem.venueName}
            </Text>
          </View>

          <View className="mt-4 flex-row flex-wrap items-center gap-2">
            {formatDistance(distanceInKilometers) ? (
              <View className="rounded-full px-2.5 py-1" style={{ backgroundColor: colors.accentSoft }}>
                <Text className="text-[11px] font-semibold" style={{ color: colors.accentSoftText }}>
                  {formatDistance(distanceInKilometers)}
                </Text>
              </View>
            ) : null}
            <View className="rounded-full px-2.5 py-1" style={{ backgroundColor: colors.surfaceMuted }}>
              <Text className="text-[11px] font-semibold" style={{ color: colors.text }}>
                {eventItem.price}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>

      <View className="px-4 py-3" style={{ borderTopColor: colors.divider, borderTopWidth: 1 }}>
        <Pressable
          className="items-center rounded-full px-4 py-2"
          style={{
            backgroundColor: isFavorite
              ? colors.favoriteButton.activeBackground
              : colors.favoriteButton.inactiveBackground,
          }}
          onPress={onToggleFavorite}
        >
          <Text
            className="text-sm font-semibold"
            style={{
              color: isFavorite
                ? colors.favoriteButton.activeText
                : colors.favoriteButton.inactiveText,
            }}
          >
            {isFavorite ? "Enregistre" : "Favori"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
