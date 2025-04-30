import React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Button } from "./ui/button";
import { Loader2, Search } from "lucide-react";
import { useSearchLocationQuery } from "@/hooks/UseWeather";

const CitySearch = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { data: locations, isLoading } = useSearchLocationQuery(value);
  console.log("This is locationsss", locations);
  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|[");
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
                console.log(location);
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

          <CommandGroup heading="Favourites">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Recent Search">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>
          <CommandGroup heading="">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
