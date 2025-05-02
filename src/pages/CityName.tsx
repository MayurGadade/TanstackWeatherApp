import CurrentWeather from "@/components/CurrentWeather";
import FavoritesButton from "@/components/FavoritesButton";
import HourlyTemperature from "@/components/HourlyTemperature";
import { LoaddingSkeleton } from "@/components/LoaddingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/UseWeather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

const CityName = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") ?? "0");
  const lon = parseFloat(searchParams.get("lon") ?? "0");

  const coordinates = {
    lat,
    lon,
  };
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p>Faild to fatch weather data.</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <LoaddingSkeleton />;
  }

  return (
    <div className="space-y-4 gap">
      {/* fav city */}
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl tracking-tight">
          {params.cityName}, {weatherQuery.data.sys.country}
        </h1>
        <div className="flex gap-2">
          <FavoritesButton
            data={{ ...weatherQuery.data, name: params.cityName }}
          />
        </div>
      </div>
      {/* weather section */}
      <div className="grid gap-6">
        <div className="flex flex-col  gap-4">
          {/* current weather */}
          <CurrentWeather data={weatherQuery.data} />
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

export default CityName;
