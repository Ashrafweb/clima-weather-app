import { API_CONFIG } from "./config";
import {
  Coordinates,
  ForecastData,
  GeocodingResponse,
  WeatherData,
} from "./types";

type Params = {
  endpoint: string;
  params: Record<string, string | number>;
};

class WeatherAPI {
  private createUrl({ endpoint, params }: Params) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });

    return `${endpoint}?${searchParams.toString()}`;
  }

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Weather API Error : " + response.statusText);
    }
    return response.json();
  }

  async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
    const url = this.createUrl({
      endpoint: `${API_CONFIG.BASE_URL}/weather`,
      params: { lat: lat.toString(), lon: lon.toString(), units: "metric" },
    });
    const response = this.fetchData<WeatherData>(url);
    return response;
  }

  async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
    const url = this.createUrl({
      endpoint: `${API_CONFIG.BASE_URL}/forecast`,
      params: {
        lat: lat.toString(),
        lon: lon.toString(),
        units: "metric",
      },
    });
    return this.fetchData<ForecastData>(url);
  }

  async reverseGeocode({
    lat,
    lon,
  }: Coordinates): Promise<GeocodingResponse[]> {
    const url = this.createUrl({
      endpoint: `${API_CONFIG.GEO}/reverse`,
      params: {
        lat: lat.toString(),
        lon: lon.toString(),
        limit: "1",
      },
    });
    return this.fetchData<GeocodingResponse[]>(url);
  }

  async searchLocations(query: string): Promise<GeocodingResponse[]> {
    const url = this.createUrl({
      endpoint: `${API_CONFIG.GEO}/direct`,
      params: {
        q: query,
        limit: "5",
      },
    });
    return this.fetchData<GeocodingResponse[]>(url);
  }
}

export const weatherAPI = new WeatherAPI();
