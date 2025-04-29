import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { ThemeProvider } from "./Context/ThemeProvider";
import WeatherDashbord from "./pages/WeatherDashbord";
import CityName from "./pages/CityName";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // it will not refetch the data when you change window and came back to the page
      retry: false, // it will not retry the failed request
      staleTime: 5 * 60 * 1000, // 5 minutes it will refresh/refatch the data after 5min
      gcTime: 10 * 60 * 1000, // 10 minutes it will hold catch data for 10min after that it will remove it
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routes>
              <Route path="/" element={<WeatherDashbord />} />
              <Route path="/city/:cityName" element={<CityName />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
