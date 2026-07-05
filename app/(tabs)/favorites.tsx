import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { EventCard } from "@/components/EventCard";
import { Footer } from "@/components/Footer";
import { getFloatingTabBarClearance } from "@/components/FloatingTabBar";
import { HeaderActions } from "@/components/HeaderActions";
import { ScreenState } from "@/components/ScreenState";
import { SortiRoseLogo } from "@/components/SortiRoseLogo";
import { useFavorites } from "@/hooks/useFavorites";
import { useTheme } from "@/hooks/useTheme";
import { prioritizePhotoEvents } from "@/utils/events";

const headerContentTopSpacing = 8;

function FavoritesBackButton() {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityLabel="Retour a l'accueil"
      className="h-9 w-9 items-center justify-center rounded-full"
      hitSlop={8}
      style={{ backgroundColor: colors.glass.background, borderColor: colors.glass.border, borderWidth: 1 }}
      onPress={() => router.navigate("/")}
    >
      <Ionicons name="chevron-back" size={20} color={colors.text} />
    </Pressable>
  );
}

function FavoritesTopBar() {
  return (
    <SafeAreaView edges={["top"]}>
      <View
        className="flex-row items-center justify-between"
        style={{ paddingTop: headerContentTopSpacing }}
      >
        <FavoritesBackButton />
        <HeaderActions />
      </View>
    </SafeAreaView>
  );
}

function FavoritesScreenHeader() {
  const { colors } = useTheme();

  return (
    <View className="mb-2">
      <FavoritesTopBar />
      <View
        className="mb-6 mt-4 rounded-[28px] px-5 py-5"
        style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }}
      >
        <SortiRoseLogo size={44} showWordmark subtitle="Vos sorties enregistrees" />
        <Text className="mt-4 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: colors.textMuted }}>
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
  );
}

export default function FavoritesScreen() {
  const { colors } = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const listBottomPadding = getFloatingTabBarClearance(safeAreaInsets.bottom, 24);
  const { favoriteEvents, isFavorite, isReady, toggleFavorite } = useFavorites();
  const rankedFavorites = prioritizePhotoEvents(favoriteEvents);

  if (!isReady) {
    return (
      <View className="flex-1" style={{ backgroundColor: colors.background }}>
        <View className="px-4">
          <FavoritesTopBar />
        </View>
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
        <View className="px-4">
          <FavoritesTopBar />
        </View>
        <ScreenState
          title="Aucun favori"
          description="Ajoutez des sorties depuis l'accueil ou la carte pour les retrouver ici."
        />
        <View className="px-4" style={{ paddingBottom: listBottomPadding }}>
          <Footer />
        </View>
      </View>
    );
  }

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: colors.background }}
      data={rankedFavorites}
      keyExtractor={(eventItem) => eventItem.id}
      renderItem={({ item }) => (
        <EventCard
          eventItem={item}
          isFavorite={isFavorite(item.id)}
          onPress={() => router.push(`/event/${item.id}`)}
          onToggleFavorite={() => {
            if (isReady) {
              void toggleFavorite(item);
            }
          }}
        />
      )}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: listBottomPadding }}
      ListHeaderComponent={<FavoritesScreenHeader />}
      ListFooterComponent={
        <View className="mt-6">
          <Footer />
        </View>
      }
      initialNumToRender={4}
      maxToRenderPerBatch={6}
      updateCellsBatchingPeriod={40}
      windowSize={7}
      showsVerticalScrollIndicator={false}
    />
  );
}
