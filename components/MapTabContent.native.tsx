import { Stack, router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, Linking, Share, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { Footer } from "@/components/Footer";
import { MapEventSheet } from "@/components/MapEventSheet";
import { ScreenState } from "@/components/ScreenState";
import { useEvents } from "@/hooks/useEvents";
import type { EventItem } from "@/types/event";
import { flattenEventPages, prioritizePhotoEvents } from "@/utils/events";

const toulouseRegion = {
  latitude: 43.6045,
  longitude: 1.444,
  latitudeDelta: 0.18,
  longitudeDelta: 0.18,
};

export default function MapTabContent() {
  const eventsQuery = useEvents();
  const [selectedEventId, setSelectedEventId] = useState<string | null | undefined>(undefined);

  const loadedEvents = useMemo(
    () => flattenEventPages(eventsQuery.data?.pages),
    [eventsQuery.data?.pages],
  );
  const mapEvents = useMemo(
    () => prioritizePhotoEvents(loadedEvents).filter((eventItem) => eventItem.coordinates),
    [loadedEvents],
  );
  const selectedEvent = useMemo(() => {
    if (selectedEventId === null) {
      return null;
    }

    if (selectedEventId) {
      return mapEvents.find((eventItem) => eventItem.id === selectedEventId) ?? mapEvents[0] ?? null;
    }

    return mapEvents[0] ?? null;
  }, [mapEvents, selectedEventId]);

  useEffect(() => {
    if (selectedEventId === undefined && mapEvents[0]) {
      setSelectedEventId(mapEvents[0].id);
    }
  }, [mapEvents, selectedEventId]);

  if (eventsQuery.isPending && loadedEvents.length === 0) {
    return (
      <ScreenState
        title="Chargement de la carte"
        description="Preparation des sorties geolocalisees autour de Toulouse."
        isLoading
      />
    );
  }

  if (eventsQuery.isError && loadedEvents.length === 0) {
    return (
      <ScreenState
        title="Carte indisponible"
        description="Impossible de charger les lieux pour le moment. Verifiez votre reseau puis reessayez."
        actionLabel="Reessayer"
        onActionPress={() => void eventsQuery.refetch()}
      />
    );
  }

  if (mapEvents.length === 0) {
    return (
      <View className="flex-1 bg-slate-50">
        <ScreenState
          title="Aucun lieu exploitable"
          description="Aucun evenement avec coordonnees n'est disponible pour la carte."
        />
        <View className="px-4 pb-28">
          <Footer />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <Stack.Screen
        options={{
          headerRight: () => <Text className="text-sm font-semibold text-slate-500">{mapEvents.length} lieux</Text>,
        }}
      />

      <MapView
        initialRegion={toulouseRegion}
        style={{ flex: 1 }}
        onPress={() => {
          if (selectedEventId) {
            setSelectedEventId(null);
          }
        }}
      >
        {mapEvents.map((eventItem) => (
          <Marker
            key={eventItem.id}
            coordinate={{
              latitude: eventItem.coordinates!.latitude,
              longitude: eventItem.coordinates!.longitude,
            }}
            pinColor={selectedEvent?.id === eventItem.id ? "#0F172A" : "#2563EB"}
            title={eventItem.title}
            description={eventItem.venueName}
            onPress={() => setSelectedEventId(eventItem.id)}
          />
        ))}
      </MapView>

      <View className="pointer-events-none absolute inset-x-0 top-0 px-4 pt-4">
        <View className="self-start rounded-full bg-white/92 px-4 py-2">
          <Text className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Carte live
          </Text>
          <Text className="mt-1 text-sm font-semibold text-slate-950">
            Touchez un marker pour afficher la sortie.
          </Text>
        </View>
      </View>

      {selectedEvent ? (
        <View className="absolute inset-x-0 bottom-28 px-4">
          <MapEventSheet
            eventItem={selectedEvent}
            onOpenDetails={() => router.push(`/event/${selectedEvent.id}`)}
            onOpenDirections={() => {
              void openDirectionsChoice(selectedEvent);
            }}
            onShare={() => {
              void shareEvent(selectedEvent);
            }}
          />
        </View>
      ) : null}
    </View>
  );
}

async function openDirectionsChoice(eventItem: EventItem) {
  if (!eventItem.coordinates) {
    return;
  }

  const latitude = eventItem.coordinates.latitude;
  const longitude = eventItem.coordinates.longitude;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  const wazeUrl = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;

  Alert.alert("Y aller", "Choisissez votre application de navigation.", [
    {
      text: "Waze",
      onPress: () => {
        void Linking.openURL(wazeUrl);
      },
    },
    {
      text: "Google Maps",
      onPress: () => {
        void Linking.openURL(googleMapsUrl);
      },
    },
    {
      text: "Annuler",
      style: "cancel",
    },
  ]);
}

async function shareEvent(eventItem: EventItem) {
  const parts = [
    eventItem.title,
    eventItem.venueName,
    eventItem.address,
    eventItem.bookingUrl ? `Reservation: ${eventItem.bookingUrl}` : null,
  ].filter(Boolean);

  await Share.share({
    title: eventItem.title,
    message: parts.join("\n"),
  });
}
