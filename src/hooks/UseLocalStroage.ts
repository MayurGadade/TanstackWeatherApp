import { useEffect, useState } from "react";

export function useLocalStroage<T>(key:string, initialValue:T){
    const [storeValued, setStoredValue] = useState<T>(() => {
        try{

            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item)) : initialValue
        }catch(e){
            console.error(e);
            return initialValue;
        } 
    })
    useEffect(()=>{
        try{
            window.localStorage.setItem(key, JSON.stringify(storeValued))
        }catch(e){
            console.error(e);
        }
    },[key , storeValued])
    return [storeValued, setStoredValue] as const
}