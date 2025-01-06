import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import WeatherDashboard from "./pages/weatherDashboard";
import { CityPage } from "./pages/cityPage";
import Layout from "./components/layout";
import { Toaster } from "./components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import About from "./pages/about";
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme='dark'>
          <Layout>
            <Routes>
              <Route path='/' element={<WeatherDashboard />} />
              <Route path='/city/:cityName' element={<CityPage />} />
              <Route path='/about' element={<About />} />
            </Routes>
          </Layout>
          <Toaster richColors />
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
