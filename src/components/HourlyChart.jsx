import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { fetchStatistics } from "../services/DetailsService";
import Chart from "react-google-charts";

export const data = [
  ["Country", "Popularity"],
  ["Germany", 200],
  ["United States", 300],
  ["Brazil", 400],
  ["Canada", 500],
  ["France", 600],
  ["RU", 700],
];

export default function HourlyChart() {
  const [selectedInterval, setSelectedInterval] = useState("1");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await fetchStatistics(selectedInterval);
      setWeatherData(data);
    })();
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

    const temps = hourlyData.map((data) => data.temp_c);
    const heures = hourlyData.map((data) => data.hour);

    return { temps, heures };
  };

  const { temps, heures } = extractWeatherData();

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex rounded-lg flex-col pt-5 pr-11 pb-2 text-xl font-semibold text-black bg-white  border border-black border-solid shadow-lg max-md:pr-5 max-md:max-w-full">
        <div className="self-start ml-11 max-md:ml-2.5 w-full">
          Hourly Forecast
        </div>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10, 11, 12, 13, 14, 15, 16] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5, 2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          width={500}
          height={300}
        />
      </div>
      <div className="p-2 border-[1px] border-black rounded-lg">

      <Chart
        chartEvents={[
          {
            eventName: "select",
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length === 0) return;
              const region = data[selection[0].row + 1];
              console.log("Selected : " + region);
            },
          },
        ]}
        chartType="GeoChart"
        width="100%"
        height="400px"
        data={data}
      />
      </div>
    </div>
  );
}
