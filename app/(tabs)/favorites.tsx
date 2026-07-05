import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EventGridCard } from "@/components/EventGridCard";
import { Footer } from "@/components/Footer";
import { HeaderActions } from "@/components/HeaderActions";
import { ScreenState } from "@/components/ScreenState";
import { useFavorites } from "@/hooks/useFavorites";
import { useTheme } from "@/hooks/useTheme";
import { prioritizePhotoEvents } from "@/utils/events";

const headerContentTopSpacing = 8;

function FavoritesScreenHeader() {
  const { colors } = useTheme();

  return (
    <SafeAreaView edges={["top"]}>
      <View style={{ paddingTop: headerContentTopSpacing }}>
        <View className="mb-4 flex-row items-center justify-end">
          <HeaderActions />
        </View>
        <View
          className="mb-6 rounded-[28px] px-5 py-5"
          style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }}
        >
          <Text className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: colors.textMuted }}>
            Collection
          </Text>
          <Text className="mt-1 text-3xl font-semibold" style={{ color: colors.text }}>
            Vos favoris
          </Text>
          <Text className="mt-3 text-base leading-6" style={{ color: colors.textMuted }}>
            Les sorties enregistrees restent sur votre appareil et gardent les plus beaux visuels en premier.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function FavoritesTopActions() {
  return (
    <SafeAreaView edges={["top"]}>
      <View className="flex-row items-center justify-end px-4" style={{ paddingTop: headerContentTopSpacing }}>
        <HeaderActions />
      </View>
    </SafeAreaView>
  );
}

export default function FavoritesScreen() {
  const { colors } = useTheme();
  const { favoriteEvents, isFavorite, isReady, toggleFavorite } = useFavorites();
  const rankedFavorites = prioritizePhotoEvents(favoriteEvents);

  if (!isReady) {
    return (
      <View className="flex-1" style={{ backgroundColor: colors.background }}>
        <FavoritesTopActions />
        <ScreenState
          title="Chargement des favoris"
          description="Recuperation des sorties enregistrees sur votre appareil."
          isLoading
        />
      </View>
    );
  }

  if (rankedFavorites.length === 0) {
    return (
      <View className="flex-1" style={{ backgroundColor: colors.background }}>
        <FavoritesTopActions />
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
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 136 }}
      ListHeaderComponent={<FavoritesScreenHeader />}
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
