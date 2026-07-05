import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getCategoryFallbackImageUrl } from "@/constants/categoryImages";
import { useTheme } from "@/hooks/useTheme";
import type { EventItem } from "@/types/event";
import { formatLongDate } from "@/utils/events";

const heroHeightRatio = 0.44;
const sheetBorderRadius = 32;
const sheetOverlap = 24;
const fixedCtaBarHeight = 88;

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
  const { colors, isDark } = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const heroImageUrl =
    eventItem.imageUrl ?? eventItem.imagePreviewUrl ?? getCategoryFallbackImageUrl(eventItem.category);
  const heroHeight = windowHeight * heroHeightRatio;
  const bottomInset = safeAreaInsets.bottom + 12;

  return (
    <View className="flex-1" style={{ backgroundColor: colors.surface }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: fixedCtaBarHeight + bottomInset,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: heroHeight }}>
          <Image
            source={{ uri: heroImageUrl }}
            resizeMode="cover"
            style={{ width: "100%", height: heroHeight }}
          />
          <LinearGradient
            colors={["transparent", isDark ? "rgba(23, 28, 36, 0.35)" : "rgba(255, 255, 255, 0.2)", colors.surface]}
            locations={[0, 0.55, 1]}
            style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: heroHeight * 0.42 }}
          />
        </View>

        <View
          style={{
            flexGrow: 1,
            marginTop: -sheetOverlap,
            borderTopLeftRadius: sheetBorderRadius,
            borderTopRightRadius: sheetBorderRadius,
            backgroundColor: colors.surface,
            paddingHorizontal: 20,
            paddingTop: 28,
            paddingBottom: 24,
            minHeight: windowHeight - heroHeight + sheetOverlap,
          }}
        >
          <View className="flex-row items-start justify-between gap-3">
            <Text className="flex-1 text-3xl font-semibold leading-9" style={{ color: colors.text }}>
              {eventItem.title}
            </Text>
            <Pressable
              className="h-10 w-10 items-center justify-center rounded-full"
              style={{
                backgroundColor: colors.surfaceMuted,
                borderColor: colors.border,
                borderWidth: 1,
              }}
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
            <InfoChip
              colors={colors}
              icon="calendar-outline"
              label={eventItem.displayDate || formatLongDate(eventItem.startDate)}
            />
            <InfoChip colors={colors} icon="cash-outline" label={eventItem.price} />
            <InfoChip colors={colors} icon="location-outline" label={eventItem.city} />
          </View>

          <Text className="mt-6 text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: colors.textMuted }}>
            Description
          </Text>
          <Text className="mt-2 text-base leading-7" style={{ color: colors.textMuted }}>
            {eventItem.description}
          </Text>

          <DetailRow colors={colors} label="Lieu" value={`${eventItem.venueName}\n${eventItem.address}`} />
          <DetailRow colors={colors} label="Categorie" value={eventItem.category} />
          <DetailRow colors={colors} label="Telephone" value={eventItem.bookingPhone ?? "Non communique"} />
        </View>
      </ScrollView>

      <View
        className="absolute inset-x-0 top-0 px-4"
        style={{ paddingTop: safeAreaInsets.top + 8 }}
        pointerEvents="box-none"
      >
        <Pressable
          accessibilityLabel="Retour"
          className="h-10 w-10 items-center justify-center rounded-full"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            opacity: 0.94,
          }}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={20} color={colors.text} />
        </Pressable>
      </View>

      <View
        className="absolute inset-x-0 bottom-0 border-t px-4 pt-3"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
          paddingBottom: bottomInset,
          shadowColor: isDark ? "#000000" : "#64748B",
          shadowOpacity: isDark ? 0.28 : 0.12,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: -4 },
          elevation: 12,
        }}
      >
        <Pressable
          className="items-center rounded-full py-4"
          style={{ backgroundColor: colors.accent }}
          onPress={onOpenBooking}
        >
          <Text className="text-base font-semibold text-white">
            {eventItem.bookingUrl ? "Reserver maintenant" : "Plus d informations"}
          </Text>
        </Pressable>
      </View>
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
      style={{ backgroundColor: colors.surfaceMuted, borderColor: colors.border, borderWidth: 1 }}
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
