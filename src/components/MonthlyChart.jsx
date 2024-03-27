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
    <div className="p-6 bg-white border border-black shadow-sm w-full">
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="font-semibold text-base">Weekly Temperature</div>
        <div className="flex gap-5 justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-teal-300 h-4 w-7"></div>
            <div>Max Temp</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-blue-300 h-4 w-7"></div>
            <div>Min Temp</div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <BarChart
          series={[{ data: maxtemp }, { data: minTem }]}
          height={290}
          xAxis={[
            {
              data: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              scaleType: "band",
            },
          ]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </div>
    </div>
  );
}
