import type { PropsWithChildren } from "react";
import { UnitSystemContext, useUnitSystemState } from "@/hooks/use-unit-system";

export function UnitSystemProvider({ children }: PropsWithChildren) {
  const value = useUnitSystemState();
  return (
    <UnitSystemContext.Provider value={value}>
      {children}
    </UnitSystemContext.Provider>
  );
}
