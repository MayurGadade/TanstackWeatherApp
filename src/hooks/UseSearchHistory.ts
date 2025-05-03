import { useLocalStorage } from "./UseLocalStroage"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface SearchHistoryItem {
    id: string
    lat:number
    lon:number
    name:string
    value:string
    country:string
    state?:string
    searchedAt:number
}

export function useSearchHistory () {
const [searchHistory, setSearchHistory] = useLocalStorage<SearchHistoryItem[]>("search-history",[])

const queryclient = useQueryClient()

const historyQuery=useQuery({
    queryKey: ["search-history"],
    queryFn:()=>searchHistory,
    initialData:searchHistory,
})
    const addHistory = useMutation({
        mutationFn:async (search:Omit<SearchHistoryItem,"id" | "searchedAt">)=>{
            console.log("This is search",search)
            const newSearch={
                ...search,
                id:`${search.lat}-${search.lon}-${Date.now()}`,
                searchedAt:Date.now(),
            };      
            const fillteredHistory=searchHistory.filter(
                (item:{name:string,lat:number,lon:number})=>!(item.name===search.name && item.lat===search.lat && item.lon===search.lon)
            )
            const newHistory = [newSearch, ...fillteredHistory].slice(0,10)
            setSearchHistory(newHistory)
            return newSearch
        },
        onSuccess:(newHistory)=>{
            queryclient.setQueryData(["search-history"],newHistory)
        }
    })
    const clearHistory=useMutation({
        mutationFn:async ()=>{
            
            setSearchHistory([]);
            return []
        },
        onSuccess:()=>{
            queryclient.setQueryData(["search-history"],[])
        }
    })
    return{
        history:historyQuery.data || [],
        addHistory,
        clearHistory
    }

}