import { Pressable, Text, View } from "react-native";

import { EventImageWithBadge } from "@/components/EventImageWithBadge";
import { useTheme } from "@/hooks/useTheme";
import type { EventItem } from "@/types/event";
import { formatDistance } from "@/utils/events";
import { resolveEventImage } from "@/utils/eventImages";

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
  const { colors } = useTheme();
  const { imageUrl: cardImageUrl, isIllustrativeFallback } = resolveEventImage(eventItem);

  return (
    <View
      className="mb-4 overflow-hidden rounded-3xl border"
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
    >
      <Pressable onPress={onPress}>
        <View>
          <EventImageWithBadge
            imageUrl={cardImageUrl}
            isIllustrativeFallback={isIllustrativeFallback}
            imageStyle={{ width: "100%", height: 208 }}
            fadeDuration={120}
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
          <Text className="text-sm font-medium" style={{ color: colors.text }}>
            {eventItem.venueName}
          </Text>
          <Text className="mt-1 text-sm leading-5" style={{ color: colors.textMuted }}>
            {eventItem.summary}
          </Text>
          <View className="mt-4 flex-row flex-wrap items-center gap-2">
            <View className="rounded-full px-3 py-1" style={{ backgroundColor: colors.surfaceMuted }}>
              <Text className="text-xs font-medium" style={{ color: colors.text }}>
                {eventItem.price}
              </Text>
            </View>
            {formatDistance(distanceInKilometers) ? (
              <View className="rounded-full px-3 py-1" style={{ backgroundColor: colors.accentSoft }}>
                <Text className="text-xs font-medium" style={{ color: colors.accentSoftText }}>
                  {formatDistance(distanceInKilometers)}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </Pressable>
      <View
        className="flex-row items-center justify-between px-5 py-4"
        style={{ borderTopColor: colors.divider, borderTopWidth: 1 }}
      >
        <Text className="text-sm font-medium" style={{ color: colors.textMuted }}>
          {eventItem.city}
        </Text>
        <Pressable
          className="rounded-full px-4 py-2"
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
            {isFavorite ? "Retirer" : "Favori"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
