import { router } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";

import { DestinationCard } from "@/components/DestinationCard";
import { FilterBar } from "@/components/FilterBar";
import { Footer } from "@/components/Footer";
import { HomeTopBar } from "@/components/HomeTopBar";
import { HomeFeedSkeleton } from "@/components/HomeFeedSkeleton";
import { ScreenState } from "@/components/ScreenState";
import { SearchBar } from "@/components/SearchBar";
import { useEventFilters } from "@/hooks/useEventFilters";
import { useEvents } from "@/hooks/useEvents";
import { useFavorites } from "@/hooks/useFavorites";
import { useTheme } from "@/hooks/useTheme";
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

function SectionHeader({
  eyebrow,
  title,
  actionLabel,
}: {
  eyebrow: string;
  title: string;
  actionLabel?: string;
}) {
  const { colors } = useTheme();

  return (
    <View className="mb-3 flex-row items-end justify-between px-1">
      <View>
        <Text className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: colors.textMuted }}>
          {eyebrow}
        </Text>
        <Text className="mt-1 text-xl font-semibold" style={{ color: colors.text }}>
          {title}
        </Text>
      </View>
      {actionLabel ? (
        <Text className="text-sm font-medium" style={{ color: colors.accentSoftText }}>
          {actionLabel}
        </Text>
      ) : null}
    </View>
  );
}

export default function HomeScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const eventsQuery = useEvents();
  const { filters, resetFilters, setCategory, setDateFilter, setProximityEnabled, setSelectedDate, setSortMode } =
    useEventFilters();
  const { isFavorite, isReady, toggleFavorite } = useFavorites();
  const userLocation = useUserLocation(filters.proximityEnabled);

  const loadedEvents = useMemo(
    () => flattenEventPages(eventsQuery.data?.pages),
    [eventsQuery.data?.pages],
  );
  const availableCategories = useMemo(() => collectCategories(loadedEvents), [loadedEvents]);
  const filteredEvents = useMemo(() => {
    const baseEvents = applyEventFilters(loadedEvents, filters, userLocation.coordinates);
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return baseEvents;
    }

    return baseEvents.filter((eventItem) => {
      const searchableText = `${eventItem.title} ${eventItem.category} ${eventItem.venueName}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [filters, loadedEvents, searchQuery, userLocation.coordinates]);
  const rankedEvents = useMemo(() => prioritizePhotoEvents(filteredEvents), [filteredEvents]);
  const popularEvents = useMemo(
    () => rankedEvents.filter((eventItem) => eventItem.imagePreviewUrl || eventItem.imageUrl).slice(0, 8),
    [rankedEvents],
  );
  const weekendEvents = useMemo(() => getUpcomingWeekendEvents(rankedEvents), [rankedEvents]);
  const categoryShelves = useMemo(() => buildCategoryShelves(rankedEvents), [rankedEvents]);

  if (eventsQuery.isPending && loadedEvents.length === 0) {
    return <HomeFeedSkeleton />;
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
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <FlatList
        data={rankedEvents}
        keyExtractor={(eventItem) => eventItem.id}
        renderItem={({ item }) => (
          <DestinationCard
            eventItem={item}
            variant="wide"
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
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 136 }}
        ListHeaderComponent={
          <View className="mb-6 gap-5">
            <HomeTopBar />
            <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
            <FilterBar
              categories={availableCategories}
              filters={filters}
              onCategoryChange={setCategory}
              onDateFilterChange={setDateFilter}
              onSelectedDateChange={setSelectedDate}
              onSortModeChange={setSortMode}
              onProximityToggle={setProximityEnabled}
              onReset={resetFilters}
            />

            {filters.proximityEnabled && userLocation.errorMessage ? (
              <View className="rounded-2xl border border-amber-300/40 bg-amber-500/10 px-4 py-3">
                <Text className="text-sm font-semibold text-amber-100">Localisation indisponible</Text>
                <Text className="mt-1 text-sm leading-5 text-amber-100/80">{userLocation.errorMessage}</Text>
              </View>
            ) : null}

            {userLocation.isLoading ? (
              <View
                className="flex-row items-center gap-3 rounded-2xl px-4 py-3"
                style={{ backgroundColor: colors.accentSoft }}
              >
                <ActivityIndicator size="small" color={colors.accent} />
                <Text className="text-sm" style={{ color: colors.accentSoftText }}>
                  Recherche de votre position...
                </Text>
              </View>
            ) : null}

            {popularEvents.length > 0 ? (
              <View>
                <SectionHeader
                  eyebrow="Selection"
                  title="Sorties populaires"
                  actionLabel="Voir tout"
                />
                <FlatList
                  data={popularEvents}
                  horizontal
                  keyExtractor={(eventItem) => `popular-${eventItem.id}`}
                  renderItem={({ item }) => (
                    <DestinationCard
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
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            ) : null}

            {weekendEvents.length > 0 ? (
              <View>
                <SectionHeader eyebrow="Ce week-end" title="Les sorties qui arrivent" />
                <FlatList
                  data={weekendEvents}
                  horizontal
                  keyExtractor={(eventItem) => `weekend-${eventItem.id}`}
                  renderItem={({ item }) => (
                    <DestinationCard
                      eventItem={item}
                      onPress={() => router.push(`/event/${item.id}`)}
                    />
                  )}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            ) : null}

            {categoryShelves.map((shelf) => (
              <View key={shelf.title}>
                <SectionHeader eyebrow="Categorie" title={shelf.title} actionLabel={`${shelf.items.length} sorties`} />
                <FlatList
                  data={shelf.items}
                  horizontal
                  keyExtractor={(eventItem) => `${shelf.title}-${eventItem.id}`}
                  renderItem={({ item }) => (
                    <DestinationCard
                      eventItem={item}
                      onPress={() => router.push(`/event/${item.id}`)}
                    />
                  )}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            ))}

            <SectionHeader eyebrow="Explorer" title="Toutes les sorties" />
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
                className="mb-4 items-center rounded-full px-5 py-4"
                style={{ backgroundColor: colors.accent }}
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
        initialNumToRender={4}
        maxToRenderPerBatch={6}
        updateCellsBatchingPeriod={40}
        windowSize={7}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
