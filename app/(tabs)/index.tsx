import { Stack, router } from "expo-router";
import { useMemo } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";

import { EventCard } from "@/components/EventCard";
import { EventRailCard } from "@/components/EventRailCard";
import { FilterBar } from "@/components/FilterBar";
import { Footer } from "@/components/Footer";
import { HeroEventCarousel } from "@/components/HeroEventCarousel";
import { ScreenState } from "@/components/ScreenState";
import { useEventFilters } from "@/hooks/useEventFilters";
import { useEvents } from "@/hooks/useEvents";
import { useFavorites } from "@/hooks/useFavorites";
import { useUserLocation } from "@/hooks/useUserLocation";
import {
  applyEventFilters,
  buildCategoryShelves,
  collectCategories,
  flattenEventPages,
  getDistanceInKilometers,
  getUpcomingWeekendEvents,
  prioritizePhotoEvents,
} from "@/utils/events";

export default function HomeScreen() {
  const eventsQuery = useEvents();
  const { filters, resetFilters, setCategory, setDateFilter, setProximityEnabled, setSortMode } =
    useEventFilters();
  const { favoriteEvents, isFavorite, isReady, toggleFavorite } = useFavorites();
  const userLocation = useUserLocation(filters.proximityEnabled);

  const loadedEvents = useMemo(
    () => flattenEventPages(eventsQuery.data?.pages),
    [eventsQuery.data?.pages],
  );
  const availableCategories = useMemo(() => collectCategories(loadedEvents), [loadedEvents]);
  const filteredEvents = useMemo(
    () => applyEventFilters(loadedEvents, filters, userLocation.coordinates),
    [filters, loadedEvents, userLocation.coordinates],
  );
  const rankedEvents = useMemo(() => prioritizePhotoEvents(filteredEvents), [filteredEvents]);
  const featuredEvents = useMemo(
    () => rankedEvents.filter((eventItem) => eventItem.imagePreviewUrl || eventItem.imageUrl).slice(0, 8),
    [rankedEvents],
  );
  const weekendEvents = useMemo(() => getUpcomingWeekendEvents(rankedEvents), [rankedEvents]);
  const categoryShelves = useMemo(() => buildCategoryShelves(rankedEvents), [rankedEvents]);

  if (eventsQuery.isPending && loadedEvents.length === 0) {
    return (
      <ScreenState
        title="Chargement des sorties"
        description="NocTou recupere l'agenda culturel de Toulouse."
        isLoading
      />
    );
  }

  if (eventsQuery.isError && loadedEvents.length === 0) {
    return (
      <ScreenState
        title="Connexion indisponible"
        description="Impossible de charger les sorties pour le moment. Verifiez votre reseau puis relancez."
        actionLabel="Reessayer"
        onActionPress={() => void eventsQuery.refetch()}
      />
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={() => router.push("/legal")}>
              <Text className="text-sm font-semibold text-slate-700">Source</Text>
            </Pressable>
          ),
        }}
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(eventItem) => eventItem.id}
        renderItem={({ item }) => (
          <EventCard
            eventItem={item}
            distanceInKilometers={
              filters.proximityEnabled
                ? getDistanceInKilometers(userLocation.coordinates, item.coordinates)
                : null
            }
            isFavorite={isFavorite(item.id)}
            onPress={() => router.push(`/event/${item.id}`)}
            onToggleFavorite={() => {
              if (isReady) {
                void toggleFavorite(item);
              }
            }}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 136 }}
        ListHeaderComponent={
          <View className="mb-6 gap-5">
            <HeroEventCarousel
              eventItems={featuredEvents}
              favoriteCount={favoriteEvents.length}
              onPressEvent={(eventItem) => router.push(`/event/${eventItem.id}`)}
            />

            <FilterBar
              categories={availableCategories}
              filters={filters}
              onCategoryChange={setCategory}
              onDateFilterChange={setDateFilter}
              onSortModeChange={setSortMode}
              onProximityToggle={setProximityEnabled}
              onReset={resetFilters}
            />

            {filters.proximityEnabled && userLocation.errorMessage ? (
              <View className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                <Text className="text-sm font-semibold text-amber-900">Localisation indisponible</Text>
                <Text className="mt-1 text-sm leading-5 text-amber-800">
                  {userLocation.errorMessage}
                </Text>
              </View>
            ) : null}

            {userLocation.isLoading ? (
              <View className="flex-row items-center gap-3 rounded-2xl bg-blue-50 px-4 py-3">
                <ActivityIndicator size="small" color="#1D4ED8" />
                <Text className="text-sm text-blue-800">Recherche de votre position...</Text>
              </View>
            ) : null}

            {weekendEvents.length > 0 ? (
              <View className="gap-3">
                <View className="flex-row items-end justify-between px-1">
                  <View>
                    <Text className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Ce week-end
                    </Text>
                    <Text className="mt-1 text-xl font-semibold text-slate-950">
                      Les sorties qui arrivent
                    </Text>
                  </View>
                  <Text className="text-sm font-medium text-slate-500">Scroll horizontal</Text>
                </View>

                <FlatList
                  data={weekendEvents}
                  horizontal
                  keyExtractor={(eventItem) => `weekend-${eventItem.id}`}
                  renderItem={({ item }) => (
                    <EventRailCard
                      eventItem={item}
                      onPress={() => router.push(`/event/${item.id}`)}
                    />
                  )}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            ) : null}

            {categoryShelves.map((shelf) => (
              <View key={shelf.title} className="gap-3">
                <View className="flex-row items-end justify-between px-1">
                  <View>
                    <Text className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Categorie
                    </Text>
                    <Text className="mt-1 text-xl font-semibold text-slate-950">{shelf.title}</Text>
                  </View>
                  <Text className="text-sm font-medium text-slate-500">{shelf.items.length} sorties</Text>
                </View>

                <FlatList
                  data={shelf.items}
                  horizontal
                  keyExtractor={(eventItem) => `${shelf.title}-${eventItem.id}`}
                  renderItem={({ item }) => (
                    <EventRailCard
                      eventItem={item}
                      onPress={() => router.push(`/event/${item.id}`)}
                    />
                  )}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            ))}

            <View className="flex-row items-end justify-between px-1">
              <View>
                <Text className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Explorer
                </Text>
                <Text className="mt-1 text-xl font-semibold text-slate-950">Toutes les sorties</Text>
              </View>
              <Text className="text-sm font-medium text-slate-500">1 evenement par ligne</Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <ScreenState
            title="Aucune sortie trouvee"
            description="Aucun evenement ne correspond a vos filtres actuels. Essayez d'elargir la periode ou la categorie."
            actionLabel="Reinitialiser les filtres"
            onActionPress={resetFilters}
          />
        }
        ListFooterComponent={
          <View className="pt-2">
            {eventsQuery.hasNextPage ? (
              <Pressable
                className="mb-4 items-center rounded-full bg-slate-900 px-5 py-4"
                disabled={eventsQuery.isFetchingNextPage}
                onPress={() => void eventsQuery.fetchNextPage()}
              >
                {eventsQuery.isFetchingNextPage ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text className="font-semibold text-white">Charger plus de sorties</Text>
                )}
              </Pressable>
            ) : null}
            <Footer />
          </View>
        }
        onEndReached={() => {
          if (eventsQuery.hasNextPage && !eventsQuery.isFetchingNextPage) {
            void eventsQuery.fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.6}
        removeClippedSubviews
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={40}
        windowSize={7}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
