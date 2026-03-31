import { Skeleton } from "./ui/skeleton";

function WeatherSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <Skeleton className='h-8 w-36 rounded-md bg-white/20' />
        <Skeleton className='h-10 w-10 rounded-full bg-white/20' />
      </div>
      <div className='grid gap-6'>
        <div className='rounded-2xl border border-white/30 bg-white/20 p-6 backdrop-blur-[12px]'>
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='space-y-4'>
              <Skeleton className='h-8 w-40 bg-white/20' />
              <Skeleton className='h-20 w-48 bg-white/20' />
              <div className='grid grid-cols-2 gap-4'>
                <Skeleton className='h-14 w-full bg-white/20' />
                <Skeleton className='h-14 w-full bg-white/20' />
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <Skeleton className='h-40 w-40 rounded-full bg-white/20' />
            </div>
          </div>
        </div>
        <Skeleton className='h-[280px] w-full rounded-2xl bg-white/20' />
        <div className='grid gap-6 md:grid-cols-2'>
          <Skeleton className='h-[260px] w-full rounded-2xl bg-white/20' />
          <Skeleton className='h-[260px] w-full rounded-2xl bg-white/20' />
        </div>
      </div>
    </div>
  );
}

export default WeatherSkeleton;
