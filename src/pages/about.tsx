import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function About() {
  const desc =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt quidem accusamus omnis voluptatibus pariatur consequuntur magnaminventore in, ipsum quia.";
  const title =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt quidem accusamus omnis voluptatibus pariatur consequuntur magna inventore in, ipsum quia.";
  return (
    <div className='w-full container'>
      <div className='bg-slate-700 h-[500px]  w-full text-center flex items-center justify-center '>
        <h1 className='text-slate-400 font-extrabold text-3xl sm:text-5xl md:text-9xl  font-sans'>
          About Us
        </h1>
      </div>
      <div className='bio py-2 sm:py-4 md:py-6 border-y-2 my-2 sm:my-6 border-slate-400'>
        <p className='text-xl text-center text-slate-400 text-balance'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
          rerum modi vel veniam maxime? Inventore maxime dolore dolorum, aperiam
          laudantium modi totam ea explicabo qui necessitatibus iusto maiores
          quaerat possimus?Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Maiores rerum modi vel veniam maxime? Inventore maxime dolore
          dolorum, aperiam laudantium modi totam ea explicabo qui necessitatibus
          iusto maiores quaerat possimus?
        </p>
      </div>
      <div className='blog grid grid-cols-2 gap-12 justify-around'>
        <Card>
          <CardHeader>
            <img src='/logo.png' alt='blogimg01' className='w-1/2 h-1/2' />
          </CardHeader>
          <CardContent className='grid gap-2'>
            <CardTitle>{title.split(".")[0]}</CardTitle>
            <CardDescription>{desc}</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <img src='/logo.png' alt='blogimg01' className='w-1/2 h-1/2' />
          </CardHeader>
          <CardContent className='grid gap-2'>
            <CardTitle>{title.split(".")[0]}</CardTitle>
            <CardDescription>{desc}</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <img src='/logo.png' alt='blogimg01' className='w-1/2 h-1/2' />
          </CardHeader>
          <CardContent className='grid gap-2'>
            <CardTitle>{title.split(".")[0]}</CardTitle>
            <CardDescription>{desc}</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <img src='/logo.png' alt='blogimg01' className='w-1/2 h-1/2' />
          </CardHeader>
          <CardContent className='grid gap-2'>
            <CardTitle>{title.split(".")[0]}</CardTitle>
            <CardDescription>{desc}</CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
