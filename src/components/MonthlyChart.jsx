import { BarChart } from "@mui/x-charts/BarChart";
import React, { useEffect, useState } from "react";
import { fetchStatistics } from "../services/DetailsService";

export default function MonthlyChart() {
  const [selectedInterval, setSelectedInterval] = useState("7");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchStatistics(selectedInterval);
      setWeatherData(data);
    }
    fetchData();
  }, [selectedInterval]);
  
  const extractWeatherData = () => {
    if (!weatherData) return { maxtemp: [1], minTem: [1] };

    const maxtemp_c = weatherData.forecast.forecastday.map(
      (day) => day.day.maxtemp_c
    );
    const mintemp_c = weatherData.forecast.forecastday.map(
      (day) => day.day.mintemp_c
    );

    return { maxtemp: maxtemp_c, minTem: mintemp_c };
  };
  const { maxtemp, minTem } = extractWeatherData();
 
  return (
    <div>
      <div className="flex rounded-lg flex-col grow pt-6 pr-9 pb-2 pl-3 w-full bg-white  border border-black border-solid shadow-sm max-md:pr-5 max-md:mt-9 max-md:max-w-full">
        <div className="flex gap-5 w-full text-black max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
          <div className="flex-auto text-base font-semibold">
            Weekly Temperature
          </div>
          <div className="flex flex-1 gap-5 justify-between self-center text-sm items-center whitespace-nowrap">
            <div className="flex gap-2  items-center">
              <div className="shrink-0 bg-teal-300 h-[15px] w-[27px]" />
              <div>Max Temp</div>
            </div>
            <div className="flex gap-2  items-center">
              <div className="shrink-0 bg-blue-300 h-[15px] w-[27px]" />
              <div>Min Temp</div>
            </div>
          </div>
        </div>
        <div className="flex gap-1 mt-5 max-md:flex-wrap">
          <BarChart
            series={[{ data: maxtemp }, { data: minTem }]}
            height={290}
            xAxis={[
              { data: ["1", "2", "3", "4", "5", "6", "7"], scaleType: "band" },
            ]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </div>
      </div>
    </div>
  );
}
