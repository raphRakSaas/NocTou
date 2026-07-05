import { Stack, useLocalSearchParams } from "expo-router";
import { Image, Linking, Pressable, ScrollView, Text, View } from "react-native";

import { Footer } from "@/components/Footer";
import { ScreenState } from "@/components/ScreenState";
import { getCategoryFallbackImageUrl } from "@/constants/categoryImages";
import { useEventById } from "@/hooks/useEventById";
import { useFavorites } from "@/hooks/useFavorites";
import { useTheme } from "@/hooks/useTheme";
import { formatLongDate } from "@/utils/events";

export default function EventDetailsScreen() {
  const { colors } = useTheme();
  const routeParams = useLocalSearchParams<{ id: string }>();
  const eventId = typeof routeParams.id === "string" ? routeParams.id : "";
  const eventQuery = useEventById(eventId);
  const { isFavorite, isReady, toggleFavorite } = useFavorites();

  if (eventQuery.isPending && !eventQuery.data) {
    return (
      <ScreenState
        title="Chargement de la fiche"
        description="Preparation des informations de la sortie."
        isLoading
      />
    );
  }

  if (eventQuery.isError || !eventQuery.data) {
    return (
      <ScreenState
        title="Fiche indisponible"
        description="Cette sortie n'a pas pu etre chargee. Revenez a la liste puis reessayez."
        actionLabel="Recharger"
        onActionPress={() => void eventQuery.refetch()}
      />
    );
  }

  const eventItem = eventQuery.data;
  const heroImageUrl =
    eventItem.imageUrl ?? eventItem.imagePreviewUrl ?? getCategoryFallbackImageUrl(eventItem.category);

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <Stack.Screen options={{ title: eventItem.title }} />

      <View
        className="mx-4 mt-4 overflow-hidden rounded-[32px] border"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        <Image
          source={{ uri: heroImageUrl }}
          resizeMode="cover"
          fadeDuration={160}
          style={{ width: "100%", height: 264 }}
        />

        <View className="gap-6 px-6 py-6">
          <View className="gap-2">
            <Text className="text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textMuted }}>
              {eventItem.category}
            </Text>
            <Text className="text-3xl font-semibold" style={{ color: colors.text }}>
              {eventItem.title}
            </Text>
            <Text className="text-base" style={{ color: colors.textMuted }}>
              {eventItem.displayDate}
            </Text>
            <Text className="text-sm" style={{ color: colors.textMuted }}>
              {eventItem.venueName}
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-3">
            <View className="rounded-full px-3 py-2" style={{ backgroundColor: colors.surfaceMuted }}>
              <Text className="text-sm font-medium" style={{ color: colors.text }}>
                {eventItem.price}
              </Text>
            </View>
            <View className="rounded-full px-3 py-2" style={{ backgroundColor: colors.accentSoft }}>
              <Text className="text-sm font-medium" style={{ color: colors.accentSoftText }}>
                {eventItem.eventType}
              </Text>
            </View>
          </View>

          <DetailBlock colors={colors} label="Date" value={formatLongDate(eventItem.startDate)} />
          <DetailBlock colors={colors} label="Lieu" value={`${eventItem.venueName}\n${eventItem.address}`} />
          <DetailBlock colors={colors} label="Description" value={eventItem.description} />
          <DetailBlock colors={colors} label="Tarif enfant" value={eventItem.childPrice ?? "Non communique"} />
          <DetailBlock
            colors={colors}
            label="Station a proximite"
            value={eventItem.metroStation ?? "Non communiquee"}
          />
          <DetailBlock colors={colors} label="Telephone" value={eventItem.bookingPhone ?? "Non communique"} />
          <DetailBlock colors={colors} label="Email" value={eventItem.bookingEmail ?? "Non communique"} />

          <View className="gap-3">
            <Pressable
              className="items-center rounded-full px-5 py-4"
              style={{ backgroundColor: colors.primaryButton }}
              onPress={() => {
                if (isReady) {
                  void toggleFavorite(eventItem);
                }
              }}
            >
              <Text className="font-semibold" style={{ color: colors.primaryButtonText }}>
                {isFavorite(eventItem.id) ? "Retirer des favoris" : "Enregistrer en favori"}
              </Text>
            </Pressable>

            {eventItem.bookingUrl ? (
              <Pressable
                className="items-center rounded-full bg-blue-700 px-5 py-4"
                onPress={() => void Linking.openURL(eventItem.bookingUrl as string)}
              >
                <Text className="font-semibold text-white">Ouvrir la reservation</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>

      <View className="mx-4 mt-4">
        <Footer />
      </View>
    </ScrollView>
  );
}

interface DetailBlockProps {
  label: string;
  value: string;
  colors: ReturnType<typeof useTheme>["colors"];
}

function DetailBlock({ label, value, colors }: DetailBlockProps) {
  return (
    <View className="gap-2">
      <Text className="text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textMuted }}>
        {label}
      </Text>
      <Text className="text-base leading-7" style={{ color: colors.text }}>
        {value}
      </Text>
    </View>
  );
}
