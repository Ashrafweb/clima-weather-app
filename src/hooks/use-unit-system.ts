import { useLocalStorage } from "./use-localStorage";

export type UnitSystem = "metric" | "imperial";

export function useUnitSystem() {
  const [units, setUnits] = useLocalStorage<UnitSystem>("unit-system", "metric");

  const toggleUnits = () => {
    setUnits(units === "metric" ? "imperial" : "metric");
  };

  return { units, toggleUnits };
}
