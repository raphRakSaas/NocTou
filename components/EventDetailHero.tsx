import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GlassSurface } from "@/components/GlassSurface";
import { getCategoryFallbackImageUrl } from "@/constants/categoryImages";
import { useTheme } from "@/hooks/useTheme";
import type { EventItem } from "@/types/event";
import { formatLongDate } from "@/utils/events";

interface EventDetailHeroProps {
  eventItem: EventItem;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpenBooking?: () => void;
}

export function EventDetailHero({
  eventItem,
  isFavorite,
  onToggleFavorite,
  onOpenBooking,
}: EventDetailHeroProps) {
  const { colors } = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const heroImageUrl =
    eventItem.imageUrl ?? eventItem.imagePreviewUrl ?? getCategoryFallbackImageUrl(eventItem.category);

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Image
        source={{ uri: heroImageUrl }}
        resizeMode="cover"
        style={{ width: "100%", height: windowHeight * 0.48 }}
      />
      <LinearGradient
        colors={["transparent", colors.background]}
        style={{ position: "absolute", top: windowHeight * 0.34, left: 0, right: 0, height: 120 }}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: safeAreaInsets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="-mt-16 px-4">
          <GlassSurface borderRadius={32}>
            <View className="p-5">
              <View className="flex-row items-start justify-between gap-3">
                <Text className="flex-1 text-3xl font-semibold" style={{ color: colors.text }}>
                  {eventItem.title}
                </Text>
                <Pressable
                  className="h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: colors.surfaceMuted }}
                  onPress={onToggleFavorite}
                >
                  <Ionicons
                    name={isFavorite ? "bookmark" : "bookmark-outline"}
                    size={18}
                    color={isFavorite ? colors.accent : colors.text}
                  />
                </Pressable>
              </View>

              <View className="mt-4 flex-row flex-wrap gap-2">
                <InfoChip colors={colors} icon="calendar-outline" label={eventItem.displayDate || formatLongDate(eventItem.startDate)} />
                <InfoChip colors={colors} icon="cash-outline" label={eventItem.price} />
                <InfoChip colors={colors} icon="location-outline" label={eventItem.city} />
              </View>

              <Text className="mt-5 text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: colors.textMuted }}>
                Description
              </Text>
              <Text className="mt-2 text-base leading-7" style={{ color: colors.textMuted }}>
                {eventItem.description}
              </Text>

              <DetailRow colors={colors} label="Lieu" value={`${eventItem.venueName}\n${eventItem.address}`} />
              <DetailRow colors={colors} label="Categorie" value={eventItem.category} />
              <DetailRow colors={colors} label="Telephone" value={eventItem.bookingPhone ?? "Non communique"} />

              <Pressable
                className="mt-6 items-center rounded-full py-4"
                style={{ backgroundColor: colors.accent }}
                onPress={onOpenBooking}
              >
                <Text className="text-base font-semibold text-white">
                  {eventItem.bookingUrl ? "Reserver maintenant" : "Plus d informations"}
                </Text>
              </Pressable>
            </View>
          </GlassSurface>
        </View>
      </ScrollView>
    </View>
  );
}

interface InfoChipProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  colors: ReturnType<typeof useTheme>["colors"];
}

function InfoChip({ icon, label, colors }: InfoChipProps) {
  return (
    <View
      className="flex-row items-center gap-1 rounded-full px-3 py-2"
      style={{ backgroundColor: colors.surfaceMuted }}
    >
      <Ionicons name={icon} size={14} color={colors.accentSoftText} />
      <Text className="text-xs font-medium" style={{ color: colors.text }}>
        {label}
      </Text>
    </View>
  );
}

interface DetailRowProps {
  label: string;
  value: string;
  colors: ReturnType<typeof useTheme>["colors"];
}

function DetailRow({ label, value, colors }: DetailRowProps) {
  return (
    <View className="mt-4">
      <Text className="text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textMuted }}>
        {label}
      </Text>
      <Text className="mt-1 text-sm leading-6" style={{ color: colors.text }}>
        {value}
      </Text>
    </View>
  );
}
