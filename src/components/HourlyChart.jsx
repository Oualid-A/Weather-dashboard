import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { fetchStatistics } from "../services/DetailsService";

export default function HourlyChart() {
  const [selectedInterval, setSelectedInterval] = useState("1");
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchStatistics(selectedInterval);
      setWeatherData(data);
    }
    fetchData();
  }, [selectedInterval]);

  const extractWeatherData = () => {
    if (!weatherData) return { temps: [], heures: [] };

    const hourlyData = weatherData.forecast.forecastday.map((hour) => ({
      temp_c: hour.hour.map((temp) => {
        return temp.temp_c;
      }),
      hour: hour.hour.map((time) => {
        return time.time.split(" ")[1];
      }),
    }));
    console.log(hourlyData);
    const temps = hourlyData.map((data) => data.temp_c);
    const heures = hourlyData.map((data) => data.hour);
    console.log(temps, Object(heures));
    
    return { temps, heures };
  };

  const { temps, heures } = extractWeatherData();
  
  return (
    <div>
      <div className="flex rounded-lg flex-col pt-5 pr-11 pb-2 text-xl font-semibold text-black bg-white  border border-black border-solid shadow-lg max-md:pr-5 max-md:max-w-full">
        <div className="self-start ml-11 max-md:ml-2.5">Hourly Forecast</div>
        <LineChart
          xAxis={[{ 
            scaleType: 'band',
            data: heures }]}
          series={[
            {
              data: temps,
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </div>
  );
}
