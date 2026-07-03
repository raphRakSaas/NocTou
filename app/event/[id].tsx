import { Stack, useLocalSearchParams } from "expo-router";
import { Image, Linking, Pressable, ScrollView, Text, View } from "react-native";

import { Footer } from "@/components/Footer";
import { ScreenState } from "@/components/ScreenState";
import { useEventById } from "@/hooks/useEventById";
import { useFavorites } from "@/hooks/useFavorites";
import { formatLongDate, getCategoryTint } from "@/utils/events";

export default function EventDetailsScreen() {
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

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ paddingBottom: 24 }}>
      <Stack.Screen options={{ title: eventItem.title }} />

      <View className="mx-4 mt-4 overflow-hidden rounded-[32px] border border-slate-200 bg-white">
        {eventItem.imageUrl ? (
          <Image
            source={{ uri: eventItem.imageUrl }}
            resizeMode="cover"
            fadeDuration={160}
            style={{ width: "100%", height: 264 }}
          />
        ) : (
          <View
            className="px-6 py-8"
            style={{ backgroundColor: getCategoryTint(eventItem.category) }}
          >
            <Text className="text-xs font-semibold uppercase tracking-wide text-slate-700">
              {eventItem.category}
            </Text>
            <Text className="mt-3 text-3xl font-semibold text-slate-950">{eventItem.title}</Text>
            <Text className="mt-3 text-base text-slate-700">{eventItem.displayDate}</Text>
            <Text className="mt-1 text-sm text-slate-700">{eventItem.venueName}</Text>
          </View>
        )}

        <View className="gap-6 px-6 py-6">
          {eventItem.imageUrl ? (
            <View className="gap-2">
              <Text className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {eventItem.category}
              </Text>
              <Text className="text-3xl font-semibold text-slate-950">{eventItem.title}</Text>
              <Text className="text-base text-slate-700">{eventItem.displayDate}</Text>
              <Text className="text-sm text-slate-600">{eventItem.venueName}</Text>
            </View>
          ) : null}

          <View className="flex-row flex-wrap gap-3">
            <View className="rounded-full bg-slate-100 px-3 py-2">
              <Text className="text-sm font-medium text-slate-700">{eventItem.price}</Text>
            </View>
            <View className="rounded-full bg-blue-50 px-3 py-2">
              <Text className="text-sm font-medium text-blue-700">{eventItem.eventType}</Text>
            </View>
          </View>

          <DetailBlock label="Date" value={formatLongDate(eventItem.startDate)} />
          <DetailBlock label="Lieu" value={`${eventItem.venueName}\n${eventItem.address}`} />
          <DetailBlock label="Description" value={eventItem.description} />
          <DetailBlock label="Tarif enfant" value={eventItem.childPrice ?? "Non communique"} />
          <DetailBlock label="Station a proximite" value={eventItem.metroStation ?? "Non communiquee"} />
          <DetailBlock label="Telephone" value={eventItem.bookingPhone ?? "Non communique"} />
          <DetailBlock label="Email" value={eventItem.bookingEmail ?? "Non communique"} />

          <View className="gap-3">
            <Pressable
              className="items-center rounded-full bg-slate-900 px-5 py-4"
              onPress={() => {
                if (isReady) {
                  void toggleFavorite(eventItem);
                }
              }}
            >
              <Text className="font-semibold text-white">
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
}

function DetailBlock({ label, value }: DetailBlockProps) {
  return (
    <View className="gap-2">
      <Text className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</Text>
      <Text className="text-base leading-7 text-slate-800">{value}</Text>
    </View>
  );
}
