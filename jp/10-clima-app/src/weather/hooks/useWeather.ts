import axios from "axios";
import { z } from "zod";
import { Search } from "../interfaces/weather.interfaces";
import { useMemo, useState } from "react";

// Type guard for Weather or assertion function
// const isWeatherResponse = (weather: unknown): weather is Weather => {
//   return (
//     Boolean(weather) &&
//     typeof weather === 'object' &&
//     typeof(weather as Weather).name === 'string' &&
//     typeof(weather as Weather).main === 'object' &&
//     typeof(weather as Weather).main.temp === 'number' &&
//     typeof(weather as Weather).main.temp_max === 'number'
//   );
// }

const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});

const initState: Weather = {
  name: "",
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
}

export type Weather = z.infer<typeof Weather>;

export const useWeather = () => {
  const [weather, setWeather] = useState<Weather>(initState);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeather = async (search: Search) => {
    setLoading(true);
    setWeather(initState);
    setNotFound(false);
    try {
      const appId: string = import.meta.env.VITE_WEATHER_API_KEY as string;
      const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${appId}`;
      const { data } = await axios.get(geoUrl);
      // console.log(data);

      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      // TYPE GUARDS
      // const {data: weatherResult} = await axios.get(weatherUrl);
      // const result = isWeatherResponse(weatherResult);
      // if (result) {
      //   console.log(weatherResult);
      // } else {
      //   console.log('Invalid weather response');
      // }

      const { data: weatherResult } = await axios.get(weatherUrl);
      const result = Weather.safeParse(weatherResult);
      if (result.success) {
        // console.log(result.data);
        setWeather(result.data);
      }
    } catch (error) {
      console.error(error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(
    () => weather.name.trim().length > 0,
    [weather]
  );
  return { 
    loading, 
    hasWeatherData, 
    notFound,
    weather, 
    fetchWeather 
  };
};
