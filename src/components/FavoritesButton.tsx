import { WeatherData } from "@/api/Types";
import { useFavorite } from "@/hooks/useFavorite";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface FavoritesButtonProps {
  data: WeatherData;
}

const FavoritesButton = ({ data }: FavoritesButtonProps) => {
  const { addFavorite, isFavorite, removeFavorite } = useFavorite();
  const isCurrentFavorite = isFavorite(data.coord.lat, data.coord.lon);

  const handkeToggleFavorite = () => {
    if (isCurrentFavorite) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from favorites`);
    } else {
      addFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to favorites`);
    }
  };
  return (
    <Button
      variant={isCurrentFavorite ? "default" : "outline"}
      size={"icon"}
      className={isCurrentFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
      onClick={handkeToggleFavorite}
    >
      <Star
        className={`h-4 w-4 ${
          isCurrentFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""
        }`}
      />
    </Button>
  );
};

export default FavoritesButton;
