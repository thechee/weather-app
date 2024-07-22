'use client';

import Container from "@/components/Container";
import NavBar from "@/components/NavBar";
import { convertKelvinToCelcius } from "@/utils/convertKelvinToCelcius";
import axios from "axios";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { useQuery } from "react-query";
import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import WeatherIcon from "@/components/WeatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";


interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherList[];
  city: City;
}

interface WeatherList {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Sys {
  pod: string;
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Coord {
  lat: number;
  lon: number;
}


export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    'repoData', 
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=Oakland,CA,USA&APPID=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    }
  )

  console.log(data)
  const firstData = data?.list[0]

  if (isLoading) return (
    <div className="flex items-center min-h-screen justify-center">
      <p className="animate-bounce">Loading...</p>
    </div>
  )
  
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <NavBar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</p>
              <p className="text-base">{format(parseISO(firstData?.dt_txt ?? ''), 'MM-dd-yyyy')}</p>
            </h2>
            <Container className="gap-10 px-6 items-center">
              <div className="flex flex-col px-4 text-center">
                <span className="text-5xl">
                  {convertKelvinToCelcius(firstData?.main.temp ?? 0)}°C
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span>{convertKelvinToCelcius(firstData?.main.feels_like ?? 0)}°</span>
                </p>
                <p className="flex text-xs space-x-2 justify-between px-4">
                  <span className="flex">{convertKelvinToCelcius(firstData?.main.temp_min ?? 0)}°<FaTemperatureArrowDown className="self-center"/></span>
                  <span className="flex">{convertKelvinToCelcius(firstData?.main.temp_max ?? 0)}°<FaTemperatureArrowUp className="self-center"/></span>
                </p>
              </div>
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center justify-between gap-2 text-xs font-semibold"
                  >
                    <p className="whitespace-nowrap">{format(parseISO(item.dt_txt), 'h:mm a')}</p>
                    <WeatherIcon iconName={getDayOrNightIcon(item.weather[0].icon, data.city.sunrise, data.city.sunset, item.dt_txt)} />
                    <p>{convertKelvinToCelcius(item?.main.temp ?? 0)}°C</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </section>
        <section></section>
      </main>
    </div>
  );
}