import { Sunrise, Sunset, Compass, Gauge } from "lucide-react";
import { format } from "date-fns";
import { variants, type WeatherData } from "@/utils/types";
import { motion } from "framer-motion";
import { WeatherCard } from "./weather-card";
interface WeatherDetailsProps {
  data: WeatherData;
}

export function WeatherDetails({ data }: WeatherDetailsProps) {
  const { wind, main, sys } = data;

  // Format time using date-fns
  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  // Convert wind degree to direction
  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];

  // const variants = {
  //   hidden: { opacity: 0, y: 50 },
  //   visible: { opacity: 1, y: 0 },
  // };

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={variants}
      transition={{ duration: 0.8 }}
    >
      <WeatherCard title='Weather Details'>
          <div className='grid gap-6 sm:grid-cols-2'>
            {details.map((detail) => (
              <div
                key={detail.title}
                className='flex items-center gap-3 rounded-lg border border-white/20 bg-white/10 p-4'
              >
                <detail.icon className={`h-5 w-5 ${detail.color}`} />
                <div>
                  <p className='text-sm font-medium leading-none text-white'>
                    {detail.title}
                  </p>
                  <p className='text-sm text-slate-200'>
                    {detail.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
      </WeatherCard>
    </motion.div>
  );
}
