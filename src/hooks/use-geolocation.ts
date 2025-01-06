import { Coordinates } from "@/utils/types";
import { useEffect, useState } from "react";

interface GeolocationData {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

export const useGeolocation = () => {
  const [locationData, setLocationData] = useState<GeolocationData>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  function getlocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            lat: position?.coords?.latitude,
            lon: position?.coords?.longitude,
          },
          error: null,
          isLoading: false,
        });
        return;
      },
      (error) => {
        let errorMessage: string;
        switch (error?.code) {
          case error?.PERMISSION_DENIED:
            errorMessage = "permission denied";
            break;

          case error?.POSITION_UNAVAILABLE:
            errorMessage = "Permission unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
        }

        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );
  }

  useEffect(() => {
    getlocation();
  }, []);

  return {
    ...locationData,
    getlocation,
  };
};
