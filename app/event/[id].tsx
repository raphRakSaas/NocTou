import { Stack, useLocalSearchParams } from "expo-router";
import { Linking } from "react-native";

import { EventDetailHero } from "@/components/EventDetailHero";
import { ScreenState } from "@/components/ScreenState";
import { useEventById } from "@/hooks/useEventById";
import { useFavorites } from "@/hooks/useFavorites";

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
    <>
      <Stack.Screen options={{ headerShown: false, title: eventItem.title }} />
      <EventDetailHero
        eventItem={eventItem}
        isFavorite={isFavorite(eventItem.id)}
        onToggleFavorite={() => {
          if (isReady) {
            void toggleFavorite(eventItem);
          }
        }}
        onOpenBooking={() => {
          if (eventItem.bookingUrl) {
            void Linking.openURL(eventItem.bookingUrl);
          }
        }}
      />
    </>
  );
}
