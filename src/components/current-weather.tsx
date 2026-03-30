import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind, ThermometerSun } from "lucide-react";
import {
  type WeatherData,
  type GeocodingResponse,
  variants,
} from "@/utils/types";
import { motion } from "framer-motion";
import { useWeatherProcessor } from "@/hooks/use-weather-processor";
import { useUnitSystem } from "@/hooks/use-unit-system";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

export function CurrentWeather({ data, locationName }: CurrentWeatherProps) {
  const { units } = useUnitSystem();
  const processed = useWeatherProcessor(data, units);

  if (!processed) return null;

  const {
    currentTemp,
    feelsLike,
    tempMin,
    tempMax,
    tempUnit,
    condition,
    iconCode,
    humidity,
    windSpeed,
    windSpeedUnit,
    showFeelsLikeBadge,
    feelsLikeMessage,
    feelsLikeDiffDisplay,
  } = processed;

  const formatTemp = (value: number) => `${value}°`;

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <Card className='overflow-hidden shadow-2xl'>
        <CardContent className='p-6'>
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <div className='flex items-center'>
                  <h2 className='text-2xl font-bold tracking-tight'>
                    {locationName?.name}
                  </h2>
                  {locationName?.state && (
                    <span className='text-muted-foreground'>
                      , {locationName.state}
                    </span>
                  )}
                </div>
                <p className='text-sm text-muted-foreground'>
                  {locationName?.country}
                </p>
              </div>

              <div className='flex items-center gap-2'>
                <p className='text-7xl font-bold tracking-tighter'>
                  {formatTemp(currentTemp)}
                  <span className='text-4xl'>{tempUnit}</span>
                </p>
                <div className='space-y-1'>
                  <div className='flex items-center gap-1.5'>
                    <p className='text-sm font-medium text-muted-foreground'>
                      Feels like {formatTemp(feelsLike)}{tempUnit}
                    </p>
                    {showFeelsLikeBadge && (
                      <span className='inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700 dark:bg-orange-900/40 dark:text-orange-300'>
                        <ThermometerSun className='h-3 w-3' />
                        {feelsLikeMessage} ({feelsLikeDiffDisplay}{tempUnit})
                      </span>
                    )}
                  </div>
                  <div className='flex gap-2 text-sm font-medium'>
                    <span className='flex items-center gap-1 text-blue-500'>
                      <ArrowDown className='h-3 w-3' />
                      {formatTemp(tempMin)}{tempUnit}
                    </span>
                    <span className='flex items-center gap-1 text-red-500'>
                      <ArrowUp className='h-3 w-3' />
                      {formatTemp(tempMax)}{tempUnit}
                    </span>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='flex items-center gap-2'>
                  <Droplets className='h-4 w-4 text-blue-500' />
                  <div className='space-y-0.5'>
                    <p className='text-sm font-medium'>Humidity</p>
                    <p className='text-sm text-muted-foreground'>{humidity}%</p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Wind className='h-4 w-4 text-blue-500' />
                  <div className='space-y-0.5'>
                    <p className='text-sm font-medium'>Wind Speed</p>
                    <p className='text-sm text-muted-foreground'>
                      {windSpeed} {windSpeedUnit}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-col items-center justify-center'>
              <div className='relative flex aspect-square w-full max-w-[200px] items-center justify-center'>
                <img
                  src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
                  alt={condition}
                  className='h-full w-full object-contain'
                />
                <div className='absolute bottom-0 text-center'>
                  <p className='text-sm font-medium capitalize'>{condition}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
