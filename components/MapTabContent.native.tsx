import { router } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Linking,
  Platform,
  Share,
  Text,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { getFloatingTabBarClearance } from "@/components/FloatingTabBar";
import { Footer } from "@/components/Footer";
import { HeaderActions } from "@/components/HeaderActions";
import { MapEventSheet } from "@/components/MapEventSheet";
import { ScreenState } from "@/components/ScreenState";
import { useAllEventsLoaded } from "@/hooks/useAllEventsLoaded";
import { useEvents } from "@/hooks/useEvents";
import { useTheme } from "@/hooks/useTheme";
import type { EventItem } from "@/types/event";
import { prioritizePhotoEvents } from "@/utils/events";

const headerContentTopSpacing = 8;
const mapHintVisibleDurationMs = 2800;

const toulouseRegion = {
  latitude: 43.6045,
  longitude: 1.444,
  latitudeDelta: 0.18,
  longitudeDelta: 0.18,
};

export default function MapTabContent() {
  const { colors, isDark } = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const eventsQuery = useEvents();
  const { loadedEvents, totalCount, isLoadingAll } = useAllEventsLoaded(eventsQuery);
  const { width } = useWindowDimensions();
  const mapViewRef = useRef<MapView>(null);
  const cardsCarouselRef = useRef<FlatList<EventItem>>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);
  const [showMapHint, setShowMapHint] = useState(true);
  const mapHintOpacity = useRef(new Animated.Value(0)).current;
  const mapSheetBottomOffset = getFloatingTabBarClearance(safeAreaInsets.bottom);

  const mapEvents = useMemo(
    () => prioritizePhotoEvents(loadedEvents).filter((eventItem) => eventItem.coordinates),
    [loadedEvents],
  );
  const selectedEvent = useMemo(() => {
    if (!selectedEventId) {
      return null;
    }

    return mapEvents.find((eventItem) => eventItem.id === selectedEventId) ?? null;
  }, [mapEvents, selectedEventId]);
  const carouselCardWidth = Math.max(width - 32, 300);

  useEffect(() => {
    if (!showMapHint || selectedEventId) {
      return;
    }

    const fadeAnimation = Animated.sequence([
      Animated.timing(mapHintOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.delay(mapHintVisibleDurationMs),
      Animated.timing(mapHintOpacity, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]);

    fadeAnimation.start(({ finished }) => {
      if (finished) {
        setShowMapHint(false);
      }
    });

    return () => {
      fadeAnimation.stop();
    };
  }, [mapHintOpacity, selectedEventId, showMapHint]);

  useEffect(() => {
    if (selectedEventId) {
      setShowMapHint(false);
      mapHintOpacity.setValue(0);
    }
  }, [mapHintOpacity, selectedEventId]);

  if (eventsQuery.isPending && loadedEvents.length === 0) {
    return (
      <View className="flex-1" style={{ backgroundColor: colors.background }}>
        <MapTopActions />
        <ScreenState
          title="Chargement de la carte"
          description="Preparation des sorties geolocalisees autour de Toulouse."
          isLoading
        />
      </View>
    );
  }

  if (eventsQuery.isError && loadedEvents.length === 0) {
    return (
      <View className="flex-1" style={{ backgroundColor: colors.background }}>
        <MapTopActions />
        <ScreenState
          title="Carte indisponible"
          description="Impossible de charger les lieux pour le moment. Verifiez votre reseau puis reessayez."
          actionLabel="Reessayer"
          onActionPress={() => void eventsQuery.refetch()}
        />
      </View>
    );
  }

  if (mapEvents.length === 0) {
    return (
      <View className="flex-1" style={{ backgroundColor: colors.background }}>
        <MapTopActions />
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
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <MapView
        ref={mapViewRef}
        initialRegion={toulouseRegion}
        style={{ flex: 1 }}
        userInterfaceStyle={isDark ? "dark" : "light"}
        onPress={() => {
          setSelectedEventId(null);
          setIsSheetExpanded(false);
        }}
      >
        {mapEvents.map((eventItem) => (
          <Marker
            key={`${eventItem.id}-${selectedEvent?.id === eventItem.id ? "selected" : "default"}`}
            coordinate={{
              latitude: eventItem.coordinates!.latitude,
              longitude: eventItem.coordinates!.longitude,
            }}
            pinColor={selectedEvent?.id === eventItem.id ? "#EF4444" : "#2563EB"}
            title={eventItem.title}
            description={eventItem.venueName}
            onPress={(markerEvent) => {
              markerEvent.stopPropagation?.();
              setSelectedEventId(eventItem.id);
              setIsSheetExpanded(false);
              mapViewRef.current?.animateToRegion(
                {
                  latitude: eventItem.coordinates!.latitude,
                  longitude: eventItem.coordinates!.longitude,
                  latitudeDelta: 0.06,
                  longitudeDelta: 0.06,
                },
                350,
              );

              const nextIndex = mapEvents.findIndex((listedEvent) => listedEvent.id === eventItem.id);

              if (nextIndex >= 0) {
                cardsCarouselRef.current?.scrollToIndex({
                  index: nextIndex,
                  animated: true,
                });
              }
            }}
          />
        ))}
      </MapView>

      <View className="pointer-events-none absolute inset-x-0 top-0">
        <MapScreenHeader
          loadedCount={mapEvents.length}
          totalCount={totalCount}
          isLoadingAll={isLoadingAll}
        />
      </View>

      {showMapHint && !selectedEvent ? (
        <View pointerEvents="none" className="absolute inset-0 items-center justify-center px-8">
          <Animated.View style={{ opacity: mapHintOpacity, maxWidth: 320 }}>
            <MapEphemeralHint />
          </Animated.View>
        </View>
      ) : null}

      {selectedEvent ? (
        <View className="absolute inset-x-0" style={{ bottom: mapSheetBottomOffset }}>
          <FlatList
            ref={cardsCarouselRef}
            data={mapEvents}
            horizontal
            keyExtractor={(eventItem) => `map-card-${eventItem.id}`}
            renderItem={({ item }) => (
              <View style={{ width: carouselCardWidth, marginRight: 12 }}>
                <MapEventSheet
                  eventItem={item}
                  isExpanded={isSheetExpanded && selectedEvent.id === item.id}
                  onToggleExpanded={() => {
                    if (selectedEvent.id === item.id) {
                      setIsSheetExpanded((currentValue) => !currentValue);
                      return;
                    }

                    setSelectedEventId(item.id);
                    setIsSheetExpanded(true);
                  }}
                  onOpenDetails={() => router.push(`/event/${item.id}`)}
                  onOpenDirections={() => {
                    void openDirectionsChoice(item);
                  }}
                  onShare={() => {
                    void shareEvent(item);
                  }}
                />
              </View>
            )}
            pagingEnabled
            snapToInterval={carouselCardWidth + 12}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            getItemLayout={(_, index) => ({
              length: carouselCardWidth + 12,
              offset: (carouselCardWidth + 12) * index,
              index,
            })}
            onMomentumScrollEnd={(event) => {
              const nextIndex = getCarouselIndex(event, carouselCardWidth + 12);
              const nextEvent = mapEvents[nextIndex];

              if (nextEvent) {
                setSelectedEventId(nextEvent.id);
                setIsSheetExpanded(false);
                mapViewRef.current?.animateToRegion(
                  {
                    latitude: nextEvent.coordinates!.latitude,
                    longitude: nextEvent.coordinates!.longitude,
                    latitudeDelta: 0.06,
                    longitudeDelta: 0.06,
                  },
                  350,
                );
              }
            }}
          />
        </View>
      ) : null}
    </View>
  );
}

function MapTopActions() {
  return (
    <SafeAreaView edges={["top"]}>
      <View className="flex-row items-center justify-end px-4" style={{ paddingTop: headerContentTopSpacing }}>
        <HeaderActions />
      </View>
    </SafeAreaView>
  );
}

interface MapScreenHeaderProps {
  loadedCount: number;
  totalCount: number;
  isLoadingAll: boolean;
}

function MapScreenHeader({ loadedCount, totalCount, isLoadingAll }: MapScreenHeaderProps) {
  const { colors, isDark } = useTheme();
  const headerShadowStyle = isDark
    ? {
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 8 },
        elevation: 10,
      }
    : {
        shadowColor: "#64748B",
        shadowOpacity: 0.16,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 8,
      };

  return (
    <SafeAreaView edges={["top"]}>
      <View className="px-4" style={{ paddingTop: headerContentTopSpacing }}>
        <View
          className="rounded-[24px] border p-4"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
            ...headerShadowStyle,
          }}
        >
          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1">
              <Text className="text-xl font-semibold" style={{ color: colors.text }}>
                Carte des sorties
              </Text>
              <View className="mt-1 flex-row items-center gap-2">
                <Text className="text-sm font-semibold" style={{ color: colors.textMuted }}>
                  {loadedCount} lieux affiches
                  {totalCount > loadedCount ? ` / ${totalCount}` : ""}
                </Text>
                {isLoadingAll ? <ActivityIndicator size="small" color={colors.accent} /> : null}
              </View>
            </View>
            <View pointerEvents="auto">
              <HeaderActions />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function MapEphemeralHint() {
  const { colors, isDark } = useTheme();

  return (
    <View
      className="rounded-full border px-5 py-3"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        shadowColor: isDark ? "#000000" : "#64748B",
        shadowOpacity: isDark ? 0.35 : 0.16,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 8 },
        elevation: 10,
      }}
    >
      <Text className="text-center text-sm font-semibold" style={{ color: colors.text }}>
        Touchez un marker pour afficher la sortie
      </Text>
    </View>
  );
}

