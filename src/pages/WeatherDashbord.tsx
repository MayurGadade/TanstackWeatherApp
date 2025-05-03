import { LoaddingSkeleton } from "@/components/LoaddingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/UseGeolocation";
import {
  useForecastQuery,
  useReversGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/UseWeather";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemperature from "@/components/HourlyTemperature";
import { GeocodingResponse } from "@/api/Types";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import Favoritecity from "@/components/Favoritecity";

const WeatherDashbord = () => {
  const {
    coordinates,
    getlocation,
    error: locationError,
    isloading: locationLoading,
  } = useGeolocation();
  // console.log(coordinates);
  // if (!coordinates) {
  //   return (
  //     <div>
  //       <Loader2 className="animate-spin" />
  //     </div>
  //   );
  // }
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReversGeocodeQuery(coordinates);
  // console.log(forecastQuery.data?.city.name);

  const handleRefresh = () => {
    getlocation();
    if (coordinates) {
      // Fetch weather data using coordinates
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (locationLoading) {
    return <LoaddingSkeleton />;
  }

  if (locationError) {
    return (
      <>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            <p>{locationError}</p>
            <Button onClick={getlocation} variant={"outline"} className="w-fit">
              <MapPin className="w-4 h-4" />
              Enable Location
            </Button>
          </AlertDescription>
        </Alert>
      </>
    );
  }

  if (!coordinates) {
    return (
      <>
        <Alert variant="destructive">
          <AlertTitle>Location Required</AlertTitle>
          <AlertDescription className="flex flex-col ga[-4">
            <p>Please enable location to use this app </p>
            <Button onClick={getlocation} variant={"outline"} className="w-fit">
              <MapPin className="w-4 h-4" />
              Enable Location
            </Button>
          </AlertDescription>
        </Alert>
      </>
    );
  }

  const locationName = locationQuery.data?.[0];
  // console.log(locationName);
  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p>Faild to fatch weather data.</p>
          <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
            <RefreshCcw className="w-4 h-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <LoaddingSkeleton />;
  }

  return (
    <div className="space-y-4 gap">
      {/* fav city */}
      <Favoritecity />
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCcw
            className={`w-4 h-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          ></RefreshCcw>
        </Button>
      </div>
      {/* weather section */}
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* current weather */}
          <CurrentWeather
            data={weatherQuery.data}
            location={locationName as GeocodingResponse}
          />
          {/* Hourly Weather */}
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* details */}
          <WeatherDetails data={weatherQuery.data} />
          {/* forcast */}
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashbord;
