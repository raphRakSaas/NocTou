import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";

import { EventGridCard } from "@/components/EventGridCard";
import { Footer } from "@/components/Footer";
import { ScreenState } from "@/components/ScreenState";
import { useFavorites } from "@/hooks/useFavorites";
import { useTheme } from "@/hooks/useTheme";
import { prioritizePhotoEvents } from "@/utils/events";

export default function FavoritesScreen() {
  const { colors } = useTheme();
  const { favoriteEvents, isFavorite, isReady, toggleFavorite } = useFavorites();
  const rankedFavorites = prioritizePhotoEvents(favoriteEvents);

  if (!isReady) {
    return (
      <ScreenState
        title="Chargement des favoris"
        description="Recuperation des sorties enregistrees sur votre appareil."
        isLoading
      />
    );
  }

  if (rankedFavorites.length === 0) {
    return (
      <View className="flex-1" style={{ backgroundColor: colors.background }}>
        <ScreenState
          title="Aucun favori"
          description="Ajoutez des sorties depuis l'accueil ou la carte pour les retrouver ici."
        />
        <View className="px-4 pb-28">
          <Footer />
        </View>
      </View>
    );
  }

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: colors.background }}
      className="flex-1"
      data={rankedFavorites}
      keyExtractor={(eventItem) => eventItem.id}
      numColumns={2}
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
        <View className="mb-6 rounded-[28px] px-5 py-5" style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }}>
          <View>
            <Text className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: colors.textMuted }}>
              Collection
            </Text>
            <Text className="mt-1 text-3xl font-semibold" style={{ color: colors.text }}>
              Vos favoris
            </Text>
          </View>
          <Text className="mt-3 text-base leading-6" style={{ color: colors.textMuted }}>
            Les sorties enregistrees restent sur votre appareil et gardent les plus beaux visuels en premier.
          </Text>
        </View>
      }
      ListFooterComponent={<Footer />}
      removeClippedSubviews
      initialNumToRender={6}
      maxToRenderPerBatch={8}
      updateCellsBatchingPeriod={40}
      windowSize={7}
      showsVerticalScrollIndicator={false}
    />
  );
}
