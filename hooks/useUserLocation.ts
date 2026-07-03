import { useEffect, useState } from "react";

import * as Location from "expo-location";

import type { Coordinates } from "@/types/event";

interface UserLocationState {
  coordinates: Coordinates | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export function useUserLocation(isEnabled: boolean): UserLocationState {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadUserLocation() {
      if (!isEnabled) {
        if (isMounted) {
          setIsLoading(false);
          setErrorMessage(null);
        }
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);

      try {
        const permissionResponse = await Location.requestForegroundPermissionsAsync();

        if (permissionResponse.status !== "granted") {
          if (isMounted) {
            setCoordinates(null);
            setErrorMessage("Activez la localisation pour trier les sorties les plus proches.");
            setIsLoading(false);
          }
          return;
        }

        const currentPosition =
          (await Location.getLastKnownPositionAsync()) ??
          (await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }));

        if (isMounted) {
          setCoordinates({
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
          });
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          setCoordinates(null);
          setErrorMessage("Impossible de recuperer votre position pour le moment.");
          setIsLoading(false);
        }
      }
    }

    void loadUserLocation();

    return () => {
      isMounted = false;
    };
  }, [isEnabled]);

  return {
    coordinates,
    isLoading,
    errorMessage,
  };
}
