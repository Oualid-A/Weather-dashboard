import React, { useEffect, useState } from "react";
import joe from "../assets/userPic/joe.jpg";
import notification from "../assets/userPic/notification.png";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AirIcon from "@mui/icons-material/Air";
import { fetchStatistics } from "../services/DetailsService";

export default function DetailsCard() {
  const [selectedInterval, setSelectedInterval] = useState("7");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchStatistics(selectedInterval);
      setWeatherData(data);
    }
    fetchData();
  }, [selectedInterval]);

  const handleIntervalClick = (interval) => {
    setSelectedInterval(interval);
  };

  return (
    <div className="w-auto">
      {weatherData && (
        <div className="mx-auto max-w-full p-4 h-max xl:w-full bg-gradient-to-br from-[#0A1D56] via-[#0F2884] to-[#091640] rounded-lg text-white">
          <header className="flex justify-end items-center space-x-4">
          <div className="flex items-center bg-[#fff] p-1 rounded-2xl space-x-2 h-7 w-15">
              <div className="bg-[#0e2547] flex rounded-full items-center justify-center p-2 h-5 w-5">
                <LightModeIcon sx={{ fontSize: 13 }} />
              </div>
              <div className="">
                <DarkModeIcon color="disabled" />
              </div>
            </div>
            <img src={notification} alt="Notification" className="w-6 rounded-full bg-white p-1" />
            <img src={joe} alt="Joe" className="w-10 rounded-full" />
          </header>
          <section className="flex flex-col justify-center items-center space-y-3 mt-6">
            <img src={weatherData.current.condition.icon} alt="" className="w-20" />
            <h1 className="text-3xl font-bold">20° C</h1>
            <h2 className="text-xl font-medium">{weatherData.current.condition.text}</h2>
            <div className="flex space-x-8">
              <div className="flex flex-col items-center">
                <h2 className="flex items-center">
                  <AirIcon className="mr-2" /> Wind
                  <span className="border-r px-3">{weatherData.current.wind_kph} km/h</span>
                </h2>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="flex items-center">
                  <AirIcon className="mr-2" /> Humidity
                  <span>{weatherData.current.humidity}%</span>
                </h2>
              </div>
            </div>
          </section>
          <section className="mt-4">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-xl">Weather Forecast</h1>
              <div className="text-base font-medium rounded-lg border border-white bg-zinc-300 bg-opacity-10 px-4 py-1">
                Celsius
              </div>
            </div>
            <div className="flex justify-between items-center rounded-3xl w-[98%] p-2 mt-6 bg-gradient-to-t from-[#344fa0] via-[#0F2884] to-[#2c4085]">
              {["7", "14", "30"].map(interval => (
                <div
                  key={interval}
                  className={`w-[25%] rounded-3xl text-center font-medium p-2 cursor-pointer ${selectedInterval === interval ? 'bg-gradient-to-t from-[#ccd7ff] via-[#768dda] to-[#788beb]' : ''}`}
                  onClick={() => handleIntervalClick(interval)}
                >
                  {interval} Days
                </div>
              ))}
            </div>
          </section>
          <section className="mt-4 overflow-y-auto">
            {weatherData.forecast.forecastday.map((forecast, index) => (
              <div key={index} className="flex justify-between items-center border-b-2 border-cyan-300 py-2">
                <div className="flex items-center">
                  <img src={forecast.day.condition.icon} alt="" className="mr-2" />
                  <div>
                    <h1 className="text-xl font-medium">{forecast.date}</h1>
                    <p className="text-xl font-light">{forecast.day.condition.text}</p>
                    </div>
                </div>
                <div className="w-20 text-right">
                  <span>{forecast.day.avgtemp_c}° C</span>
                </div>
              </div>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
