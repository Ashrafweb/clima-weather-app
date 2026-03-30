import { Link } from "react-router-dom";
//import { CitySearch } from "./city-search";

import { useTheme } from "./theme-provider";
import ThemeToggle from "./theme-toggle";
import { CitySearch } from "./city-search";
import { Button } from "./ui/button";
import { useUnitSystem } from "@/hooks/use-unit-system";

export function Header() {
  const { theme } = useTheme();
  const { units, toggleUnits } = useUnitSystem();

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link to={"/"}>
          <img
            src={theme === "dark" ? "/clima_logo_dark.png" : "/clima_logo.png"}
            alt='Klimate logo'
            className='h-16'
          />
        </Link>

        <div className='flex gap-4'>
          <CitySearch />
          <Button
            variant='outline'
            size='sm'
            onClick={toggleUnits}
            className='font-semibold'
            title={`Switch to ${units === "metric" ? "Imperial (°F)" : "Metric (°C)"}`}
          >
            {units === "metric" ? "°F" : "°C"}
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
