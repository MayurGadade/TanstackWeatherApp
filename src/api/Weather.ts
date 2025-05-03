import { API_CONFIG } from "./config"
import axios from "axios"
import { Coordinates, ForecastData, GeocodingResponse, WeatherData } from "./Types";

class WeatherAPI{
    private creatUrl(endpoint: string, params:Record<string, string | number>){
        const searchParams = new URLSearchParams({
            appid:API_CONFIG.API_KEY!,
            ...params
        })

        return `${endpoint}?${searchParams}`
    }

    private async fetchData<T>(url:string):Promise<T>{
        try {
            const response = await axios.get(url);
            return response.data;
            
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;            
        }

    }

    async getCurrentWeather({lat,lon}:Coordinates):Promise<WeatherData>{
        const url = this.creatUrl(`${API_CONFIG.BASE_URL}/weather`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units:API_CONFIG.DEFAULT_PARAMS.units,
        });
        // console.log(url)
        return (
            await this.fetchData<WeatherData>(url)
        );
    }

    async getForecast({lat,lon}:Coordinates):Promise<ForecastData>{
        const url = this.creatUrl(`${API_CONFIG.BASE_URL}/forecast`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units:API_CONFIG.DEFAULT_PARAMS.units,
        });
        return this.fetchData<ForecastData>(url);
    }

    async reversGeocode({lat,lon}:Coordinates):Promise<GeocodingResponse[]>{
        const url = this.creatUrl(`${API_CONFIG.GEO}/reverse`,{
            lat:lat.toString(),
            lon:lon.toString(),
            limit:1,
        })
        return this.fetchData<GeocodingResponse[]>(url);
    }
    async SearchLocation(query:string):Promise<GeocodingResponse[]>{
        const url = this.creatUrl(`${API_CONFIG.GEO}/direct`,{
            q:query,
            limit:5,
        })
        return this.fetchData<GeocodingResponse[]>(url);
    }
}

export const weatherAPI = new WeatherAPI();