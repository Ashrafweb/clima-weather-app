import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { variants, type ForecastData } from "@/utils/types";
import { motion } from "framer-motion";
import { WeatherCard } from "./weather-card";
interface HourlyTemperatureProps {
  data: ForecastData;
}

interface ChartData {
  time: string;
  temp: number;
  feels_like: number;
}

export function HourlyTemperature({ data }: HourlyTemperatureProps) {
  // Get today's forecast data and format for chart

  const chartData: ChartData[] = data.list
    .slice(0, 8) // Get next 24 hours (3-hour intervals)
    .map((item) => ({
      time: format(new Date(item.dt * 1000), "ha"),
      temp: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
    }));

  return (
    <motion.div
      className='flex-1'
      initial='hidden'
      animate='visible'
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <WeatherCard title="Today's Temperature" className='flex-1'>
          <div className='h-[200px] w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={chartData}>
                <XAxis
                  dataKey='time'
                  stroke='#e2e8f0'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke='#e2e8f0'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}°`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                         <div className='rounded-lg border border-white/30 bg-slate-900/70 p-2 shadow-sm backdrop-blur-sm'>
                           <div className='grid grid-cols-2 gap-2'>
                             <div className='flex flex-col'>
                               <span className='text-[0.70rem] uppercase text-slate-300'>
                                 Temperature
                               </span>
                               <span className='font-bold text-white'>
                                 {payload[0].value}°
                               </span>
                             </div>
                             <div className='flex flex-col'>
                               <span className='text-[0.70rem] uppercase text-slate-300'>
                                 Feels Like
                               </span>
                               <span className='font-bold text-white'>
                                 {payload[1].value}°
                               </span>
                             </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type='monotone'
                  dataKey='temp'
                  stroke='#f59e0b'
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type='monotone'
                  dataKey='feels_like'
                  stroke='#93c5fd'
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray='5 5'
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
      </WeatherCard>
    </motion.div>
  );
}
