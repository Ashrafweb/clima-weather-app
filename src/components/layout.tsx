import { PropsWithChildren } from "react";
import { Header } from "./header";
import Footer from "./footer";
import {
  getWeatherGradient,
  useWeatherBackground,
} from "./weather-background-provider";

const Layout = ({ children }: PropsWithChildren) => {
  const { weatherMain } = useWeatherBackground();
  const backgroundImage = getWeatherGradient(weatherMain);

  return (
    <div
      className='min-h-screen transition-[background-image] duration-700 ease-in-out'
      style={{ backgroundImage }}
    >
      <Header />
      <main className='min-h-screen container mx-auto px-4 py-8'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
