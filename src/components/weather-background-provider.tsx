/* eslint-disable react-refresh/only-export-components */
import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";

interface WeatherBackgroundContextValue {
  weatherMain: string | null;
  setWeatherMain: (value: string | null) => void;
}

const WeatherBackgroundContext = createContext<WeatherBackgroundContextValue | null>(
  null
);

export const weatherGradients: Record<string, string> = {
  Thunderstorm: "linear-gradient(135deg, #2c3e50 0%, #4b79a1 100%)",
  Drizzle: "linear-gradient(135deg, #4b79a1 0%, #7f8fa6 100%)",
  Rain: "linear-gradient(135deg, #34495e 0%, #5d6d7e 100%)",
  Snow: "linear-gradient(135deg, #83a4d4 0%, #b6fbff 100%)",
  Clear: "linear-gradient(135deg, #f39c12 0%, #f1c40f 100%)",
  Clouds: "linear-gradient(135deg, #5f6c7b 0%, #8795a1 100%)",
  Mist: "linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)",
  Smoke: "linear-gradient(135deg, #4b5563 0%, #6b7280 100%)",
  Haze: "linear-gradient(135deg, #7f8c8d 0%, #95a5a6 100%)",
  Dust: "linear-gradient(135deg, #8e7f6d 0%, #b8a98f 100%)",
  Fog: "linear-gradient(135deg, #5c677d 0%, #8d99ae 100%)",
  Sand: "linear-gradient(135deg, #a97142 0%, #d4a373 100%)",
  Ash: "linear-gradient(135deg, #4b5563 0%, #374151 100%)",
  Squall: "linear-gradient(135deg, #2f3e46 0%, #52796f 100%)",
  Tornado: "linear-gradient(135deg, #232526 0%, #414345 100%)",
};

const defaultGradient =
  "linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #334155 100%)";

export function getWeatherGradient(weatherMain: string | null) {
  if (!weatherMain) {
    return defaultGradient;
  }
  return weatherGradients[weatherMain] ?? defaultGradient;
}

export function WeatherBackgroundProvider({ children }: PropsWithChildren) {
  const [weatherMain, setWeatherMain] = useState<string | null>(null);
  const value = useMemo(() => ({ weatherMain, setWeatherMain }), [weatherMain]);
  return (
    <WeatherBackgroundContext.Provider value={value}>
      {children}
    </WeatherBackgroundContext.Provider>
  );
}

export function useWeatherBackground() {
  const context = useContext(WeatherBackgroundContext);
  if (!context) {
    throw new Error(
      "useWeatherBackground must be used within WeatherBackgroundProvider"
    );
  }
  return context;
}
