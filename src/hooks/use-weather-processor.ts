import { useMemo } from "react";
import type { WeatherData } from "@/utils/types";
import type { UnitSystem } from "./use-unit-system";

/**
 * Maps OpenWeather icon codes to Lucide React icon names.
 * e.g. "01d" → "Sun", "10n" → "CloudRain"
 */
const ICON_MAP: Record<string, string> = {
  "01d": "Sun",
  "01n": "Moon",
  "02d": "CloudSun",
  "02n": "CloudMoon",
  "03d": "Cloud",
  "03n": "Cloud",
  "04d": "Cloudy",
  "04n": "Cloudy",
  "09d": "CloudDrizzle",
  "09n": "CloudDrizzle",
  "10d": "CloudRain",
  "10n": "CloudRain",
  "11d": "CloudLightning",
  "11n": "CloudLightning",
  "13d": "CloudSnow",
  "13n": "CloudSnow",
  "50d": "Wind",
  "50n": "Wind",
};

/**
 * Maps OpenWeather condition code ranges to Tailwind color classes.
 * https://openweathermap.org/weather-conditions
 */
function getConditionColor(conditionId: number): string {
  if (conditionId >= 200 && conditionId < 300) return "text-yellow-500"; // Thunderstorm
  if (conditionId >= 300 && conditionId < 400) return "text-blue-300"; // Drizzle
  if (conditionId >= 500 && conditionId < 600) return "text-blue-500"; // Rain
  if (conditionId >= 600 && conditionId < 700) return "text-cyan-300"; // Snow
  if (conditionId >= 700 && conditionId < 800) return "text-gray-400"; // Atmosphere (fog, mist…)
  if (conditionId === 800) return "text-yellow-400"; // Clear sky
  if (conditionId > 800) return "text-gray-300"; // Cloudy
  return "text-blue-400";
}

/**
 * Converts a Celsius value to the target unit system.
 * The OpenWeather API is always queried with units=metric so the
 * raw response values are already in °C.
 */
function convertTemp(celsius: number, units: UnitSystem): number {
  if (units === "imperial") {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

/**
 * Converts m/s to mph for imperial, or keeps m/s (1 decimal) for metric.
 */
function convertSpeed(mps: number, units: UnitSystem): number {
  if (units === "imperial") {
    return Math.round(mps * 2.237);
  }
  return Math.round(mps * 10) / 10;
}

export interface ProcessedWeatherData {
  /** Converted current temperature */
  currentTemp: number;
  /** Converted feels-like temperature */
  feelsLike: number;
  /** Converted daily minimum temperature */
  tempMin: number;
  /** Converted daily maximum temperature */
  tempMax: number;
  /** Temperature unit symbol: "°C" or "°F" */
  tempUnit: string;
  /** Capitalised weather description, e.g. "Light rain" */
  condition: string;
  /** OpenWeather condition code, e.g. 800 */
  conditionId: number;
  /** OpenWeather icon code, e.g. "01d" */
  iconCode: string;
  /** Corresponding Lucide React icon name, e.g. "Sun" */
  iconName: string;
  /** Relative humidity percentage */
  humidity: number;
  /** Converted wind speed */
  windSpeed: number;
  /** Wind speed unit: "m/s" or "mph" */
  windSpeedUnit: string;
  /** Converted wind gust speed (defaults to 0 when absent) */
  windGust: number;
  /** Rain volume in the last hour in mm (defaults to 0 when absent) */
  rainVolume: number;
  /** Atmospheric pressure in hPa */
  pressure: number;
  /** Human-readable date/time, e.g. "Monday, 3:00 PM" */
  formattedDate: string;
  /** True when |temp - feelsLike| > 5 °C (raw metric values) */
  showFeelsLikeBadge: boolean;
  /** Absolute difference in °C between temp and feelsLike (raw metric, always Celsius) */
  feelsLikeDiff: number;
  /** Absolute difference converted to the active display unit */
  feelsLikeDiffDisplay: number;
  /** Contextual badge message for the feelsLike variance */
  feelsLikeMessage: string;
  /** Tailwind colour class derived from the condition code */
  conditionColor: string;
}

/**
 * Transforms a raw OpenWeather `WeatherData` response into a flat,
 * UI-ready object.  Memoised so the transformation only reruns when
 * `data` or `units` actually change.
 *
 * @param data   Raw API response (or null/undefined while loading)
 * @param units  Target unit system – defaults to "metric"
 */
export function useWeatherProcessor(
  data: WeatherData | null | undefined,
  units: UnitSystem = "metric"
): ProcessedWeatherData | null {
  return useMemo(() => {
    if (!data) return null;

    const {
      weather,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind,
      dt,
      rain,
    } = data;

    const currentWeather = weather[0] ?? {
      id: 0,
      main: "",
      description: "",
      icon: "01d",
    };

    // Temperatures
    const currentTemp = convertTemp(temp, units);
    const feelsLikeTemp = convertTemp(feels_like, units);
    const tempMin = convertTemp(temp_min, units);
    const tempMax = convertTemp(temp_max, units);

    // Wind (gust is optional in the API response)
    const windSpeed = convertSpeed(wind?.speed ?? 0, units);
    const windGust = convertSpeed(wind?.gust ?? 0, units);

    // Rain volume – default to 0 when absent
    const rainVolume = rain?.["1h"] ?? 0;

    // Icon & condition
    const iconCode = currentWeather.icon || "01d";
    const iconName = ICON_MAP[iconCode] ?? "Cloud";
    const conditionId = currentWeather.id;
    const rawDescription = currentWeather.description ?? "";
    const condition = rawDescription
      ? rawDescription.charAt(0).toUpperCase() + rawDescription.slice(1)
      : "Unknown";

    // Date/time formatting using Intl.DateTimeFormat (e.g. "Monday, 3:00 PM")
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(dt * 1000));

    // "Feels Like" badge – comparison uses raw Celsius values so the
    // threshold of 5 is always evaluated in the same unit regardless of
    // the selected display system.
    const rawDiff = Math.abs(temp - feels_like);
    const showFeelsLikeBadge = rawDiff > 5;
    // Temperature differences scale by 9/5 from °C to °F (no +32 offset)
    const feelsLikeDiffDisplay =
      units === "imperial"
        ? Math.round((rawDiff * 9) / 5)
        : Math.round(rawDiff);
    const feelsLikeMessage =
      feels_like < temp ? "Feels much colder" : "Feels much warmer";

    return {
      currentTemp,
      feelsLike: feelsLikeTemp,
      tempMin,
      tempMax,
      tempUnit: units === "metric" ? "°C" : "°F",
      condition,
      conditionId,
      iconCode,
      iconName,
      humidity,
      windSpeed,
      windSpeedUnit: units === "metric" ? "m/s" : "mph",
      windGust,
      rainVolume,
      pressure,
      formattedDate,
      showFeelsLikeBadge,
      feelsLikeDiff: Math.round(rawDiff),
      feelsLikeDiffDisplay,
      feelsLikeMessage,
      conditionColor: getConditionColor(conditionId),
    };
  }, [data, units]);
}
