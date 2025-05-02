
import { useLocalStroage } from "./UseLocalStroage"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface FavoriteCity {
    id: string
    lat:number
    lon:number
    name:string
    country:string
    state?:string
    addedAt:number
}

export function useFavorite () {
const [favorites, setFavorites] = useLocalStroage<FavoriteCity[]>("Favorites",[])

const queryclient = useQueryClient()

const favoriteQuery=useQuery({
    queryKey: ["favorites"],
    queryFn:()=>favorites,
    initialData:favorites,
    staleTime:Infinity
})
    const addFavorite = useMutation({
        mutationFn:async (city:Omit<FavoriteCity,"id" | "addedAt">)=>{
            const newFavorite={
                ...city,
                id:`${city.lat}-${city.lon}}`,
                addedAt:Date.now(),
            };      
            const exists=favorites.some((fav)=> fav.id===newFavorite.id)
            if(exists){
                return favorites
            }
            const newFavorites = [newFavorite, ...favorites].slice(0,10)
            setFavorites(newFavorites)
            return newFavorite
        },
        onSuccess:()=>{
            queryclient.invalidateQueries({
                queryKey:["favorites"]
            })
        }
    })
    const removeFavorite=useMutation({
        mutationFn:async (cityId:string)=>{
            const newFavorites=favorites.filter((city)=>city.id!==cityId)
            setFavorites(newFavorites);
            return newFavorites
        },
        onSuccess:()=>{
            queryclient.invalidateQueries({
                queryKey:["favorites"]
            })        }
    })
    return{
        favorites:favoriteQuery.data || [],
        addFavorite,
        removeFavorite,
        isFavorite: (lat: number, lon: number) =>
            favorites.some((city) => city.lat === lat && city.lon === lon),
        };

}