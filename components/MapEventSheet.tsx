import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

import { getCategoryFallbackImageUrl } from "@/constants/categoryImages";
import { useTheme } from "@/hooks/useTheme";
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
  const { colors } = useTheme();
  const heroImageUrl =
    eventItem.imagePreviewUrl ?? eventItem.imageUrl ?? getCategoryFallbackImageUrl(eventItem.category);

  return (
    <View
      className="rounded-[28px] border p-4 shadow-sm"
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
    >
      <View className="flex-row gap-4">
        <Image
          source={{ uri: heroImageUrl }}
          resizeMode="cover"
          fadeDuration={100}
          style={{ width: 88, height: 88, borderRadius: 20 }}
        />

        <View className="flex-1">
          <Text className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: colors.textMuted }}>
            {eventItem.category}
          </Text>
          <Text className="mt-2 text-lg font-semibold leading-6" style={{ color: colors.text }} numberOfLines={2}>
            {eventItem.title}
          </Text>
          <Text className="mt-2 text-sm" style={{ color: colors.textMuted }} numberOfLines={1}>
            {eventItem.venueName}
          </Text>
          <Text className="mt-1 text-sm" style={{ color: colors.textMuted }} numberOfLines={1}>
            {eventItem.displayDate}
          </Text>
        </View>
      </View>

      <View className="mt-4 gap-3">
        <Pressable
          className="min-h-[52px] flex-row items-center justify-center gap-2 rounded-full px-4 py-3"
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
            className="min-h-[52px] flex-1 flex-row items-center justify-center gap-2 rounded-full px-4 py-3"
            style={{ backgroundColor: colors.accentSoft }}
            onPress={onOpenDetails}
          >
            <Ionicons name="eye-outline" size={16} color={colors.accentSoftText} />
            <Text allowFontScaling={false} className="text-sm font-semibold" style={{ color: colors.accentSoftText }}>
              Voir la fiche
            </Text>
          </Pressable>
          <Pressable
            className="min-h-[52px] flex-1 flex-row items-center justify-center gap-2 rounded-full px-4 py-3"
            style={{ backgroundColor: colors.surfaceMuted }}
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
