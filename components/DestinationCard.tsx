import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";

import { EventImageWithBadge } from "@/components/EventImageWithBadge";
import { getCategoryIcon } from "@/constants/categoryIcons";
import { useTheme } from "@/hooks/useTheme";
import type { EventItem } from "@/types/event";
import { formatDistance, formatEventPreviewDate, getPrimaryCategory } from "@/utils/events";
import { resolveEventImage } from "@/utils/eventImages";

interface DestinationCardProps {
  eventItem: EventItem;
  distanceInKilometers?: number | null;
  isFavorite?: boolean;
  onPress: () => void;
  onToggleFavorite?: () => void;
  variant?: "portrait" | "wide";
}

export function DestinationCard({
  eventItem,
  distanceInKilometers = null,
  isFavorite = false,
  onPress,
  onToggleFavorite,
  variant = "portrait",
}: DestinationCardProps) {
  const { colors } = useTheme();
  const { imageUrl: cardImageUrl, isIllustrativeFallback } = resolveEventImage(eventItem);
  const cardWidth = variant === "portrait" ? 210 : undefined;
  const cardHeight = variant === "portrait" ? 300 : 280;
  const previewDate = formatEventPreviewDate(eventItem);

  return (
    <Pressable
      className={`overflow-hidden rounded-[28px] ${variant === "portrait" ? "mr-4" : "mb-4"}`}
      style={{ width: cardWidth, height: cardHeight }}
      onPress={onPress}
      accessibilityLabel={`${eventItem.title}, ${previewDate.label}, ${eventItem.venueName}`}
    >
      <EventImageWithBadge
        imageUrl={cardImageUrl}
        isIllustrativeFallback={isIllustrativeFallback}
        imageStyle={{ width: "100%", height: "100%" }}
        fadeDuration={120}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.15)", "rgba(0,0,0,0.82)"]}
        style={{ position: "absolute", inset: 0 }}
      />

      <View className="absolute inset-x-0 top-0 flex-row items-start justify-between p-4">
        <View
          className="flex-row items-center gap-1 rounded-full px-3 py-1.5"
          style={{ backgroundColor: colors.glass.background, borderColor: colors.glass.border, borderWidth: 1 }}
        >
          <Ionicons name={getCategoryIcon(eventItem.category)} size={12} color={colors.text} />
          <Text className="text-[11px] font-semibold uppercase" style={{ color: colors.text }} numberOfLines={1}>
            {getPrimaryCategory(eventItem.category)}
          </Text>
        </View>

        {onToggleFavorite ? (
          <Pressable
            className="h-9 w-9 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.glass.background, borderColor: colors.glass.border, borderWidth: 1 }}
            onPress={onToggleFavorite}
            accessibilityRole="button"
            accessibilityLabel={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Ionicons
              name={isFavorite ? "bookmark" : "bookmark-outline"}
              size={16}
              color={isFavorite ? colors.accent : colors.text}
            />
          </Pressable>
        ) : null}
      </View>

      <View className="absolute inset-x-0 bottom-0 p-4">
        <Text className="text-2xl font-semibold text-white" numberOfLines={2}>
          {eventItem.title}
        </Text>

        <View className="mt-3 flex-row flex-wrap gap-2">
          <MetadataChip icon="calendar-outline" label={previewDate.label} />
          {previewDate.hasMoreDates ? (
            <MetadataChip icon="time-outline" label="+ dates" />
          ) : null}
          {formatDistance(distanceInKilometers) ? (
            <MetadataChip icon="navigate-outline" label={formatDistance(distanceInKilometers) as string} />
          ) : (
            <MetadataChip icon="business-outline" label={eventItem.venueName} />
          )}
        </View>

        <View className="mt-3 flex-row items-center justify-end gap-2">
          <Text className="text-sm font-medium text-white/85">Explorer</Text>
          <View className="h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: colors.accent }}>
            <Ionicons name="chevron-forward" size={14} color="#FFFFFF" />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

interface MetadataChipProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

function MetadataChip({ icon, label }: MetadataChipProps) {
  return (
    <View className="flex-row items-center gap-1 rounded-full bg-black/35 px-2.5 py-1">
      <Ionicons name={icon} size={12} color="#FFFFFF" />
      <Text className="text-[11px] font-medium text-white" numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}
