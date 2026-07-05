import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

import { getCategoryFallbackImageUrl } from "@/constants/categoryImages";
import { useTheme } from "@/hooks/useTheme";
import type { EventItem } from "@/types/event";
import { formatEventPreviewDate } from "@/utils/events";

interface MapEventSheetProps {
  eventItem: EventItem;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onOpenDetails: () => void;
  onOpenDirections: () => void;
  onShare: () => void;
}

export function MapEventSheet({
  eventItem,
  isExpanded,
  onToggleExpanded,
  onOpenDetails,
  onOpenDirections,
  onShare,
}: MapEventSheetProps) {
  const { colors, isDark } = useTheme();
  const heroImageUrl =
    eventItem.imagePreviewUrl ?? eventItem.imageUrl ?? getCategoryFallbackImageUrl(eventItem.category);
  const previewDate = formatEventPreviewDate(eventItem);
  const cardShadowStyle = isDark
    ? {
        shadowColor: "#000000",
        shadowOpacity: 0.45,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        elevation: 12,
      }
    : {
        shadowColor: "#64748B",
        shadowOpacity: 0.18,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 8,
      };

  const cardBody = (
    <View className="flex-row gap-4">
      <Image
        source={{ uri: heroImageUrl }}
        resizeMode="cover"
        fadeDuration={100}
        style={{ width: 72, height: 72, borderRadius: 18 }}
      />

      <View className="flex-1">
        <View className="flex-row items-start justify-between gap-2">
          <Text className="flex-1 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: colors.textMuted }}>
            {eventItem.category}
          </Text>
          <Pressable
            accessibilityLabel={isExpanded ? "Reduire la carte" : "Afficher les actions"}
            className="h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.surfaceMuted, borderColor: colors.border, borderWidth: 1 }}
            onPress={onToggleExpanded}
          >
            <Ionicons name={isExpanded ? "chevron-down" : "chevron-up"} size={16} color={colors.text} />
          </Pressable>
        </View>

        <Text className="mt-1 text-base font-semibold leading-5" style={{ color: colors.text }} numberOfLines={2}>
          {eventItem.title}
        </Text>
        <Text className="mt-1 text-sm" style={{ color: colors.textMuted }} numberOfLines={1}>
          {eventItem.venueName}
        </Text>
        <View className="mt-2 flex-row flex-wrap items-center gap-2">
          <View
            className="flex-row items-center gap-1 rounded-full px-2.5 py-1"
            style={{ backgroundColor: colors.surfaceMuted, borderColor: colors.border, borderWidth: 1 }}
          >
            <Ionicons name="calendar-outline" size={12} color={colors.accentSoftText} />
            <Text className="text-xs font-medium" style={{ color: colors.text }}>
              {previewDate.label}
            </Text>
          </View>
          {previewDate.hasMoreDates ? (
            <Text className="text-xs font-medium" style={{ color: colors.accentSoftText }}>
              + dates
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );

  if (!isExpanded) {
    return (
      <Pressable
        className="rounded-[24px] border p-4"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
          ...cardShadowStyle,
        }}
        onPress={onOpenDetails}
      >
        {cardBody}
      </Pressable>
    );
  }

  return (
    <View
      className="rounded-[24px] border p-4"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        ...cardShadowStyle,
      }}
    >
      {cardBody}

      <View className="mt-4 gap-3">
        <Pressable
          className="min-h-[48px] flex-row items-center justify-center gap-2 rounded-full px-4 py-3"
          style={{ backgroundColor: colors.primaryButton }}
          onPress={onOpenDirections}
        >
          <Ionicons name="navigate" size={16} color={colors.primaryButtonText} />
          <Text
            allowFontScaling={false}
            adjustsFontSizeToFit
            numberOfLines={1}
            className="text-sm font-semibold"
            style={{ color: colors.primaryButtonText }}
          >
            Y aller
          </Text>
        </Pressable>

        <View className="flex-row gap-3">
          <Pressable
            className="min-h-[48px] flex-1 flex-row items-center justify-center gap-2 rounded-full px-4 py-3"
            style={{ backgroundColor: colors.accentSoft, borderColor: colors.border, borderWidth: 1 }}
            onPress={onOpenDetails}
          >
            <Ionicons name="eye-outline" size={16} color={colors.accentSoftText} />
            <Text allowFontScaling={false} className="text-sm font-semibold" style={{ color: colors.accentSoftText }}>
              Voir la fiche
            </Text>
          </Pressable>
          <Pressable
            className="min-h-[48px] flex-1 flex-row items-center justify-center gap-2 rounded-full px-4 py-3"
            style={{ backgroundColor: colors.surfaceMuted, borderColor: colors.border, borderWidth: 1 }}
            onPress={onShare}
          >
            <Ionicons name="share-social-outline" size={16} color={colors.text} />
            <Text allowFontScaling={false} className="text-sm font-semibold" style={{ color: colors.text }}>
              Partager
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
