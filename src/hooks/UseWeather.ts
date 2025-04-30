import { Coordinates } from "@/api/Types";
import { weatherAPI } from "@/api/Weather";
import {  useQuery } from "@tanstack/react-query";

export const QUERY_KEY = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coords: Coordinates) => ["forecast", coords] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
  search:(query:string) => ["location-search",query] as const
} as const;

export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({

        queryKey: QUERY_KEY.weather(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () =>
          coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates,
      },
    );
}
export function useForecastQuery(coordinates: Coordinates | null) {
  return useQuery({
        queryKey: QUERY_KEY.forecast(coordinates ?? { lat: 0, lon: 0 }),  
        queryFn: () =>
          coordinates ? weatherAPI.getForecast(coordinates) : null,
        enabled: !!coordinates,

  });
}
export function useReversGeocodeQuery(coordinates: Coordinates | null) {
  return useQuery({
        queryKey: QUERY_KEY.location(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () =>
          coordinates ? weatherAPI.reversGeocode(coordinates) : null,
        enabled: !!coordinates,
  });
}
  export function useSearchLocationQuery (query: string ) {
    return useQuery({
      queryKey: QUERY_KEY.search(query ),
      queryFn: () =>weatherAPI.SearchLocation(query),
      enabled: query.length >=3
    })
  }
