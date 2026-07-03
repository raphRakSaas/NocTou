import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";

import { EventGridCard } from "@/components/EventGridCard";
import { Footer } from "@/components/Footer";
import { ScreenState } from "@/components/ScreenState";
import { useEvents } from "@/hooks/useEvents";
import { useFavorites } from "@/hooks/useFavorites";
import { flattenEventPages, prioritizePhotoEvents } from "@/utils/events";

export default function MapTabContent() {
  const eventsQuery = useEvents();
  const { isFavorite, isReady, toggleFavorite } = useFavorites();
  const loadedEvents = prioritizePhotoEvents(flattenEventPages(eventsQuery.data?.pages)).filter(
    (eventItem) => eventItem.coordinates,
  );

  if (eventsQuery.isPending && loadedEvents.length === 0) {
    return (
      <ScreenState
        title="Carte mobile"
        description="La carte interactive complete est disponible dans Expo Go sur iOS et Android."
        isLoading
      />
    );
  }

  return (
    <FlatList
      className="flex-1 bg-slate-50"
      data={loadedEvents}
      numColumns={2}
      keyExtractor={(eventItem) => eventItem.id}
      columnWrapperStyle={{ gap: 12 }}
      renderItem={({ item }) => (
        <View style={{ flex: 1 }}>
          <EventGridCard
            eventItem={item}
            isFavorite={isFavorite(item.id)}
            onPress={() => router.push(`/event/${item.id}`)}
            onToggleFavorite={() => {
              if (isReady) {
                void toggleFavorite(item);
              }
            }}
          />
        </View>
      )}
      contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 136 }}
      ListHeaderComponent={
        <View className="mb-6 rounded-[28px] bg-white px-5 py-5">
          <Text className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Carte</Text>
          <Text className="mt-1 text-3xl font-semibold text-slate-950">Mode web simplifie</Text>
          <Text className="mt-3 text-base leading-6 text-slate-600">
            La carte native avec markers, navigation et partage fonctionne sur mobile. Ici, vous gardez
            une vue rapide des evenements geolocalises.
          </Text>
        </View>
      }
      ListEmptyComponent={
        <ScreenState
          title="Aucun lieu exploitable"
          description="Aucun evenement avec coordonnees n'est disponible pour la carte."
        />
      }
      ListFooterComponent={<Footer />}
      showsVerticalScrollIndicator={false}
    />
  );
}
