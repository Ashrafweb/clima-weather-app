import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface WeatherCardProps extends PropsWithChildren {
  title?: string;
  className?: string;
  contentClassName?: string;
}

export function WeatherCard({
  title,
  className,
  contentClassName,
  children,
}: WeatherCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/30 bg-white/20 p-6 text-slate-50 shadow-2xl backdrop-blur-[12px]",
        className
      )}
    >
      {title && <h3 className='mb-4 text-lg font-semibold tracking-tight'>{title}</h3>}
      <div className={cn(contentClassName)}>{children}</div>
    </div>
  );
}
