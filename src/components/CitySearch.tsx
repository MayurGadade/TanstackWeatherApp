import React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Button } from "./ui/button";
import { Clock, Loader2, Search, XCircle } from "lucide-react";
import { useSearchLocationQuery } from "@/hooks/UseWeather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "@/hooks/UseSearchHistory";
import { format } from "date-fns";

const CitySearch = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { data: locations, isLoading } = useSearchLocationQuery(value);
  const navigate = useNavigate();
  // console.log("This is locationsss", locations);
  const { history, addHistory, clearHistory } = useSearchHistory();
  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");
    addHistory.mutate({
      value,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    setOpen(false);
  };
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:w-40 lg:w-64"
      >
        <Search className="mr-2 h-4 w-4" /> Search Citys...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search Citys..."
          value={value}
          onValueChange={setValue}
        />
        <CommandList>
          {value.length > 2 && !isLoading && (
            <CommandEmpty>No City found.</CommandEmpty>
          )}

          {locations && locations.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </div>
              )}
              {locations.map((location) => {
                // console.log(location);
                return (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    <span>{location.name},</span>
                    {location.state && (
                      <span className="text-muted-foreground text-sm">
                        {location.state},
                      </span>
                    )}
                    {location.country && (
                      <span className="text-muted-foreground text-sm">
                        {location.country}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          <CommandSeparator />
          {/* <CommandGroup heading="Favourites">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup> */}

          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Search History
                  </p>
                  <Button
                    variant="ghost"
                    className="m-1"
                    onClick={() => clearHistory.mutate()}
                  >
                    <XCircle className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
                {history.map(
                  (location: {
                    lat: number;
                    lon: number;
                    name: string;
                    country: string;
                    searchedAt: number;
                    state?: string;
                  }) => {
                    return (
                      <CommandItem
                        key={`${location.lat}-${location.lon}`}
                        value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                        onSelect={handleSelect}
                      >
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{location.name},</span>
                        {location.state && (
                          <span className="text-muted-foreground text-sm">
                            {location.state},
                          </span>
                        )}
                        {location.country && (
                          <span className="text-muted-foreground text-sm">
                            {location.country}
                          </span>
                        )}
                        {location.searchedAt && (
                          <span className="text-muted-foreground text-sm">
                            {format(location.searchedAt, "MMM d,h:mm a")}
                          </span>
                        )}
                      </CommandItem>
                    );
                  }
                )}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
