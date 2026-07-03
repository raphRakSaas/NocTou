import { router } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

import { EventGridCard } from "@/components/EventGridCard";
import { Footer } from "@/components/Footer";
import { ScreenState } from "@/components/ScreenState";
import { useFavorites } from "@/hooks/useFavorites";
import { prioritizePhotoEvents } from "@/utils/events";

export default function FavoritesScreen() {
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
      <View className="flex-1 bg-slate-50">
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
      className="flex-1 bg-slate-50"
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
        <View className="mb-6 rounded-[28px] bg-white px-5 py-5">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Collection
              </Text>
              <Text className="mt-1 text-3xl font-semibold text-slate-950">Vos favoris</Text>
            </View>
            <Pressable onPress={() => router.push("/legal")}>
              <Text className="text-sm font-semibold text-slate-700">Source</Text>
            </Pressable>
          </View>
          <Text className="mt-3 text-base leading-6 text-slate-600">
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
