import { createContext, useContext, useState } from "react";

export type UnitSystem = "metric" | "imperial";

const STORAGE_KEY = "unit-system";

type UnitSystemContextValue = {
  units: UnitSystem;
  toggleUnits: () => void;
};

export const UnitSystemContext = createContext<UnitSystemContextValue | undefined>(
  undefined
);

export function useUnitSystemState() {
  const [units, setUnits] = useState<UnitSystem>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === "imperial" ? "imperial" : "metric";
    } catch {
      return "metric";
    }
  });

  const toggleUnits = () => {
    setUnits((prev) => {
      const next = prev === "metric" ? "imperial" : "metric";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  return { units, toggleUnits };
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUnitSystem(): UnitSystemContextValue {
  const context = useContext(UnitSystemContext);
  if (!context) {
    throw new Error("useUnitSystem must be used within a UnitSystemProvider");
  }
  return context;
}
