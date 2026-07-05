import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EventGridCard } from "@/components/EventGridCard";
import { Footer } from "@/components/Footer";
import { HeaderActions } from "@/components/HeaderActions";
import { ScreenState } from "@/components/ScreenState";
import { useEvents } from "@/hooks/useEvents";
import { useFavorites } from "@/hooks/useFavorites";
import { useTheme } from "@/hooks/useTheme";
import { flattenEventPages, prioritizePhotoEvents } from "@/utils/events";

const headerContentTopSpacing = 8;

function MapWebScreenHeader({ locationCount }: { locationCount: number }) {
  const { colors } = useTheme();

  return (
    <SafeAreaView edges={["top"]}>
      <View style={{ paddingTop: headerContentTopSpacing }}>
        <View className="mb-4 flex-row items-start justify-between gap-3">
          <View className="flex-1">
            <Text className="text-xl font-semibold" style={{ color: colors.text }}>
              Carte des sorties
            </Text>
            <Text className="mt-1 text-sm font-semibold" style={{ color: colors.textMuted }}>
              {locationCount} lieux
            </Text>
          </View>
          <HeaderActions />
        </View>
        <View
          className="mb-6 rounded-[28px] px-5 py-5"
          style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }}
        >
          <Text className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: colors.textMuted }}>
            Carte
          </Text>
          <Text className="mt-1 text-3xl font-semibold" style={{ color: colors.text }}>
            Mode web simplifie
          </Text>
          <Text className="mt-3 text-base leading-6" style={{ color: colors.textMuted }}>
            La carte native avec markers, navigation et partage fonctionne sur mobile. Ici, vous gardez
            une vue rapide des evenements geolocalises.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function MapWebTopActions() {
  return (
    <SafeAreaView edges={["top"]}>
      <View className="flex-row items-center justify-end px-4" style={{ paddingTop: headerContentTopSpacing }}>
        <HeaderActions />
      </View>
    </SafeAreaView>
  );
}

export default function MapTabContent() {
  const { colors } = useTheme();
  const eventsQuery = useEvents();
  const { isFavorite, isReady, toggleFavorite } = useFavorites();
  const loadedEvents = prioritizePhotoEvents(flattenEventPages(eventsQuery.data?.pages)).filter(
    (eventItem) => eventItem.coordinates,
  );

  if (eventsQuery.isPending && loadedEvents.length === 0) {
    return (
      <View className="flex-1" style={{ backgroundColor: colors.background }}>
        <MapWebTopActions />
        <ScreenState
          title="Carte mobile"
          description="La carte interactive complete est disponible dans Expo Go sur iOS et Android."
          isLoading
        />
      </View>
    );
  }

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: colors.background }}
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
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 136 }}
      ListHeaderComponent={<MapWebScreenHeader locationCount={loadedEvents.length} />}
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
