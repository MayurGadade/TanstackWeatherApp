import { useEffect, useState } from "react";
import { Coordinates } from "@/api/Types";

interface GeolocationData {
  coordinates: Coordinates | null;
  error: string | null;
  isloading: boolean;
}

export function useGeolocation() {
  const [locationdata, setLocationdata] = useState<GeolocationData>({
    coordinates: null,
    error: null,
    isloading: true,
  });

  const getlocation = () => {
    setLocationdata((prev) => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setLocationdata((prev) => ({
        ...prev,
        coordinates: null,
        isloading: false,
        error: "Geolocation is not supported by this browser.",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationdata({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isloading: false,
        });
      },
      (error) => {
        let errorMessage: string;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
            break;
        }
        setLocationdata({
          coordinates: null,
          error: errorMessage,
          isloading: false,
        });
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );
  };

  useEffect(() => {
    getlocation();
  }, []);

  return {
    ...locationdata,
    getlocation,
  };
}