async function openDirectionsChoice(eventItem: EventItem) {
  if (!eventItem.coordinates) {
    return;
  }

  const latitude = eventItem.coordinates.latitude;
  const longitude = eventItem.coordinates.longitude;
  const encodedLabel = encodeURIComponent(eventItem.venueName || eventItem.title);
  const nativeGeoUrl = `geo:${latitude},${longitude}?q=${latitude},${longitude}(${encodedLabel})`;
  const appleMapsUrl = `http://maps.apple.com/?daddr=${latitude},${longitude}`;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  const wazeUrl = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;

  if (Platform.OS === "android") {
    const canOpenNativeGeo = await Linking.canOpenURL(nativeGeoUrl);

    if (canOpenNativeGeo) {
      await Linking.openURL(nativeGeoUrl);
      return;
    }
  }

  if (Platform.OS === "ios") {
    await Linking.openURL(appleMapsUrl);
    return;
  }

  const canOpenGoogleMaps = await Linking.canOpenURL(googleMapsUrl);

  if (canOpenGoogleMaps) {
    await Linking.openURL(googleMapsUrl);
    return;
  }

  await Linking.openURL(wazeUrl);
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

function getCarouselIndex(
  event: NativeSyntheticEvent<NativeScrollEvent>,
  itemWidth: number,
): number {
  return Math.round(event.nativeEvent.contentOffset.x / itemWidth);
}
