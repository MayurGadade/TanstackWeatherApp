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

        queryKey: QUERY_KEY.weather(coordinates ?? { lat: 0, lon: 0 }), // USE TO REFATCHING AND CATCHING DATA

        // queryFn: IN THIS WE PUT OUR API CALL TO FATCH DATA
        queryFn: async () =>{
          if(!coordinates) return null
          try{
            return await weatherAPI.getCurrentWeather(coordinates);
          } catch (error) {
            console.error("Weather Error", error);
            throw error;
          }
        },
        enabled: !!coordinates,
      },
    );
}
export function useForecastQuery(coordinates: Coordinates | null) {
  return useQuery({
        queryKey: QUERY_KEY.forecast(coordinates ?? { lat: 0, lon: 0 }),  
        queryFn: async () =>{
          if(!coordinates) return null
          try{
            return await weatherAPI.getForecast(coordinates);
          } catch (error) {
            console.error("Weather Error", error);
            throw error;
          }
        },
        enabled: !!coordinates,

  });
}
export function useReversGeocodeQuery(coordinates: Coordinates | null) {
  return useQuery({
        queryKey: QUERY_KEY.location(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: async () => {
          if (!coordinates) return null;
          try {
            return await weatherAPI.reversGeocode(coordinates);
          } catch (error) {
            console.error("Reverse Geocode Error", error);
            throw error;
          }
        },
        
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
