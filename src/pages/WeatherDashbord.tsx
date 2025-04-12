import { LoaddingSkeleton } from "@/components/LoaddingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/UseGeolocation";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";

const WeatherDashbord = () => {
  const {
    coordinates,
    getlocation,
    error: locationError,
    isloading: locationLoading,
  } = useGeolocation();
  const handleRefresh = () => {
    getlocation();
    if (coordinates) {
      // Fetch weather data using coordinates
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

  return (
    <div className="space-y-4">
      {/* fav city */}
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl tracking-tight">My Location</h1>
        <Button variant={"outline"} size={"icon"} onClick={handleRefresh}>
          <RefreshCcw className="w-4 h-4"></RefreshCcw>
        </Button>
      </div>
      {/* current weather */}
    </div>
  );
};

export default WeatherDashbord;
